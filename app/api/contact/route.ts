import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { name: string; email: string; message: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_USER || !SMTP_PASS) {
    return Response.json({ error: "Email service not configured." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: SMTP_USER,
      to: "selepam87@gmail.com",
      replyTo: email,
      subject: `New Booking Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send email.";
    return Response.json({ error: msg }, { status: 500 });
  }
}
