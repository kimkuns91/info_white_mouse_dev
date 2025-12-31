export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EFEC]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#1E293B]/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#1E293B] animate-spin"></div>
        </div>
        <p className="text-lg font-bold text-[#1E293B]/60">로딩 중...</p>
      </div>
    </div>
  );
}
