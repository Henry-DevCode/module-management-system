import { getInstructor, getModule } from '@/lib/actions';
import { redirect } from 'next/navigation';
import InstructorPageContainer from '@/components/layout/InstructorPageContainer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PdfViewerWrapper from '@/components/modules/PdfViewerWrapper';

export default async function InstructorModuleDetail(props: { params: Promise<{ moduleId: string }> }) {
  const instructor = await getInstructor();
  if (!instructor) {
    redirect('/instructor-login');
  }

  const params = await props.params;
  const moduleData = await getModule(params.moduleId);

  if (!moduleData) {
    return (
      <InstructorPageContainer pageTitle="Module Not Found" instructor={instructor}>
        <div className="py-12 text-center">
          <h2 className="text-xl font-medium mb-4">Module not found.</h2>
          <Link href="/instructor/modules" className="text-[#0D3B1A] hover:opacity-80 underline">
            Return to Modules
          </Link>
        </div>
      </InstructorPageContainer>
    );
  }

  return (
    <InstructorPageContainer pageTitle={moduleData.title} instructor={instructor}>
      <div className="flex flex-col mb-8">
        <div className="mb-8 flex-shrink-0">
          <Link href={`/instructor/modules?semester=${moduleData.semester}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#0D3B1A] mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Modules
          </Link>
          <div>
            <h1 className="text-3xl font-semibold mb-2 text-gray-900">{moduleData.title}</h1>
            <div className="text-sm text-[#0D3B1A]/70 uppercase tracking-wider font-semibold">
              Week {moduleData.week} • {moduleData.semester}
            </div>
          </div>
        </div>

        <div className="w-full">
          <PdfViewerWrapper url={moduleData.pdf} />
        </div>
      </div>
    </InstructorPageContainer>
  );
}
