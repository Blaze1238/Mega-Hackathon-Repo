import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, AlertCircle, Clock, ChevronRight } from 'lucide-react';

const mockCases = [
  {
    id: "CS-2024-8932A",
    fullName: "Ahmad Al-Fayed",
    vulnerabilityLabel: "High",
    dateAssigned: "2024-03-12T09:45:00Z",
    nationality: "Syrian",
    status: "In Progress"
  },
  {
    id: "CS-2024-8933B",
    fullName: "Elena Rostova",
    vulnerabilityLabel: "Medium",
    dateAssigned: "2024-03-13T14:20:00Z",
    nationality: "Ukrainian",
    status: "Pending Review"
  },
  {
    id: "CS-2024-8934C",
    fullName: "David Osei",
    vulnerabilityLabel: "Low",
    dateAssigned: "2024-03-14T08:15:00Z",
    nationality: "Ghanaian",
    status: "New"
  },
  {
    id: "CS-2024-8935D",
    fullName: "Amira Hassan",
    vulnerabilityLabel: "High",
    dateAssigned: "2024-03-11T16:30:00Z",
    nationality: "Sudanese",
    status: "Medical Emergency"
  },
  {
    id: "CS-2024-8936E",
    fullName: "Carlos Mendoza",
    vulnerabilityLabel: "Medium",
    dateAssigned: "2024-03-13T10:00:00Z",
    nationality: "Venezuelan",
    status: "In Progress"
  }
];

const priorityWeights = {
  "High": 3,
  "Medium": 2,
  "Low": 1
};

const vulnerabilityStyles = {
  "High": "bg-red-50 text-red-700 border-red-200 ring-red-600/10",
  "Medium": "bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20",
  "Low": "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20"
};

function CaseCard({ caseData, onClick }) {
  const { id, fullName, vulnerabilityLabel, dateAssigned, nationality, status } = caseData;
  const vStyle = vulnerabilityStyles[vulnerabilityLabel] || vulnerabilityStyles["Low"];

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer overflow-hidden isolate"
    >
      <div className="p-5 flex-1 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              {fullName}
            </h3>
            <p className="text-sm font-medium text-gray-500 mt-0.5">{id}</p>
          </div>
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${vStyle}`}>
            {vulnerabilityLabel} Priority
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{nationality}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="truncate">{new Date(dateAssigned).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {vulnerabilityLabel === 'High' ? (
            <AlertCircle className="w-4 h-4 text-red-500" />
          ) : (
            <div className={`w-2 h-2 rounded-full ${vulnerabilityLabel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          )}
          <span className="text-sm font-medium text-gray-700">{status}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Sort by priority (High -> Low) and then by date (Newest -> Oldest)
  const sortedCases = [...mockCases].sort((a, b) => {
    const weightDiff = priorityWeights[b.vulnerabilityLabel] - priorityWeights[a.vulnerabilityLabel];
    if (weightDiff !== 0) return weightDiff;
    return new Date(b.dateAssigned) - new Date(a.dateAssigned);
  });

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Active Cases</h1>
          <p className="text-gray-500 mt-1">Manage and review incoming case files.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <span className="text-sm font-medium text-gray-600">Total Active:</span>
          <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md">
            {mockCases.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCases.map((caseData) => (
          <CaseCard 
            key={caseData.id} 
            caseData={caseData} 
            onClick={() => navigate(`/case/${caseData.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
