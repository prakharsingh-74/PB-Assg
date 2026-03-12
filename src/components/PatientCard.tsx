import { Patient } from "@/types/patient";
import { Mail, Phone, MapPin } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact[0];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-100 card-shadow relative group hover:border-primary/30 transition-all flex flex-col h-full ring-1 ring-slate-100/50">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden ring-2 ring-slate-50 shadow-sm border border-slate-100">
             {patient.photo_url ? (
               <img src={patient.photo_url} alt={patient.patient_name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xl">
                 {patient.patient_name[0]}
               </div>
             )}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-primary transition-colors tracking-tight">{patient.patient_name}</h3>
            <p className="text-[11px] text-slate-400 font-bold mt-1 tracking-wider">ID-{String(patient.patient_id).padStart(4, '0')}</p>
          </div>
        </div>
        <div className="bg-primary text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md shadow-sm">
          Age: {patient.age}
        </div>
      </div>

      <div className="mb-6">
        <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')}`}>
          {patient.medical_issue}
        </span>
      </div>

      <div className="space-y-4 mt-auto border-t border-slate-50 pt-5">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="text-[13px] text-slate-600 font-medium leading-relaxed">
            {contact?.address || <span className="text-red-400/80">N/A</span>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <span className="text-[13px] text-slate-600 font-semibold tracking-tight">
            {contact?.number || <span className="text-red-400/80">N/A</span>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <span className="text-[13px] text-slate-600 font-medium truncate">
            {contact?.email || <span className="text-red-400/80">N/A</span>}
          </span>
        </div>
      </div>
    </div>
  );
}
