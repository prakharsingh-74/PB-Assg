import { Patient } from "@/types/patient";
import { ChevronRight } from "lucide-react";

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
}

export default function PatientTable({ patients, loading }: PatientTableProps) {
  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg border border-slate-100 p-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Fetching patient data...</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg border border-slate-100 p-12 text-center">
        <p className="text-slate-500 font-medium">No patients found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-100">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Age</th>
            <th className="px-6 py-4">Medical Issue</th>
            <th className="px-6 py-4">Address</th>
            <th className="px-6 py-4">Phone Number</th>
            <th className="px-6 py-4">Email ID</th>
            <th className="px-6 py-4 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {patients.map((patient) => (
            <tr key={patient.patient_id} className="hover:bg-blue-50/30 transition-colors text-[13px] text-slate-600 group">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-400">
                ID-{String(patient.patient_id).padStart(4, '0')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                    {patient.photo_url ? (
                      <img src={patient.photo_url} alt={patient.patient_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                        {patient.patient_name[0]}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-slate-900">{patient.patient_name}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')}`}>
                  {patient.medical_issue}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-[200px] truncate">
                {patient.contact[0]?.address || <span className="text-red-400">N/A</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {patient.contact[0]?.number || <span className="text-red-400">N/A</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">
                {patient.contact[0]?.email || <span className="text-red-400">N/A</span>}
              </td>
              <td className="px-6 py-4 text-right">
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors inline" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
