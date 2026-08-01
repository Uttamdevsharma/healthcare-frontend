"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPatient } from "@/types/patient.types";

export const getPatients = async () => {
    try {
        return await httpClient.get<IPatient[]>("/patients");
    } catch (error) {
        console.log("Error fetching patients:", error);
        throw error;
    }
};

export const getPatientById = async (id: string) => {
    try {
        return await httpClient.get<IPatient>(`/patients/${id}`);
    } catch (error) {
        console.log("Error fetching patient:", error);
        throw error;
    }
};

export const updatePatientStatus = async (id: string, status: string) => {
    try {
        return await httpClient.patch<IPatient>(`/patients/${id}/status`, { status });
    } catch (error) {
        console.log("Error updating patient status:", error);
        throw error;
    }
};

export const deletePatient = async (id: string) => {
    try {
        return await httpClient.delete<{ message: string }>(`/patients/${id}`);
    } catch (error) {
        console.log("Error deleting patient:", error);
        throw error;
    }
};
