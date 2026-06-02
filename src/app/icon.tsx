import { ImageResponse } from "next/og";

import { renderPwaIcon } from "@/lib/pwa/icon-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(renderPwaIcon(32, true), size);
}
