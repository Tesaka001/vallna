"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { OnboardingSurveyResponses } from "@/lib/astro/build-profile";
import {
  AGE_RANGE_OPTIONS,
  COUNTRY_OPTIONS,
  COUNTRY_TIMEZONE_HINTS,
  GENDER_OPTIONS,
  ONBOARDING_QUESTIONS,
} from "@/lib/onboarding/constants";

type Step = "birth" | "challenge" | "hopes" | "self_description" | "details";

type FormState = {
  displayName: string;
  timezone: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  challenge: string;
  hopes: string;
  selfDescription: string;
  gender: OnboardingSurveyResponses["gender"] | "";
  ageRange: OnboardingSurveyResponses["age_range"] | "";
  country: string;
};

const STEPS: Step[] = [
  "birth",
  "challenge",
  "hopes",
  "self_description",
  "details",
];

export function OnboardingForm() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    displayName: "",
    timezone: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
    challenge: "",
    hopes: "",
    selfDescription: "",
    gender: "",
    ageRange: "",
    country: "",
  });

  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setForm((current) =>
      current.timezone ? current : { ...current, timezone: detected },
    );
  }, []);

  const step = STEPS[stepIndex];

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleCountryChange(country: string) {
    updateField("country", country);
    const hint = COUNTRY_TIMEZONE_HINTS[country];
    if (hint) {
      updateField("timezone", hint);
    }
  }

  function validateCurrentStep(): string | null {
    switch (step) {
      case "birth":
        if (!form.birthDate) return "Birth date is required.";
        if (!form.timezone.trim()) return "Timezone is required.";
        return null;
      case "challenge":
        if (!form.challenge.trim()) return "Please answer in your own words.";
        return null;
      case "hopes":
        if (!form.hopes.trim()) return "Please answer in your own words.";
        return null;
      case "self_description":
        if (!form.selfDescription.trim()) return "Please answer in your own words.";
        return null;
      case "details":
        if (!form.gender) return "Please select an option.";
        if (!form.ageRange) return "Please select an age range.";
        if (!form.country) return "Please select a country.";
        return null;
      default:
        return null;
    }
  }

  function goNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStepIndex((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function goBack() {
    setError(null);
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  async function handleSubmit() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/onboarding/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: form.displayName.trim() || undefined,
          timezone: form.timezone.trim(),
          birth_date: form.birthDate,
          birth_time: form.birthTime.trim() || null,
          birth_location: form.birthLocation.trim() || null,
          responses: {
            challenge: form.challenge.trim(),
            hopes: form.hopes.trim(),
            self_description: form.selfDescription.trim(),
            gender: form.gender,
            age_range: form.ageRange,
            country: form.country,
          },
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/journal");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-10">
      {step === "birth" ? (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance">
              A few details for personalisation
            </h1>
            <p className="text-muted-foreground text-pretty leading-7">
              Your birth date helps Vallna calibrate insight to you. Birth time
              is optional — it improves personalisation.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="displayName">What should we call you?</Label>
              <Input
                id="displayName"
                value={form.displayName}
                onChange={(event) =>
                  updateField("displayName", event.target.value)
                }
                autoComplete="name"
                placeholder="Your first name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="birthDate">Birth date</Label>
              <Input
                id="birthDate"
                type="date"
                value={form.birthDate}
                onChange={(event) =>
                  updateField("birthDate", event.target.value)
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="birthTime">
                Birth time{" "}
                <span className="text-muted-foreground font-normal">
                  (optional — improves personalisation)
                </span>
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={form.birthTime}
                onChange={(event) =>
                  updateField("birthTime", event.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="birthLocation">
                Birth location{" "}
                <span className="text-muted-foreground font-normal">
                  (optional)
                </span>
              </Label>
              <Input
                id="birthLocation"
                value={form.birthLocation}
                onChange={(event) =>
                  updateField("birthLocation", event.target.value)
                }
                placeholder="City, country"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={form.timezone}
                onChange={(event) =>
                  updateField("timezone", event.target.value)
                }
                placeholder="Europe/London"
                required
              />
            </div>
          </div>
        </section>
      ) : null}

      {step === "challenge" ? (
        <QuestionScreen
          question={ONBOARDING_QUESTIONS.challenge.label}
          placeholder={ONBOARDING_QUESTIONS.challenge.placeholder}
          value={form.challenge}
          onChange={(value) => updateField("challenge", value)}
        />
      ) : null}

      {step === "hopes" ? (
        <QuestionScreen
          question={ONBOARDING_QUESTIONS.hopes.label}
          placeholder={ONBOARDING_QUESTIONS.hopes.placeholder}
          value={form.hopes}
          onChange={(value) => updateField("hopes", value)}
        />
      ) : null}

      {step === "self_description" ? (
        <QuestionScreen
          question={ONBOARDING_QUESTIONS.self_description.label}
          placeholder={ONBOARDING_QUESTIONS.self_description.placeholder}
          value={form.selfDescription}
          onChange={(value) => updateField("selfDescription", value)}
        />
      ) : null}

      {step === "details" ? (
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              A few quick details
            </h1>
            <p className="text-muted-foreground leading-7">
              This helps us understand who is using Vallna. It does not change
              how insight is delivered to you.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <FieldSelect
              label="Gender"
              value={form.gender}
              onValueChange={(value) =>
                updateField("gender", value as FormState["gender"])
              }
              options={GENDER_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              placeholder="Select"
            />

            <FieldSelect
              label="Age"
              value={form.ageRange}
              onValueChange={(value) =>
                updateField("ageRange", value as FormState["ageRange"])
              }
              options={AGE_RANGE_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              placeholder="Select age range"
            />

            <FieldSelect
              label="Country of residence"
              value={form.country}
              onValueChange={handleCountryChange}
              options={COUNTRY_OPTIONS.map((country) => ({
                value: country,
                label: country,
              }))}
              placeholder="Select country"
            />
          </div>
        </section>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        {stepIndex > 0 ? (
          <Button type="button" variant="outline" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {step === "details" ? (
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Saving…" : "Continue"}
          </Button>
        ) : (
          <Button type="button" onClick={goNext}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}

function QuestionScreen({
  question,
  placeholder,
  value,
  onChange,
}: {
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="flex min-h-[50vh] flex-col justify-center gap-8">
      <h1 className="text-3xl font-semibold tracking-tight text-balance leading-tight">
        {question}
      </h1>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-40 resize-none border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
      />
    </section>
  );
}

function FieldSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Select
        value={value || null}
        onValueChange={(next) => {
          if (next) onValueChange(next);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
