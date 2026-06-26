import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  meta_description: string | null;
  price: string;
  rating: number;
  category: string;
  image_emoji: string | null;
  image_url: string | null;
  affiliate_url: string;
  badge: string | null;
  position: number;
  active: boolean;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export type ProductInput = Omit<Product, "id" | "clicks" | "created_at" | "updated_at">;

export async function fetchActiveProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("position", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function upsertProduct(input: ProductInput & { id?: string }) {
  if (input.id) {
    const { id, ...rest } = input;
    const { error } = await supabase.from("products").update(rest).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("products").insert(input);
    if (error) throw error;
  }
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function trackClickAndOpen(id: string, url: string) {
  try {
    await supabase.rpc("increment_product_clicks", { _id: id });
  } catch {
    /* silencieux */
  }
  window.open(url, "_blank", "noopener,sponsored");
}

export async function currentUserIsAdmin(): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return false;
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", auth.user.id)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}