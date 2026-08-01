"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IUser } from "@/types/auth.types";

export const forgotPasswordAction = async (payload: { email: string }) => {
  try {
    const response = await httpClient.post<{ success: boolean; message?: string }>(
      "/auth/forget-password",
      payload
    );
    return response.data;
  } catch (error: any) {
    console.log("Error sending reset email:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send reset email",
    };
  }
};
