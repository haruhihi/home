import { EPlanSection, ESection } from "@dtos/db";
import { getModels } from "@utils/db";
import { DataTypes, Sequelize, SyncOptions } from "sequelize";
import * as xlsx from "xlsx";

export const planSection = {
  define: async (sequelize: Sequelize, syncOptions?: SyncOptions) => {
    const Model = sequelize.define(
      "PlanSection",
      {
        [EPlanSection.PlanId]: {
          type: DataTypes.INTEGER,
        },
        [EPlanSection.SectionId]: {
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
    const rows = xlsx.utils.sheet_to_json(sheet);
    const { Section } = await getModels();
    const sectionNames = [...new Set(rows.map((row: any) => row["台区"]))];
    const sectionIds = await Section.bulkCreate(
      sectionNames.map((name) => ({
        [ESection.Name.Name]: name,
      }))
    );
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
