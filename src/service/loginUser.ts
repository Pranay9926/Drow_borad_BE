import { UsersModel } from "../models/usermodel";


export const loginUser = async (email: string) =>
    // try {

    await UsersModel.findOne({ where: { email: email.toLowerCase() } }); // Hash the password with a salt rounds of 10
        // console.log("the valeu i want ", user);
        // re
        // if (!user) {
        //     return { success: false, status: 404, message: 'User not found' };
        // }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     return { success: false, status: 401, message: 'Invalid password' };
        // }
    // } catch (error) {
    //     console.error("Error creating user:", error);
    //     throw error;
    // }
// }
