import { getStudent, getModules, getDashboardStats } from '@/lib/actions';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { Users, UserCheck } from 'lucide-react';
import { ModuleViewsChart } from '@/components/dashboard/ModuleViewsChart';
import { SectionChart } from '@/components/dashboard/SectionChart';

export default async function Dashboard() {
  const student = await getStudent();
  if (!student) {
    redirect('/');
  }

  const modules = await getModules();
  const stats = await getDashboardStats();

  return (
    <PageContainer pageTitle="Overview" fullWidth>
      <div className="space-y-3">
        <div className="pb-1">
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-gray-900">Good morning, {student.fullName.split(' ')[0]}.</h1>
          <p className="text-gray-500 text-sm">Here's your learning progress and analytics.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#0D3B1A]/70 uppercase tracking-widest mb-4">Analytics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Total Students" 
              value={stats.totalStudents} 
              icon={<Users size={18} className="text-[#0D3B1A]" />} 
            />
            <MetricCard 
              title="BSIT 3E" 
              value={stats.bsit3eCount} 
              subtitle="Registered"
            />
            <MetricCard 
              title="BSIT 3F" 
              value={stats.bsit3fCount} 
              subtitle="Registered"
            />
            <MetricCard 
              title="Active Readers" 
              value={stats.uniqueStudentsViewed} 
              icon={<UserCheck size={18} className="text-[#0D3B1A]" />} 
              subtitle="Viewed modules"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 border border-gray-100 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Module Engagement</h3>
              <ModuleViewsChart data={stats.moduleViewsData} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-gray-100 bg-white rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Students per Section</h3>
              <SectionChart data={stats.sectionData} />
            </div>

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
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
