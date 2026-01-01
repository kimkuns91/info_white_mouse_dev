import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { LogoIcon } from "@/components/icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <LogoIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tighter block">
                  InfoMouse
                </span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
                  WhiteMouse Hub
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-base font-medium leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-white/30 mb-4">
              도구
            </h3>
            <ul className="space-y-3">
              {footerNav.tools.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.disabled ? "#" : item.href}
                    className={`text-base font-semibold transition-colors ${
                      item.disabled
                        ? "text-white/30 cursor-not-allowed"
                        : "text-white/60 hover:text-white"
                    }`}
                    aria-disabled={item.disabled}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-widest text-white/30 mb-4">
              정보
            </h3>
            <ul className="space-y-3">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base font-semibold text-white/60 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-sm text-white/40 font-medium">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-sm text-white/40 font-medium">
              사업자등록번호: {siteConfig.business.registrationNumber}
            </p>
          </div>
          <p className="text-sm text-white/40 font-medium">
            정확한 정보는 관할 기관에 문의하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
