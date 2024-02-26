import express from "express";
import cors from "cors";
import { credentials } from "./src/config/config";
import { sequelize } from "./src/config/dbconfig";
import { setRoutes } from "./src/routes";
import { initModel } from "./src/models";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;


// console.log("hello all",credentials)

try {
  initModel(sequelize);
  sequelize.sync();
} catch (e) {
  console.log("Error", e);

}

setRoutes(app);


app.listen(port, () => console.log(`Server running on ${port}`));