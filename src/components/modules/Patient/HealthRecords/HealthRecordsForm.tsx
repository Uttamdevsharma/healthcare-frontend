"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateMyPatientProfile } from "@/services/patientProfile.services";
import { IPatient } from "@/types/patient.types";
import { useQueryClient } from "@tanstack/react-query";
import { FilePlus, Heart, Loader2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface HealthRecordsFormProps {
  patient: IPatient | null;
}

const HealthRecordsForm = ({ patient }: HealthRecordsFormProps) => {
  const health = patient?.patientHealthData;
  const [loading, setLoading] = useState(false);
  const [reportFiles, setReportFiles] = useState<FileList | null>(null);

  const [formData, setFormData] = useState({
    gender: health?.gender || "MALE",
    dateOfBirth: health?.dateOfBirth ? health.dateOfBirth.split("T")[0] : "",
    bloodGroup: health?.bloodGroup || "O_POSITIVE",
    height: health?.height || "",
    weight: health?.weight || "",
    hasPastSurgeries: health?.hasPastSurgeries ? "true" : "false",
    smokingStatus: health?.smokingStatus ? "true" : "false",
    dietaryPreferences: health?.dietaryPreferences || "",
  });

  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

try {
        const payload = {
          patientHealthData: {
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth ? `${formData.dateOfBirth}T00:00:00.000Z` : undefined,
            bloodGroup: formData.bloodGroup,
            height: formData.height,
            weight: formData.weight,
            hasPastSurgeries: formData.hasPastSurgeries === "true",
            smokingStatus: formData.smokingStatus === "true",
            dietaryPreferences: formData.dietaryPreferences,
          },
        };

      const bodyFormData = new FormData();
      bodyFormData.append("data", JSON.stringify(payload));

      if (reportFiles && reportFiles.length > 0) {
        Array.from(reportFiles).forEach((file) => {
          bodyFormData.append("medicalReports", file);
        });
      }

      const res = await updateMyPatientProfile(bodyFormData);

      if (res.success) {
        toast.success("Health records updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      } else {
        toast.error(res.message || "Failed to update health records.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-rose-500">
              <Heart className="h-5 w-5" /> Vitals & Health Attributes
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(val) => setFormData({ ...formData, gender: val })}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                value={formData.bloodGroup}
                onValueChange={(val) => setFormData({ ...formData, bloodGroup: val })}
              >
                <SelectTrigger id="bloodGroup">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A_POSITIVE">A+</SelectItem>
                  <SelectItem value="A_NEGATIVE">A-</SelectItem>
                  <SelectItem value="B_POSITIVE">B+</SelectItem>
                  <SelectItem value="B_NEGATIVE">B-</SelectItem>
                  <SelectItem value="AB_POSITIVE">AB+</SelectItem>
                  <SelectItem value="AB_NEGATIVE">AB-</SelectItem>
                  <SelectItem value="O_POSITIVE">O+</SelectItem>
                  <SelectItem value="O_NEGATIVE">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (e.g. 5 ft 10 in or 178 cm)</Label>
              <Input
                id="height"
                placeholder="Height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (e.g. 70 kg)</Label>
              <Input
                id="weight"
                placeholder="Weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smokingStatus">Smoking Status</Label>
              <Select
                value={formData.smokingStatus}
                onValueChange={(val) => setFormData({ ...formData, smokingStatus: val })}
              >
                <SelectTrigger id="smokingStatus">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Non-Smoker</SelectItem>
                  <SelectItem value="true">Smoker</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Upload Medical Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-emerald-600">
              <FilePlus className="h-5 w-5" /> Upload New Medical Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reports">Select PDF or Image Files (Up to 5 files)</Label>
              <Input
                id="reports"
                type="file"
                multiple
                accept="application/pdf,image/*"
                onChange={(e) => setReportFiles(e.target.files)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {loading ? "Saving..." : "Save Health Records"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HealthRecordsForm;
