export type GeocodeResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
};

type OpenMeteoGeocodeResponse = {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
  }>;
};

/** Resolve a city/country string to coordinates via Open-Meteo (no API key). */
export async function geocodeLocation(
  query: string,
): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", trimmed);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString(), {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as OpenMeteoGeocodeResponse;
  const match = data.results?.[0];
  if (!match) return null;

  return {
    name: match.country ? `${match.name}, ${match.country}` : match.name,
    latitude: match.latitude,
    longitude: match.longitude,
    country: match.country,
  };
}
