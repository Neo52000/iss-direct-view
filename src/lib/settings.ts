import { supabase } from "@/integrations/supabase/client";

export async function fetchSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw error;
  return (data?.value as string | undefined) ?? null;
}

export async function upsertSetting(key: string, value: string) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export const SETTING_KEYS = {
  kitDownloadUrl: "kit_download_url",
} as const;
