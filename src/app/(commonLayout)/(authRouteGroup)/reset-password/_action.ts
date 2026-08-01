"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IUser } from "@/types/auth.types";

export const resetPasswordAction = async (payload: { email: string; otp: string; newPassword: string }) => {
  try {
    const response = await httpClient.post<{ success: boolean; message?: string; data?: IUser }>(
      "/auth/reset-password",
      payload
    );
    return response.data;
  } catch (error: any) {
    console.log("Error resetting password:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};
