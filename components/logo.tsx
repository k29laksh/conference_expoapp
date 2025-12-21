export function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Red Triangular A Shape */}
      <div className="flex flex-col items-center w-8 h-10 relative">
        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[20px] border-b-[#E31E24]" />
        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[20px] border-t-[#E31E24] -mt-[2px]" />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-[#E31E24] text-sm font-bold tracking-wide leading-tight">BHUJBAL</span>
        <span className="text-[#1E3A8A] text-xs font-semibold tracking-wide leading-tight">KNOWLEDGE CITY</span>
        <div className="bg-[#E31E24] px-2 py-0.5 mt-0.5 rounded-sm">
          <span className="text-white text-[10px] font-bold">Mumbai Educational Trust</span>
        </div>
      </div>
    </div>
  )
}
