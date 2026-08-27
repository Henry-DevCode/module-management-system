export default function LoadingSpinner() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-[#0D3B1A]"></div>
      <p className="mt-4 text-sm text-gray-500 font-medium animate-pulse">Loading...</p>
    </div>
  );
}
