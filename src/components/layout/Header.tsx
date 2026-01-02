"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { mainNav } from "@/config/navigation";
import { LogoIcon, SearchIcon, MenuIcon } from "@/components/icons";
import { useState } from "react";
import { SearchModal } from "@/components/search/SearchModal";
import { useSearchModal } from "@/hooks/useSearchModal";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isOpen: isSearchOpen, open: openSearch, close: closeSearch } = useSearchModal();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-text/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-text rounded-2xl flex items-center justify-center shadow-xl"
          >
            <LogoIcon className="w-7 h-7 text-surface" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-black text-text tracking-tighter leading-none">
              InfoMouse
            </h1>
            <span className="text-[10px] font-black text-text/40 uppercase tracking-[0.3em] mt-1 block">
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
                  ? "text-text/30 cursor-not-allowed"
                  : "text-text/60 hover:text-text"
              }`}
              aria-disabled={item.disabled}
            >
              {item.title}
              {item.disabled && (
                <span className="ml-1 text-xs text-text/30">(준비중)</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openSearch}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-text/5 hover:bg-text/10 transition-colors"
            aria-label="검색"
          >
            <SearchIcon className="w-4 h-4 text-text/60" />
            <span className="text-sm font-semibold text-text/60">검색</span>
            <kbd className="ml-1 px-1.5 py-0.5 text-xs font-semibold text-text/40 bg-text/10 rounded">
              ⌘K
            </kbd>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-text/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <MenuIcon className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-text/5 bg-surface"
        >
          <nav className="flex flex-col p-4 gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSearch();
              }}
              className="px-4 py-3 rounded-xl text-base font-bold text-text/60 hover:text-text hover:bg-text/5 transition-colors flex items-center gap-2"
            >
              <SearchIcon className="w-4 h-4" />
              검색
            </button>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                className={`px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  item.disabled
                    ? "text-text/30 cursor-not-allowed"
                    : "text-text/60 hover:text-text hover:bg-text/5"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-disabled={item.disabled}
              >
                {item.title}
                {item.disabled && (
                  <span className="ml-2 text-xs text-text/30">(준비중)</span>
                )}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </motion.header>
  );
}
