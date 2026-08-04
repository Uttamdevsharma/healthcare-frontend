import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
    id : string;
    name : string,
    email : string,
    role : UserRole,
    needPasswordChange?: boolean;
    emailVerified?: boolean;
    image?: string;
    patient?: {
        name?: string;
        image?: string;
    };
}