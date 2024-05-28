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
import { section } from "@models/section";
import { person } from "@models/person";
import { DataTypes } from "sequelize";

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
      const { Section, sequelize } = await getModels();
      const filePath = path.join(
        process.cwd(),
        "public",
        "service-plan-init.xlsx"
      );
      const fileBuffer = await readFile(filePath);
      const workbook = xlsx.read(fileBuffer, { type: "buffer" });
      const sheetNames = workbook.SheetNames;
      for (const name of sheetNames) {
        const rows = xlsx.utils.sheet_to_json(workbook.Sheets[name]);
        if (name === "Sheet2") {
          console.log(`Total: ${rows.length}; Start init service plan...`);
          sequelize.transaction(async (transaction) => {
            try {
              const columns = await sequelize
                .getQueryInterface()
                .describeTable("Sections");

              if (!columns[ESection.ServicePlan.Name]) {
                // 如果不存在服务方案字段，添加字段
                console.log(`添加${ESection.ServicePlan.Name}Column`);
                await sequelize
                  .getQueryInterface()
                  .addColumn("Sections", ESection.ServicePlan.Name, {
                    type: DataTypes.TEXT,
                    allowNull: true,
                  });
              }
              let unFoundSections = [];
              for (const _row of rows) {
                const row: {
                  ["所在台区或专变"]: string;
                  ["服务方案"]: string;
                } = _row as any;
                const rowName = row["所在台区或专变"];
                const rowServicePlan = row["服务方案"];
                const section = await Section.findOne({
                  where: { name: rowName },
                  transaction,
                });

                if (section) {
                  // 如果找到相应的 Section，则更新服务方案
                  await section.update(
                    { [ESection.ServicePlan.Name]: rowServicePlan },
                    { transaction }
                  );
                } else {
                  unFoundSections.push(rowName);
                  await Section.create(
                    {
                      [ESection.Name.Name]: rowName,
                      [ESection.ServicePlan.Name]: rowServicePlan,
                    },
                    { transaction }
                  );
                  console.log(`Not found ${rowName}`);
                }
              }
              await transaction.commit();
              console.log("服务方案更新成功。");
              console.log(`Un found sections: ${unFoundSections.join(",")}`);
            } catch (error) {
              await transaction.rollback();
              console.error("更新服务方案时出错：", error);
            }
          });
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
