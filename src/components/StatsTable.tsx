import { Table } from "antd";
import { statsTableCols } from "../constants/traitsTable";
import { mapData } from "../helper";

type Props = {
  data: any;
  title: string;
  backgroundColor?: string;
};

export const StatsTable: React.FC<Props> = ({ data, title, backgroundColor }) => {
  const preparedData = mapData(data);
  return (
    <div style={{ maxWidth: "20vw", backgroundColor }}>
      <h4>{title}</h4>
      {preparedData && (
        <Table
          columns={statsTableCols}
          dataSource={preparedData}
          pagination={false}
          size="small"
        />
      )}
    </div>
  );
};
