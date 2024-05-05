import { Res200, Res500 } from "@dtos/api";
import {
  EMaintainer,
  EPerson,
  EPlan,
  ESection,
  EUser,
  EUserRoleEnum,
} from "@dtos/db";
import { getModels } from "@utils/db";
import { readFile } from "fs/promises";
import path from "path";
import * as xlsx from "xlsx";
import { user } from "@models/user";

const excelIs = (text: unknown) => {
  return text === "1" || text === 1 || text === "是";
};

export async function GET(request: Request) {
  try {
    // if the params has force=true, force init the models
    const params = new URL(request.url).searchParams;
    const force = params.get("force");
    if (force === "1") {
      // 禁用外键约束
      // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { raw: true });
      const { Section, Person, Maintainer, Operator } = await getModels({
        dangerousDropAllTables: true,
      });
      const filePath = path.join(process.cwd(), "public", "seed.xlsx");
      const fileBuffer = await readFile(filePath);
      const workbook = xlsx.read(fileBuffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;

      for (const name of sheetNames) {
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[name]);
        await user.seed({ name, rows });
        if (name === "台区") {
          const sectionNames = [
            ...new Set(rows.map((row: any) => row["台区"])),
          ];
          const sectionIds = await Section.bulkCreate(
            sectionNames.map((name) => ({
              [ESection.Name]: name,
            }))
          );
          const sectionMap = new Map<string, number>();
          sectionIds.forEach((section) => {
            sectionMap.set(
              (section as any)[ESection.Name],
              (section as any)[ESection.ID]
            );
          });
          await Person.bulkCreate(
            rows.map((row: any) => {
              if (!sectionMap.get(row["台区"])) {
                console.error("未找到台区", row["台区"]);
              }
              return {
                [EPerson.Name]: row["联系人"],
                [EPerson.PhoneNum]: row["联系电话"],
                [EPerson.Risk]: row["风险点"],
                [EPerson.SectionId]: sectionMap.get(row["台区"]),
              };
            })
          );
        } else if (name === "运维单位") {
          await Maintainer.bulkCreate(
            rows.map((row: any) => ({
              [EMaintainer.Name]: row["名称"],
            }))
          );
        } else if (name === "施工单位") {
          await Operator.bulkCreate(
            rows.map((row: any) => ({
              [EMaintainer.Name]: row["名称"],
            }))
          );
        }
      }
      // 启用外键约束
      // await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { raw: true });
      return new Response(Res200({ result: "successful force init" }), {
        status: 200,
      });
    }

    return new Response(Res200({ result: "successful init" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      Res500({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
