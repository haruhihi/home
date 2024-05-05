import { EUser, EUserRoleEnum } from "@dtos/db";
import { getModels } from "@utils/db";
import { excelIs } from "@utils/helper";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import * as xlsx from "xlsx";

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

const seed = async (sheets: xlsx.WorkBook["Sheets"]) => {
  const sheet = sheets["用户"];
  if (!sheet) throw new Error("无用户表");
  const rows = xlsx.utils.sheet_to_json(sheet);
  const { User } = await getModels();
  await User.bulkCreate(
    rows.map((row: any) => {
      const name = row["姓名"];
      const isAdmin = excelIs(row["管理员"]);
      const isCreateAccount = isAdmin || excelIs(row["普通用户"]);
      return {
        [EUser.Account]: isCreateAccount ? name : "",
        [EUser.Password]: isCreateAccount ? "t*/2213211995" : "",
        [EUser.Name]: name,
        [EUser.IsWorkOwner]: excelIs(row["工作负责人"]),
        [EUser.IsWorker]: excelIs(row["施工人员"]),
        [EUser.IsSpecialWorker]: excelIs(row["特种作业人员"]),
        [EUser.Role]: isAdmin ? EUserRoleEnum.Admin : EUserRoleEnum.User,
      };
    })
  );
};

export const user = {
  seed,
  define,
};
