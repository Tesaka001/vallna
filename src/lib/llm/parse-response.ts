export function stripJsonFences(text: string): string {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
}

export function parseJsonResponse<T>(text: string): T {
  const cleaned = stripJsonFences(text);
  return JSON.parse(cleaned) as T;
}
