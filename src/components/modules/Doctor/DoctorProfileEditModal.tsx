"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound, Camera, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateDoctorProfile } from "@/services/doctor.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateDoctorProfileSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters").optional(),
  contactNumber: z.string().min(11, "Contact number must be at least 11 characters").max(14, "Contact number must be at most 14 characters").optional(),
  address: z.string().min(10, "Address must be at least 10 characters").max(100, "Address must be at most 100 characters").optional(),
  registrationNumber: z.string().optional(),
  experience: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], "Gender must be either MALE or FEMALE").optional(),
  appointmentFee: z.string().optional(),
  qualification: z.string().min(2, "Qualification must be at least 2 characters").max(50, "Qualification must be at most 50 characters").optional(),
  currentWorkingPlace: z.string().min(2, "Current working place must be at least 2 characters").max(50, "Current working place must be at most 50 characters").optional(),
  designation: z.string().min(2, "Designation must be at least 2 characters").max(50, "Designation must be at most 50 characters").optional(),
});

type UpdateDoctorProfileForm = z.infer<typeof updateDoctorProfileSchema>;

interface DoctorProfileEditModalProps {
  doctorId: string;
  initialData: {
    name: string;
    contactNumber?: string;
    address?: string;
    registrationNumber: string;
    experience?: number;
    gender?: "MALE" | "FEMALE";
    appointmentFee?: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    profilePhoto?: string;
  };
  onSuccess?: () => void;
}

export function DoctorProfileEditModal({
  doctorId,
  initialData,
  onSuccess,
}: DoctorProfileEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.profilePhoto || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<UpdateDoctorProfileForm>({
    resolver: zodResolver(updateDoctorProfileSchema),
    defaultValues: {
      name: initialData.name,
      contactNumber: initialData.contactNumber || "",
      address: initialData.address || "",
      registrationNumber: initialData.registrationNumber,
      experience: initialData.experience ? String(initialData.experience) : "",
      gender: initialData.gender,
      appointmentFee: initialData.appointmentFee ? String(initialData.appointmentFee) : "",
      qualification: initialData.qualification,
      currentWorkingPlace: initialData.currentWorkingPlace,
      designation: initialData.designation,
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return updateDoctorProfile(doctorId, formData);
    },
    onSuccess: (response) => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["my-profile-page"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", doctorId] });
      queryClient.invalidateQueries({ queryKey: ["top-rated-doctors"] });
      setIsOpen(false);
      setSelectedFile(null);
      setPreviewImage(initialData.profilePhoto || null);
      form.reset({
        name: initialData.name,
        contactNumber: initialData.contactNumber || "",
        address: initialData.address || "",
        registrationNumber: initialData.registrationNumber,
        experience: initialData.experience ? String(initialData.experience) : "",
        gender: initialData.gender,
        appointmentFee: initialData.appointmentFee ? String(initialData.appointmentFee) : "",
        qualification: initialData.qualification,
        currentWorkingPlace: initialData.currentWorkingPlace,
        designation: initialData.designation,
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: UpdateDoctorProfileForm) => {
    const formData = new FormData();
    
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }
    
    // Convert string numbers to actual numbers for the API
    const doctorData = {
      ...data,
      experience: data.experience ? parseInt(data.experience, 10) : undefined,
      appointmentFee: data.appointmentFee ? parseFloat(data.appointmentFee) : undefined,
    };
    
    formData.append("doctor", JSON.stringify(doctorData));

    mutation.mutate(formData);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedFile(null);
      setPreviewImage(initialData.profilePhoto || null);
      form.reset({
        name: initialData.name,
        contactNumber: initialData.contactNumber || "",
        address: initialData.address || "",
        registrationNumber: initialData.registrationNumber,
        experience: initialData.experience ? String(initialData.experience) : "",
        gender: initialData.gender,
        appointmentFee: initialData.appointmentFee ? String(initialData.appointmentFee) : "",
        qualification: initialData.qualification,
        currentWorkingPlace: initialData.currentWorkingPlace,
        designation: initialData.designation,
      });
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Camera className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-4">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                {previewImage ? (
                  <AvatarImage src={previewImage} alt={initialData.name} />
                ) : (
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {initialData.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                  disabled={mutation.isPending}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground">Click to upload a new profile photo (max 5MB)</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Dr. John Doe"
                {...form.register("name")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                placeholder="+1 234 567 890"
                type="tel"
                {...form.register("contactNumber")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.contactNumber && (
                <p className="text-sm text-destructive">{form.formState.errors.contactNumber.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St, City, State"
                {...form.register("address")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                placeholder="REG123456"
                {...form.register("registrationNumber")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.registrationNumber && (
                <p className="text-sm text-destructive">{form.formState.errors.registrationNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input
                id="experience"
                type="number"
                placeholder="10"
                {...form.register("experience")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.experience && (
                <p className="text-sm text-destructive">{form.formState.errors.experience.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                {...form.register("gender")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={mutation.isPending}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {form.formState.errors.gender && (
                <p className="text-sm text-destructive">{form.formState.errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentFee">Consultation Fee ($)</Label>
              <Input
                id="appointmentFee"
                type="number"
                placeholder="100"
                {...form.register("appointmentFee")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.appointmentFee && (
                <p className="text-sm text-destructive">{form.formState.errors.appointmentFee.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                placeholder="MBBS, MD"
                {...form.register("qualification")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.qualification && (
                <p className="text-sm text-destructive">{form.formState.errors.qualification.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentWorkingPlace">Current Working Place</Label>
              <Input
                id="currentWorkingPlace"
                placeholder="City Hospital"
                {...form.register("currentWorkingPlace")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.currentWorkingPlace && (
                <p className="text-sm text-destructive">{form.formState.errors.currentWorkingPlace.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Senior Cardiologist"
                {...form.register("designation")}
                disabled={mutation.isPending}
              />
              {form.formState.errors.designation && (
                <p className="text-sm text-destructive">{form.formState.errors.designation.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}