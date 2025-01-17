import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600"], // Include the weights you need
});

export const metadata = {
  title: "Paresh Novelty – Where Elegance Meets Affordability",
  description: "Explore a wide range of bindis, bangles, and elegant novelties.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <Toaster />
        <NextUIProvider>
          {children}
        </NextUIProvider>

      </body>
    </html>
  );
}
