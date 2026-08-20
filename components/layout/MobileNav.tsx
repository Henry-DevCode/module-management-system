import Link from 'next/link';
import { LogOut, Menu } from 'lucide-react';
import { getStudent, logout } from '@/lib/actions';

export default async function MobileNav() {
  const student = await getStudent();
  if (!student) return null;

  return (
    <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-20">
      <Link href="/dashboard" className="block">
        <img src="/image/mml-logo.png" alt="MML Logo" className="h-8 w-auto object-contain" />
      </Link>
      
      <div className="flex items-center gap-4">
        <Link href="/modules" className="text-xs font-medium text-gray-500 hover:text-[#0D3B1A]">
          Modules
        </Link>
        <form action={logout}>
          <button type="submit" className="text-gray-400 hover:text-[#0D3B1A]">
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </form>
      </div>
    </header>
  );
}
