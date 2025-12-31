"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SideAd } from "@/components/ads/SideAd";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <div className="min-h-screen selection:bg-text selection:text-white flex flex-col">
      <Header />
      <SideAd position="left" />
      <SideAd position="right" />
      <main className="flex-1 pt-16 pb-20 md:pt-20 md:pb-30">{children}</main>
      <Footer />
    </div>
  );
}
