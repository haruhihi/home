import { ESection, ESectionData } from "@dtos/db";
import { getModels } from "@utils/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import * as xlsx from "xlsx";

export const section = {
  define: async (sequelize: Sequelize, syncOptions?: SyncOptions) => {
    const Model = sequelize.define(
      "Section",
      {
        [ESection.ID]: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          autoIncrementIdentity: true,
        },
        [ESection.Name]: {
          type: DataTypes.STRING,
        },
        [ESection.YearPlanStop]: {
          type: DataTypes.TEXT,
        },
        [ESection.ExceptionStop2Months]: {
          type: DataTypes.TEXT,
        },
        [ESection.ExceptionStopUserCount2Months]: {
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
        [ESection.Name]: row[ESectionData[ESection.Name].Label],
        [ESection.YearPlanStop]: row[ESectionData[ESection.YearPlanStop].Label],
        [ESection.ExceptionStop2Months]:
          row[ESectionData[ESection.ExceptionStop2Months].Label],
        [ESection.ExceptionStopUserCount2Months]:
          row[ESectionData[ESection.ExceptionStopUserCount2Months].Label],
      }))
    );

    console.log(`共创建${sectionIds.length}个台区`);

    const sectionName2IdMap = new Map<string, number>();

    sectionIds.forEach((section) => {
      sectionName2IdMap.set(
        (section as any)[ESection.Name],
        (section as any)[ESection.ID]
      );
    });
    return { sectionName2IdMap };
  },
};
