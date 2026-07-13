-- Schedules the previously-dormant send-iss-alerts edge function to actually run.
-- pg_net needs a Vault secret named 'service_role_key' holding the project's
-- service_role key so cron can authenticate the HTTP call. Create it once,
-- manually, in the SQL editor (never commit the value to a migration):
--   select vault.create_secret('<your service_role key>', 'service_role_key');
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

SELECT cron.schedule(
  'send-iss-alerts-daily',
  '0 17 * * *', -- 17:00 UTC, early evening in Europe/Paris (18:00-19:00 depending on DST)
  $$
  SELECT net.http_post(
    url := 'https://ffoywtsyxphfjagmuqvb.supabase.co/functions/v1/send-iss-alerts',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'service_role_key'
      )
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
