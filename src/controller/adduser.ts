import { Request, Response } from 'express';
import { generateSalt } from '../helpers/hashpassword';


export const Add_user =async (req:Request,res:Response) => {
//     try {
//     const data = await createUser(_req);
//     console.log(data, 'data');
//     return res
//       .status(200)
//       .send({ message: 'User added successfully', data: data });
//   } catch (err) {
    console.log('***',generateSalt() );
//   }
generateSalt();
return res.json();
}