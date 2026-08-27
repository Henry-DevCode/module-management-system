export default function LoadingSpinner() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Subtle background ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-100"></div>
        
        {/* Animated primary ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#0D3B1A] border-r-[#0D3B1A]/50 animate-[spin_1.5s_cubic-bezier(0.68,-0.55,0.265,1.55)_infinite]"></div>
        
        {/* Centered Logo */}
        <img 
          src="/image/mml-logo.png" 
          alt="MML System Loading" 
          className="w-10 h-10 object-contain animate-pulse" 
        />
      </div>
      <p className="mt-6 text-xs tracking-[0.2em] text-[#0D3B1A]/60 font-semibold uppercase animate-pulse">
        Loading...
      </p>
    </div>
  );
}
