"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IAdmin } from "@/types/admin.types";
import { Calendar, Mail, Phone, ShieldCheck } from "lucide-react";

interface ViewAdminProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: IAdmin | null;
}

const ViewAdminProfileDialog = ({
  open,
  onOpenChange,
  admin,
}: ViewAdminProfileDialogProps) => {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Admin Profile Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={admin.profilePhoto} alt={admin.name} />
            <AvatarFallback className="text-xl font-bold">
              {admin.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{admin.name}</h3>
            <Badge variant="outline" className="mt-1">
              <ShieldCheck className="mr-1 h-3 w-3 text-primary" />
              {admin.user?.role || "ADMIN"}
            </Badge>
          </div>

          <div className="w-full space-y-3 rounded-lg border p-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{admin.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{admin.contactNumber || "No contact number provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined on {new Date(admin.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAdminProfileDialog;
