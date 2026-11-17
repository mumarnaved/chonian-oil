import type { Metadata } from "next";
import "@fontsource-variable/parkinsans";
import "@fontsource-variable/sora";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Organic Onion & Mustard Hair Oil | Sister company by Chonions",
  description:
    "Homemade, fully natural hair oil made from organic onion and mustard — the same oil used to make Chonions onion crisps. Order online with Cash on Delivery across Pakistan.",
  openGraph: {
    title: "Organic Onion & Mustard Hair Oil — by Chonions",
    description: "The same homemade oil behind Chonions crisps, now bottled for your hair.",
    images: ["/images/bottle.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
