"use server"

import { deleteReview, giveReview, updateReview } from "@/services/review.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type ICreateReviewPayload, type IReview } from "@/types/review.types"

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
    return error.response.data.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export const giveReviewAction = async (
  payload: ICreateReviewPayload,
): Promise<ApiResponse<IReview> | ApiErrorResponse> => {
  if (!payload.appointmentId) {
    return {
      success: false,
      message: "Invalid appointment selection",
    }
  }

  if (!payload.rating || payload.rating < 1 || payload.rating > 5) {
    return {
      success: false,
      message: "Rating must be between 1 and 5",
    }
  }

  try {
    return await giveReview(payload)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to submit review"),
    }
  }
}

export const updateReviewAction = async (
  id: string,
  payload: Partial<ICreateReviewPayload>,
): Promise<ApiResponse<IReview> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid review id",
    }
  }

  try {
    return await updateReview(id, payload)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update review"),
    }
  }
}

export const deleteReviewAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid review id",
    }
  }

  try {
    return await deleteReview(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete review"),
    }
  }
}
