"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SideAdProps {
  position: "left" | "right";
}

// 광고 설정 - 추후 Google AdSense로 교체 시 이 부분만 수정
const adConfig = {
  // 현재는 자사 광고 배너 사용
  type: "custom" as const, // 'custom' | 'adsense'
  // 자사 광고 설정 (좌/우 개별 설정)
  custom: {
    left: {
      imageUrl: "/ads/side-banner-01.jpg", // 왼쪽 광고 이미지
      linkUrl:
        "https://smartstore.naver.com/lyncare?NaPm=ct%3Dmjtnw541%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Ddb849a5340dcbf50f823933fe79d057bf6bea568",
      alt: "LynCare 스마트스토어",
    },
    right: {
      imageUrl: "/ads/side-banner-02.jpg", // 오른쪽 광고 이미지
      linkUrl:
        "https://smartstore.naver.com/lyncare?NaPm=ct%3Dmjtnw541%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Ddb849a5340dcbf50f823933fe79d057bf6bea568",
      alt: "LynCare 스마트스토어",
    },
  },
  // Google AdSense 설정 (추후 사용)
  adsense: {
    adSlot: "", // AdSense 슬롯 ID
    adClient: "", // AdSense 클라이언트 ID
  },
};

// 레이아웃 설정
const HEADER_HEIGHT = 80; // 헤더 높이 (px)
const FOOTER_OFFSET = 200; // 푸터 도달 전 사라지는 거리 (px)

export function SideAd({ position }: SideAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasImage, setHasImage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 헤더 아래부터 표시
      const passedHeader = scrollY > HEADER_HEIGHT;

      // 푸터 근처에서 숨김
      const nearFooter =
        scrollY + windowHeight > documentHeight - FOOTER_OFFSET;

      setIsVisible(passedHeader && !nearFooter);
    };

    // 초기 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 자사 광고 렌더링
  if (adConfig.type === "custom") {
    const currentAd = adConfig.custom[position];

    return (
      <div
        className={`hidden xl:block fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
          position === "left" ? "left-4" : "right-4"
        } ${
          isVisible
            ? "opacity-100 translate-x-0"
            : position === "left"
            ? "opacity-0 -translate-x-4"
            : "opacity-0 translate-x-4"
        }`}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <Link
          href={currentAd.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="w-[120px] bg-white rounded-2xl shadow-lg border border-text/5 overflow-hidden hover:shadow-xl transition-shadow">
            {hasImage ? (
              <Image
                src={currentAd.imageUrl}
                alt={currentAd.alt}
                width={120}
                height={600}
                className="w-full h-auto"
                onError={() => setHasImage(false)}
              />
            ) : (
              <div className="aspect-[120/600] bg-surface flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-text/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-text/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold text-text/40 uppercase tracking-wider">
                    AD Space
                  </p>
                </div>
              </div>
            )}
          </div>
        </Link>
        <p className="text-[9px] text-text/30 text-center mt-2 font-medium">
          광고
        </p>
      </div>
    );
  }

  // Google AdSense 렌더링 (추후 사용)
  // if (adConfig.type === "adsense") {
  //   return (
  //     <div
  //       className={`hidden xl:block fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${
  //         position === "left" ? "left-4" : "right-4"
  //       } ${
  //         isVisible
  //           ? "opacity-100 translate-x-0"
  //           : position === "left"
  //           ? "opacity-0 -translate-x-4"
  //           : "opacity-0 translate-x-4"
  //       }`}
  //       style={{ pointerEvents: isVisible ? "auto" : "none" }}
  //     >
  //       <ins
  //         className="adsbygoogle"
  //         style={{ display: "block", width: "120px", height: "600px" }}
  //         data-ad-client={adConfig.adsense.adClient}
  //         data-ad-slot={adConfig.adsense.adSlot}
  //       />
  //     </div>
  //   );
  // }

  return null;
}
