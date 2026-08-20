import { getStudent } from '@/lib/actions';

export default async function Header({ title }: { title: string }) {
  const student = await getStudent();
  
  return (
    <header className="h-16 flex items-center justify-between px-10 border-b border-gray-200 bg-white sticky top-0 z-10 hidden md:flex shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
      <h1 className="text-lg font-medium text-black">{title}</h1>
      {student && (
        <div className="flex items-center gap-4 text-sm">
          <div className="text-right">
            <div className="font-medium text-black leading-none">{student.fullName}</div>
            <div className="text-xs text-gray-400 mt-1">{student.section}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium border border-gray-200">
            {student.fullName.charAt(0)}
          </div>
        </div>
      )}
    </header>
  );
}
