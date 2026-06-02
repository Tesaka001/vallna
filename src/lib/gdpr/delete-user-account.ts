import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export async function deleteUserAccount(
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
