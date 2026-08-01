"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IUser } from "@/types/auth.types";

export const verifyEmailAction = async (payload: { email: string; otp: string }) => {
  try {
    const response = await httpClient.post<{ success: boolean; message?: string; data?: IUser }>(
      "/auth/verify-email",
      payload
    );
    return response.data;
  } catch (error: any) {
    console.log("Error verifying email:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to verify email",
    };
  }
};
