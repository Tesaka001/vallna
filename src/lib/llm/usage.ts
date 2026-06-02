import type { SupabaseClient } from "@supabase/supabase-js";

import { calculateCostUsd, type LlmOperation } from "./models";
import type { Database } from "@/lib/supabase/types";

export async function logUsageCost(
  supabase: SupabaseClient<Database>,
  params: {
    userId: string;
    operation: LlmOperation;
    model: string;
    inputTokens: number;
    outputTokens: number;
  },
): Promise<void> {
  await supabase.from("usage_costs").insert({
    user_id: params.userId,
    operation: params.operation,
    model: params.model,
    input_tokens: params.inputTokens,
    output_tokens: params.outputTokens,
    cost_usd: calculateCostUsd(
      params.model,
      params.inputTokens,
      params.outputTokens,
    ),
  });
}
