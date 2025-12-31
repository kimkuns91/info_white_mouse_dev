"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-[#F0EFEC]">
        <Container className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-100 flex items-center justify-center"
            >
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight mb-4">
              오류가 발생했습니다
            </h1>
            <p className="text-xl text-[#1E293B]/60 font-semibold mb-10 max-w-md mx-auto">
              죄송합니다. 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={reset}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E293B] text-white font-bold rounded-2xl shadow-xl shadow-[#1E293B]/20 hover:bg-[#1E293B]/90 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>다시 시도</span>
            </motion.button>
          </motion.div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
