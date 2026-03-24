import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/tanstack-query-provider";
// import ThemeRegistry from "@/providers/theme-registry";
import { Toaster } from "sonner";
// import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/sections/navbar";
// import Navbar from "@/components/sections/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediCore",
  description: "Healthcare App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">


      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <QueryProvider>
          <Navbar/>
          {children}
          <Toaster position="top-center"
            //   theme="dark"
            richColors
            duration={3000} />
            <Footer/>
        </QueryProvider>
        
      </body>
    </html>
  );
}