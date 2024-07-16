import { TimeModifierTable } from "./TimeModifierTable";
import { VarianceTables } from "./VarianceTables";

export const Tables: React.FC = () => (
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
    </div>
  );
