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
    <div className="bg-white rounded-[24px] overflow-hidden border border-slate-200 card-shadow transition-all flex flex-col h-full shadow-md hover:border-primary/40">
      {/* High-Resolution Header Section */}
      <div className="bg-[#e7f3ff] p-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-[85px] h-[85px] rounded-full bg-white overflow-hidden border border-slate-100 shadow-sm shrink-0">
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
            <h3 className="font-extrabold text-[#334155] text-[20px] leading-tight tracking-tight">
              {patient.patient_name}
            </h3>
            <p className="text-[15px] text-slate-500 font-bold mt-1 tracking-tight">
              ID-{String(patient.patient_id).padStart(4, '0')}
            </p>
          </div>
        </div>
        <div className="bg-[#3b82f6] text-white text-[13px] font-bold px-5 py-2.5 rounded-full self-center">
          Age:{patient.age}
        </div>
      </div>

      {/* High-Resolution Card Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-6">
          <span className={`badge badge-${patient.medical_issue.toLowerCase().replace(/ /g, '-')} !text-[14px] !py-1.5 !px-4 !rounded-[6px] border border-current opacity-90`}>
            {patient.medical_issue}
          </span>
        </div>

        <div className="space-y-6 mt-2">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#949494] shrink-0" />
            <span className="text-[18px] text-[#334155] font-semibold leading-relaxed">
              {contact?.address || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-[#949494] shrink-0" />
            <span className="text-[18px] text-[#334155] font-semibold">
              {contact?.number || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[#949494] shrink-0" />
            <span className="text-[18px] text-[#334155] font-semibold truncate">
              {contact?.email || <span className="text-red-400/80">N/A</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
