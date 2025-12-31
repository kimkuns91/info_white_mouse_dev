"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { tools } from "@/config/tools";
import { toolIcons, ChevronRightIcon } from "@/components/icons";
import { WebSiteJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />

      <Container className="mt-8 md:mt-16">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-[2px] bg-text/20"
                />
                <span className="text-sm font-black text-text/40 uppercase tracking-[0.4em]">
                  Knowledge & Hub
                </span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl font-black text-text leading-[1.1] max-w-4xl tracking-tight"
              >
                {siteConfig.description.split(",")[0]},
                <br />
                {siteConfig.description.split(",")[1]}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 text-text/60 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed"
              >
                방대한 데이터와 최신 규정을 분석하여 일상에 꼭 필요한 지식을{" "}
                <br className="hidden md:block" /> 가장 직관적인 형태로 전달합니다.
              </motion.p>
            </motion.div>

            {/* Tools Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {tools.map((tool) => {
                const IconComponent = toolIcons[tool.icon];
                const isActive = tool.status === "active";

                return (
                  <motion.div key={tool.id} variants={itemVariants}>
                    <Link href={isActive ? tool.href : "#"}>
                      <motion.div
                        whileHover={isActive ? { y: -4, scale: 1.01 } : {}}
                        whileTap={isActive ? { scale: 0.98 } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Card
                          className={`rounded-[2rem] border-text/5 shadow-sm hover:shadow-xl transition-shadow duration-300 group ${
                            !isActive ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                              <motion.div
                                whileHover={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                                transition={{ duration: 0.5 }}
                                className={`p-4 rounded-2xl ${
                                  isActive
                                    ? "bg-text text-white"
                                    : "bg-surface text-text/40"
                                }`}
                              >
                                <IconComponent className="w-8 h-8" />
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-black text-text">
                                    {tool.title}
                                  </h3>
                                  {!isActive && (
                                    <span className="text-[10px] font-black text-text/30 uppercase tracking-widest bg-surface px-3 py-1 rounded-full">
                                      Coming Soon
                                    </span>
                                  )}
                                </div>
                                <p className="text-text/50 font-medium">
                                  {tool.description}
                                </p>
                              </div>
                              {isActive && (
                                <motion.div
                                  initial={{ x: 0 }}
                                  whileHover={{ x: 4 }}
                                >
                                  <ChevronRightIcon className="w-6 h-6 text-text/20 group-hover:text-text transition-colors" />
                                </motion.div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="mt-12 rounded-[2.5rem] border-text/5 shadow-sm">
                <CardContent className="p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
                    />
                    <h4 className="text-sm font-black text-text/30 uppercase tracking-[0.25em]">
                      정확도 안내 및 레퍼런스
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-10 text-base text-text/50 leading-relaxed font-semibold">
                    <p>
                      인포마우스의 모든 데이터와 계산 도구는 국가법령정보센터 및 유관
                      기관의 최신 고시 사항을 정기적으로 모니터링하여 정밀하게
                      반영합니다.
                    </p>
                    <p>
                      산출된 결과값은 참고용 시뮬레이션이며, 실제 행정 처리 시에는
                      담당 기관이나 전문가의 확인을 거치시는 것을 권장드립니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Container>
    </>
  );
}
