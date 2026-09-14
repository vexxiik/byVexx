import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeEmail from '@/components/emails/WelcomeEmail';
import FollowUpEmail from '@/components/emails/FollowUpEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, isUrgent } = body;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set. Simulating email send for testing.');
      return NextResponse.json({ success: true, simulated: true }, { status: 200 });
    }

    // Send the immediate Welcome Email
    const welcomeData = await resend.emails.send({
      from: 'Vexx <noreply@vexx.cz>',
      to: email,
      bcc: 'jakub.sokol2007@gmail.com', // Skrytá kopie pro majitele webu
      subject: 'Vaše poptávka dorazila v pořádku.',
      react: WelcomeEmail({ name, message, isUrgent }),
    });

    if (welcomeData.error) {
      return NextResponse.json({ error: welcomeData.error }, { status: 400 });
    }

    // Calculate time for +24 hours
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 24);

    // Send the scheduled Follow Up Email
    const followUpData = await resend.emails.send({
      from: 'Vexx <noreply@vexx.cz>',
      to: email,
      subject: 'Proč weby od Vexx. vydělávají víc.',
      react: FollowUpEmail(),
      scheduledAt: tomorrow.toISOString(),
    });

    if (followUpData.error) {
      return NextResponse.json({ error: followUpData.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, welcomeData, followUpData }, { status: 200 });
  } catch (error: any) {
    console.error("Resend API Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error', details: error }, { status: 500 });
  }
}
