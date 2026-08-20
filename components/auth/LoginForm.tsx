"use client"

import { useActionState } from 'react';
import { loginStudent } from '@/lib/actions';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';

const initialState = {
  error: ''
};

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
          name="studentId"
          label="Student ID"
          placeholder="Enter your Student ID"
          required
        />
      </div>

      <div className="pt-4">
        <Button type="submit" fullWidth disabled={isPending} className="h-12 text-base shadow-sm font-semibold tracking-wide">
          {isPending ? 'Authenticating...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
