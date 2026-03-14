import React from 'react';
import { useParams } from 'react-router-dom';
import {
  User,
  MapPin,
  Calendar,
  Languages,
  Users,
  AlertCircle,
  Shield,
  Heart,
  FileText,
  QrCode,
  Sparkles,
  Clock
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const mockCaseData = {
  id: "CS-2024-8932A",
  fullName: "Ahmad Al-Fayed",
  status: "In Progress",
  vulnerabilityLabel: "High",
  dateAssigned: "2024-03-12T09:45:00Z",
  demographics: {
    age: "34",
    dob: "1990-05-14",
    gender: "Male",
    nationality: "Syrian",
    preferredLanguage: "Arabic",
    nativeScript: "أحمد الفايد"
  },
  family: {
    travelingAlone: false,
    membersPresent: ["Fatima Al-Fayed (Spouse)", "Omar Al-Fayed (Son, 4)"],
    missingRelatives: ["Hassan Al-Fayed (Brother)"]
  },
  needs: ["Medical", "Shelter", "Legal"],
  aiSummary: "Ahmad arrived with his spouse and young son after a 4-week transit. He requires immediate medical attention for a pre-existing respiratory condition exacerbated by travel. The family is currently without stable shelter. They are seeking connection with legal aid to process their asylum claim. Speaks fluent Arabic and basic English."
};

function StatusBadge({ status, type }) {
  const styles = {
    warning: "bg-amber-100 text-amber-800 ring-amber-600/20",
    danger: "bg-red-100 text-red-800 ring-red-600/10",
    success: "bg-emerald-100 text-emerald-800 ring-emerald-600/20",
    default: "bg-gray-100 text-gray-800 ring-gray-500/10"
  };
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[type] || styles.default}`}>
      {status}
    </span>
  );
}

function SectionCard({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default function CaseFile() {
  const { id } = useParams();
  // Using placeholder data if the route has an ID, we pretend we loaded it, but for UI we just show mockCaseData.
  const data = mockCaseData; 

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{data.fullName}</h1>
              {data.demographics.nativeScript && (
                <span className="text-xl text-gray-500 font-serif rtl" dir="rtl">{data.demographics.nativeScript}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-sm font-medium flex items-center gap-1.5 focus-visible:outline-none focus:ring-offset-2">
                <FileText className="w-4 h-4 text-gray-500" />
                {id || data.id}
              </span>
              <StatusBadge status={data.status} type="success" />
              <StatusBadge status={`Vulnerability: ${data.vulnerabilityLabel}`} type="danger" />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Intake: {new Date(data.dateAssigned).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* AI Summary Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 rounded-xl shadow-sm border border-indigo-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Sparkles className="w-32 h-32 text-indigo-600" />
          </div>
          <div className="px-6 py-4 border-b border-indigo-100/50 flex items-center gap-2 relative z-10">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-indigo-900">AI Intake Summary</h3>
          </div>
          <div className="p-6 relative z-10">
            <p className="text-indigo-950/80 leading-relaxed text-lg">
              {data.aiSummary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Demographics */}
          <SectionCard title="Demographics" icon={User}>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Calendar className="w-4 h-4"/> Age / DOB</p>
                <p className="text-base font-medium text-gray-900">{data.demographics.age} years ({data.demographics.dob})</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><User className="w-4 h-4"/> Gender</p>
                <p className="text-base font-medium text-gray-900">{data.demographics.gender}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><MapPin className="w-4 h-4"/> Nationality</p>
                <p className="text-base font-medium text-gray-900">{data.demographics.nationality}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5"><Languages className="w-4 h-4"/> Language</p>
                <p className="text-base font-medium text-gray-900">{data.demographics.preferredLanguage}</p>
              </div>
            </div>
          </SectionCard>

          {/* Family & Relationships */}
          <SectionCard title="Family & Relationships" icon={Users}>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5"><Heart className="w-4 h-4"/> Traveling With ({data.family.membersPresent.length})</p>
                {data.family.membersPresent.length > 0 ? (
                  <ul className="space-y-2">
                    {data.family.membersPresent.map((member, i) => (
                      <li key={i} className="bg-gray-50 px-3 py-2.5 rounded-md text-sm text-gray-800 border border-gray-100 flex items-center gap-2 font-medium">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        {member}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Traveling alone</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-1.5"><AlertCircle className="w-4 h-4"/> Missing Relatives ({data.family.missingRelatives.length})</p>
                {data.family.missingRelatives.length > 0 ? (
                  <ul className="space-y-2">
                    {data.family.missingRelatives.map((member, i) => (
                      <li key={i} className="bg-red-50/50 px-3 py-2.5 rounded-md text-sm text-red-800 border border-red-100 flex items-center gap-2 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        {member}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">None reported</p>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Service Tracking / Needs */}
          <SectionCard title="Urgent Needs & Service Tracking" icon={Shield} className="md:col-span-2">
            <div className="flex flex-wrap gap-3">
              {data.needs.map((need, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-800 border border-orange-200 font-semibold text-sm shadow-sm">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  {need}
                </span>
              ))}
              {data.needs.length === 0 && <span className="text-gray-500 italic">No urgent needs reported</span>}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
