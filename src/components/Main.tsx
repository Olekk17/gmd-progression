import { notification } from "antd";
import { useState } from "react";
import { AllTraitsLoaded, MainState } from "../interface";
import { StatsTable } from "./StatsTable";
import { Row, Col } from "react-bootstrap";
import {
  getAvgComparsion,
  ovr,
  bound,
  preparedStats,
  getTraitModifiers,
} from "../helper";
import { comparsionTables } from "../constants/comparsionTables";
import { weightings } from "../constants/ratingWeightings";
import _ from "lodash";
import { Tables } from "./Tables";
import { StatsToTraitData } from "./StatsToTraitModal";

export const Main: React.FC = () => {
  const [data, setData] = useState<MainState | null>(null);
  const [hoveredTraitModifier, setHoveredTraitModifier] = useState<
    string | null
  >(null);

  const statsObjCopy = data && {
    ...data.gameStats,
    ...comparsionTables.getComputedStats(data.gameStats),
  };

  const statsDiffs = comparsionTables.getPlayerStatsComperesion(
    statsObjCopy,
    data?.traitsBefore.pos
  );

  const statsWithNoPercentageComparsion = statsObjCopy
    ? comparsionTables.getStatsWithNoPercentageComparsion(statsObjCopy)
    : {};

  const dataToUseWithTables = {
    ...statsDiffs,
    ...statsWithNoPercentageComparsion,
  };

  const statsFactors =
    statsObjCopy &&
    comparsionTables.getStatsFactors(
      dataToUseWithTables,
      statsObjCopy.min,
      data?.traitsBefore.pos
    );

  const ratingsToBeChanged =
    data?.traitsBefore.pos && Object.keys(weightings[data?.traitsBefore.pos]);
  const factorisedRatings =
    ratingsToBeChanged &&
    Object.fromEntries(
      Object.entries(
        comparsionTables.getFactorisedRatings(data?.traitsBefore, statsFactors)
      )
        .filter(([key, value]) => ratingsToBeChanged.includes(key))
        .map(([key, value]: [any, any]) => [
          key,
          bound(Math.round(value * 100) / 100, 0, 100),
        ])
    );
  const modifiedRatings =
    data &&
    ({
      ...data.traitsBefore,
      ...factorisedRatings,
    } as unknown as AllTraitsLoaded);

  const ovrPlayed = ovr(modifiedRatings);

  const influence =
  data &&
  comparsionTables.getProgressionRatingImpact(
    data?.traitsBefore.pot,
    ovrPlayed
  );

  const newRatings = factorisedRatings && {
    ...data.traitsBefore,
    ...Object.keys(factorisedRatings).reduce((acc, rating) => {
      if (!ratingsToBeChanged.includes(rating)) {
        //@ts-ignore
        acc[rating] = modifiedRatings[rating];
      } else {
        //@ts-ignore
        acc[rating] = bound(
          //@ts-ignore
          Math.round((+modifiedRatings[rating] + (!!statsObjCopy.min ? influence : 0)) * 100) / 100,
          0,
          100
        );
      }

      return acc;
    }, {}),
  };

  if (newRatings) {
    //@ts-ignore
    newRatings.ovr = ovr(newRatings);
    newRatings.season = data?.traitsAfter.season;
  }
  const correct =
    newRatings &&
    data?.traitsAfter &&
    JSON.stringify(newRatings) === JSON.stringify(data.traitsAfter);

  const preparedGameStats =
    data &&
    preparedStats({
      ...data.gameStats,
      ...comparsionTables.getComputedStats(data.gameStats),
    });

  return (
    <div className="Main">
      {!!data && !!newRatings && modifiedRatings && (
        <>
          <span>Minutes played {data.gameStats.min}</span>
          <br />
          <span>
            Time multiplier{" "}
            {comparsionTables.getTimeModifiedValue(1, data.gameStats.min, data.traitsBefore.pos)}
          </span>
          <StatsToTraitData
            traitModifiers={getTraitModifiers(
              preparedStats(statsFactors || {}),
              hoveredTraitModifier as keyof typeof comparsionTables.STATS_RELATED_TO_TRAITS
            )}
          />
          <div className="main-content">
            <Row
              className="main-content-row"
              style={{ display: "flex", gap: "10px" }}
            >
              <Col xs="3">
                <StatsTable data={preparedGameStats} title="Game stats" />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={preparedStats(
                    comparsionTables.getAvgStatsByPos(data.traitsBefore.pos)
                  )}
                  title="Avg stats by pos"
                />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={preparedStats(
                    getAvgComparsion(
                      statsObjCopy,
                      data.traitsBefore.pos
                    ) as unknown as AllTraitsLoaded
                  )}
                  title="Diffs"
                />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={preparedStats(statsFactors || {})}
                  title="Stats factors"
                />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={data.traitsBefore}
                  title={`Traits before game ${
                    data.traitsBefore.pos
                  } - ovr: ${ovr(data.traitsBefore)},
                  pot: ${data.traitsBefore.pot}`}
                />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={_.mapValues(
                    modifiedRatings,
                    (value: any, key: any) =>
                      //@ts-ignore
                      value - (data.traitsBefore[key] || 0)
                  )}
                  title={`Trait modifiers (hoverable)`}
                  onHover={setHoveredTraitModifier}
                />
              </Col>
              <Col xs="3">
                <StatsTable
                  data={modifiedRatings}
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
        </>
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
      <Tables />
    </div>
  );
};
