# Ophycial Lens Website (Next.js)

## Local dev
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Booking email (Nodemailer)
Set these env vars (locally in `.env.local`, on Render in Environment):
- `SMTP_USER` (Gmail address)
- `SMTP_PASS` (Gmail App Password)
- `SMTP_FROM` (optional; defaults to `SMTP_USER`)
- `BOOKING_TO` (optional; defaults to `opycialworld@gmail.com`)

Optional SMTP overrides:
- `SMTP_HOST` (default `smtp.gmail.com`)
- `SMTP_PORT` (default `465`)
- `SMTP_SECURE` (default `true`)

## Render deploy
- Build command: `npm install && npm run build`
- Start command: `npm run start`

Old URLs redirect:
- `/contact-us.html` → `/contact`
- `/booking.html` → `/booking`
- `/Gallery/Gallery.html` → `/gallery`

