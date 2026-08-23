import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mutual Funds Dashboard",
  description: "Browse and compare mutual fund performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
