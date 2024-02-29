import express from "express";
import cors from "cors";
import { credentials } from "./src/config/config";
import { sequelize } from "./src/config/dbconfig";
import { setRoutes } from "./src/routes";
import { initModel } from "./src/models";
import http from 'http';
import { initializeSocket } from './src/helpers/socket';

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const port = process.env.PORT || 5001;

try {
  initModel(sequelize);
  sequelize.sync();
} catch (e) {
  console.log("Error", e);

}

const io = initializeSocket(server);
setRoutes(app);

// console.log("Starting Server on Port: ", io);



server.listen(port, () => console.log(`Server running on ${port}`));