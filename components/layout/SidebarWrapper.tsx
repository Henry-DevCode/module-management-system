import { getStudent } from '@/lib/actions';
import SidebarClient from './Sidebar';

export default async function SidebarWrapper() {
  const student = await getStudent();
  if (!student) return null;
  return <SidebarClient student={student} />;
}
