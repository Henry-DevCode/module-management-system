"use client"

import { useActionState } from 'react';
import { loginInstructor } from '@/lib/actions';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';

const initialState = {
  error: ''
};

export default function InstructorLoginForm() {
  const [state, formAction, isPending] = useActionState(loginInstructor, initialState);

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
          name="username"
          label="Username"
          placeholder="Instructor Username"
          required
        />

        <div className="space-y-2">
          <label htmlFor="password" className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required autoComplete="off"
            className="w-full h-12 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 transition-all focus:border-[#0D3B1A] focus:outline-none focus:ring-1 focus:ring-[#0D3B1A] hover:border-gray-300 placeholder:text-gray-400 shadow-sm"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" fullWidth disabled={isPending} className="h-12 text-base shadow-sm font-semibold tracking-wide">
          {isPending ? 'Authenticating...' : 'Login as Instructor'}
        </Button>
      </div>
    </form>
  );
}
