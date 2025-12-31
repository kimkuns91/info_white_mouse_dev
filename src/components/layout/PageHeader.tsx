"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="pt-8 pb-8 md:pt-12 md:pb-12 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-black uppercase tracking-widest text-text/60 bg-text/5 rounded-full"
            >
              {badge}
            </motion.span>
          )}
          <h1 className="text-4xl md:text-5xl font-black text-text tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-text/60 font-semibold leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
