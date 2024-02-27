import { notification } from "antd";
import { useState } from "react";
import { AllTraitsLoaded, MainState } from "../interface";
import { StatsTable } from "./StatsTable";
import { Row, Col } from "react-bootstrap";
import { getAvgComparsion, ovr } from "../helper";
import { comparsionTables } from "../constants/comparsionTables";
import { weightings } from "../constants/ratingWeightings";
import _ from "lodash";

export const Main: React.FC = () => {
  const [data, setData] = useState<MainState | null>(null);

  const pbkModifierRaw =
    data &&
    comparsionTables.BLOCKING_CHANGE_CALC.pbkChangeByTeamPssSk(
      data.gameStats.teamPssSk
    );
  const rbkModifierRaw =
    data &&
    comparsionTables.BLOCKING_CHANGE_CALC.rbkChangeByTeamRusYds(
      data.gameStats.teamRusYds
    );

  const rbkModifier =
    rbkModifierRaw &&
    comparsionTables.getTimeModifiedValue(rbkModifierRaw, data?.gameStats.min);
  const pbkModifier =
    pbkModifierRaw &&
    comparsionTables.getTimeModifiedValue(pbkModifierRaw, data?.gameStats.min);

  const statsObjCopy = data && {
    ...data.gameStats,
    ...comparsionTables.getComputedStats(data.gameStats),
  };

  const statsDiffs = comparsionTables.getPlayerStatsComperesion(
    statsObjCopy,
    data?.traitsBefore.pos
  );

  const statsFactors =
    statsObjCopy &&
    comparsionTables.getStatsFactors(statsDiffs, statsObjCopy.min);
  const ratingsToBeChanged =
    data?.traitsBefore.pos && Object.keys(weightings[data?.traitsBefore.pos]);
  const factorisedRatings =
    ratingsToBeChanged &&
    Object.fromEntries(
      Object.entries(
        comparsionTables.getFactorisedRatings(data?.traitsBefore, statsFactors)
      ).filter(([key, value]) => ratingsToBeChanged.includes(key))
    );

  const modifiedRatings =
    data &&
    ({
      ...data.traitsBefore,
      ...factorisedRatings,
      rbk: rbkModifier,
      pbk: pbkModifier,
    } as unknown as AllTraitsLoaded);

  const ovrPlayed = ovr(modifiedRatings);

  const influence =
    data &&
    comparsionTables.getProgressionRatingImpact(
      data?.traitsBefore.pot,
      ovrPlayed
    );

  const newRatings = factorisedRatings &&
    influence && {
      ...data.traitsBefore,
      ...Object.keys(factorisedRatings).reduce((acc, rating) => {
        if (!ratingsToBeChanged.includes(rating)) {
          //@ts-ignore
          acc[rating] = data.traitsBefore[rating];
        } else {
          //@ts-ignore
          acc[rating] = Math.round((+data.traitsBefore[rating] + influence) * 100) / 100;
        }

        return acc;
      }, {}),
    };

  if (newRatings) {
    //@ts-ignore
    newRatings.ovr = ovr(newRatings);
  }

  const correct = _.isEqual(newRatings, data?.traitsAfter);

  return (
    <div className="Main">
      {!!data && !!newRatings && (
        <div className="main-content">
          <Row style={{ display: "flex", gap: "10px" }}>
            <Col xs="3">
              <StatsTable
                data={data.traitsBefore}
                title={`Traits before game
                ${data.traitsBefore.pos} - ovr: ${ovr(
                  data.traitsBefore
                )}, pot: ${data.traitsBefore.pot}`}
              />
            </Col>
            <Col xs="3">
              <StatsTable data={data.gameStats} title="Game stats" />
            </Col>
            <Col xs="3">
              <StatsTable
                data={comparsionTables.getAvgStatsByPos(data.traitsBefore.pos)}
                title="Avg stats by pos"
              />
            </Col>
            <Col xs="3">
              <StatsTable
                data={
                  getAvgComparsion(
                    statsObjCopy,
                    data.traitsBefore.pos
                  ) as unknown as AllTraitsLoaded
                }
                title="Diffs"
              />
            </Col>
            <Col xs="3">
              <StatsTable
                data={modifiedRatings as unknown as AllTraitsLoaded}
                title={`Modified values ${ovrPlayed}`}
              />
            </Col>
            <Col xs="3">
              <h4>influence = {influence}</h4>
            </Col>
            <Col xs="3">
              <StatsTable
                data={newRatings}
                title={`Calculated traits after game - ${ovr(newRatings)}`}
                backgroundColor={correct ? "lightgreen" : "lightcoral"}
              />
            </Col>
            <Col xs="3">
              <StatsTable
                data={data.traitsAfter}
                title={`Traits calculated by Engine - ${ovr(
                  data.traitsAfter
                )}`}
                backgroundColor={correct ? "lightgreen" : "lightcoral"}
              />
            </Col>
          </Row>
        </div>
      )}
      <input
        type="file"
        onChange={(e) => {
          if (!e.target.files) return;
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const fileData = event.target?.result;
            if (typeof fileData !== "string") return;

            try {
              const parsedData = JSON.parse(fileData);
              if (typeof parsedData !== "object") return;

              setData(parsedData as MainState);
            } catch (error) {
              console.error("Error parsing JSON data:", error);
              notification.error({
                placement: "bottomRight",
                message: "Wrong data format",
              });
            }
          };
          reader.readAsText(file);
        }}
      />
    </div>
  );
};
