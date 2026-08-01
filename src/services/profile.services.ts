"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const changePasswordAction = async (oldPassword: string, newPassword: string) => {
  try {
    return await httpClient.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  } catch (error) {
    console.log("Error changing password:", error);
    throw error;
  }
};

export const getMyProfileAction = async () => {
  try {
    return await httpClient.get("/auth/me");
  } catch (error) {
    console.log("Error fetching profile:", error);
    throw error;
  }
};
