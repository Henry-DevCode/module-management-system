"use client"
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64 text-[#0D3B1A]">
      Loading module content...
    </div>
  ),
});

export default function PdfViewerWrapper({ url }: { url: string }) {
  return <PdfViewer url={url} />;
}
