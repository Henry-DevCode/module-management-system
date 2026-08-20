"use client"

import { useActionState } from 'react';
import { loginStudent } from '@/lib/actions';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';

const initialState = {
  error: ''
};

const sectionOptions = [
  { label: 'BSIT 3E', value: 'BSIT 3E' },
  { label: 'BSIT 3F', value: 'BSIT 3F' }
];

const courseOptions = [
  { label: 'Open Source Programming', value: 'Open Source Programming' }
];

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginStudent, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-50 border border-red-100 p-4 text-sm text-red-600 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="space-y-5">
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

      <div className="pt-4">
        <Button type="submit" fullWidth disabled={isPending} className="h-12 text-base shadow-sm font-semibold tracking-wide">
          {isPending ? 'Authenticating...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}
