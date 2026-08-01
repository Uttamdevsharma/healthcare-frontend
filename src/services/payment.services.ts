"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPayment } from "@/types/payment.types";

export const getPayments = async () => {
    try {
        return await httpClient.get<IPayment[]>("/payments");
    } catch (error) {
        console.log("Error fetching payments:", error);
        throw error;
    }
};
