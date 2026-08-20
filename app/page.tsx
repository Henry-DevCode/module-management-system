import { getStudent } from '@/lib/actions';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default async function Home() {
  const student = await getStudent();
  if (student) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgba(13,59,26,0.06)] border border-gray-100 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center text-center">
            <img src="/image/mml-logo.png" alt="MML Logo" className="h-45 w-auto object-contain" />
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight -mt-4">Module Management System</h1>
          </div>
          
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
