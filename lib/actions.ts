"use server"

import { readJson, writeJson } from './data';
import { Student, AllowedStudent, Module, Activity } from '../types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginStudent(prevState: any, formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const section = formData.get('section') as string;
  const course = formData.get('course') as string;

  if (!fullName || !section || !course) {
    return { error: 'All fields are required.' };
  }

  const nameTrimmed = fullName.trim();
  const nameLower = nameTrimmed.toLowerCase();
  
  // 1. Validate against allowed students
  const allowedData = readJson<{ students: AllowedStudent[] }>('allowed_students.json');
  const isAllowed = allowedData.students.some(
    s => s.fullName.toLowerCase() === nameLower && s.section === section
  );

  if (!isAllowed) {
    return { error: 'Student not found. Please make sure your full name and section are correct.' };
  }
  
  if (course !== 'Open Source Programming') {
    return { error: 'Invalid course selected.' };
  }

  // 2. Check if student is already registered
  const studentsData = readJson<{ students: Student[] }>('students.json');
  let student = studentsData.students.find(
    s => s.fullName.toLowerCase() === nameLower && s.section === section && s.course === course
  );

  if (!student) {
    // Register new student
    student = {
      id: `STU-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: nameTrimmed,
      section,
      course,
      registeredAt: new Date().toISOString()
    };
    studentsData.students.push(student);
    writeJson('students.json', studentsData);
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
