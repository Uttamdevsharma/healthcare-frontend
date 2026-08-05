"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileImageSrc, getProfilePhotoVersion, subscribeProfilePhotoVersion } from "@/lib/profileImage";
import { useSyncExternalStore } from "react";

interface UserInfoCellProps {
    name : string;
    email : string;
    profilePhoto ?: string;
}


const UserInfoCell = ({ name, email, profilePhoto }: UserInfoCellProps) => {
    const photoVersion = useSyncExternalStore(subscribeProfilePhotoVersion, getProfilePhotoVersion);
    const initials = name
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
        .slice(0, 2); // Limit to 2 characters


  return (
    <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
            <AvatarImage src={getProfileImageSrc(profilePhoto, photoVersion) || undefined} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
            <span className="font-medium text-sm">{name}</span>
            <span className="text-muted-foreground text-xs">{email}</span>
        </div>
    </div>
  )
}

export default UserInfoCell