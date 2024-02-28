import { Table } from "antd";
import { comparsionTables } from "../constants/comparsionTables";

const arr = [8, 6, 4, 3, 2, 2, 1, 0];

const tableData = arr.map((min, index, array) => {
  if (array[index] > 3) {
    return {
      min: `>=${min}`,
      value: comparsionTables.BLOCKING_CHANGE_CALC.pbkChangeByTeamPssSk(min),
    };
  }

  return {
    min: `=${min - 1}`,
    value: comparsionTables.BLOCKING_CHANGE_CALC.pbkChangeByTeamPssSk(min),
  };
});

const statsTableCols = [
  {
    title: "teamPssSk",
    dataIndex: "min",
    key: "min",
  },
  {
    title: "Modifier",
    dataIndex: "value",
    key: "value",
  },
];

export const PbkTable: React.FC = () => {
  return (
    <>
      <h4>Team pssSk to pbk trait</h4>
      <Table
        columns={statsTableCols}
        dataSource={tableData}
        pagination={false}
        size="small"
      />
    </>
  );
};
