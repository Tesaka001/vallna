import {
  CATEGORY_NAME_MAX_LENGTH,
  GRADE_MAX,
  GRADE_MIN,
  GRADE_NOTE_MAX_LENGTH,
} from "./constants";

export class TrackingValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TrackingValidationError";
  }
}

export function parseCategoryName(value: unknown): string {
  if (typeof value !== "string") {
    throw new TrackingValidationError("Category name is required.");
  }

  const name = value.trim();
  if (!name) {
    throw new TrackingValidationError("Category name is required.");
  }

  if (name.length > CATEGORY_NAME_MAX_LENGTH) {
    throw new TrackingValidationError(
      `Category name must be ${CATEGORY_NAME_MAX_LENGTH} characters or fewer.`,
    );
  }

  return name;
}

export function parseOptionalEmoji(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new TrackingValidationError("Invalid emoji.");
  }

  const emoji = value.trim();
  if (!emoji) return null;
  if (emoji.length > 8) {
    throw new TrackingValidationError("Emoji is too long.");
  }

  return emoji;
}

export function parseGrade(value: unknown): number {
  const grade =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : Number.NaN;

  if (!Number.isInteger(grade) || grade < GRADE_MIN || grade > GRADE_MAX) {
    throw new TrackingValidationError(
      `Grade must be an integer from ${GRADE_MIN} to ${GRADE_MAX}.`,
    );
  }

  return grade;
}

export function parseOptionalNote(value: unknown): string | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    throw new TrackingValidationError("Invalid note.");
  }

  const note = value.trim();
  if (!note) return null;

  if (note.length > GRADE_NOTE_MAX_LENGTH) {
    throw new TrackingValidationError(
      `Note must be ${GRADE_NOTE_MAX_LENGTH.toLocaleString()} characters or fewer.`,
    );
  }

  return note;
}

export function parseCategoryId(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new TrackingValidationError("Category is required.");
  }
  return value.trim();
}
