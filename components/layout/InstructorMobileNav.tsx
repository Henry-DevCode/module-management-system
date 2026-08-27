"use client"
import Link from 'next/link';
import { Menu, LogOut, LayoutDashboard, Users, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { instructorLogout } from '@/lib/actions';

export default function InstructorMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-30">
        <Link href="/instructor/dashboard" className="block">
          <img src="/image/mml-logo.png" alt="MML Logo" className="h-8 w-auto object-contain" />
        </Link>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-gray-500 hover:text-[#0D3B1A] p-1"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="bg-white border-b border-gray-100 absolute w-full z-20 shadow-md">
          <nav className="flex flex-col p-4 space-y-2">
            <Link 
              href="/instructor/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <LayoutDashboard size={18} />
              Analytics
            </Link>
            <Link 
              href="/instructor/master-list" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <Users size={18} />
              Master List
            </Link>
            <Link 
              href="/instructor/modules" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <BookOpen size={18} />
              Modules
            </Link>
            <div className="pt-2 mt-2 border-t border-gray-100">
              <form action={instructorLogout}>
                <button type="submit" className="flex items-center gap-3 p-3 text-gray-500 hover:text-[#0D3B1A] w-full rounded-lg font-medium">
                  <LogOut size={18} />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
