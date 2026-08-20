"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Instructor } from '@/types';
import { instructorLogout } from '@/lib/actions';

export default function InstructorSidebar({ instructor }: { instructor: Instructor }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col justify-between hidden md:flex min-h-screen fixed top-0 left-0 bg-white z-20 shadow-[2px_0_15px_rgba(0,0,0,0.02)]">
      <div>
        <div className="p-8 pb-10 flex items-center">
          <Link href="/instructor/dashboard" className="block font-bold text-[#0D3B1A] tracking-tighter leading-tight text-lg">
            INSTRUCTOR<br/>PORTAL
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          <Link 
            href="/instructor/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === '/instructor/dashboard' ? 'bg-[#0D3B1A] text-white shadow-sm' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
          >
            <LayoutDashboard size={18} strokeWidth={1.5} />
            Analytics
          </Link>
          <Link 
            href="/instructor/master-list" 
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname.startsWith('/instructor/master-list') ? 'bg-[#0D3B1A] text-white shadow-sm' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
          >
            <Users size={18} strokeWidth={1.5} />
            Master List
          </Link>
        </nav>
      </div>
      
      <div className="p-8 border-t border-gray-100 bg-[#FAFAFA]/50">
        <form action={instructorLogout}>
          <button type="submit" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-[#0D3B1A] transition-colors w-full">
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
