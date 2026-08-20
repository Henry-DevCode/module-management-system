"use client"

import { useActionState } from 'react';
import { registerStudent } from '@/lib/actions';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';

const initialState = {
  error: ''
};

const sectionOptions = [
  { label: 'BSIT 3D', value: 'BSIT 3D' },
  { label: 'BSIT 3E', value: 'BSIT 3E' },
  { label: 'BSIT 3F', value: 'BSIT 3F' },
];

const courseOptions = [
  { label: 'Open Source Programming', value: 'Open Source Programming' }
];

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerStudent, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-100 p-4 text-sm text-red-600 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <FormField 
          type="text"
          name="studentId"
          label="Student ID"
          placeholder="e.g. 22-12345"
          required
        />

        <FormField 
          type="text"
          name="fullName"
          label="Full Name"
          placeholder="e.g. Juan Dela Cruz"
          required
        />

        <FormField 
          type="dropdown"
          name="section"
          label="Section"
          placeholder="Select Section..."
          options={sectionOptions}
          required
        />

        <FormField 
          type="dropdown"
          name="course"
          label="Course"
          placeholder="Select Course..."
          options={courseOptions}
          required
        />
      </div>

      <div className="pt-2">
        <Button type="submit" fullWidth disabled={isPending} className="h-12 text-base shadow-sm font-semibold tracking-wide">
          {isPending ? 'Registering...' : 'Complete Registration'}
        </Button>
      </div>
    </form>
  );
}
