import { getStudent } from '@/lib/actions';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default async function RegisterPage() {
  const student = await getStudent();
  if (student) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgba(13,59,26,0.06)] border border-gray-100 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center text-center">
            <img src="/image/mml-logo.png" alt="MML Logo" className="h-30 w-auto object-contain" />
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Student Registration</h1>
            <p className="text-gray-500 text-xs mt-2">Enter your details to register for the course.</p>
          </div>
          
          <div className="w-full">
            <RegisterForm />
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center w-full pt-4 border-t border-gray-100">
            Already registered? <Link href="/" className="text-[#0D3B1A] font-semibold hover:underline">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
