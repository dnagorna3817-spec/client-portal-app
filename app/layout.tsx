import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AKC Client Portal — короткий гід",
  description: "Документи, запити та комунікація з командою АКЦ в одному застосунку."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06162f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
