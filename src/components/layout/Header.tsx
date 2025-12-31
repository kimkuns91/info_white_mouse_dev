"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { mainNav } from "@/config/navigation";
import { LogoIcon, SearchIcon, MenuIcon } from "@/components/icons";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F0EFEC]/80 backdrop-blur-xl border-b border-[#1E293B]/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-[#1E293B] rounded-2xl flex items-center justify-center shadow-xl"
          >
            <LogoIcon className="w-7 h-7 text-[#F0EFEC]" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-[#1E293B] tracking-tighter leading-none">
              InfoMouse
            </h1>
            <span className="text-[10px] font-black text-[#1E293B]/40 uppercase tracking-[0.3em] mt-1 block">
              WhiteMouse Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {mainNav.slice(1, 4).map((item) => (
            <Link
              key={item.href}
              href={item.disabled ? "#" : item.href}
              className={`text-base font-bold transition-colors ${
                item.disabled
                  ? "text-[#1E293B]/30 cursor-not-allowed"
                  : "text-[#1E293B]/60 hover:text-[#1E293B]"
              }`}
              aria-disabled={item.disabled}
            >
              {item.title}
              {item.disabled && (
                <span className="ml-1 text-xs text-[#1E293B]/30">(준비중)</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B]/5 hover:bg-[#1E293B]/10 transition-colors"
            aria-label="검색"
          >
            <SearchIcon className="w-4 h-4 text-[#1E293B]/60" />
            <span className="text-sm font-semibold text-[#1E293B]/60">검색</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#1E293B]/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon className="w-6 h-6 text-[#1E293B]" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-[#1E293B]/5 bg-[#F0EFEC]"
        >
          <nav className="flex flex-col p-4 gap-2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  item.disabled
                    ? "text-[#1E293B]/30 cursor-not-allowed"
                    : "text-[#1E293B]/60 hover:text-[#1E293B] hover:bg-[#1E293B]/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-disabled={item.disabled}
              >
                {item.title}
                {item.disabled && (
                  <span className="ml-2 text-xs text-[#1E293B]/30">(준비중)</span>
                )}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
