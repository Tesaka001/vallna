import { JOURNAL_CONTENT_MAX_LENGTH } from "./constants";

export class JournalValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JournalValidationError";
  }
}

export function parseJournalContent(value: unknown): string {
  if (typeof value !== "string") {
    throw new JournalValidationError("Entry text is required.");
  }

  const content = value.trim();
  if (!content) {
    throw new JournalValidationError("Entry text cannot be empty.");
  }

  if (content.length > JOURNAL_CONTENT_MAX_LENGTH) {
    throw new JournalValidationError(
      `Entry text must be ${JOURNAL_CONTENT_MAX_LENGTH.toLocaleString()} characters or fewer.`,
    );
  }

  return content;
}
