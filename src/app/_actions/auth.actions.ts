"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { redirect } from "next/navigation";
import { deleteCookie } from "@/lib/cookieUtils";

export async function logoutAction() {
    try {
        await httpClient.post("/auth/logout", {});
    } catch (error) {
        console.error("Error during logout:", error);
    }

    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie("better-auth.session_token");

    redirect("/login");
}
