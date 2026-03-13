import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { intakeFormSchema } from '../types/formSchema';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Skeleton } from '../components/ui/skeleton';
import {
  ChevronLeft,
  ChevronRight,
  Mic,
  Users,
  Heart,
  Shield,
  CheckCircle,
  QrCode,
} from 'lucide-react';

const steps = [
  { title: 'Core Identity', icon: Users, description: 'Basic personal information' },
  { title: 'The Narrative', icon: Mic, description: 'Voice-recorded story' },
  { title: 'Family & Relationships', icon: Heart, description: 'Family connections' },
  { title: 'Service Tracking', icon: Shield, description: 'Needs and status' },
];

function Intake() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      fullName: '',
      nativeScriptNames: '',
      dateOfBirth: '',
      gender: 'Prefer not to say',
      nationality: '',
      preferredLanguage: 'English',
      voiceNarrative: '',
      isTravelingAlone: false,
      familyMembers: [],
      missingRelatives: [],
      urgentNeeds: [],
      initialScreeningStatus: true,
      vulnerabilityMarker: 'Low',
    },
  });

  const { fields: familyFields, append: appendFamily, remove: removeFamily } = useFieldArray({
    control: form.control,
    name: 'familyMembers',
  });

  const { fields: missingFields, append: appendMissing, remove: removeMissing } = useFieldArray({
    control: form.control,
    name: 'missingRelatives',
  });

  function onSubmit(values) {
    // Map object arrays back to plain string arrays for submission
    const payload = {
      ...values,
      familyMembers: values.familyMembers.map((m) => m.value),
      missingRelatives: values.missingRelatives.map((r) => r.value),
    };
    console.log(payload);
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="animate-pulse text-4xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Intake</h2>
            <p className="text-gray-600">AI is analyzing the information...</p>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Intake Complete</h2>
          <p className="text-gray-600 mb-8">Your information has been processed successfully.</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">QR Card Component Placeholder</p>
            <p className="text-sm text-gray-400 mt-2">This will display the generated QR code</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-600 text-white ring-2 ring-emerald-200'
                        : isCurrent
                          ? 'bg-amber-200 text-slate-900 ring-2 ring-amber-400'
                          : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-20 h-1 mx-1 rounded-full bg-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600 text-center mt-2">
            {steps[currentStep].description}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 mt-6">
            {/* Step 1: Core Identity */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nativeScriptNames"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Native Script Names</FormLabel>
                      <FormControl>
                        <Input placeholder="Original language spelling" {...field} />
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
                      <FormLabel>Date of Birth / Estimated Age</FormLabel>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Non-binary">Non-binary</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality *</FormLabel>
                      <FormControl>
                        <Input placeholder="Country of origin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Language</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Arabic">Arabic</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: The Narrative */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="voiceNarrative"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voice Narrative</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your story will appear here after voice recording..."
                          className="min-h-[200px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                  <Button type="button" size="lg" className="px-8 py-4 text-lg">
                    <Mic className="w-6 h-6 mr-2" />
                    Start Recording
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Click to begin voice recording (placeholder)
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Family & Relationships */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="isTravelingAlone"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Traveling Alone</FormLabel>
                        <p className="text-sm text-gray-500">
                          Check if you are not traveling with family members
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Family Members Present</FormLabel>
                  {familyFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3 mt-2">
                      <Input
                        {...form.register(`familyMembers.${index}.value`)}
                        placeholder="Family member name"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFamily(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendFamily({ value: '' })}
                    className="mt-2 ml-2"
                  >
                    Add Family Member
                  </Button>
                </div>

                <div>
                  <FormLabel>Missing Relatives</FormLabel>
                  {missingFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3 mt-2">
                      <Input
                        {...form.register(`missingRelatives.${index}.value`)}
                        placeholder="Missing relative name"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMissing(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendMissing({ value: '' })}
                    className="mt-2 ml-2"
                  >
                    Add Missing Relative
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Service Tracking */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="urgentNeeds"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Urgent Needs</FormLabel>
                        <p className="text-sm text-gray-500">Select all that apply</p>
                      </div>
                      {['Medical', 'Food', 'Shelter', 'Legal', 'Protection'].map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="urgentNeeds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vulnerabilityMarker"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vulnerability Marker</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vulnerability level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button type="button" variant="outline" onClick={nextStep}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit">Submit Intake</Button>
              )}
            </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Intake;