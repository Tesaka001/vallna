import { NextResponse } from "next/server";

import { deleteUserAccount } from "@/lib/gdpr/delete-user-account";
import { createClient } from "@/lib/supabase/server";

const CONFIRMATION_PHRASE = "DELETE";

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const confirmation = (body as { confirmation?: unknown }).confirmation;
  if (confirmation !== CONFIRMATION_PHRASE) {
    return NextResponse.json(
      { error: `Type ${CONFIRMATION_PHRASE} to confirm account deletion.` },
      { status: 400 },
    );
  }

  const result = await deleteUserAccount(user.id);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error ?? "Could not delete account." },
      { status: 500 },
    );
  }

  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}
