import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JSON Struct - Build JSON Structures Effortlessly",
  description:
    "JSON Struct is a powerful tool for creating JSON schemas, generating AI response prompts, and exporting structured data in JSON, YAML, or Markdown formats.",
  metadataBase: new URL("https://jsonstruct.com"),
  keywords: [
    "airesponsejson",
    "jsonresponse",
    "jsonstruct",
    "buildyourjson",
    "json",
  ],
  openGraph: {
    url: "https://www.jsonstruct.com",
    title: "JSON Struct - Build JSON Structures Effortlessly",
    description:
      "Define JSON schemas, generate AI prompts, and export structured data easily with JSON Struct.",
    siteName: "JSON Struct",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
