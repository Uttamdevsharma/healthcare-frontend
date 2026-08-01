"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAdmin, ICreateAdminPayload } from "@/types/admin.types";

export const getAdmins = async () => {
    try {
        return await httpClient.get<IAdmin[]>("/admins");
    } catch (error) {
        console.log("Error fetching admins:", error);
        throw error;
    }
};

export const createAdmin = async (payload: ICreateAdminPayload) => {
    try {
        return await httpClient.post<IAdmin>("/users/create-admin", payload);
    } catch (error) {
        console.log("Error creating admin:", error);
        throw error;
    }
};

export const deleteAdmin = async (id: string) => {
    try {
        return await httpClient.delete<{ message: string }>(`/admins/${id}`);
    } catch (error) {
        console.log("Error deleting admin:", error);
        throw error;
    }
};

export const getAdminById = async (id: string) => {
    try {
        return await httpClient.get<IAdmin>(`/admins/${id}`);
    } catch (error) {
        console.log("Error fetching admin:", error);
        throw error;
    }
};
