import crypto from "crypto";

export const generateSalt = () => {
    return crypto.randomBytes(16).toString('hex');
} 