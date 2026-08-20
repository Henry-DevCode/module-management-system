"use server"

import { readJson, writeJson } from './data';
import { Student, AllowedStudent, Module, Activity, Instructor } from '../types';
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
  const nameLower = nameTrimmed.toLowerCase();
  
  // Validate against allowed students
  const allowedData = readJson<{ students: AllowedStudent[] }>('allowed_students.json');
  const isAllowed = allowedData.students.some(
    s => s.fullName.toLowerCase() === nameLower && s.section === section
  );

  if (!isAllowed) {
    return { error: 'Student not found in the master list. Please make sure your full name and section are correct.' };
  }
  
  if (course !== 'Open Source Programming') {
    return { error: 'Invalid course selected.' };
  }

  const studentsData = readJson<{ students: Student[] }>('students.json');
  
  // Check if student ID already registered
  const existingId = studentsData.students.find(s => s.id === studentId);
  if (existingId) {
    return { error: 'This Student ID is already registered. Please log in.' };
  }

  // Check if this student (by name/section) is already registered under another ID
  const existingStudent = studentsData.students.find(
    s => s.fullName.toLowerCase() === nameLower && s.section === section
  );
  if (existingStudent) {
    return { error: 'You are already registered. Please log in using your Student ID.' };
  }

  // Register new student
  const newStudent: Student = {
    id: studentId.trim(),
    fullName: nameTrimmed,
    section,
    course,
    registeredAt: new Date().toISOString()
  };
  
  studentsData.students.push(newStudent);
  writeJson('students.json', studentsData);

  // Log in by setting a cookie
  const cookieStore = await cookies();
  cookieStore.set('studentId', newStudent.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  redirect('/dashboard');
}

export async function loginStudent(prevState: any, formData: FormData) {
  const studentId = formData.get('studentId') as string;

  if (!studentId) {
    return { error: 'Student ID is required.' };
  }

  const cleanId = studentId.trim();

  // Check if student is registered
  const studentsData = readJson<{ students: Student[] }>('students.json');
  const student = studentsData.students.find(s => s.id === cleanId);

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

  const studentsData = readJson<{ students: Student[] }>('students.json');
  return studentsData.students.find(s => s.id === studentId) || null;
}

export async function getModules() {
  const data = readJson<{ modules: Module[] }>('modules.json');
  return data.modules;
}

export async function getModule(id: string) {
  const modules = await getModules();
  return modules.find(m => m.id === id) || null;
}

export async function recordModuleView(moduleId: string) {
  const student = await getStudent();
  if (!student) return;

  const activityData = readJson<{ activity: Activity[] }>('activity.json');
  
  const hasViewed = activityData.activity.some(a => a.studentId === student.id && a.moduleId === moduleId);
  if (!hasViewed) {
    const newActivity: Activity = {
      id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentId: student.id,
      moduleId,
      viewedAt: new Date().toISOString()
    };
    activityData.activity.push(newActivity);
    writeJson('activity.json', activityData);
  }
}

export async function getAllActivities() {
  const data = readJson<{ activity: Activity[] }>('activity.json');
  return data.activity;
}

export async function getDashboardStats() {
  const studentsData = readJson<{ students: Student[] }>('students.json');
  const activities = await getAllActivities();
  const modules = await getModules();

  const bsit3eCount = studentsData.students.filter(s => s.section === 'BSIT 3E').length;
  const bsit3fCount = studentsData.students.filter(s => s.section === 'BSIT 3F').length;
  const totalStudents = studentsData.students.length;
  const uniqueStudentsViewed = new Set(activities.map(a => a.studentId)).size;

  const moduleViewsData = modules.map(m => {
    return {
      name: m.title.replace('Midterm ', 'M').replace('Finals ', 'F'),
      views: activities.filter(a => a.moduleId === m.id).length
    };
  });

  const sectionData = [
    { name: 'BSIT 3E', students: bsit3eCount },
    { name: 'BSIT 3F', students: bsit3fCount },
  ];

  return {
    bsit3eCount,
    bsit3fCount,
    totalStudents,
    uniqueStudentsViewed,
    moduleViewsData,
    sectionData
  };
}

export async function loginInstructor(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }

  const instructorsData = readJson<{ instructors: Instructor[] }>('instructors.json');
  const instructor = instructorsData.instructors.find(
    i => i.username === username && i.password === password
  );

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

  const instructorsData = readJson<{ instructors: Instructor[] }>('instructors.json');
  const instructor = instructorsData.instructors.find(i => i.id === instructorId) || null;
  if (instructor) {
    // Remove password before returning to client components or pages
    const { password, ...safeInstructor } = instructor;
    return safeInstructor as Instructor;
  }
  return null;
}

export async function getInstructorDashboardStats() {
  const instructor = await getInstructor();
  if (!instructor) redirect('/instructor-login');

  const studentsData = readJson<{ students: Student[] }>('students.json');
  const activities = await getAllActivities();
  const modules = await getModules();

  // Filter students to only those in the instructor's sections
  const instructorStudents = studentsData.students.filter(s => instructor.sections.includes(s.section));
  const instructorStudentIds = new Set(instructorStudents.map(s => s.id));

  // Filter activities to only those from instructor's students
  const instructorActivities = activities.filter(a => instructorStudentIds.has(a.studentId));

  const totalStudents = instructorStudents.length;
  const uniqueStudentsViewed = new Set(instructorActivities.map(a => a.studentId)).size;

  const moduleViewsData = modules.map(m => {
    return {
      name: m.title.replace('Midterm ', 'M').replace('Finals ', 'F'),
      views: instructorActivities.filter(a => a.moduleId === m.id).length
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

export async function getInstructorStudents() {
  const instructor = await getInstructor();
  if (!instructor) redirect('/instructor-login');

  const studentsData = readJson<{ students: Student[] }>('students.json');
  return studentsData.students.filter(s => instructor.sections.includes(s.section));
}
