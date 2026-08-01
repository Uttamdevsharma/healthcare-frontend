"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { givePrescription } from "@/services/prescription.services";
import { IAppointment } from "@/types/appointment.types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface IssuePrescriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: IAppointment | null;
}

const IssuePrescriptionModal = ({
  open,
  onOpenChange,
  appointment,
}: IssuePrescriptionModalProps) => {
  const [instructions, setInstructions] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment || !instructions || !followUpDate) {
      toast.error("Please fill in all prescription details.");
      return;
    }

    setLoading(true);
    try {
      const res = await givePrescription({
        appointmentId: appointment.id,
        instructions,
        followUpDate,
      });

      if (res.success) {
        toast.success("Prescription issued and sent to patient email!");
        onOpenChange(false);
        setInstructions("");
        setFollowUpDate("");
        queryClient.invalidateQueries({ queryKey: ["my-prescriptions"] });
        queryClient.invalidateQueries({ queryKey: ["my-appointments"] });
      } else {
        toast.error(res.message || "Failed to issue prescription.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Issue Prescription for {appointment?.patient?.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="instructions">Prescription Instructions & Dosage</Label>
            <Textarea
              id="instructions"
              required
              rows={5}
              placeholder="e.g. Paracetamol 500mg - 1 tablet every 8 hours for 5 days after meals."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="followUpDate">Follow Up Date</Label>
            <Input
              id="followUpDate"
              type="date"
              required
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Generating Rx..." : "Issue & Send Rx"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IssuePrescriptionModal;
