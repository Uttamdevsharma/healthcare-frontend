"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordAction } from "@/services/profile.services";
import { KeyRound, Loader2, Lock, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePasswordAction(
        formData.oldPassword,
        formData.newPassword,
      );

      if (res.success) {
        toast.success("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(res.message || "Failed to change password.");
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Failed to change password. Please check your current password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          Change Your Password
        </CardTitle>
        <CardDescription>
          Enter your current password and choose a new one. Your password must be
          at least 6 characters long.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword" className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              Current Password
            </Label>
            <Input
              id="oldPassword"
              type="password"
              required
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              New Password
            </Label>
            <Input
              id="newPassword"
              type="password"
              required
              minLength={6}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
