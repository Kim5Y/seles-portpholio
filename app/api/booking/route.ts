import nodemailer from "nodemailer";

export const runtime = "nodejs";

type BookingPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  package: string;
  date: string;
  message?: string;
  website?: string; // honeypot
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

const ipHits = new Map<string, number[]>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  return xff.split(",")[0]?.trim() || "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) || []).filter((t) => t >= windowStart);
  if (hits.length >= RATE_LIMIT_MAX) return false;
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function mustGetEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.website && body.website.trim().length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const pkg = (body.package || "").trim();
  const date = (body.date || "").trim();
  const message = (body.message || "").trim();

  if (!firstName || !lastName || !email || !pkg || !date) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  const SMTP_USER = mustGetEnv("SMTP_USER");
  const SMTP_PASS = mustGetEnv("SMTP_PASS");
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;
  const BOOKING_TO = process.env.BOOKING_TO || "opycialworld@gmail.com";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: String(process.env.SMTP_SECURE || "true") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  const subject = `Booking request: ${pkg} (${date}) - ${firstName} ${lastName}`;
  const text = [
    "New booking request",
    "",
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "Phone: (not provided)",
    `Package: ${pkg}`,
    `Preferred date: ${date}`,
    message ? "" : "",
    message ? "Message:" : "",
    message ? message : ""
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to: BOOKING_TO,
      replyTo: email,
      subject,
      text
    });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email.";
    return Response.json({ error: msg }, { status: 500 });
  }
}

