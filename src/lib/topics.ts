import { supabase } from "@/integrations/supabase/client";

export type TopicPriority = "P1" | "P2" | "P3";
export type TopicStatus = "a_produire" | "draft_genere" | "en_revision" | "publie";

export interface ContentTopicRow {
  id: string;
  keyword: string;
  intent: string | null;
  format: string | null;
  priority: TopicPriority;
  monetization_lever: string | null;
  target_length: number;
  internal_links: string[];
  status: TopicStatus;
  blog_post_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type ContentTopicInput = Omit<ContentTopicRow, "id" | "created_at" | "updated_at">;

export async function fetchAllTopics(): Promise<ContentTopicRow[]> {
  const { data, error } = await supabase
    .from("content_topics")
    .select("*")
    .order("priority", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ContentTopicRow[];
}

export async function upsertTopic(input: Partial<ContentTopicInput> & { id?: string }) {
  if (input.id) {
    const { id, ...rest } = input;
    const { error } = await supabase.from("content_topics").update(rest).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("content_topics").insert(input);
    if (error) throw error;
  }
}

export async function deleteTopic(id: string) {
  const { error } = await supabase.from("content_topics").delete().eq("id", id);
  if (error) throw error;
}
