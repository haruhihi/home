import { EUser, EUserRole, EUserRoleEnum } from "@dtos/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import { TModel } from "./db";

export const initUserModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
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
  await User.sync(syncOptions);

  if (syncOptions?.force) {
    await initUser(User);
  }
  return User;
};

export const initUser = async (User: TModel) => {
  // sequelize create multiple rows in one line code
  await User.bulkCreate(
    ["台沛麒", "李斌建", "杨家辉"]
      .map((name) => {
        return [
          {
            [EUser.Account]: name,
            [EUser.Password]: "123",
            [EUser.Name]: `${name}admin`,
            [EUser.IsWorkOwner]: false,
            [EUser.IsWorker]: false,
            [EUser.IsSpecialWorker]: false,
            [EUser.Role]: EUserRoleEnum.Admin,
          },
          {
            [EUser.Account]: ``,
            [EUser.Password]: "",
            [EUser.Name]: `工作负责人${name}`,
            [EUser.IsWorkOwner]: true,
            [EUser.IsWorker]: false,
            [EUser.IsSpecialWorker]: false,
            [EUser.Role]: EUserRoleEnum.Admin,
          },
          {
            [EUser.Account]: ``,
            [EUser.Password]: "",
            [EUser.Name]: `施工人员${name}`,
            [EUser.IsWorkOwner]: false,
            [EUser.IsWorker]: true,
            [EUser.IsSpecialWorker]: false,
            [EUser.Role]: EUserRoleEnum.User,
          },
          {
            [EUser.Account]: ``,
            [EUser.Password]: "",
            [EUser.Name]: `特种作业人员${name}`,
            [EUser.IsWorkOwner]: false,
            [EUser.IsWorker]: false,
            [EUser.IsSpecialWorker]: true,
            [EUser.Role]: EUserRoleEnum.User,
          },
          {
            [EUser.Account]: `${name}user`,
            [EUser.Password]: "123",
            [EUser.Name]: `${name}user`,
            [EUser.IsWorkOwner]: false,
            [EUser.IsWorker]: false,
            [EUser.IsSpecialWorker]: false,
            [EUser.Role]: EUserRoleEnum.User,
          },
        ];
      })
      .flat()
  );
};
