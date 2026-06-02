import * as Astronomy from "astronomy-engine";
import { fromZonedTime } from "date-fns-tz";

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

const TROPICAL_SUN_SIGN_RANGES: Array<{
  sign: ZodiacSign;
  start: [month: number, day: number];
  end: [month: number, day: number];
}> = [
  { sign: "Capricorn", start: [12, 22], end: [1, 19] },
  { sign: "Aquarius", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", start: [2, 19], end: [3, 20] },
  { sign: "Aries", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", start: [6, 21], end: [7, 22] },
  { sign: "Leo", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", start: [8, 23], end: [9, 22] },
  { sign: "Libra", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
];

function isDateInRange(
  month: number,
  day: number,
  start: [number, number],
  end: [number, number],
): boolean {
  const [startMonth, startDay] = start;
  const [endMonth, endDay] = end;

  if (startMonth === endMonth) {
    return month === startMonth && day >= startDay && day <= endDay;
  }

  if (startMonth > endMonth) {
    return (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    );
  }

  return (
    (month === startMonth && day >= startDay) ||
    (month > startMonth && month < endMonth) ||
    (month === endMonth && day <= endDay)
  );
}

export function computeSunSign(birthDate: string): ZodiacSign {
  const [year, month, day] = birthDate.split("-").map(Number);
  for (const range of TROPICAL_SUN_SIGN_RANGES) {
    if (isDateInRange(month, day, range.start, range.end)) {
      return range.sign;
    }
  }
  return "Capricorn";
}

function longitudeToSign(longitude: number): ZodiacSign {
  const normalized = ((longitude % 360) + 360) % 360;
  const index = Math.floor(normalized / 30);
  return ZODIAC_SIGNS[index];
}

function eclipticLongitude(body: Astronomy.Body, time: Astronomy.AstroTime): number {
  const vector = Astronomy.GeoVector(body, time, true);
  return Astronomy.Ecliptic(vector).elon;
}

/** Moon sign from birth date/time in the user's timezone (defaults to noon). */
export function computeMoonSign(
  birthDate: string,
  timezone: string,
  birthTime?: string | null,
): ZodiacSign {
  const timePart = birthTime ?? "12:00";
  const utc = fromZonedTime(`${birthDate}T${timePart}:00`, timezone);
  const astroTime = Astronomy.MakeTime(utc);
  return longitudeToSign(eclipticLongitude(Astronomy.Body.Moon, astroTime));
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function normalizeDegrees(value: number): number {
  return ((value % 360) + 360) % 360;
}

/** Ascendant from birth datetime, latitude, and longitude (tropical). */
export function computeRisingSign(
  birthDate: string,
  birthTime: string,
  latitude: number,
  longitude: number,
  timezone: string,
): ZodiacSign {
  const localDateTime = fromZonedTime(`${birthDate}T${birthTime}:00`, timezone);
  const astroTime = Astronomy.MakeTime(localDateTime);

  const jd = astroTime.ut + 2451545.0;
  const t = (jd - 2451545.0) / 36525.0;
  const gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * t * t -
    (t * t * t) / 38710000.0;
  const lst = normalizeDegrees(gmst + longitude);
  const obliquity = 23.439291 - 0.0130042 * t;

  const lstRad = toRadians(lst);
  const latRad = toRadians(latitude);
  const obRad = toRadians(obliquity);

  const y = -Math.cos(lstRad);
  const x =
    Math.sin(lstRad) * Math.cos(obRad) + Math.tan(latRad) * Math.sin(obRad);
  const ascendant = normalizeDegrees(toDegrees(Math.atan2(y, x)));

  return longitudeToSign(ascendant);
}
