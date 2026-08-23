"use server"

import { supabase } from './supabase';
import { Student, Module, Activity, Instructor } from '../types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerStudent(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const fullName = formData.get('fullName') as string;
  const section = formData.get('section') as string;
  const course = formData.get('course') as string;

  if (!studentId || !fullName || !section || !course) {
    return { error: 'All fields are required.' };
  }

  const nameTrimmed = fullName.trim();
  const cleanId = studentId.trim();
  
  if (course !== 'Open Source Programming') {
    return { error: 'Invalid course selected.' };
  }

  // Check if student ID already registered
  const { data: existingIdUser } = await supabase
    .from('students')
    .select('id')
    .eq('id', cleanId)
    .single();

  if (existingIdUser) {
    return { error: 'This Student ID is already registered. Please log in.' };
  }

  // Register new student
  const { error: insertError } = await supabase
    .from('students')
    .insert({
      id: cleanId,
      full_name: nameTrimmed,
      section: section,
      course: course
    });

  if (insertError) {
    console.error(insertError);
    return { error: 'Failed to register student. Database error.' };
  }

  // Log in by setting a cookie
  const cookieStore = await cookies();
  cookieStore.set('studentId', cleanId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/dashboard');
}

export async function loginStudent(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId') as string;

  if (!studentId) {
    return { error: 'Student ID is required.' };
  }

  const cleanId = studentId.trim();

  // Check if student is registered
  const { data: student } = await supabase
    .from('students')
    .select('id')
    .eq('id', cleanId)
    .single();

  if (!student) {
    return { error: 'Student ID not found. Have you registered yet?' };
  }

  // Log in by setting a cookie
  const cookieStore = await cookies();
  cookieStore.set('studentId', student.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/dashboard');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('studentId');
  redirect('/');
}

export async function getStudent(): Promise<Student | null> {
  const cookieStore = await cookies();
  const studentId = cookieStore.get('studentId')?.value;
  if (!studentId) return null;

  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();

  if (!student) return null;

  return {
    id: student.id,
    fullName: student.full_name,
    section: student.section,
    course: student.course,
    registeredAt: student.registered_at
  };
}

export async function getModules(): Promise<Module[]> {
  const { data: modules } = await supabase
    .from('modules')
    .select('*');
    
  if (!modules) return [];
  
  return modules.map(m => ({
    id: m.id,
    course: m.course,
    semester: m.semester,
    week: m.week,
    title: m.title,
    description: m.description,
    pdf: m.pdf
  }));
}

export async function getModule(id: string): Promise<Module | null> {
  const { data: module } = await supabase
    .from('modules')
    .select('*')
    .eq('id', id)
    .single();
    
  if (!module) return null;

  return {
    id: module.id,
    course: module.course,
    semester: module.semester,
    week: module.week,
    title: module.title,
    description: module.description,
    pdf: module.pdf
  };
}

export async function recordModuleView(moduleId: string) {
  const student = await getStudent();
  if (!student) return;

  const { data: hasViewed } = await supabase
    .from('activity')
    .select('id')
    .eq('student_id', student.id)
    .eq('module_id', moduleId)
    .single();

  if (!hasViewed) {
    await supabase.from('activity').insert({
      student_id: student.id,
      module_id: moduleId
    });
  }
}

export async function getAllActivities() {
  const { data } = await supabase.from('activity').select('*');
  return data || [];
}

export async function getDashboardStats() {
  return null;
}

export async function loginInstructor(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }

  const { data: instructor } = await supabase
    .from('instructors')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (!instructor) {
    return { error: 'Invalid username or password.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('instructorId', instructor.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/instructor/dashboard');
}

export async function instructorLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('instructorId');
  redirect('/instructor-login');
}

export async function getInstructor(): Promise<Instructor | null> {
  const cookieStore = await cookies();
  const instructorId = cookieStore.get('instructorId')?.value;
  if (!instructorId) return null;

  const { data: instructor } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', instructorId)
    .single();

  if (instructor) {
    return {
      id: instructor.id,
      username: instructor.username,
      fullName: instructor.full_name,
      sections: instructor.sections
    };
  }
  return null;
}

export async function getInstructorDashboardStats() {
  const instructor = await getInstructor();
  if (!instructor) redirect('/instructor-login');

  const { data: instructorStudentsData } = await supabase
    .from('students')
    .select('*')
    .in('section', instructor.sections);
    
  const instructorStudents = instructorStudentsData || [];
  const instructorStudentIds = instructorStudents.map(s => s.id);

  let instructorActivities = [];
  if (instructorStudentIds.length > 0) {
    const { data: acts } = await supabase
      .from('activity')
      .select('*')
      .in('student_id', instructorStudentIds);
    instructorActivities = acts || [];
  }

  const modules = await getModules();

  const totalStudents = instructorStudents.length;
  const uniqueStudentsViewed = new Set(instructorActivities.map(a => a.student_id)).size;

  const moduleViewsData = modules.map(m => {
    return {
      name: m.title.replace('Midterm ', 'M').replace('Finals ', 'F'),
      views: instructorActivities.filter(a => a.module_id === m.id).length
    };
  });

  const sectionData = instructor.sections.map(sec => ({
    name: sec,
    students: instructorStudents.filter(s => s.section === sec).length
  }));

  return {
    totalStudents,
    uniqueStudentsViewed,
    moduleViewsData,
    sectionData,
    sections: instructor.sections
  };
}

export async function getInstructorStudents(): Promise<Student[]> {
  const instructor = await getInstructor();
  if (!instructor) redirect('/instructor-login');

  const { data: students } = await supabase
    .from('students')
    .select('*')
    .in('section', instructor.sections);
    
  if (!students) return [];
  
  return students.map(s => ({
    id: s.id,
    fullName: s.full_name,
    section: s.section,
    course: s.course,
    registeredAt: s.registered_at
  }));
}
