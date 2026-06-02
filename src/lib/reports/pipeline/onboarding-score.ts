import { runJsonPrompt, LLM_MODELS } from "@/lib/llm/run-json-prompt";
import type { OnboardingScoreOutput } from "@/lib/llm/types";
import { logUsageCost } from "@/lib/llm/usage";
import { TIER1_ONBOARDING_SCORER_PROMPT } from "@/lib/prompts";
import type { Json } from "@/lib/supabase/types";
import { createAdminClient } from "@/lib/supabase/admin";

export async function scoreOnboardingSurvey(params: {
  userId: string;
  responses: Record<string, unknown>;
  profileJson: Json;
}): Promise<OnboardingScoreOutput | null> {
  try {
    const supabase = createAdminClient();
    const result = await runJsonPrompt<OnboardingScoreOutput>({
      system: TIER1_ONBOARDING_SCORER_PROMPT,
      userMessage: JSON.stringify({
        responses: params.responses,
        user_profile: params.profileJson,
      }),
      model: LLM_MODELS.TIER1,
      maxOutputTokens: 400,
    });

    await logUsageCost(supabase, {
      userId: params.userId,
      operation: "onboarding_score",
      model: result.model,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    });

    return result.data;
  } catch {
    return null;
  }
}
