import { Table } from "antd";
import { statsTableCols } from "../constants/traitsTable";
import { mapData } from "../helper";

type Props = {
  data: any;
  title: string | JSX.Element;
  backgroundColor?: string;
  sort?: boolean;
  onHover?: React.Dispatch<React.SetStateAction<string | null>>;
};

export const StatsTable: React.FC<Props> = ({ data, title, backgroundColor, sort, onHover }) => {
  const preparedData = mapData(data, sort);

  return (
    <div style={{ maxWidth: "20vw", backgroundColor }}>
      <h4>{title}</h4>
      {preparedData && (
        <Table
          columns={statsTableCols}
          dataSource={preparedData}
          pagination={false}
          size="small"
          onRow={(record, rowIndex) => {
            if (onHover) {
              return {
                onMouseEnter: () => onHover(record.trait),
                onMouseLeave: () => onHover(null),
              };
            }
            return {};
          }}
        />
      )}
    </div>
  );
};
