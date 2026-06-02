import { ImageResponse } from "next/og";

import { renderPwaIcon } from "@/lib/pwa/icon-image";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(renderPwaIcon(512), {
    width: 512,
    height: 512,
  });
}
