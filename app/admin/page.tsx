import { getAllActivities, getModules } from '@/lib/actions';
import { readJson } from '@/lib/data';
import { Student } from '@/types';
import PageContainer from '@/components/layout/PageContainer';

export default async function AdminDashboard() {
  const studentsData = readJson<{ students: Student[] }>('students.json');
  const students = studentsData.students;
  const modules = await getModules();
  const activities = await getAllActivities();

  const totalStudents = students.length;
  const bsit3eCount = students.filter(s => s.section === 'BSIT 3E').length;
  const bsit3fCount = students.filter(s => s.section === 'BSIT 3F').length;

  const studentsWithActivity = new Set(activities.map(a => a.studentId)).size;

  const moduleViews = modules.map(m => {
    const views = activities.filter(a => a.moduleId === m.id).length;
    return { ...m, views };
  }).sort((a, b) => b.views - a.views);

  return (
    <PageContainer>
      <div className="space-y-12">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-light mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">System Overview & Statistics</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 border border-gray-200 bg-white rounded-sm">
            <div className="text-sm text-gray-500 mb-2">Total Students</div>
            <div className="text-3xl font-semibold">{totalStudents}</div>
          </div>
          <div className="p-6 border border-gray-200 bg-white rounded-sm">
            <div className="text-sm text-gray-500 mb-2">BSIT 3E</div>
            <div className="text-3xl font-semibold">{bsit3eCount}</div>
          </div>
          <div className="p-6 border border-gray-200 bg-white rounded-sm">
            <div className="text-sm text-gray-500 mb-2">BSIT 3F</div>
            <div className="text-3xl font-semibold">{bsit3fCount}</div>
          </div>
          <div className="p-6 border border-gray-200 bg-white rounded-sm">
            <div className="text-sm text-gray-500 mb-2">Active Students</div>
            <div className="text-3xl font-semibold">{studentsWithActivity}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Students by Section</h2>
            <div className="space-y-4 border border-gray-200 bg-white p-6 rounded-sm">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>BSIT 3E</span>
                  <span>{bsit3eCount}</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="bg-black h-2" style={{ width: totalStudents ? `${(bsit3eCount / totalStudents) * 100}%` : '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>BSIT 3F</span>
                  <span>{bsit3fCount}</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="bg-black h-2" style={{ width: totalStudents ? `${(bsit3fCount / totalStudents) * 100}%` : '0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Module Engagement</h2>
            <div className="border border-gray-200 bg-white rounded-sm divide-y divide-gray-100">
              {moduleViews.slice(0, 5).map(m => (
                <div key={m.id} className="p-4 flex justify-between items-center">
                  <div className="truncate pr-4">
                    <div className="text-sm font-medium">{m.title}</div>
                    <div className="text-xs text-gray-500">Week {m.week} • {m.semester}</div>
                  </div>
                  <div className="font-semibold">{m.views} views</div>
                </div>
              ))}
              {moduleViews.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">No modules found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
