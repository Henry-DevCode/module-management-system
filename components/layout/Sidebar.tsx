"use client"
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LayoutDashboard, BookOpen, LogOut, ChevronRight } from 'lucide-react';
import { Student } from '@/types';
import { useState } from 'react';
import { logout } from '@/lib/actions';

export default function SidebarClient({ student }: { student?: Student }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const semester = searchParams.get('semester');
  const [isModulesOpen, setIsModulesOpen] = useState(pathname.startsWith('/modules'));

  return (
    <aside className="border-r border-gray-200 flex-col justify-between hidden md:flex min-h-screen fixed top-0 left-0 bg-white shadow-[2px_0_15px_rgba(0,0,0,0.02)] w-20 hover:w-72 transition-all duration-300 ease-in-out group z-50 overflow-x-hidden">
      <div className="flex flex-col w-full whitespace-nowrap">
        <div className="h-24 flex items-center border-b border-gray-50 mb-4 relative w-full">
          <Link href="/dashboard" className="flex items-center w-full h-full relative">
            {/* Logo: Visible only when collapsed */}
            <div className="absolute left-0 w-20 flex justify-center transition-all duration-200 opacity-100 group-hover:opacity-0 group-hover:scale-50">
              <img src="/image/mml-logo.png" alt="MML Logo" className="h-8 w-auto object-contain" />
            </div>
            
            {/* Text: Visible only when expanded */}
            <div className="absolute left-6 transition-all duration-300 opacity-0 group-hover:opacity-100 flex flex-col justify-center translate-x-4 group-hover:translate-x-0">
              <span className="font-extrabold text-[#0D3B1A] tracking-tighter leading-none text-lg">MODULE</span>
              <span className="font-extrabold text-[#0D3B1A] tracking-tighter leading-none text-lg">MANAGEMENT SYSTEM</span>
            </div>
          </Link>
        </div>
        
        <nav className="px-3 space-y-2 w-full">
          <Link 
            href="/dashboard" 
            className={`flex items-center rounded-xl transition-all overflow-hidden w-full ${pathname === '/dashboard' ? 'bg-[#0D3B1A] text-white shadow-md' : 'text-gray-500 hover:text-[#0D3B1A] hover:bg-gray-50'}`}
          >
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard size={22} strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Dashboard</span>
          </Link>
          
          <div className="pt-2 w-full">
            <button 
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className={`w-full flex items-center justify-between rounded-xl transition-all overflow-hidden ${pathname.startsWith('/modules') || isModulesOpen ? 'text-[#0D3B1A] bg-[#0D3B1A]/5' : 'text-gray-500 hover:text-[#0D3B1A] hover:bg-gray-50'}`}
            >
              <div className="flex items-center">
                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={22} strokeWidth={2} />
                </div>
                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Modules</span>
              </div>
              <ChevronRight size={18} className={`flex-shrink-0 mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isModulesOpen ? 'rotate-90' : ''}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${isModulesOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-2 ml-12 pl-4 border-l-2 border-[#0D3B1A]/10 space-y-1">
                <Link 
                  href="/modules?semester=midterm" 
                  className={`block py-2.5 text-sm transition-all opacity-0 group-hover:opacity-100 ${pathname.startsWith('/modules') && (semester === 'midterm' || (!semester && pathname === '/modules')) ? 'text-[#0D3B1A] font-bold' : 'text-gray-500 hover:text-[#0D3B1A] font-medium'}`}
                >
                  Midterm
                </Link>
                <Link 
                  href="/modules?semester=finals" 
                  className={`block py-2.5 text-sm transition-all opacity-0 group-hover:opacity-100 ${pathname.startsWith('/modules') && semester === 'finals' ? 'text-[#0D3B1A] font-bold' : 'text-gray-500 hover:text-[#0D3B1A] font-medium'}`}
                >
                  Finals
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      
      <div className="p-3 border-t border-gray-100 bg-[#FAFAFA]/50 w-full mt-auto">
        <form action={logout} className="w-full">
          <button type="submit" className="flex items-center rounded-xl text-gray-500 hover:text-[#0D3B1A] hover:bg-gray-50 transition-colors w-full group/btn overflow-hidden whitespace-nowrap">
            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
              <LogOut size={22} strokeWidth={2} className="group-hover/btn:text-[#0D3B1A]" />
            </div>
            <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
