"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getPatientHealthRecords } from "@/services/appointment.services";
import { IAppointment } from "@/types/appointment.types";
import { IPatientHealthData } from "@/types/patient.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Activity,
  Eye,
  FileImage,
  FileText,
  FileUp,
  FolderOpen,
  Heart,
  HeartPulse,
  Mail,
  RefreshCw,
  User,
} from "lucide-react";

interface ViewHealthRecordsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: IAppointment | null;
}

type ReportType = "pdf" | "image" | "other";

const getReportType = (link: string): ReportType => {
  const ext = link.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "avif"].includes(ext)) return "image";
  return "other";
};

const formatUploadDate = (date?: string) =>
  date ? format(new Date(date), "MMM dd, yyyy") : "—";

const formatBloodGroup = (bloodGroup?: string) => {
  if (!bloodGroup) return "N/A";
  return bloodGroup
    .replaceAll("_POSITIVE", "+")
    .replaceAll("_NEGATIVE", "-")
    .replaceAll("_", " ");
};

const getVitals = (health: IPatientHealthData | null | undefined) => {
  if (!health) return [];

  return [
    { label: "Gender", value: health.gender || "N/A" },
    {
      label: "Date of Birth",
      value: health.dateOfBirth ? format(new Date(health.dateOfBirth), "MMM dd, yyyy") : "N/A",
    },
    { label: "Blood Group", value: formatBloodGroup(health.bloodGroup) },
    { label: "Height", value: health.height || "N/A" },
    { label: "Weight", value: health.weight || "N/A" },
    { label: "Smoking Status", value: health.smokingStatus ? "Smoker" : "Non-Smoker" },
    { label: "Pregnancy Status", value: health.pregnancyStatus ? "Yes" : "No" },
    { label: "Immunization Status", value: health.immunizationStatus || "N/A" },
    { label: "Dietary Preferences", value: health.dietaryPreferences || "N/A" },
    {
      label: "Past Surgeries",
      value: health.hasPastSurgeries ? health.recentSurgeries || "Yes" : "None",
    },
    {
      label: "Recent Injuries",
      value: health.hasRecentInjuries ? health.recentInjuries || "Yes" : "None",
    },
    { label: "Mental Health History", value: health.mentalHealthHistory || "N/A" },
  ];
};

const ViewHealthRecordsModal = ({
  open,
  onOpenChange,
  appointment,
}: ViewHealthRecordsModalProps) => {
  const patientId = appointment?.patientId;

  const { data: patientRes, isLoading, isError, refetch } = useQuery({
    queryKey: ["patient-health-records", patientId],
    queryFn: () => getPatientHealthRecords(patientId as string),
    enabled: open && !!patientId,
  });

  const patient = patientRes?.data ?? null;
  const vitals = getVitals(patient?.patientHealthData);
  const reports = patient?.medicalReports ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            Health Records - {appointment?.patient?.name || "Patient"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {patient?.name || appointment?.patient?.name || "Patient"}
            </p>
            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              <Mail className="h-3 w-3 shrink-0" />
              <span className="truncate">{patient?.email || appointment?.patient?.email || "—"}</span>
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 self-start sm:self-center">
            {reports.length} {reports.length === 1 ? "report" : "reports"}
          </Badge>
        </div>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">Failed to load health records</p>
              <p className="text-xs text-muted-foreground">
                Something went wrong while fetching this patient&apos;s records.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-5">
            {vitals.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-rose-500">
                    <Heart className="h-4 w-4" />
                    Health Vitals & History
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {vitals.map((item) => (
                      <div key={item.label} className="rounded-lg border bg-muted/40 px-3 py-2">
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium" title={item.value}>
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <FolderOpen className="h-4 w-4" />
                Uploaded Medical Reports ({reports.length})
              </h3>

              {reports.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border py-8 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <FileUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">No health records uploaded</p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    This patient has not uploaded any diagnostic reports or lab results yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {reports.map((report) => {
                    const type = getReportType(report.reportLink);
                    const isImage = type === "image";

                    return (
                      <div key={report.id} className="flex items-center gap-3 rounded-lg border p-3">
                        {isImage ? (
                          // eslint-disable-next-line @next/next/no-img-element -- report links are external URLs, matching codebase pattern for external images
                          <img
                            src={report.reportLink}
                            alt={report.reportName}
                            className="h-12 w-12 shrink-0 rounded-md border object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-rose-500/10 text-rose-500">
                            <FileText className="h-6 w-6" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1 space-y-1">
                          <p className="truncate text-sm font-medium" title={report.reportName}>
                            {report.reportName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded {formatUploadDate(report.createdAt)}
                          </p>
                          <Badge
                            variant={isImage ? "secondary" : "outline"}
                            className="text-[11px]"
                          >
                            {isImage ? (
                              <FileImage className="mr-1 h-3 w-3" />
                            ) : (
                              <FileText className="mr-1 h-3 w-3" />
                            )}
                            {type === "pdf" ? "PDF" : type === "image" ? "Image" : "File"}
                          </Badge>
                        </div>

                        <Button
                          asChild
                          variant="outline"
                          size="xs"
                          className="h-8 shrink-0 gap-1 text-xs"
                        >
                          <a href={report.reportLink} target="_blank" rel="noreferrer">
                            <Eye className="h-3.5 w-3.5 text-primary" />
                            View
                          </a>
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {vitals.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 rounded-lg border py-8 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">No health vitals recorded</p>
                <p className="max-w-sm text-xs text-muted-foreground">
                  This patient has not filled in their health vitals and medical history yet.
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewHealthRecordsModal;
