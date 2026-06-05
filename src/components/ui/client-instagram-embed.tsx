"use client";

import dynamic from "next/dynamic";

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  { ssr: false }
);

export function ClientInstagramEmbed({ url, width, captioned = true }: { url: string; width?: string | number; captioned?: boolean }) {
  return <InstagramEmbed url={url} width={width} captioned={captioned} />;
}
