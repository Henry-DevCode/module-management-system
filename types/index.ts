export interface Student {
  id: string;
  fullName: string;
  section: string;
  course: string;
  registeredAt: string;
}

export interface AllowedStudent {
  fullName: string;
  section: string;
}

export interface Module {
  id: string;
  course: string;
  semester: string;
  week: number;
  title: string;
  description: string;
  pdf: string;
}

export interface Activity {
  id: string;
  studentId: string;
  moduleId: string;
  viewedAt: string;
}
