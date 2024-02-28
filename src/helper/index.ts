import { weightings } from "../constants/ratingWeightings";
import { AllTraitsLoaded, GameStats, TraitsToDisplay } from "../interface";
import avgData from "../constants/availableTeams.avgPosStats.json";
import { comparsionTables } from "../constants/comparsionTables";

export const mapData = (data: Record<string, any>, sort?: boolean) => {
  if (!data) {
    return null;
  }

  const res = Object.entries(data).map(([key, value], index) => {
    return {
      key: index,
      trait: key,
      value,
    };
  });

  if (sort) {
    res.sort((a, b) => a.trait.localeCompare(b.trait));
  }
  return res;
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

export function bound(x: number, min: number, max: number) {
  if (x < min) {
      return min;
  }
  if (x > max) {
      return max;
  }
  return x;
}

export function preparedStats(stats: Record<string, any>) {
  const statsObjCopy = JSON.parse(JSON.stringify(stats));
  if ('min' in statsObjCopy) {
    delete statsObjCopy.min;
  }
  if ('gs' in statsObjCopy) {
    delete statsObjCopy.gs;
  }
  if ('teamPssSk' in statsObjCopy && 'teamRusYds' in statsObjCopy) {
    const cachedTeamPssSk = statsObjCopy.teamPssSk;
    const cachedTeamRusYds = statsObjCopy.teamRusYds;
    delete statsObjCopy.teamPssSk;
    delete statsObjCopy.teamRusYds;
    statsObjCopy.teamPssSk = cachedTeamPssSk;
    statsObjCopy.teamRusYds = cachedTeamRusYds;
  }
  comparsionTables.NOT_USED_STATS.forEach((stat) => {
    if (stat in statsObjCopy) {
      delete statsObjCopy[stat];
    }
  })
  
  return statsObjCopy;
}

export const getTraitModifiers = (stats: GameStats, trait?: keyof typeof comparsionTables.STATS_RELATED_TO_TRAITS) => {
  if (!trait) {
    return [];
  };
  const statsCopy = JSON.parse(JSON.stringify(stats));
  const traits = comparsionTables.STATS_RELATED_TO_TRAITS[trait];

  if (!traits) {
    return [];
  }
  const traitModifiers: Record<string, number | string>[] = [];
  for (const key of traits) {
    traitModifiers.push({ trait: key, value: statsCopy[key] });
  }
  return traitModifiers;
};
