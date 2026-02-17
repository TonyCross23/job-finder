import { createClient } from '@supabase/supabase-js';
import { dbConfig } from '../config/db';

const supabaseUrl = dbConfig.supabse_db;
const supabaseKey = dbConfig.supabase_role_key;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase keys are missing in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseKey);