import { EUser, EUserRoleEnum } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";

export const initUserModel = async (sequelize: Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      [EUser.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EUser.Account]: {
        type: DataTypes.STRING,
      },
      [EUser.Password]: {
        type: DataTypes.STRING,
      },
      [EUser.Name]: {
        type: DataTypes.STRING,
      },
      [EUser.IsWorkOwner]: {
        type: DataTypes.BOOLEAN,
      },
      [EUser.IsWorker]: {
        type: DataTypes.BOOLEAN,
      },
      [EUser.IsSpecialWorker]: {
        type: DataTypes.BOOLEAN,
      },
      [EUser.Role]: {
        type: DataTypes.ENUM(EUserRoleEnum.Admin, EUserRoleEnum.User),
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );

  return User;
};
