"use client"
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutDashboard, BookOpen, LogOut, ChevronRight } from 'lucide-react';
import { Student } from '@/types';
import { useState } from 'react';
import { logout } from '@/lib/actions';
import Image from 'next/image';

export default function SidebarClient({ student }: { student?: Student }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const semester = searchParams.get('semester');
  const [isModulesOpen, setIsModulesOpen] = useState(pathname.startsWith('/modules'));

  return (
    <aside className="w-64 border-r border-gray-200 flex flex-col justify-between hidden md:flex min-h-screen fixed top-0 left-0 bg-white z-20 shadow-[2px_0_15px_rgba(0,0,0,0.02)]">
      <div>
        <div className="p-8 pb-10 flex items-center">
          <Link href="/dashboard" className="block">
            <img src="/image/mml-logo.png" alt="MML Logo" className="h-10 w-auto object-contain" />
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname === '/dashboard' ? 'bg-[#0D3B1A] text-white shadow-sm' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
          >
            <LayoutDashboard size={18} strokeWidth={1.5} />
            Dashboard
          </Link>
          
          <div className="pt-2">
            <button 
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all ${pathname.startsWith('/modules') || isModulesOpen ? 'text-white bg-[#0D3B1A]' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
            >
              <div className="flex items-center gap-3">
                <BookOpen size={18} strokeWidth={1.5} />
                Modules
              </div>
              <ChevronRight size={16} className={`transition-transform ${isModulesOpen ? 'rotate-90' : ''}`} />
            </button>
            
            {isModulesOpen && (
              <div className="mt-2 ml-4 pl-6 border-l-2 border-[#0D3B1A]/20 space-y-1">
                <Link 
                  href="/modules?semester=midterm" 
                  className={`block px-4 py-2.5 text-sm rounded-lg transition-all ${pathname.startsWith('/modules') && (semester === 'midterm' || (!semester && pathname === '/modules')) ? 'text-white font-medium bg-[#0D3B1A] shadow-sm' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
                >
                  Midterm
                </Link>
                <Link 
                  href="/modules?semester=finals" 
                  className={`block px-4 py-2.5 text-sm rounded-lg transition-all ${pathname.startsWith('/modules') && semester === 'finals' ? 'text-white font-medium bg-[#0D3B1A] shadow-sm' : 'text-gray-500 hover:text-white hover:bg-[#0D3B1A]'}`}
                >
                  Finals
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
      
      <div className="p-8 border-t border-gray-100 bg-[#FAFAFA]/50">
        <form action={logout}>
          <button type="submit" className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-[#0D3B1A] transition-colors w-full">
            <LogOut size={18} strokeWidth={1.5} />
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
