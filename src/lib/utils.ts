import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const withProfilePhotoCacheBust = <TData extends { data?: unknown }>(response: TData): TData => {
    const data = response?.data;

    if (Array.isArray(data)) {
        data.forEach((item) => {
            if (item && typeof item === "object" && "profilePhoto" in item && typeof item.profilePhoto === "string") {
                item.profilePhoto = bustProfilePhotoUrl(item.profilePhoto);
            }
        });
        return response;
    }

    if (data && typeof data === "object" && "profilePhoto" in data && typeof data.profilePhoto === "string") {
        (data as { profilePhoto: string }).profilePhoto = bustProfilePhotoUrl(data.profilePhoto);
    }

    return response;
}

const bustProfilePhotoUrl = (photoUrl: string) => {
    if (!photoUrl) {
        return photoUrl;
    }
    const separator = photoUrl.includes("?") ? "&" : "?";
    return `${photoUrl}${separator}v=${Date.now()}`;
}
