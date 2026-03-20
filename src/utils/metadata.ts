// src/utils/metadata.ts
import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "FitQuest - Level Up Your Life",
}: MetadataProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s - FitQuest`,
    },
  };
}
