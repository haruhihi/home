import { ESection } from "@dtos/db";
import { getModels } from "@utils/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import * as xlsx from "xlsx";

export const section = {
  define: async (sequelize: Sequelize, syncOptions?: SyncOptions) => {
    const Model = sequelize.define(
      "Section",
      {
        [ESection.ID.Name]: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          autoIncrementIdentity: true,
        },
        [ESection.Name.Name]: {
          type: DataTypes.STRING,
        },
        [ESection.YearPlanStop.Name]: {
          type: DataTypes.TEXT,
        },
        [ESection.ExceptionStop2Months.Name]: {
          type: DataTypes.TEXT,
        },
        [ESection.ExceptionStopUserCount2Months.Name]: {
          type: DataTypes.INTEGER,
        },
      },
      {
        // Other model options go here
        initialAutoIncrement: "1000000",
      }
    );

    return Model;
  },
  seed: async (workBook: xlsx.WorkBook) => {
    const sheet = workBook["Sheets"]["台区"];
    if (!sheet) throw new Error("无用户表");
    const rows = xlsx.utils.sheet_to_json(sheet) as any[];
    const { Section } = await getModels();

    const sectionIds = await Section.bulkCreate(
      rows.map((row) => ({
        [ESection.Name.Name]: row[ESection.Name.Label],
        [ESection.YearPlanStop.Name]: row[ESection.YearPlanStop.Label],
        [ESection.ExceptionStop2Months.Name]:
          row[ESection.ExceptionStop2Months.Label],
        [ESection.ExceptionStopUserCount2Months.Name]:
          row[ESection.ExceptionStopUserCount2Months.Label],
      }))
    );

    console.log(`共创建${sectionIds.length}个台区`);

    const sectionName2IdMap = new Map<string, number>();

    sectionIds.forEach((section) => {
      sectionName2IdMap.set(
        (section as any)[ESection.Name.Name],
        (section as any)[ESection.ID.Name]
      );
    });
    return { sectionName2IdMap };
  },
};
