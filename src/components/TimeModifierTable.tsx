import { Table } from "antd";
import { comparsionTables } from "../constants/comparsionTables";

const statsTableCols = [
  {
    title: 'Minutes played',
    dataIndex: 'min',
    key: 'min',
  },
  {
    title: 'Multiplier',
    dataIndex: 'value',
    key: 'value',
  },
];

export const TimeModifierTable: React.FC = () => {
  const arr = [0];
  for (let i = 5; i <= 30; i++) {
    arr.push(i);
  }

  const tableData = arr.map((min) => {
    return {
      min,
      value: comparsionTables.getTimeModifiedValue(1, min),
    };
  });

  return (
    <Table 
      columns={statsTableCols}
      dataSource={tableData}
      pagination={false}
      size="small"
    />
  )
  
};
