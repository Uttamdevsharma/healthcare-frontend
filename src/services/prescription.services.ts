"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPrescription, ICreatePrescriptionPayload } from "@/types/prescription.types";

export const getMyPrescriptions = async () => {
    try {
        return await httpClient.get<IPrescription[]>("/prescriptions/my-prescriptions");
    } catch (error) {
        console.log("Error fetching prescriptions:", error);
        throw error;
    }
};

export const getAllPrescriptions = async () => {
    try {
        return await httpClient.get<IPrescription[]>("/prescriptions");
    } catch (error) {
        console.log("Error fetching all prescriptions:", error);
        throw error;
    }
};

export const givePrescription = async (payload: ICreatePrescriptionPayload) => {
    try {
        return await httpClient.post<IPrescription>("/prescriptions", payload);
    } catch (error) {
        console.log("Error creating prescription:", error);
        throw error;
    }
};

export const updatePrescription = async (id: string, payload: Partial<ICreatePrescriptionPayload>) => {
    try {
        return await httpClient.patch<IPrescription>(`/prescriptions/${id}`, payload);
    } catch (error) {
        console.log("Error updating prescription:", error);
        throw error;
    }
};

export const deletePrescription = async (id: string) => {
    try {
        return await httpClient.delete<{ message: string }>(`/prescriptions/${id}`);
    } catch (error) {
        console.log("Error deleting prescription:", error);
        throw error;
    }
};
