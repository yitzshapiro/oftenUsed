// src/app/layout.tsx
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Often Used",
  description: "A resource for often-used claims and sourced rebuttals",
  metadataBase: new URL('https://oftenused.com'),
  openGraph: {
    title: "Often Used",
    description: "A resource for quickly linking to claims and sourced rebuttals.",
    url: "https://oftenused.com",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Often Used",
    description: "A resource for quickly linking to claims and sourced rebuttals.",
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}