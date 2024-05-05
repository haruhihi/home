import { EPerson } from "@dtos/db";
import { getModels } from "@utils/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import * as xlsx from "xlsx";

export const initModel = async (
  sequelize: Sequelize,
  syncOptions?: SyncOptions
) => {
  const Model = sequelize.define(
    "People",
    {
      [EPerson.ID]: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
      },
      [EPerson.Name]: {
        type: DataTypes.STRING,
      },
      [EPerson.PhoneNum]: {
        type: DataTypes.STRING,
      },
      [EPerson.Risk]: {
        type: DataTypes.STRING,
      },
      [EPerson.SectionId]: {
        type: DataTypes.INTEGER,
      },
    },
    {
      // Other model options go here
      initialAutoIncrement: "1000000",
    }
  );
  return Model;
};

export const person = {
  seed: async (
    workBook: xlsx.WorkBook,
    sectionName2IdMap: Map<string, number>
  ) => {
    const sheet = workBook["Sheets"]["敏感用户"];
    if (!sheet) throw new Error("无敏感用户表");
    const rows = xlsx.utils.sheet_to_json(sheet);
    const { Person } = await getModels();
    await Person.bulkCreate(
      rows.map((row: any) => {
        if (!sectionName2IdMap.get(row["台区"])) {
          console.error("未找到台区", row);
        }
        return {
          [EPerson.Name]: row["联系人"],
          [EPerson.PhoneNum]: row["联系电话"],
          [EPerson.Risk]: row["风险点"],
          [EPerson.SectionId]: sectionName2IdMap.get(row["台区"]),
        };
      })
    );
  },
};
