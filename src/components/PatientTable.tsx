import { Patient } from "@/types/patient";
import { ChevronRight } from "lucide-react";

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
}

export default function PatientTable({ patients, loading }: PatientTableProps) {
  if (loading) {
    return (
      <div className="w-full bg-white p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium tracking-wide">Fetching patient data...</p>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="w-full bg-white p-20 text-center">
        <p className="text-slate-400 font-medium">No patients found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto min-h-[500px]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-primary text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            <th className="px-5 py-6 pb-10">ID</th>
            <th className="px-5 py-6 pb-10">Name</th>
            <th className="px-5 py-6 pb-10 text-center">Age</th>
            <th className="px-5 py-6 pb-10">Medical Issue</th>
            <th className="px-5 py-6 pb-10">Address</th>
            <th className="px-5 py-6 pb-10">Phone Number</th>
            <th className="px-5 py-6 pb-10">Email ID</th>
            <th className="px-5 py-6 pb-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {patients.map((patient) => (
            <tr key={patient.patient_id} className="hover:bg-slate-50/70 transition-colors text-[13px] text-slate-600 group">
              <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-400">
                ID-{String(patient.patient_id).padStart(4, '0')}
              </td>
              <td className="px-5 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-100 shadow-sm shrink-0">
                    {patient.photo_url ? (
                      <img src={patient.photo_url} alt={patient.patient_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-base">
                        {patient.patient_name[0]}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-slate-800 tracking-tight">{patient.patient_name}</span>
                </div>
              </td>
              <td className="px-5 py-3 whitespace-nowrap font-medium text-center">{patient.age}</td>
              <td className="px-5 py-3 whitespace-nowrap">
                <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')}`}>
                  {patient.medical_issue}
                </span>
              </td>
              <td className="px-5 py-3 whitespace-nowrap max-w-[200px] truncate font-medium text-slate-500">
                {patient.contact[0]?.address || <span className="text-red-400/80">N/A</span>}
              </td>
              <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-500">
                {patient.contact[0]?.number || <span className="text-red-400/80 underline decoration-dotted decoration-red-200">N/A</span>}
              </td>
              <td className="px-5 py-3 whitespace-nowrap font-medium text-slate-500">
                {patient.contact[0]?.email || <span className="text-red-400/80">N/A</span>}
              </td>
              <td className="px-5 py-3 text-right">
                <button className="p-1 hover:bg-slate-100 rounded-full transition-colors group">
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
