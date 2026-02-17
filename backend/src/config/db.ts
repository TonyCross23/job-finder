import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
  hport: process.env.PORT! || 5000,
  host: process.env.REDIS_HOST! || '127.0.0.1',
  port: process.env.REDIS_PORT! ? Number(process.env.REDIS_PORT) : 6379,
  username: process.env.REDIS_USERNAME! || 'default',
  password: process.env.REDIS_PASSWORD! || 'password',
  db: process.env.REDIS_DB! ? Number(process.env.REDIS_DB!) : 0,
  db_rul: process.env.DATABASE_URL!,
  access_secret: process.env.ACCESS_SECRET! || 'super-secret-access-key',
  gmail_user: process.env.GMAIL_USER!,
  gmail_password: process.env.GMAIL_APP_PASSWORD!,
  supabse_db: process.env.SUPABASE_URL!,
  supabase_role_key: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};
