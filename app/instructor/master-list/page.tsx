import { getInstructor, getInstructorStudents } from '@/lib/actions';
import { redirect } from 'next/navigation';
import InstructorPageContainer from '@/components/layout/InstructorPageContainer';
import Link from 'next/link';

export default async function MasterListPage(props: { searchParams?: Promise<{ section?: string }> }) {
  const instructor = await getInstructor();
  if (!instructor) {
    redirect('/instructor-login');
  }

  const searchParams = await props.searchParams;
  // Default to the first section if none is selected
  const activeSection = searchParams?.section || instructor.sections[0];
  const allStudents = await getInstructorStudents();
  
  // Filter for the currently active tab
  const displayStudents = allStudents.filter(s => s.section === activeSection);

  return (
    <InstructorPageContainer pageTitle="Master List" instructor={instructor}>
      <div className="mb-10">
        <h1 className="text-3xl font-medium mb-3 text-gray-900">Student Master List</h1>
        <p className="text-gray-500 text-sm">View and manage the registered students for your assigned sections.</p>
        
        <div className="flex gap-6 mt-8 border-b border-gray-100">
          {instructor.sections.map(section => (
            <Link
              key={section}
              href={`/instructor/master-list?section=${encodeURIComponent(section)}`}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${activeSection === section ? 'border-[#0D3B1A] text-[#0D3B1A]' : 'border-transparent text-gray-400 hover:text-[#0D3B1A]'}`}
            >
              {section}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAFA] text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Student ID</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Full Name</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Section</th>
                <th className="px-6 py-4 uppercase tracking-wider text-xs">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayStudents.length > 0 ? (
                displayStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{student.id}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{student.fullName}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#0D3B1A]/10 text-[#0D3B1A]">
                        {student.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(student.registeredAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    No students registered in this section yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </InstructorPageContainer>
  );
}
