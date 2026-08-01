"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IReview, ICreateReviewPayload } from "@/types/review.types";

export const getMyReviews = async () => {
    try {
        return await httpClient.get<IReview[]>("/reviews/my-reviews");
    } catch (error) {
        console.log("Error fetching reviews:", error);
        throw error;
    }
};

export const getAllReviews = async () => {
    try {
        return await httpClient.get<IReview[]>("/reviews");
    } catch (error) {
        console.log("Error fetching all reviews:", error);
        throw error;
    }
};

export const giveReview = async (payload: ICreateReviewPayload) => {
    try {
        return await httpClient.post<IReview>("/reviews", payload);
    } catch (error) {
        console.log("Error creating review:", error);
        throw error;
    }
};

export const updateReview = async (id: string, payload: Partial<ICreateReviewPayload>) => {
    try {
        return await httpClient.patch<IReview>(`/reviews/${id}`, payload);
    } catch (error) {
        console.log("Error updating review:", error);
        throw error;
    }
};

export const deleteReview = async (id: string) => {
    try {
        return await httpClient.delete<{ message: string }>(`/reviews/${id}`);
    } catch (error) {
        console.log("Error deleting review:", error);
        throw error;
    }
};
