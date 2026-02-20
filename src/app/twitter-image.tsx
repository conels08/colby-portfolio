import { ImageResponse } from "next/og";
import {
  renderPremiumSocialCard,
  socialImageContentType,
  socialImageSize,
} from "./_socialCard";

export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function TwitterImage() {
  return new ImageResponse(renderPremiumSocialCard(), {
    ...size,
  });
}
