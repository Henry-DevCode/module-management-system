"use client"
import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (typeof window !== 'undefined' && wrapperRef.current) {
        // Measure the width of the parent container, not the document itself which might stretch it
        const parentWidth = wrapperRef.current.getBoundingClientRect().width;
        // On very small screens (mobile), ensure we don't exceed window width minus padding
        const safeWidth = Math.min(parentWidth, window.innerWidth - 32); 
        
        // Only update if we actually have a valid width, and cap it at 850px max for desktop
        if (safeWidth > 0) {
          setContainerWidth(Math.min(safeWidth, 850));
        }
      }
    };

    // Initial check
    updateWidth();
    
    // Add small delay for initial mount to ensure layout is complete
    const timeoutId = setTimeout(updateWidth, 100);

    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
      clearTimeout(timeoutId);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full flex flex-col items-center" ref={wrapperRef}>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-32 text-[#0D3B1A]">
            Loading content...
          </div>
        }
        error={
          <div className="flex items-center justify-center h-32 text-red-500">
            Failed to load content.
          </div>
        }
      >
        {containerWidth > 0 && Array.from(new Array(numPages || 0), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-12 shadow-[0_4px_20px_rgba(13,59,26,0.05)] bg-white overflow-hidden rounded-md border border-[#0D3B1A]/10 w-full flex justify-center">
            <Page 
              pageNumber={index + 1} 
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={containerWidth}
              className="max-w-full"
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
