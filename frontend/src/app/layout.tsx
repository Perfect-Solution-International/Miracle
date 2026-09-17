import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Suspense } from "react";

import { APP_CONFIG } from "@/config/app";
import { RootProvider, getSessionPromise } from "@/providers/root-provider";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * `title.template` applies to every page that sets a plain string title, so
 * pages declare only their own name and the brand suffix is added once here.
 */
export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.url),
  title: {
    default: `${APP_CONFIG.name} | Integrated Global Trade & Business Solutions`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  openGraph: {
    type: "website",
    siteName: APP_CONFIG.name,
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    url: APP_CONFIG.url,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Started, not awaited: awaiting the session here would read `cookies()` at
  // the top of the root layout and force every route, including the public
  // marketing pages, to render dynamically.
  const sessionPromise = getSessionPromise();

  return (
    <html lang={APP_CONFIG.locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Lets keyboard users jump past the sidebar and header. */}
        <a
          href="#main-content"
          className="bg-background focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2"
        >
          Skip to main content
        </a>
        {/* The session is resolved inside this boundary, so the rest of the
            page can stream while it settles. */}
        <Suspense fallback={null}>
          <RootProvider user={sessionPromise}>{children}</RootProvider>
        </Suspense>
      </body>
    </html>
  );
}
