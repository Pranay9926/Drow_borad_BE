import jwt from 'jsonwebtoken';

const secretKey = 'Pranay_hiteshi'; // Replace with your own secret key

// Function to generate JWT token
export const generateToken = (payload: any): string => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Function to verify JWT token
export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};
