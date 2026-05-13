import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import { CartProvider } from "./components/cart-context";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-orbitron"
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani"
});

export const metadata: Metadata = {
  title: "NovaCheats | Gaming Store",
  description: "Premium gaming products and cheats by NovaCheats"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
