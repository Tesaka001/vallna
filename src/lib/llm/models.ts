/** Model IDs and pricing — update when Anthropic pricing changes (LLM doc §10.1). */
export const LLM_MODELS = {
  TIER1: process.env.ANTHROPIC_MODEL_TIER1 ?? "claude-haiku-4-5",
  TIER2: process.env.ANTHROPIC_MODEL_TIER2 ?? "claude-sonnet-4-6",
  TIER3: process.env.ANTHROPIC_MODEL_TIER3 ?? "claude-opus-4-6",
} as const;

/** USD per 1M tokens (input / output). MVP estimates from LLM architecture doc. */
export const MODEL_PRICING: Record<
  string,
  { inputPerMillion: number; outputPerMillion: number }
> = {
  "claude-haiku-4-5": { inputPerMillion: 1.0, outputPerMillion: 5.0 },
  "claude-sonnet-4-6": { inputPerMillion: 3.0, outputPerMillion: 15.0 },
  "claude-opus-4-6": { inputPerMillion: 15.0, outputPerMillion: 75.0 },
};

export function calculateCostUsd(
  model: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const pricing =
    MODEL_PRICING[model] ?? MODEL_PRICING[LLM_MODELS.TIER2];
  const inputCost = (inputTokens / 1_000_000) * pricing.inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillion;
  return Number((inputCost + outputCost).toFixed(6));
}

export type LlmOperation =
  | "onboarding_score"
  | "daily_report_tier1"
  | "daily_report_tier2"
  | "weekly_report"
  | "monthly_report"
  | "failed_report";
