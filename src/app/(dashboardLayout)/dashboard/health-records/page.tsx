"use client";

import HealthRecordsForm from "@/components/modules/Patient/HealthRecords/HealthRecordsForm";
import { getMyProfile } from "@/services/patientProfile.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

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
        <HealthRecordsForm patient={patient} />
      )}
    </div>
  );
};

export default HealthRecordsPage;
