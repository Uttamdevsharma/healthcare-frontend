"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPrescription, ICreatePrescriptionPayload } from "@/types/prescription.types";
import { cookies } from "next/headers";

export const downloadPrescriptionPdf = async (
  id: string
): Promise<{ dataUrl: string; fileName: string }> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in environment variables");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${API_BASE_URL}/prescriptions/${id}/pdf`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to download prescription PDF");
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return {
    dataUrl: `data:application/pdf;base64,${base64}`,
    fileName: `Prescription-${id}.pdf`,
  };
};

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
