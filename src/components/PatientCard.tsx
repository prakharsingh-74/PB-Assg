import { Patient } from "@/types/patient";
import { Mail, Phone, MapPin } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact[0];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 card-shadow relative group hover:border-primary/20 transition-all flex flex-col h-full">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-100">
             {patient.photo_url ? (
               <img src={patient.photo_url} alt={patient.patient_name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                 {patient.patient_name[0]}
               </div>
             )}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{patient.patient_name}</h3>
            <p className="text-[11px] text-slate-400 font-bold mt-0.5">ID-{String(patient.patient_id).padStart(4, '0')}</p>
          </div>
        </div>
        <div className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
          Age: {patient.age}
        </div>
      </div>

      <div className="mb-5">
        <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')}`}>
          {patient.medical_issue}
        </span>
      </div>

      <div className="space-y-3 mt-auto border-t border-slate-50 pt-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-[13px] text-slate-600 font-medium leading-tight">
            {contact?.address || <span className="text-red-400">N/A</span>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-[13px] text-slate-600 font-medium">
            {contact?.number || <span className="text-red-400">N/A</span>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-[13px] text-slate-600 font-medium truncate">
            {contact?.email || <span className="text-red-400">N/A</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
