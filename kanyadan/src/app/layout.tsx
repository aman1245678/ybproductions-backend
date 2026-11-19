import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AASHIRWAAD WEDDINGS | India's Trusted Dowry-Free Matrimonial Platform",
  description:
    "A platform where dignity, equality and true relationships come first. Find your verified life partner, plan your wedding, and manage everything at one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F0FDF4] text-stone-900 flex flex-col min-h-screen selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
