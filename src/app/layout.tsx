import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Geek General Portfolio",
  description: "Portfolio of a Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
