"use server";

import { createSpecialty, deleteSpecialty } from "@/services/specialty.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { ISpecialty } from "@/types/specialty.types";
import { revalidateTag } from "next/cache";

const CACHE_TAG = "landing-specialties";

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

export const createSpecialtyAction = async (
  formData: FormData
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  try {
    const result = await createSpecialty(formData);
    revalidateTag(CACHE_TAG, "max");
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create specialty"),
    };
  }
};

export const deleteSpecialtyAction = async (
  id: string
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid specialty id",
    };
  }

  try {
    const result = await deleteSpecialty(id);
    revalidateTag(CACHE_TAG, "max");
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete specialty"),
    };
  }
};
