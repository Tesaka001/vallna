import { addDays, format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import { DATE_PATTERN } from "./constants";

export function todayInTimezone(timezone: string): string {
  return formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
}

export function isValidDateString(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = parseISO(value);
  return !Number.isNaN(parsed.getTime()) && format(parsed, "yyyy-MM-dd") === value;
}

export function shiftDate(date: string, days: number): string {
  return format(addDays(parseISO(date), days), "yyyy-MM-dd");
}

export function formatDisplayDate(date: string): string {
  return format(parseISO(date), "EEEE, d MMMM yyyy");
}

export function formatEntryTime(isoTimestamp: string, timezone: string): string {
  return formatInTimeZone(new Date(isoTimestamp), timezone, "HH:mm");
}
