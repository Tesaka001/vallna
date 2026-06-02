import type { OnboardingSurveyResponses } from "@/lib/astro/build-profile";

export type OnboardingSubmitPayload = {
  display_name?: string;
  timezone: string;
  birth_date: string;
  birth_time?: string | null;
  birth_location?: string | null;
  responses: OnboardingSurveyResponses;
};

export class OnboardingValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OnboardingValidationError";
  }
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new OnboardingValidationError(`${field} is required.`);
  }
  return value.trim();
}

export function parseOnboardingPayload(body: unknown): OnboardingSubmitPayload {
  if (!body || typeof body !== "object") {
    throw new OnboardingValidationError("Invalid request body.");
  }

  const data = body as Record<string, unknown>;
  const responsesRaw = data.responses;

  if (!responsesRaw || typeof responsesRaw !== "object") {
    throw new OnboardingValidationError("Survey responses are required.");
  }

  const responsesObj = responsesRaw as Record<string, unknown>;

  const timezone = requiredText(data.timezone, "Timezone");
  const birthDate = requiredText(data.birth_date, "Birth date");

  if (!DATE_PATTERN.test(birthDate)) {
    throw new OnboardingValidationError("Birth date must be YYYY-MM-DD.");
  }

  const birthTimeRaw = data.birth_time;
  let birthTime: string | null = null;
  if (birthTimeRaw !== undefined && birthTimeRaw !== null && birthTimeRaw !== "") {
    if (typeof birthTimeRaw !== "string" || !TIME_PATTERN.test(birthTimeRaw)) {
      throw new OnboardingValidationError("Birth time must be HH:MM.");
    }
    birthTime = birthTimeRaw;
  }

  const birthLocationRaw = data.birth_location;
  const birthLocation =
    typeof birthLocationRaw === "string" && birthLocationRaw.trim()
      ? birthLocationRaw.trim()
      : null;

  const displayNameRaw = data.display_name;
  const displayName =
    typeof displayNameRaw === "string" && displayNameRaw.trim()
      ? displayNameRaw.trim()
      : undefined;

  const gender = requiredText(responsesObj.gender, "Gender");
  const ageRange = requiredText(responsesObj.age_range, "Age range");
  const country = requiredText(responsesObj.country, "Country");

  const validGenders = new Set(["woman", "man", "non_binary", "prefer_not_to_say"]);
  if (!validGenders.has(gender)) {
    throw new OnboardingValidationError("Invalid gender selection.");
  }

  const validAgeRanges = new Set(["18-24", "25-34", "35-44", "45-54", "55+"]);
  if (!validAgeRanges.has(ageRange)) {
    throw new OnboardingValidationError("Invalid age range selection.");
  }

  return {
    display_name: displayName,
    timezone,
    birth_date: birthDate,
    birth_time: birthTime,
    birth_location: birthLocation,
    responses: {
      challenge: requiredText(responsesObj.challenge, "Challenge"),
      hopes: requiredText(responsesObj.hopes, "Hopes"),
      self_description: requiredText(
        responsesObj.self_description,
        "Self description",
      ),
      gender: gender as OnboardingSurveyResponses["gender"],
      age_range: ageRange as OnboardingSurveyResponses["age_range"],
      country,
    },
  };
}
