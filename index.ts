import express, { Request, Response } from "express";
import cors from "cors";
import { credentials } from "./src/config/config";
import { sequelize } from "./src/config/dbconfig";
import { setRoutes } from "./src/routes";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;



app.listen(port, () => console.log(`Server running on ${port}`));

console.log("hello all",credentials)

try{
  sequelize.sync();
}catch(e){
  console.log("Error",e);
  
}

setRoutes(app);