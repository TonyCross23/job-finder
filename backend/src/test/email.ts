export const emailUtils = {
  sendEmail: async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
    // မင်းရဲ့ မူလ Nodemailer logic တွေကို ဒီထဲမှာ ထည့်ပါ
    console.log(`Sending email to ${to}`);
    return { messageId: 'test-id' };
  }
};