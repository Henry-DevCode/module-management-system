import { ReactNode } from 'react';
import SidebarWrapper from './SidebarWrapper';
import MobileNav from './MobileNav';
import Header from './Header';

interface PageContainerProps {
  children: ReactNode;
  hideNav?: boolean;
  pageTitle?: string;
  fullWidth?: boolean;
}

export default function PageContainer({ children, hideNav = false, pageTitle, fullWidth = false }: PageContainerProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans flex overflow-x-hidden">
      {!hideNav && <SidebarWrapper />}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!hideNav ? 'md:ml-20' : ''}`}>
        {!hideNav && <MobileNav />}
        {!hideNav && pageTitle && <Header title={pageTitle} />}
        <main className={`flex-1 w-full mx-auto min-w-0 ${fullWidth ? 'max-w-full p-4 md:p-10' : (hideNav ? 'max-w-6xl p-2 md:p-8' : 'max-w-8xl p-4 md:p-10')}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
