export const ONBOARDING_QUESTIONS = {
  challenge: {
    label: "What is the biggest challenge you want to work through?",
    placeholder: "Write freely. There is no right answer.",
  },
  hopes: {
    label: "What are you hoping this app gives you that others haven't?",
    placeholder: "Be as honest as you can.",
  },
  self_description: {
    label: "How would you describe yourself to someone who really knows you?",
    placeholder: "Not how you wish to be seen — how you actually are.",
  },
} as const;

export const GENDER_OPTIONS = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const AGE_RANGE_OPTIONS = [
  { value: "18-24", label: "18–24" },
  { value: "25-34", label: "25–34" },
  { value: "35-44", label: "35–44" },
  { value: "45-54", label: "45–54" },
  { value: "55+", label: "55+" },
] as const;

export const COUNTRY_OPTIONS = [
  "United Kingdom",
  "Ireland",
  "United States",
  "Canada",
  "Australia",
  "New Zealand",
  "Germany",
  "France",
  "Netherlands",
  "Belgium",
  "Spain",
  "Italy",
  "Portugal",
  "Switzerland",
  "Austria",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Poland",
  "Other",
] as const;

/** IANA timezone suggestions keyed by country label. */
export const COUNTRY_TIMEZONE_HINTS: Record<string, string> = {
  "United Kingdom": "Europe/London",
  Ireland: "Europe/Dublin",
  "United States": "America/New_York",
  Canada: "America/Toronto",
  Australia: "Australia/Sydney",
  "New Zealand": "Pacific/Auckland",
  Germany: "Europe/Berlin",
  France: "Europe/Paris",
  Netherlands: "Europe/Amsterdam",
  Belgium: "Europe/Brussels",
  Spain: "Europe/Madrid",
  Italy: "Europe/Rome",
  Portugal: "Europe/Lisbon",
  Switzerland: "Europe/Zurich",
  Austria: "Europe/Vienna",
  Sweden: "Europe/Stockholm",
  Norway: "Europe/Oslo",
  Denmark: "Europe/Copenhagen",
  Finland: "Europe/Helsinki",
  Poland: "Europe/Warsaw",
};
