// src/app/claim/[id]/page.tsx
import { notFound } from "next/navigation";
import { getAllData } from "../../../utils/getData";
import ClaimCard from "../../../components/ClaimCard";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = getAllData();
  const id = parseInt(resolvedParams.id, 10);

  if (isNaN(id) || !data.claims_and_rebuttals[id]) {
    notFound();
  }

  const { claim, rebuttal, sources } = data.claims_and_rebuttals[id];

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <ClaimCard 
        claim={claim} 
        rebuttal={rebuttal} 
        id={id} 
        sources={sources}
      />
      <Link href="/" className="mt-4 text-warm-accent hover:underline">
        Back to Home
      </Link>
    </div>
  );
}