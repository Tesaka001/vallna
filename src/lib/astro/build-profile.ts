import { computeDreamspellSignature } from "./dreamspell";
import { geocodeLocation } from "./geocode";
import {
  computeMoonSign,
  computeRisingSign,
  computeSunSign,
  type ZodiacSign,
} from "./western";

export type OnboardingSurveyResponses = {
  challenge: string;
  hopes: string;
  self_description: string;
  gender: "woman" | "man" | "non_binary" | "prefer_not_to_say";
  age_range: "18-24" | "25-34" | "35-44" | "45-54" | "55+";
  country: string;
};

export type BirthDataInput = {
  birthDate: string;
  birthTime?: string | null;
  birthLocation?: string | null;
  timezone: string;
};

export type ComputedAstroProfile = {
  birth_date: string;
  birth_time: string | null;
  birth_location: string | null;
  birth_lat: number | null;
  birth_lng: number | null;
  sun_sign: string;
  moon_sign: string;
  rising_sign: string | null;
  dreamspell_kin: number;
  dreamspell_seal: string;
  dreamspell_tone: number;
  dreamspell_wavespell: string;
  profile_json: Record<string, unknown>;
  computed_at: string;
};

export async function computeAstroProfile(
  input: BirthDataInput,
): Promise<ComputedAstroProfile> {
  const birthDate = input.birthDate;
  const birthTime = input.birthTime?.trim() || null;
  const birthLocation = input.birthLocation?.trim() || null;

  let birthLat: number | null = null;
  let birthLng: number | null = null;
  let resolvedLocation: string | null = birthLocation;

  if (birthLocation) {
    const geocoded = await geocodeLocation(birthLocation);
    if (geocoded) {
      birthLat = geocoded.latitude;
      birthLng = geocoded.longitude;
      resolvedLocation = geocoded.name;
    }
  }

  const [year, month, day] = birthDate.split("-").map(Number);
  const birthDateUtc = new Date(Date.UTC(year, month - 1, day));

  const sunSign = computeSunSign(birthDate);
  const moonSign = computeMoonSign(birthDate, input.timezone, birthTime);

  let risingSign: ZodiacSign | null = null;
  if (birthTime && birthLat !== null && birthLng !== null) {
    risingSign = computeRisingSign(
      birthDate,
      birthTime,
      birthLat,
      birthLng,
      input.timezone,
    );
  }

  const dreamspell = computeDreamspellSignature(birthDateUtc);
  const computedAt = new Date().toISOString();

  const profileJson = {
    version: "1.0",
    computed_at: computedAt,
    birth_data: {
      date: birthDate,
      time: birthTime,
      location: resolvedLocation,
      latitude: birthLat,
      longitude: birthLng,
      timezone: input.timezone,
    },
    galactic_signature: {
      kin: dreamspell.kin,
      seal: {
        number: dreamspell.seal.number,
        name: dreamspell.seal.name,
        colour: dreamspell.seal.colour,
        power: dreamspell.seal.power,
        action: dreamspell.seal.action,
        essence: dreamspell.seal.essence,
        layer1: dreamspell.seal.layer1,
      },
      tone: {
        number: dreamspell.tone.number,
        name: dreamspell.tone.name,
        power: dreamspell.tone.power,
        action: dreamspell.tone.action,
        essence: dreamspell.tone.essence,
        layer1: dreamspell.tone.layer1,
      },
      wavespell: {
        name: dreamspell.wavespell.name,
        position: dreamspell.wavespell.position,
        theme: dreamspell.wavespell.theme,
      },
    },
    western: {
      sun_sign: sunSign,
      moon_sign: moonSign,
      rising_sign: risingSign,
      houses: null,
      aspects: null,
    },
    active_layer: 1,
    user_journey_day: 1,
  };

  return {
    birth_date: birthDate,
    birth_time: birthTime,
    birth_location: resolvedLocation,
    birth_lat: birthLat,
    birth_lng: birthLng,
    sun_sign: sunSign,
    moon_sign: moonSign,
    rising_sign: risingSign,
    dreamspell_kin: dreamspell.kin,
    dreamspell_seal: dreamspell.seal.name,
    dreamspell_tone: dreamspell.tone.number,
    dreamspell_wavespell: dreamspell.wavespell.name,
    profile_json: profileJson,
    computed_at: computedAt,
  };
}
