ALTER TABLE public.leads
  ADD COLUMN last_alert_pass_start bigint,
  ADD COLUMN last_alert_sent_at timestamptz,
  ADD COLUMN last_digest_sent_at timestamptz,
  ADD COLUMN reactivation_sent_at timestamptz;
