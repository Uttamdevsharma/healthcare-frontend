"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPatient } from "@/types/patient.types";

export const getMyProfile = async () => {
  try {
    return await httpClient.get<IPatient>("/auth/me");
  } catch (error) {
    console.log("Error fetching my profile:", error);
    throw error;
  }
};

export const updateMyPatientProfile = async (formData: FormData) => {
  try {
    return await httpClient.patch<IPatient>("/patients/update-my-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("Error updating patient profile:", error);
    throw error;
  }
};
