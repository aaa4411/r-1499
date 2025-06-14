
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://woxlfyovnvzxakyqviey.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndveGxmeW92bnZ6eGFreXF2aWV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTI5NjksImV4cCI6MjA2NTQ4ODk2OX0.OHT1gyaTeHAF-xpw5kf2T3HAndBzi4SwEB4CX4jhf9U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Types for our Supabase tables
export type PropertyInsert = {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  user_id: string;
  images?: string[];
  features?: string[];
  coordinates?: { lat: number; lng: number };
};

export type Property = PropertyInsert & {
  id: string;
  created_at: string;
};
