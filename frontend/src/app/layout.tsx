import type { Metadata } from "next";
import ThemeToggle from "../components/ThemeToggle";
import CartButton from "../components/CartButton";
import CartDrawer from "../components/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "DropTech | Dropshipping Studio",
  description: "Minimalist high-end tech gadgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-[#0a0a0a] dark:text-gray-100 min-h-screen flex flex-col font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
        <header className="border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
              DropTech.
            </a>
            <nav className="flex space-x-8 text-sm font-medium text-gray-500 dark:text-gray-400">
              <a href="/" className="hover:text-black dark:hover:text-white transition-colors">Shop</a>
              <a href="/" className="hover:text-black dark:hover:text-white transition-colors">Collections</a>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <CartButton />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer className="py-12 mt-auto text-center text-sm font-medium text-gray-400 dark:text-gray-600 border-t border-gray-100 dark:border-neutral-900 bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
          &copy; {new Date().getFullYear()} DropTech. All rights reserved.
        </footer>
        
        <CartDrawer />
      </body>
    </html>
  );
}
