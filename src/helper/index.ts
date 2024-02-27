import { weightings } from "../constants/ratingWeightings";
import { AllTraitsLoaded, GameStats, TraitsToDisplay } from "../interface";
import avgData from "../constants/availableTeams.avgPosStats.json";

export const mapData = (data: Record<string, any>) => {
  if (!data) {
    return null;
  }
  return Object.entries(data).map(([key, value], index) => {
    return {
      key: index,
      trait: key,
      value,
    };
  });
};

export const ovr = (ratings?: AllTraitsLoaded | null) => {
  if (!ratings) {
    return 0;
  }

  if (ratings.pos === undefined) {
    return 1;
  }

  let r = 0;
  const weights = weightings[ratings.pos as keyof typeof weightings];
  for (const key of Object.keys(weights)) {
    r +=
      +ratings[key as keyof TraitsToDisplay] *
      weights[key as keyof typeof weights];
  }

  return Math.round(r);
};

export const getAvgComparsion = (stats: any, pos: keyof typeof weightings) => {
  const avg = avgData.find((pData) => pData.pos === pos);
  const result: Record<string, number> = {};

  for (const key of Object.keys(stats)) {
    if (avg && key in stats && key in avg) {
      //@ts-ignore
      const value = ((stats[key] - avg[key]) / avg[key] || 0) * 100;
      if (!Number.isNaN(value)) {
        result[key] = value;
      }
    }
  }

  return result;
};
