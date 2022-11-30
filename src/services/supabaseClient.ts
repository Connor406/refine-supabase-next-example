import { createClient } from '@pankod/refine-supabase';

// @ts-ignore
export const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
