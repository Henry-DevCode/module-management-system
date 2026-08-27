import { getStudent, getModules } from '@/lib/actions';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default async function Dashboard() {
  const student = await getStudent();
  if (!student) {
    redirect('/');
  }

  const modules = await getModules();
  const continueModule = modules[2] || modules[0];

  return (
    <PageContainer pageTitle="Overview" fullWidth>
      <div className="space-y-10">
        <div className="pb-2">
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-gray-900">Good morning, {student.fullName.split(' ')[0]}</h1>
          <p className="text-gray-500 text-sm">Welcome to your learning dashboard. Continue where you left off.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-sm font-semibold text-[#0D3B1A]/70 uppercase tracking-widest mb-4">Your Modules</h2>
            <div className="space-y-4">
              <div className="p-6 border border-gray-100 bg-white rounded-lg flex justify-between items-center transition-all hover:bg-[#0D3B1A] group hover:shadow-lg">
                <div>
                  <h3 className="font-medium text-lg text-gray-900 group-hover:text-white transition-colors">Midterm</h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80">{modules.filter(m => m.semester === 'midterm').length} Modules</p>
                </div>
                <Link href="/modules?semester=midterm">
                  <Button variant="ghost" className="text-sm group-hover:text-white group-hover:bg-white/10 group-hover:border-transparent">View →</Button>
                </Link>
              </div>
              <div className="p-6 border border-gray-100 bg-white rounded-lg flex justify-between items-center transition-all hover:bg-[#0D3B1A] group hover:shadow-lg">
                <div>
                  <h3 className="font-medium text-lg text-gray-900 group-hover:text-white transition-colors">Finals</h3>
                  <p className="text-sm text-gray-500 group-hover:text-white/80">{modules.filter(m => m.semester === 'finals').length} Modules</p>
                </div>
                <Link href="/modules?semester=finals">
                  <Button variant="ghost" className="text-sm group-hover:text-white group-hover:bg-white/10 group-hover:border-transparent">View →</Button>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#0D3B1A]/70 uppercase tracking-widest mb-4">Continue Learning</h2>
            {continueModule ? (
              <div className="p-8 border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-lg flex flex-col justify-between items-start transition-all hover:bg-[#0D3B1A] hover:shadow-lg group h-full">
                <div className="w-full mb-8">
                  <div className="text-xs font-semibold text-[#0D3B1A]/70 uppercase tracking-wider mb-3 group-hover:text-white/70">Week {continueModule.week} • {continueModule.semester}</div>
                  <h3 className="font-medium text-xl leading-snug mb-3 text-gray-900 group-hover:text-white transition-colors">{continueModule.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed group-hover:text-white/80">{continueModule.description}</p>
                </div>
                <Link href={`/modules/${continueModule.id}`} className="w-full mt-auto">
                  <Button className="w-full py-2.5 group-hover:bg-white group-hover:text-[#0D3B1A] group-hover:hover:bg-gray-100">Open Module</Button>
                </Link>
              </div>
            ) : (
              <div className="p-8 border border-gray-100 bg-gray-50/50 rounded-lg text-center text-gray-400 text-sm">
                No modules available.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
