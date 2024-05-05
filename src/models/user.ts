import { EUser, EUserRoleEnum } from "@dtos/db";
import { getModels } from "@utils/db";
import { excelIs } from "@utils/helper";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";

const define = async (sequelize: Sequelize) => {
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

const seed = async (params: { name: string; rows: any[] }) => {
  const { name, rows } = params;
  if (name === "用户") {
    const { User } = await getModels();
    await User.bulkCreate(
      rows.map((row: any) => {
        const name = row["姓名"];
        const isAdmin = excelIs(row["管理员"]);
        return {
          [EUser.Account]: isAdmin ? name : "",
          [EUser.Password]: isAdmin ? "123456" : "",
          [EUser.Name]: name,
          [EUser.IsWorkOwner]: excelIs(row["工作负责人"]),
          [EUser.IsWorker]: excelIs(row["施工人员"]),
          [EUser.IsSpecialWorker]: excelIs(row["特种作业人员"]),
          [EUser.Role]: isAdmin ? EUserRoleEnum.Admin : EUserRoleEnum.User,
        };
      })
    );
  }
};

export const user = {
  seed,
  define,
};
