import { PbkTable } from "./PbkTable";
import { RbkTable } from "./RbkTable";
import { TimeModifierTable } from "./TimeModifierTable";
import { VarianceTables } from "./VarianceTables";

export const Tables: React.FC = () => {
  return (
    <div
      className="tables-container"
      style={{ display: "flex", gap: "50px", marginTop: "20px" }}
    >
      <div className="time-table" style={{ maxWidth: "10vw" }}>
        <TimeModifierTable />
      </div>
      <div className="variance-tables">
        <VarianceTables />
      </div>
      <div className="rbk-table">
        <RbkTable />
      </div>
      <div className="pbk-table">
        <PbkTable />
      </div>
    </div>
  );
};
