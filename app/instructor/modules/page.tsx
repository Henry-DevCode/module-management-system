import { getInstructor, getModules } from '@/lib/actions';
import { redirect } from 'next/navigation';
import InstructorPageContainer from '@/components/layout/InstructorPageContainer';
import Link from 'next/link';

export default async function InstructorModulesPage(props: { searchParams?: Promise<{ semester?: string }> }) {
  const instructor = await getInstructor();
  if (!instructor) {
    redirect('/instructor-login');
  }

  const searchParams = await props.searchParams;
  const activeSemester = searchParams?.semester || 'midterm';
  const allModules = await getModules();
  const filteredModules = allModules.filter(m => m.semester === activeSemester);

  return (
    <InstructorPageContainer pageTitle="Modules" instructor={instructor}>
      <div className="mb-8">
        <h1 className="text-3xl font-medium mb-2 text-gray-900">Modules</h1>
        <p className="text-gray-500 text-sm">View all course modules available to your students.</p>

        <div className="flex gap-6 mt-6 border-b border-gray-100">
          <Link
            href="/instructor/modules?semester=midterm"
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeSemester === 'midterm' ? 'border-[#0D3B1A] text-[#0D3B1A]' : 'border-transparent text-gray-400 hover:text-[#0D3B1A]'}`}
          >
            Midterm
          </Link>
          <Link
            href="/instructor/modules?semester=finals"
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeSemester === 'finals' ? 'border-[#0D3B1A] text-[#0D3B1A]' : 'border-transparent text-gray-400 hover:text-[#0D3B1A]'}`}
          >
            Finals
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.length > 0 ? (
          filteredModules.map(module => (
            <Link 
              key={module.id} 
              href={`/instructor/modules/${module.id}`}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#0D3B1A]/30 transition-all group"
            >
              <div className="text-xs font-semibold text-[#0D3B1A]/70 uppercase tracking-wider mb-2 group-hover:text-[#0D3B1A]">Week {module.week}</div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#0D3B1A] transition-colors">{module.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{module.description}</p>
              <div className="mt-4 text-xs font-medium text-[#0D3B1A]/60 group-hover:text-[#0D3B1A] transition-colors">Open Module →</div>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 py-12">No modules available for this semester.</div>
        )}
      </div>
    </InstructorPageContainer>
  );
}
