import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', weight: ['400', '500'] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space-grotesk', weight: ['400', '500', '700'] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono', weight: ['400'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://saksham-mogha.onrender.com'),
  title: "Saksham Mogha | Google Play Developer",
  description: "Official developer portal for Saksham Mogha. App updates, releases, support, and roadmap — direct from the developer.",
  openGraph: {
    title: "SAKSHAM.DEV — Official Developer Hub",
    description: "App updates, changelogs, and notices by Saksham Mogha.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "https://saksham-mogha.onrender.com/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
