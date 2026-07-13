import { supabase } from "@/integrations/supabase/client";

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  excerpt: string | null;
  content: string;
  category: string;
  cover: string;
  reading_time: number;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  faq: BlogFaqItem[];
  social_suggestions: string[];
  to_verify: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export type BlogPostInput = Omit<BlogPostRow, "id" | "created_at" | "updated_at">;

export async function fetchPublishedPosts(): Promise<BlogPostRow[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .lte("published_at", new Date().toISOString()) // drip : masque les articles datés dans le futur
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostRow[];
}

export async function fetchAllPosts(): Promise<BlogPostRow[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPostRow[];
}

export async function fetchPostBySlug(slug: string): Promise<BlogPostRow | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as BlogPostRow | null) ?? null;
}

export async function upsertPost(input: BlogPostInput & { id?: string }) {
  if (input.id) {
    const { id, ...rest } = input;
    const { error } = await supabase.from("blog_posts").update(rest).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("blog_posts").insert(input);
    if (error) throw error;
  }
}

export async function deletePost(id: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}
