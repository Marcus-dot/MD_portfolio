import type { NextRequest } from "next/server";

/* Where the visitor is reading from, roughly: Vercel's edge adds city,
   country and coordinates from the IP to every request. This only echoes
   them back to the same visitor. Nothing is logged or stored here. */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const h = request.headers;
  const city = h.get("x-vercel-ip-city");
  const country = h.get("x-vercel-ip-country");
  const lat = Number(h.get("x-vercel-ip-latitude"));
  const lon = Number(h.get("x-vercel-ip-longitude"));
  const tz = h.get("x-vercel-ip-timezone");
  const body =
    country && Number.isFinite(lat) && Number.isFinite(lon)
      ? { city: city ? decodeURIComponent(city) : null, country, lat, lon, tz }
      : null;
  return Response.json(body, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
