import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "./types";

// Browser-side Supabase client. Uses the public anon key only — RLS enforces
// per-user data isolation (§7.1). Safe to call from Client Components.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
