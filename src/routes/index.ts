import { Express } from "express";
import login from './login'
import add_user  from "./add_user";

export const setRoutes = (app:Express) =>{
    app.use('/api',login );
    app.use('/api',add_user );
    
} 