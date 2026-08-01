"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IPatient } from "@/types/patient.types";
import { Activity, Calendar, Heart, Mail, MapPin, Phone, User } from "lucide-react";

interface ViewPatientProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: IPatient | null;
}

const ViewPatientProfileDialog = ({
  open,
  onOpenChange,
  patient,
}: ViewPatientProfileDialogProps) => {
  if (!patient) return null;

  const health = patient.patientHealthData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Patient Profile Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={patient.profilePhoto} alt={patient.name} />
            <AvatarFallback className="text-xl font-bold">
              {patient.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{patient.name}</h3>
            <Badge variant="outline" className="mt-1">
              Status: {patient.user?.status || "ACTIVE"}
            </Badge>
          </div>

          <div className="w-full space-y-3 rounded-lg border p-4 text-sm">
            <h4 className="font-semibold flex items-center gap-2 text-primary">
              <User className="h-4 w-4" /> Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.contactNumber || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{patient.address || "No address provided"}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(patient.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {health && (
            <div className="w-full space-y-3 rounded-lg border p-4 text-sm">
              <h4 className="font-semibold flex items-center gap-2 text-rose-500">
                <Heart className="h-4 w-4" /> Health Vitals & History
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{health.gender || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Blood Group:</span> <span className="font-medium">{health.bloodGroup || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Height:</span> <span className="font-medium">{health.height || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Weight:</span> <span className="font-medium">{health.weight || "N/A"}</span></div>
                <div><span className="text-muted-foreground">Date of Birth:</span> <span className="font-medium">{health.dateOfBirth ? new Date(health.dateOfBirth).toLocaleDateString() : "N/A"}</span></div>
                <div><span className="text-muted-foreground">Smoking:</span> <span className="font-medium">{health.smokingStatus ? "Yes" : "No"}</span></div>
              </div>
            </div>
          )}

          {patient.medicalReports && patient.medicalReports.length > 0 && (
            <div className="w-full space-y-2 rounded-lg border p-4 text-sm">
              <h4 className="font-semibold flex items-center gap-2 text-emerald-600">
                <Activity className="h-4 w-4" /> Medical Reports ({patient.medicalReports.length})
              </h4>
              <div className="space-y-1">
                {patient.medicalReports.map((report) => (
                  <div key={report.id} className="flex justify-between items-center text-xs py-1 border-b last:border-0">
                    <span className="font-medium">{report.reportName}</span>
                    <a href={report.reportLink} target="_blank" rel="noreferrer" className="text-primary underline">
                      View Document
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPatientProfileDialog;
