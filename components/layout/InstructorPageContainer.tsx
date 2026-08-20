import { ReactNode } from 'react';
import InstructorSidebar from './InstructorSidebar';
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
      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <Header title={pageTitle} />
        <main className="flex-1 w-full mx-auto min-w-0 max-w-full p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
