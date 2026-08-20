import { getInstructor, getInstructorDashboardStats } from '@/lib/actions';
import { redirect } from 'next/navigation';
import InstructorPageContainer from '@/components/layout/InstructorPageContainer';
import { MetricCard } from '@/components/ui/MetricCard';
import { Users, UserCheck } from 'lucide-react';
import { ModuleViewsChart } from '@/components/dashboard/ModuleViewsChart';
import { SectionChart } from '@/components/dashboard/SectionChart';

export default async function InstructorDashboard() {
  const instructor = await getInstructor();
  if (!instructor) {
    redirect('/instructor-login');
  }

  const stats = await getInstructorDashboardStats();

  return (
    <InstructorPageContainer pageTitle="Analytics" instructor={instructor}>
      <div className="space-y-10">
        <div className="pb-2">
          <h1 className="text-3xl font-medium tracking-tight mb-2 text-gray-900">Good morning, Prof. {instructor.fullName}.</h1>
          <p className="text-gray-500 text-sm">Here are the analytics for your assigned sections: {instructor.sections.join(', ')}.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#0D3B1A]/70 uppercase tracking-widest mb-4">Cohort Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Total Students" 
              value={stats.totalStudents} 
              icon={<Users size={18} className="text-[#0D3B1A]" />} 
              subtitle={`In ${instructor.sections.length} sections`}
            />
            <MetricCard 
              title="Active Readers" 
              value={stats.uniqueStudentsViewed} 
              icon={<UserCheck size={18} className="text-[#0D3B1A]" />} 
              subtitle="Viewed modules"
            />
            {stats.sections.map(sec => (
              <MetricCard 
                key={sec}
                title={sec} 
                value={stats.sectionData.find(s => s.name === sec)?.students || 0} 
                subtitle="Registered"
              />
            ))}
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
          </div>
        </div>
      </div>
    </InstructorPageContainer>
  );
}
