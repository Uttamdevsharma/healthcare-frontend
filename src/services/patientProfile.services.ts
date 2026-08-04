"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPatient } from "@/types/patient.types";

export const getMyProfile = async () => {
  try {
    const response = await httpClient.get<{ patient: IPatient | null }>("/auth/me");
    return {
      ...response,
      data: response.data?.patient ?? null,
    };
  } catch (error) {
    console.log("Error fetching my profile:", error);
    throw error;
  }
};

export const updateMyPatientProfile = async (formData: FormData) => {
  try {
    return await httpClient.patch<IPatient>("/patients/update-my-profile", formData);
  } catch (error) {
    console.log("Error updating patient profile:", error);
    throw error;
  }
};
