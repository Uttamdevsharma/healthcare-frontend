"use client";

import HealthRecordsForm from "@/components/modules/Patient/HealthRecords/HealthRecordsForm";
import MedicalReportsList from "@/components/modules/Patient/HealthRecords/MedicalReportsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyProfile } from "@/services/patientProfile.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen } from "lucide-react";

const HealthRecordsPage = () => {
  const { data: profileRes, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });

  const patient = profileRes?.data ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Health Records & Medical Reports</h1>
        <p className="text-muted-foreground">
          Maintain your personal health vitals, medical history, and upload diagnostic lab reports.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <FolderOpen className="h-5 w-5" /> My Uploaded Health Records
                <span className="text-sm font-normal text-muted-foreground">
                  ({patient?.medicalReports?.length ?? 0})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MedicalReportsList reports={patient?.medicalReports} />
            </CardContent>
          </Card>

          <HealthRecordsForm patient={patient} />
        </>
      )}
    </div>
  );
};

export default HealthRecordsPage;
