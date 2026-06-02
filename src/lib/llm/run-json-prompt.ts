import type Anthropic from "@anthropic-ai/sdk";

import { getAnthropicClient } from "./client";
import { LLM_MODELS } from "./models";
import { parseJsonResponse } from "./parse-response";

type MessageResult<T> = {
  data: T;
  model: string;
  inputTokens: number;
  outputTokens: number;
};

export async function runJsonPrompt<T>(params: {
  system: string;
  userMessage: string;
  model: string;
  maxOutputTokens: number;
  retryHint?: string;
}): Promise<MessageResult<T>> {
  const client = getAnthropicClient();
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    const userContent =
      attempt === 0
        ? params.userMessage
        : `${params.userMessage}\n\nYour previous response was invalid. ${params.retryHint ?? "Return only valid JSON matching the requested schema."}`;

    try {
      const response = await client.messages.create({
        model: params.model,
        max_tokens: params.maxOutputTokens,
        system: params.system,
        messages: [{ role: "user", content: userContent }],
      });

      const text = extractText(response);
      const data = parseJsonResponse<T>(text);

      return {
        data,
        model: params.model,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("LLM call failed after retry.");
}

function extractText(response: Anthropic.Message): string {
  const block = response.content.find((part) => part.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("LLM response contained no text.");
  }
  return block.text;
}

export { LLM_MODELS };
