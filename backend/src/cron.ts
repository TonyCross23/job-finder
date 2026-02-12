import cron from 'node-cron';
import { prisma } from './database/prisma';

export const initCronJobs = () => {
  cron.schedule('30 * * * *', async () => {
    try {
      const deleted = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: { lt: new Date() }
        }
      });
      if (deleted.count > 0) {
        console.log(`[Cron] Cleanup: Deleted ${deleted.count} expired tokens.`);
      }
    } catch (error) {
      console.error('[Cron] Cleanup Error:', error);
    }
  });

  // တခြား cron job တွေရှိရင်လည်း ဒီအောက်မှာ ဆက်ရေးသွားလို့ရတယ်
  console.log('[Cron] All cron jobs initialized.');
};