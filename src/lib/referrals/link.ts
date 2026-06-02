export function appBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function buildReferralLink(referrerUserId: string): string {
  const base = appBaseUrl().replace(/\/$/, "");
  return `${base}/signup?ref=${referrerUserId}`;
}
