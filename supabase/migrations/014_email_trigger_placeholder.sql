-- Enable the pg_net extension to make HTTP requests
create extension if not exists pg_net;

-- Create a function that will be called by the trigger
create or replace function public.handle_new_notification()
returns trigger as $$
begin
  -- Call the Edge Function "send-email"
  -- Replace PROJECT_REF with your actual project reference if running manually
  -- Or rely on the "Database Webhooks" UI which handles this cleaner.
  
  -- METHOD 1: Using pg_net (Requires raw SQL URL, tricky to get dynamic URL inside SQL without config)
  -- This is often brittle in migrations.
  
  -- METHOD 2: Using Supabase "Database Webhooks" (Recommended UI method)
  -- We just need to trigger it.
  
  -- However, for this SQL to work automatically, we need the URL.
  -- Assuming specific URL structure: https://<project_ref>.supabase.co/functions/v1/send-email
  
  -- Since we don't know the Project Ref in this SQL context reliably without input:
  -- We will skip the pg_net implementation here to avoid breaking the build with bad URLs.
  
  -- INSTEAD, we will provide instructions.
  
  return new;
end;
$$ language plpgsql;

-- Actually, Supabase has a "supa_hooks" or "webhooks" feature in the dashboard which is "No Code".
-- BUT, if the user wants SQL "tooguer", they might mean a Trigger that does something logic-wise?
-- No, they want "email notification".

-- Let's define the Trigger logic stub, but the actual HTTP call is best configured in Dashboard.
drop trigger if exists on_notification_created on public.notifications;

-- The best way for the user:
-- 1. Deploy the function.
-- 2. Go to Supabase Dashboard -> Database -> Webhooks.
-- 3. Create Webhook -> Name: "Email Notification" -> Table: public.notifications -> Events: INSERT.
-- 4. Type: Supabase Edge Functions -> Select "send-email".

-- This SQL file will just be a placeholder/reminder since pure SQL webhooks require extensions and hardcoded URLs.
select 'Please configure the Webhook in Supabase Dashboard -> Database -> Webhooks' as instruction;
