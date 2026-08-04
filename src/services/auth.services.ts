"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { jwtUtils } from "@/lib/jwtUtils";
import { UserRole } from "@/lib/authUtils";
import { UserInfo } from "@/types/user.types";
import { cookies } from "next/headers";
import { httpClient } from "@/lib/axios/httpClient";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if(!BASE_API_URL){
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(refreshToken  : string) : Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Cookie : `refreshToken=${refreshToken}`
            }
        });

        if(!res.ok){
            return false;
        }

        const {data} = await res.json();

        const { accessToken, refreshToken: newRefreshToken, token } = data;

        if(accessToken){
            await setTokenInCookies("accessToken", accessToken);
        }

        if(newRefreshToken){
            await setTokenInCookies("refreshToken", newRefreshToken);
        }

        if(token){
            await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
        }

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}

const getFallbackUserInfo = (accessToken: string): UserInfo | null => {
    try {
        const decoded = jwtUtils.decodedToken(accessToken);

        if (!decoded || typeof decoded === "string") {
            return null;
        }

        const { id, name, email, role, needPasswordChange, emailVerified, image } = decoded;

        return {
            id: (id as string) ?? "",
            name: (name as string) ?? "",
            email: (email as string) ?? "",
            role: ((role as UserRole) ?? "PATIENT") as UserRole,
            needPasswordChange,
            emailVerified,
            image: (image as string) ?? undefined,
        };
    } catch (error) {
        console.error("Error decoding token in getUserInfo fallback:", error);
        return null;
    }
}

export async function getUserInfo(): Promise<UserInfo | null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const response = await httpClient.get<UserInfo>("/auth/me");

        if (!response.success || !response.data) {
            console.error("Failed to fetch user info:", response.message);
            return getFallbackUserInfo(accessToken);
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return getFallbackUserInfo(accessToken);
    }
}
