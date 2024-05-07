import { EPerson, ESection } from "@dtos/db";
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
    const sheetPeople = workBook["Sheets"]["敏感用户"];
    if (!sheet || !sheetPeople) throw new Error("无台区表 / 敏感用户表");
    const rows = xlsx.utils.sheet_to_json(sheet) as any[];
    const rowsPeople = xlsx.utils.sheet_to_json(sheetPeople) as any[];
    const { Section } = await getModels();

    const sectionNameSet = new Set();

    const sections = await Section.bulkCreate(
      rows
        .filter((row) => {
          if (sectionNameSet.has(row[ESection.Name.Label])) {
            return false;
          } else {
            sectionNameSet.add(row[ESection.Name.Label]);
            return true;
          }
        })
        .map((row) => {
          return {
            [ESection.Name.Name]: row[ESection.Name.Label],
            [ESection.YearPlanStop.Name]: row[ESection.YearPlanStop.Label],
            [ESection.ExceptionStop2Months.Name]:
              row[ESection.ExceptionStop2Months.Label],
            [ESection.ExceptionStopUserCount2Months.Name]:
              row[ESection.ExceptionStopUserCount2Months.Label],
          };
        })
    );

    console.log(`共初始化${sections.length}个台区`);

    const sectionName2IdMap = new Map<string, number>();

    sections.forEach((section) => {
      sectionName2IdMap.set(
        (section as any)[ESection.Name.Name],
        (section as any)[ESection.ID.Name]
      );
    });

    const moreSections = await Section.bulkCreate(
      rowsPeople
        .filter((row) => {
          if (sectionNameSet.has(row["台区"])) {
            return false;
          } else {
            sectionNameSet.add(row["台区"]);
            return true;
          }
        })
        .map((row: any) => ({
          [ESection.Name.Name]: row["台区"],
        }))
    );

    moreSections.forEach((section) => {
      sectionName2IdMap.set(
        (section as any)[ESection.Name.Name],
        (section as any)[ESection.ID.Name]
      );
    });

    console.log(`为敏感用户共创建${moreSections.length}个台区`);

    return { sectionName2IdMap };
  },
};
