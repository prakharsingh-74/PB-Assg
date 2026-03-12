import { Patient } from "@/types/patient";
import { Mail, Phone, MapPin } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const contact = patient.contact[0];
  
  // Cycle through p1.png, p2.png, p3.png based on patient_id for variety
  const avatarIndex = (patient.patient_id % 3) + 1;
  const localAvatar = `/p${avatarIndex}.png`;

  return (
    <div className="bg-white rounded-[10px] overflow-hidden border border-slate-200 card-shadow transition-all flex flex-col h-full shadow-sm hover:border-primary/40 group">
      {/* Card Header Section - Light Blue */}
      <div className="bg-[#e7f3ff] px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white overflow-hidden border border-white shadow-sm shrink-0">
             <img 
               src={patient.photo_url || localAvatar} 
               alt={patient.patient_name} 
               className="w-full h-full object-cover" 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = localAvatar;
               }}
             />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-slate-700 text-[15px] leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
              {patient.patient_name}
            </h3>
            <p className="text-[11px] text-slate-400 font-bold mt-0.5 tracking-tight uppercase">
              ID-{String(patient.patient_id).padStart(4, '0')}
            </p>
          </div>
        </div>
        <div className="bg-[#3b82f6] text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm">
          Age:{patient.age}
        </div>
      </div>

      {/* Card Body Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-4">
          <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')} !text-[11px] !py-1 !px-3 !rounded-[4px] border !border-current opacity-90 font-bold`}>
            {patient.medical_issue}
          </span>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#757575] shrink-0 mt-0.5" />
            <span className="text-[13px] text-slate-700 font-medium leading-relaxed">
              {contact?.address || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#757575] shrink-0" />
            <span className="text-[13px] text-slate-700 font-medium">
              {contact?.number || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#757575] shrink-0" />
            <span className="text-[13px] text-slate-700 font-medium truncate">
              {contact?.email || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
