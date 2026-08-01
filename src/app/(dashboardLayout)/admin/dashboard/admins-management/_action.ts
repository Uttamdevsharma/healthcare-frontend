"use server";

import { createAdmin, deleteAdmin, getAdminById } from "@/services/admin.services";
import { IAdmin, ICreateAdminPayload } from "@/types/admin.types";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";

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

export const createAdminAction = async (
  payload: ICreateAdminPayload
): Promise<ApiResponse<IAdmin> | ApiErrorResponse> => {
  if (!payload.admin?.name || !payload.admin?.email || !payload.password) {
    return {
      success: false,
      message: "Name, email and password are required",
    };
  }

  try {
    return await createAdmin(payload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create admin"),
    };
  }
};

export const deleteAdminAction = async (
  id: string
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  try {
    return await deleteAdmin(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete admin"),
    };
  }
};

export const getAdminByIdAction = async (
  id: string
): Promise<ApiResponse<IAdmin> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid admin id",
    };
  }

  try {
    return await getAdminById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch admin details"),
    };
  }
};
