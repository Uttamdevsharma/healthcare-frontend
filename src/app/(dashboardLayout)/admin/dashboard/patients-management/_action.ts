"use server";

import { deletePatient, getPatientById, updatePatientStatus } from "@/services/patient.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IPatient } from "@/types/patient.types";

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export const updatePatientStatusAction = async (
  id: string,
  status: string
): Promise<ApiResponse<IPatient> | ApiErrorResponse> => {
  if (!id || !status) {
    return {
      success: false,
      message: "Patient ID and status are required",
    };
  }

  try {
    return await updatePatientStatus(id, status);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update patient status"),
    };
  }
};

export const deletePatientAction = async (
  id: string
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid patient id",
    };
  }

  try {
    return await deletePatient(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete patient"),
    };
  }
};

export const getPatientByIdAction = async (
  id: string
): Promise<ApiResponse<IPatient> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid patient id",
    };
  }

  try {
    return await getPatientById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch patient details"),
    };
  }
};
