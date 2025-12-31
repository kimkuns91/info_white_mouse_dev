"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { HomeIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <Container className="py-32 flex items-center justify-center min-h-[60vh]">
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
          className="inline-block mb-8"
        >
          <span className="text-9xl font-black text-text/10">404</span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-xl text-text/60 font-semibold mb-10 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-text text-white font-bold rounded-2xl shadow-xl shadow-text/20 hover:bg-text/90 transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </Link>
        </motion.div>
      </motion.div>
    </Container>
  );
}
