import { Table } from "antd";
import { comparsionTables } from "../constants/comparsionTables";

const arr = [141, 131, 121, 111, 101, 81, 80];

const tableData = arr.map((min, index, array) => {
  if (index === array.length - 1) {
    return {
      min: `<=${min}`,
      value: comparsionTables.BLOCKING_CHANGE_CALC.rbkChangeByTeamRusYds(min),
    };
  }

  return {
    min: `>${min - 1}`,
    value: comparsionTables.BLOCKING_CHANGE_CALC.rbkChangeByTeamRusYds(min),
  };
});

const statsTableCols = [
  {
    title: "teamRusYds",
    dataIndex: "min",
    key: "min",
  },
  {
    title: "Modifier",
    dataIndex: "value",
    key: "value",
  },
];

export const RbkTable: React.FC = () => {
  return (
    <>
      <h4>Team rusYds to rbk trait</h4>
      <Table
        columns={statsTableCols}
        dataSource={tableData}
        pagination={false}
        size="small"
      />
    </>
  );
};
