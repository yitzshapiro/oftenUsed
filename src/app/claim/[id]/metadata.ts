// src/app/claim/[id]/metadata.ts
import { Metadata } from "next";
import { getAllData } from "../../../utils/getData";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getAllData();
  const id = parseInt(params.id, 10);

  if (isNaN(id) || !data.claims_and_rebuttals[id]) {
    return {
      title: "Claim Not Found",
      description: "No claim found for this ID.",
    };
  }

  const { claim, rebuttal } = data.claims_and_rebuttals[id];
  const pageTitle = `Often Used: ${claim}`;
  const pageDescription = `Rebuttal: ${rebuttal}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://oftenused.com/claim/${id}`,
      images: "/og-image.png",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: "/og-image.png",
    },
  };
}