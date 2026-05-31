import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "VXA – AI Automation for Real Estate Agencies in South Africa",
  description:
    "VXA automates lead follow-up, listing descriptions, review requests and weekly reports for real estate agencies in Cape Town, Johannesburg and Durban.",
  keywords: [
    "real estate automation South Africa",
    "AI property agency",
    "PropTech SA",
    "WhatsApp bot real estate",
  ],
  metadataBase: new URL("https://vxa.agency"),
  openGraph: {
    title: "VXA – AI Automation for Real Estate",
    description:
      "Every lead answered. Every listing ready. Zero extra hours. Built for South African property agencies.",
    url: "https://vxa.agency",
    siteName: "VXA",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
