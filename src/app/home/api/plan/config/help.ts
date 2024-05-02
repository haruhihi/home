import { EMaintainer, EOperator, EUser } from "@dtos/db";
import { getModels } from "@utils/db";

export const getWorkOwnerOptions = async () => {
  try {
    const { User, sequelize } = await getModels();
    const rows = await User?.findAll({
      where: {
        [EUser.IsWorkOwner]: true,
      },
    });
    return (
      rows?.map((row) => {
        return {
          label: (row as any)[EUser.Name],
          value: (row as any)[EUser.ID],
        };
      }) ?? []
    );
  } catch (error) {
    return [];
  }
};

export const getWorkerOptions = async () => {
  try {
    const { User, sequelize } = await getModels();
    const rows = await User?.findAll({
      where: {
        [EUser.IsWorker]: true,
      },
    });
    return (
      rows?.map((row) => {
        return {
          label: (row as any)[EUser.Name],
          value: (row as any)[EUser.ID],
        };
      }) ?? []
    );
  } catch (error) {
    return [];
  }
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
