"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SearchIcon } from "@/components/icons";
import { mainNav, NavItem } from "@/config/navigation";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 검색 대상 데이터 (네비게이션 + 추가 키워드)
const searchItems: (NavItem & { keywords?: string[] })[] = mainNav.map(
  (item) => ({
    ...item,
    keywords:
      item.href === "/salary"
        ? ["실수령액", "4대보험", "세금", "월급", "세후"]
        : item.href === "/salary-table"
          ? ["연봉표", "실수령액표", "월급표", "급여표"]
          : item.href === "/severance"
            ? ["퇴직", "퇴사", "정산"]
            : item.href === "/leave"
              ? ["휴가", "연차일수", "휴일"]
              : item.href === "/unemployment"
                ? ["실업", "고용보험", "구직급여"]
                : [],
  })
);

// 간단한 퍼지 매칭
function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // 포함 여부 체크
  if (lowerText.includes(lowerQuery)) return true;

  // 초성 검색은 복잡하므로 일단 스킵
  return false;
}

function searchFilter(query: string): (NavItem & { keywords?: string[] })[] {
  if (!query.trim()) return searchItems;

  return searchItems.filter((item) => {
    // 제목 매칭
    if (fuzzyMatch(item.title, query)) return true;
    // 설명 매칭
    if (item.description && fuzzyMatch(item.description, query)) return true;
    // 키워드 매칭
    if (item.keywords?.some((kw) => fuzzyMatch(kw, query))) return true;
    return false;
  });
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = searchFilter(query);

  // 모달 열릴 때 input focus
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // 선택 인덱스 보정
  useEffect(() => {
    if (selectedIndex >= results.length) {
      setSelectedIndex(Math.max(0, results.length - 1));
    }
  }, [results.length, selectedIndex]);

  const handleSelect = useCallback(
    (item: NavItem) => {
      if (item.disabled) return;
      onClose();
      router.push(item.href);
    },
    [onClose, router]
  );

  // 키보드 네비게이션
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex(
            (prev) => (prev - 1 + results.length) % results.length
          );
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    },
    [results, selectedIndex, handleSelect, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg"
          >
            <div className="mx-4 bg-surface rounded-2xl shadow-2xl border border-text/10 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-text/10">
                <SearchIcon className="w-5 h-5 text-text/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="검색어를 입력하세요..."
                  className="flex-1 bg-transparent text-text placeholder:text-text/40 outline-none text-base"
                />
                <kbd className="hidden sm:block px-2 py-1 text-xs font-semibold text-text/40 bg-text/5 rounded-lg">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-text/40">
                    검색 결과가 없습니다
                  </div>
                ) : (
                  <ul className="py-2">
                    {results.map((item, index) => (
                      <li key={item.href}>
                        <button
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          disabled={item.disabled}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                            selectedIndex === index
                              ? "bg-text/5"
                              : "hover:bg-text/5"
                          } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex-1">
                            <div className="font-semibold text-text">
                              {item.title}
                              {item.disabled && (
                                <span className="ml-2 text-xs text-text/40">
                                  (준비중)
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <div className="text-sm text-text/50 mt-0.5">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {selectedIndex === index && !item.disabled && (
                            <kbd className="px-2 py-1 text-xs font-semibold text-text/40 bg-text/5 rounded-lg">
                              Enter
                            </kbd>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-text/10 flex items-center gap-4 text-xs text-text/40">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-text/5 rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-text/5 rounded">↓</kbd>
                  이동
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-text/5 rounded">Enter</kbd>
                  선택
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
