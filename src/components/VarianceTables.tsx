import { Table } from "antd";
import { comparsionTables } from "../constants/comparsionTables";

const columns = [
  {
    title: "min",
    dataIndex: "min",
    key: "min",
  },
  {
    title: "max",
    dataIndex: "max",
    key: "max",
  },
  {
    title: "value",
    dataIndex: "value",
    key: "value",
  },
];

type Props = {
  table: typeof comparsionTables.VARIANCES.varianceTable1;
  title: string;
};

const VarianceTable: React.FC<Props> = ({ table, title }) => (
  <div className="table-container">
    <h4>{title}</h4>
    <Table
      columns={columns}
      dataSource={table}
      pagination={false}
      size="small"
    />
  </div>
);

export const VarianceTables: React.FC = () => (
  <div
    className="variance-tables"
    style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}
  >
    {Object.values(comparsionTables.VARIANCES).map((table, i) => (
      <VarianceTable key={i} table={table} title={`Table ${i + 1}`} />
    ))}
  </div>
);
