import { EMaintainer, EOperator, EUser } from "@dtos/db";
import { getModels } from "@utils/db";
import { Op } from "sequelize";

export const getUsersOptions = async () => {
  const { User, sequelize } = await getModels();
  const rows = await User?.findAll({
    where: {
      [Op.or]: {
        [EUser.IsWorkOwner]: true,
        [EUser.IsWorker]: true,
        [EUser.SpecialWork]: { [Op.ne]: null },
      },
    },
  });
  return rows;
};

export const getMaintainerOptions = async () => {
  try {
    const { Maintainer } = await getModels();
    const rows = await Maintainer?.findAll();
    return (
      rows?.map((row) => {
        return {
          label: (row as any)[EMaintainer.Name],
          value: (row as any)[EMaintainer.ID],
        };
      }) ?? []
    );
  } catch (error) {
    return [];
  }
};

export const getOperatorOptions = async () => {
  try {
    const { Operator } = await getModels();
    const rows = await Operator?.findAll();
    return (
      rows?.map((row) => {
        return {
          label: (row as any)[EOperator.Name],
          value: (row as any)[EOperator.ID],
        };
      }) ?? []
    );
  } catch (error) {
    return [];
  }
};
