import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  dateOfBirth: z.string().min(1, {
    message: 'Date of birth is required.',
  }),
  gender: z.string().min(1, {
    message: 'Gender is required.',
  }),
  nationality: z.string().min(1, {
    message: 'Nationality is required.',
  }),
  contactInfo: z.string().min(1, {
    message: 'Contact information is required.',
  }),
});

function Intake() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      contactInfo: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  const [identityMode, setIdentityMode] = useState('manual');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Refugee Intake</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold">Step 1: Choose identity mode</h2>
        <p className="mt-1 text-sm text-slate-600">
          Pick how the person will enter their information. Voice is useful when typing is hard.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              identityMode === 'manual'
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setIdentityMode('manual')}
            aria-pressed={identityMode === 'manual'}
          >
            Manual entry
          </button>
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              identityMode === 'voice'
                ? 'bg-slate-900 text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            onClick={() => setIdentityMode('voice')}
            aria-pressed={identityMode === 'voice'}
          >
            Voice (speech)
          </button>
        </div>
      </section>

      {identityMode === 'voice' ? (
        <section className="rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Voice entry (coming soon)</h3>
          <p className="mt-2 text-sm text-slate-600">
            In voice mode, the user can speak their information and the system will
            transcribe it into the intake form.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                ▶️ Press “Start listening” to begin. Spoken words will be transcribed
                into the form fields.
              </p>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="default">
                Start listening
              </Button>
              <Button type="button" variant="outline">
                Stop
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-xl border border-slate-200 bg-white/70 p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Step 2: Manual data collection</h3>
          <p className="mt-2 text-sm text-slate-600">
            Enter the data manually. This is the standard intake form.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter gender" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Information</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact info" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </section>
      )}
    </div>
  );
}

export default Intake;