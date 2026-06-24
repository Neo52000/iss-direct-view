const STORAGE_KEY = "iss-leads";

export interface Lead {
  email: string;
  city?: string;
  consent: boolean;
  createdAt: string;
}

export async function submitLead(email: string, city?: string, consent = true): Promise<Lead> {
  // V1: stockage local. À remplacer par submitLeadToSupabase quand Lovable Cloud sera activé.
  const lead: Lead = {
    email,
    city,
    consent,
    createdAt: new Date().toISOString(),
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: Lead[] = raw ? JSON.parse(raw) : [];
    existing.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    /* localStorage indisponible */
  }
  await new Promise((r) => setTimeout(r, 400));
  return lead;
}

// Stub V2 (à brancher après activation de Lovable Cloud) :
// export async function submitLeadToSupabase(email: string, city?: string) {
//   const { supabase } = await import("@/integrations/supabase/client");
//   return supabase.from("leads").insert({ email, city });
// }