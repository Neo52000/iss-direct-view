import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "iss-leads";

export interface Lead {
  email: string;
  city?: string;
  consent: boolean;
  createdAt: string;
}

export async function submitLead(email: string, city?: string, consent = true): Promise<Lead> {
  const lead: Lead = { email, city, consent, createdAt: new Date().toISOString() };

  try {
    const { error } = await supabase.from("leads").insert({ email, city: city || null, consent });
    if (error) throw error;
  } catch {
    // Fallback localStorage si Supabase indisponible
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing: Lead[] = raw ? JSON.parse(raw) : [];
      existing.push(lead);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch {
      /* localStorage indisponible */
    }
  }

  return lead;
}
