import { ReactNode } from 'react';
import InstructorSidebar from './InstructorSidebar';
import InstructorMobileNav from './InstructorMobileNav';
import Header from './Header';
import { Instructor } from '@/types';

interface Props {
  children: ReactNode;
  pageTitle: string;
  instructor: Instructor;
}

export default function InstructorPageContainer({ children, pageTitle, instructor }: Props) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans flex overflow-x-hidden">
      <InstructorSidebar instructor={instructor} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 md:ml-20">
        <InstructorMobileNav />
        <Header title={pageTitle} />
        <main className="flex-1 w-full mx-auto min-w-0 max-w-full p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
