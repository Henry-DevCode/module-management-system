import { getStudent, getModules } from '@/lib/actions';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default async function ModulesPage(props: { searchParams?: Promise<{ semester?: string }> }) {
  const student = await getStudent();
  if (!student) {
    redirect('/');
  }

  const searchParams = await props.searchParams;
  const activeSemester = searchParams?.semester === 'finals' ? 'finals' : 'midterm';
  const modules = await getModules();
  
  const displayModules = modules.filter(m => m.semester === activeSemester).sort((a, b) => a.week - b.week);

  return (
    <PageContainer pageTitle="Modules">
      <div className="mb-10">
        <h1 className="text-3xl font-medium mb-3 text-gray-900">Open Source Programming</h1>
        <p className="text-gray-500 text-sm">Access your learning materials and PDF modules.</p>
        
        <div className="flex gap-6 mt-8 border-b border-gray-100">
          <Link
            href="/modules?semester=midterm"
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeSemester === 'midterm' ? 'border-[#0D3B1A] text-[#0D3B1A]' : 'border-transparent text-gray-400 hover:text-[#0D3B1A]'}`}
          >
            Midterm
          </Link>
          <Link
            href="/modules?semester=finals"
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeSemester === 'finals' ? 'border-[#0D3B1A] text-[#0D3B1A]' : 'border-transparent text-gray-400 hover:text-[#0D3B1A]'}`}
          >
            Finals
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {displayModules.length > 0 ? (
          displayModules.map(module => (
            <Link key={module.id} href={`/modules/${module.id}`} className="block">
              <div className="p-6 border border-gray-100 bg-white rounded-lg transition-all hover:border-[#0D3B1A] hover:bg-[#0D3B1A] hover:shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#0D3B1A] group-hover:text-white transition-colors">
                    <BookOpen size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0D3B1A]/70 uppercase tracking-wider mb-1 group-hover:text-white/70">Week {module.week}</div>
                    <h3 className="text-lg font-medium text-gray-900 leading-snug group-hover:text-white transition-colors">{module.title}</h3>
                    <p className="text-sm text-gray-500 mt-1.5 group-hover:text-white/80">{module.description}</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors whitespace-nowrap pl-9 md:pl-0">
                  Open Module →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400 border border-gray-100 bg-gray-50/50 rounded-lg text-sm">
            No modules available yet.
          </div>
        )}
      </div>
    </PageContainer>
  );
}
