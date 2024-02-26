import { Sequelize } from "sequelize";
import { GetUserModule } from "./usermodel";

export function initModel(sequelize: Sequelize) {
  GetUserModule(sequelize);

}