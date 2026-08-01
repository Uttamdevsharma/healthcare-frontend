"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const registerAction = async (payload: any) => {
  try {
    const response = await httpClient.post<{ success: boolean; message?: string; data?: any }>(
      "/auth/register",
      payload
    );
    return response.data;
  } catch (error: any) {
    console.log("Error registering user:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed",
    };
  }
};
