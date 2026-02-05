import nodemailer from 'nodemailer';
import { dbConfig } from '../config/db.js';

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: dbConfig.gmail_user,
      pass: dbConfig.gmail_password, // Gmail app password
    },
  });

  await transporter.sendMail({
    from: dbConfig.gmail_user,
    to,
    subject,
    text,
  });
}
