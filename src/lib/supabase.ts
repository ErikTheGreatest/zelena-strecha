import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  price_from: number | null;
  order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  text: string;
  rating: number;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};