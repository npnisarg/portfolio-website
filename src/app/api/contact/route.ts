import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from:    'Portfolio Contact <onboarding@resend.dev>',
    to:      ['97nisargpatel@gmail.com'],
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family: monospace; max-width: 560px; margin: 0 auto; padding: 32px; background: #F4F0E8; border-radius: 12px; color: #1C1410;">
        <h2 style="margin: 0 0 24px; font-size: 20px; color: #7C3AED;">New message from your portfolio</h2>
        <table style="width:100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #5C4A3A; width: 80px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #5C4A3A;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0284C7;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #5C4A3A;"><strong>Subject</strong></td><td style="padding: 8px 0;">${subject}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid rgba(28,20,16,0.12); margin: 20px 0;" />
        <p style="color: #5C4A3A; margin: 0 0 8px;"><strong>Message</strong></p>
        <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${message}</p>
        <hr style="border: none; border-top: 1px solid rgba(28,20,16,0.12); margin: 20px 0;" />
        <p style="font-size: 11px; color: #7A6050; margin: 0;">Reply directly to this email to respond to ${name}.</p>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
