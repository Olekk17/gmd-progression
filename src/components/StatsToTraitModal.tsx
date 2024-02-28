type Props = {
  traitModifiers: Record<string, number | string>[];
};

export const StatsToTraitData: React.FC<Props> = ({ traitModifiers }) => {
  return (
    <div style={{ height: "150px", minWidth: "1px", display: "flex", gap: "10px"}}>
      {traitModifiers.map((trait) => {
        return (
          <div style={{ border: "1px solid #000", padding: "5px"}}>
            <h4>{trait.trait}</h4>
            <p>{trait.value}</p>
          </div>
        );
      })}
      Sum: {traitModifiers.reduce((acc, curr) => acc + +curr.value, 0)}
    </div>
  );
};
