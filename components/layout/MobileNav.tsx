import { getStudent } from '@/lib/actions';
import MobileNavClient from './MobileNavClient';

export default async function MobileNav() {
  const student = await getStudent();
  if (!student) return null;

  return <MobileNavClient />;
}
