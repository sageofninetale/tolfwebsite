import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tolf : Simplifying Global Trade | UK Freight Forwarding",
  description:
    "Tolf is a UK-based freight forwarding company specialising in air freight, sea freight, road freight, warehousing, customs clearance, and door-to-door delivery solutions for businesses worldwide.",
  keywords:
    "freight forwarding UK, air freight, sea freight, road freight, customs clearance, warehousing, logistics, supply chain",
  openGraph: {
    title: "Tolf : Simplifying Global Trade",
    description:
      "UK freight forwarding specialists. Air, Sea, Road, Warehousing, Customs Clearance and more.",
    url: "https://tolf.com",
    siteName: "Tolf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tolf : Simplifying Global Trade",
    description: "UK freight forwarding. End-to-end logistics solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
