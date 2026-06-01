import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./types";

// Service-role client for trusted server-side work only (scheduled report jobs,
// usage_costs logging, GDPR delete). BYPASSES RLS — never import into client
// code and never expose the service role key to the browser (§7.3).
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
