import { getInstructor } from '@/lib/actions';
import { redirect } from 'next/navigation';
import InstructorLoginForm from '@/components/auth/InstructorLoginForm';
import Link from 'next/link';

export default async function InstructorLogin() {
  const instructor = await getInstructor();
  if (instructor) {
    redirect('/instructor/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgba(13,59,26,0.06)] border border-gray-100 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center text-center">
            <img src="/image/mml-logo.png" alt="MML Logo" className="h-45 w-auto object-contain " />
            <p className="text-[#0D3B1A]/70 text-xs tracking-widest font-semibold uppercase mt-1">Module Management System</p>
          </div>
          
          <div className="w-full">
            <InstructorLoginForm />
          </div>
          
          <div className="mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#0D3B1A]">
              Return to Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
