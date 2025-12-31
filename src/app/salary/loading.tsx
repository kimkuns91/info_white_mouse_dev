import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export default function SalaryLoading() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-[#F0EFEC]">
        <Container>
          {/* Page Header Skeleton */}
          <div className="pt-8 pb-16">
            <div className="max-w-3xl">
              <div className="h-6 w-24 bg-[#1E293B]/10 rounded-full mb-6 animate-pulse"></div>
              <div className="h-12 w-80 bg-[#1E293B]/10 rounded-xl mb-4 animate-pulse"></div>
              <div className="h-6 w-96 bg-[#1E293B]/10 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Calculator Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-4 space-y-10">
              <div className="bg-white rounded-[2.5rem] p-8 animate-pulse">
                <div className="space-y-6">
                  <div className="h-6 w-32 bg-[#1E293B]/10 rounded-lg"></div>
                  <div className="h-14 w-full bg-[#1E293B]/10 rounded-xl"></div>
                  <div className="h-14 w-full bg-[#1E293B]/10 rounded-xl"></div>
                  <div className="h-14 w-full bg-[#1E293B]/10 rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] p-12 animate-pulse">
                <div className="grid md:grid-cols-5 gap-12 items-center">
                  <div className="md:col-span-3 space-y-6">
                    <div className="h-8 w-40 bg-[#1E293B]/10 rounded-lg"></div>
                    <div className="h-16 w-64 bg-[#1E293B]/10 rounded-xl"></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-24 bg-[#1E293B]/10 rounded-2xl"></div>
                      <div className="h-24 bg-[#1E293B]/10 rounded-2xl"></div>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-center">
                    <div className="w-56 h-56 bg-[#1E293B]/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
