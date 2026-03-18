import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breezy - AI Front Desk",
  description: "Never miss a call again. Let Breezy handle every customer inquiry.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">{children}</body>
    </html>
  );
}
