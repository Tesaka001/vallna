/** Prohibited patterns in user-facing LLM output (LLM doc §8.2). */

const PROHIBITED_PATTERNS: RegExp[] = [
  /\byou are enough\b/i,
  /\byou're doing (?:so )?well\b/i,
  /\bbe kind to yourself\b/i,
  /\bbe proud of yourself\b/i,
  /\bit's okay\b/i,
  /\bself-care\b/i,
  /\byour journey\b/i,
  /\bhealing space\b/i,
  /\bhold space\b/i,
  /\bthis might be hard to hear\b/i,
  /\bwhat i'm hearing is\b/i,
  /\bit sounds like you're feeling\b/i,
  /\bsun sign\b/i,
  /\bmoon sign\b/i,
  /\brising sign\b/i,
  /\bwavespell\b/i,
  /\bgalactic signature\b/i,
  /\barchetype\b/i,
  /\bpharmakon\b/i,
];

export function collectBrandVoiceViolations(text: string): string[] {
  const violations: string[] = [];
  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(text)) {
      violations.push(pattern.source);
    }
  }
  return violations;
}

export function scanReportStrings(values: Array<string | null | undefined>): string[] {
  const combined = values.filter(Boolean).join("\n");
  return collectBrandVoiceViolations(combined);
}
