/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const resetPasswordAction = async (payload: { email: string; otp: string; newPassword: string }) => {
  try {
    const response = await httpClient.post<{ success: boolean; message?: string; data?: any }>(
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
