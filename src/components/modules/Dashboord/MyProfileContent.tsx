"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyProfileAction } from "@/services/profile.services";
import { useQuery } from "@tanstack/react-query";
import { getProfileImageSrc, getProfilePhotoVersion, subscribeProfilePhotoVersion } from "@/lib/profileImage";
import { useSyncExternalStore } from "react";
import {
  Activity,
  Calendar,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";

interface IProfileData {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  createdAt: string;
  user?: {
    id: string;
    role: string;
    status: string;
    email: string;
  };
  // Doctor-specific
  designation?: string;
  qualification?: string;
  registrationNumber?: string;
  experience?: number;
  appointmentFee?: number;
  gender?: string;
  averageRating?: number;
  specialties?: { specialty: { title: string } }[];
  // Patient-specific
  patientHealthData?: {
    gender?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    height?: string;
    weight?: string;
    smokingStatus?: boolean;
  } | null;
  medicalReports?: {
    id: string;
    reportName: string;
    reportLink: string;
  }[];
}

const MyProfileContent = () => {
  const { data: profileRes, isLoading } = useQuery({
    queryKey: ["my-profile-page"],
    queryFn: () => getMyProfileAction() as Promise<{ success: boolean; data: IProfileData; message?: string }>,
  });

  const profile = profileRes?.data ?? null;
  const role = profile?.user?.role;
  const photoVersion = useSyncExternalStore(subscribeProfilePhotoVersion, getProfilePhotoVersion);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-60 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground">Unable to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={getProfileImageSrc(profile.profilePhoto, photoVersion)} alt={profile.name} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {profile.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1">
                  <Badge variant="outline" className="gap-1">
                    <Shield className="h-3 w-3" />
                    {role}
                  </Badge>
                  <Badge
                    variant={profile.user?.status === "ACTIVE" ? "default" : "destructive"}
                    className={profile.user?.status === "ACTIVE" ? "bg-emerald-600" : ""}
                  >
                    {profile.user?.status}
                  </Badge>
                </div>
              </div>
              {role === "DOCTOR" && profile.designation && (
                <p className="text-sm text-muted-foreground">
                  {profile.designation} — {profile.qualification}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5 text-primary" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{profile.contactNumber || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm md:col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>{profile.address || "No address on file"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
            <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Doctor-specific sections */}
      {role === "DOCTOR" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-blue-500" /> Professional Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Registration No.</p>
              <p className="font-medium text-sm">{profile.registrationNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Experience</p>
              <p className="font-medium text-sm">{profile.experience ?? 0} years</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Consultation Fee</p>
              <p className="font-semibold text-sm text-emerald-600">${profile.appointmentFee?.toFixed(2) || "0.00"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="font-medium text-sm capitalize">{profile.gender?.toLowerCase() || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
              <p className="font-medium text-sm">{profile.averageRating?.toFixed(1) || "5.0"} ⭐</p>
            </div>
            {profile.specialties && profile.specialties.length > 0 && (
              <div className="md:col-span-3">
                <p className="text-xs text-muted-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1.5">
                  {profile.specialties.map((s, i) => (
                    <Badge key={i} variant="secondary">{s.specialty.title}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Patient health data section */}
      {role === "PATIENT" && profile.patientHealthData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-rose-500">
              <Heart className="h-5 w-5" /> Health Vitals
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Gender</p>
              <p className="font-medium">{profile.patientHealthData.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Blood Group</p>
              <p className="font-medium">{profile.patientHealthData.bloodGroup || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date of Birth</p>
              <p className="font-medium">
                {profile.patientHealthData.dateOfBirth
                  ? new Date(profile.patientHealthData.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Height</p>
              <p className="font-medium">{profile.patientHealthData.height || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="font-medium">{profile.patientHealthData.weight || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Smoking</p>
              <p className="font-medium">{profile.patientHealthData.smokingStatus ? "Smoker" : "Non-Smoker"}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medical reports for patients */}
      {role === "PATIENT" && profile.medicalReports && profile.medicalReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-600">
              <Activity className="h-5 w-5" /> Medical Reports ({profile.medicalReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              {profile.medicalReports.map((report) => (
                <div key={report.id} className="flex justify-between items-center p-3 rounded-lg border text-xs">
                  <span className="font-medium truncate">{report.reportName}</span>
                  <a href={report.reportLink} target="_blank" rel="noreferrer" className="text-primary underline shrink-0 ml-2">
                    View Report
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyProfileContent;
