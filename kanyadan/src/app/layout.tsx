import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AASHIRWAAD WEDDINGS | Rishte Honge. Dahej Nahin.",
  description:
    "A platform where dignity, equality and true relationships come first. Find your life partner, plan your wedding, and manage everything at one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0108] text-stone-100 flex flex-col min-h-screen font-helvetica selection:bg-amber-500 selection:text-black">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
