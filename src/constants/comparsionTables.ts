import avgStats from "./availableTeams.avgPosStats.json";

const STATS_RELATED_TO_TRAITS = {
  thv: ["pssInt", "pssSk", "pssYds"],
  thp: ["pssLng", "pssYa"],
  tha: ["pssP", "pssTD"],
  bsc: ["fmbP"],
  elu: ["rusYa", "rusYds", "rusTD"],
  rtr: ["recTD", "tgt"],
  hnd: ["capa", "recYa"],
  rbk: ["pen"],
  pbk: ["pssSk"],
  pcv: ["defPssDef", "defInt", "pen"],
  tck: ["defTckT", "defFmbFrc"],
  prs: ["defSk"],
  rns: ["defTckLoss", "defSft", "defRunDef"],
  kpw: ["fgLng"],
  kac: ["fgP", "xpP"],
  ppw: ["pntLng", "pntTB", "pntA"],
  pac: ["pntIn20"],
};

const KandP = ["fgLng", "fgP", "xpP", "pntLng", "pntTB", "pntA", "pntIn20"];
const deffenseStats = ["defTckSolo", "defSk", "defInt"];
const offenseStats = ["recYds", "rec", "recTD", "rusTD", "prTD", "krTD"];
const statsOfPosition = {
  QB: ["rusYds", "pssTD", "qbW"],
  RB: ["rusYds", "rus", "recTD", "rusTD", "prTD", "krTD"],
  WR: offenseStats,
  TE: offenseStats,
  CB: deffenseStats,
  S: deffenseStats,
  LB: deffenseStats,
  DL: deffenseStats,
  K: KandP,
  P: KandP,
};

const statsAndVariancesRelation = {
  varianceTable1: [
    "pssCmp",
    "pss",
    "pssYds",
    "rusYds",
    "pssP",
    // "recYds", moved to table 3
    "capa",
    "prYds",
    "krYds",
    "krLng",
    "pntYds",
    "pntLng",
    "PntA",
    "fgLng",
  ],
  varianceTable2: [
    "pssLng",
    // "pssTD",
    // "rusTD",
    // "recTD",
    "pr",
    "prTD",
    "kr",
    "krTD",
    // "defInt",
    "defIntTD",
    // "defPssDef",
    // "defFmbFrc",
    // "defFmbRec",
    // "defFmbTD",
    // "defSk",
    // "defTckLoss",
    // "defSft",
    "xp",
    "xpa",
    "pnt",
    "pntTB",
    "pntIn20",
    "pntBlk",
    // "pen", // moved to separate table
  ],
  varianceTable3: [
    "pssYa",
    "rus",
    "rusYa",
    "rusLng",
    "tgt",
    "rec",
    "recYa",
    "recYds",
    "recLng",
    "defIntYds",
    "defIntLng",
    "defFmbYds",
    "defFmbLng",
    "defTckSolo",
    "defTckAst",
    "fgP",
    "xpP",
    "penYds",
    "defTckT",
  ],
  varianceTable4: [
    /*"fmb", "fmbLost", "pssInt", "pssSk"*/
  ] as string[],
  varianceTable5: ["rusTD", "recTD", "defSk", "defTckLoss"],
  varianceTable6: ["pssTD"],
  varianceTable7: ["fmbLost", "fmb", "pssInt"],
  varianceTable8: ["defFmbTD", "defSft"],
  varianceTable9: [/*"defInt", "defPssDef", */"defFmbFrc", "defFmbRec"],
  varianceTable10: ["fmbP"],
  varianceTable11: ["pssSk"],
  varianceTable12: ["opponentRusYds"],
  varianceTable13: ["pen"],
  varianceTable14: ["defPssPct"],
  varianceTable15: ["defInt_plus_defPssDef"],
};

const varianceTable1 = [
  { min: 0.401, max: Infinity, value: 4.0 },
  { min: 0.301, max: 0.4, value: 3.0 },
  { min: 0.201, max: 0.3, value: 2.0 },
  { min: 0.101, max: 0.2, value: 1.0 },
  { min: -0.05, max: 0.1, value: 0.0 },
  { min: -0.15, max: -0.051, value: -1.0 },
  { min: -0.25, max: -0.151, value: -2.0 },
  { min: -0.35, max: -0.251, value: -3.0 },
  { min: -Infinity, max: -0.351, value: -4.0 },
];

const varianceTable2 = [
  { min: 1.751, max: Infinity, value: 4.0 },
  { min: 1.251, max: 1.75, value: 3.0 },
  { min: 0.751, max: 1.25, value: 2.0 },
  { min: 0.251, max: 0.75, value: 1.0 },
  { min: -0.25, max: 0.25, value: 0.0 },
  { min: -0.45, max: -0.251, value: -1.0 },
  { min: -0.65, max: -0.451, value: -2.0 },
  { min: -0.85, max: -0.651, value: -3.0 },
  { min: -Infinity, max: -0.851, value: -4.0 },
];

const varianceTable3 = [
  { min: 1.001, max: Infinity, value: 4.0 },
  { min: 0.751, max: 1.0, value: 3.0 },
  { min: 0.501, max: 0.75, value: 2.0 },
  { min: 0.251, max: 0.5, value: 1.0 },
  { min: -0.25, max: 0.25, value: 0.0 },
  { min: -0.45, max: -0.251, value: -1.0 },
  { min: -0.65, max: -0.451, value: -2.0 },
  { min: -0.85, max: -0.651, value: -3.0 },
  { min: -Infinity, max: -0.851, value: -4.0 },
];

const varianceTable4 = [
  { min: 1.751, max: Infinity, value: -4.0 },
  { min: 1.251, max: 1.75, value: -3.0 },
  { min: 0.751, max: 1.25, value: -2.0 },
  { min: 0.251, max: 0.75, value: -1.0 },
  { min: -0.25, max: 0.25, value: 0.0 },
  { min: -0.45, max: -0.251, value: 1.0 },
  { min: -0.65, max: -0.451, value: 2.0 },
  { min: -0.85, max: -0.651, value: 3.0 },
  { min: -Infinity, max: -0.851, value: 4.0 },
];
// Touchdowns and Def Sacks
const varianceTable5 = [
  { min: 0, max: 1, value: 0 },
  { min: 1, max: 2, value: 1 },
  { min: 2, max: 3, value: 2 },
  { min: 3, max: 4, value: 3 },
  { min: 4, max: Infinity, value: 4 },
];
// QB touchdowns
const varianceTable6 = [
  { min: 0, max: 1, value: -2 },
  { min: 1, max: 2, value: 0 },
  { min: 2, max: 3, value: 1 },
  { min: 3, max: 4, value: 2 },
  { min: 4, max: 5, value: 3 },
  { min: 5, max: Infinity, value: 4 },
];
// Interceptions and Fumbles
const varianceTable7 = [
  { min: 0, max: 1, value: 2 },
  { min: 1, max: 2, value: 0 },
  { min: 2, max: 3, value: -2 },
  { min: 3, max: 4, value: -3 },
  { min: 4, max: Infinity, value: -4 },
];
// Safety
const varianceTable8 = [
  { min: 0, max: 1, value: 0 },
  { min: 1, max: Infinity, value: 3 },
];
// Passes Defended
const varianceTable9 = [
  { min: 0, max: 1, value: -1 },
  { min: 1, max: 2, value: 2 },
  { min: 2, max: Infinity, value: 4 },
];
// Fumble Percentage
const varianceTable10 = [
  { min: 0, max: 0.01, value: 2 },
  { min: 0.01, max: 0.04, value: 1 },
  { min: 0.0401, max: 0.067, value: 0 },
  { min: 0.068, max: 0.1, value: -1 },
  { min: 0.101, max: 0.2, value: -2 },
  { min: 0.201, max: 0.4, value: -3 },
  { min: 0.401, max: Infinity, value: -4 },
];
// Times Sacked
const varianceTable11 = [
  { min: 0, max: 1, value: 2 },
  { min: 1, max: 2, value: 1 },
  { min: 2, max: 3, value: 0 },
  { min: 3, max: 4, value: -1 },
  { min: 4, max: 6, value: -2 },
  { min: 6, max: Infinity, value: -3 },
];
//Defensive run stopping
const varianceTable12 = [
  { min: 0, max: 0.5, value: 3 },
  { min: 80, max: 99, value: 2 },
  { min: 100, max: 109, value: 1 },
  { min: 110, max: 120, value: 0 },
  { min: 121, max: 130, value: -1 },
  { min: 131, max: 140, value: -2 },
  { min: 141, max: 150, value: -3 },
  { min: 151, max: Infinity, value: -4 },
];
// penalties
const varianceTable13 = [
  { min: 0, max: 1, value: 1 },
  { min: 1, max: 2, value: -1 },
  { min: 2, max: 3, value: -3 },
  { min: 3, max: Infinity, value: -4 },
];
// defensive pass completion
const varianceTable14 = [
  { min: -Infinity, max: 0.53, value: 3 },
  { min: 0.54, max: 0.58, value: 2 },
  { min: 0.58, max: 0.62, value: 1 },
  { min: 0.62, max: 0.66, value: 0 },
  { min: 0.66, max: Infinity, value: -1 },
];
// defPssDef + defInt combined
const varianceTable15 = [
  { min: 0, max: 1, value: 0 },
  { min: 1, max: 2, value: 1 },
  { min: 2, max: 3, value: 2 },
  { min: 3, max: Infinity, value: 4 },
]

const VARIANCES = {
  varianceTable1,
  varianceTable2,
  varianceTable3,
  varianceTable4,
  varianceTable5,
  varianceTable6,
  varianceTable7,
  varianceTable8,
  varianceTable9,
  varianceTable10,
  varianceTable11,
  varianceTable12,
  varianceTable13,
  varianceTable14,
  varianceTable15,
};

const notUsedStats = [
  "gbW",
  "qbL",
  "qbT",
  "qbOTL",
  "gp",
  "gs",
  "min",
  "pssSkYds",
  "prLng",
  "fg0",
  "fga0",
  "fg20",
  "fga20",
  "fg30",
  "fga30",
  "fg40",
  "fga40",
  "fg50",
  "fga50",
  "season",
  "utid",
  "jerseyNumber",
];

const getPlayerStatsComperesion = (statsObj: any, pos: any) => {
  const averageStats = avgStats.find((el) => el.pos === pos);

  const playerStats = {
    ...statsObj,
  };

  const statsDiffs = Object.keys(playerStats).reduce((acc, stat) => {
    if (
      (playerStats[stat] !== undefined || playerStats[stat] !== null) &&
      !notUsedStats.includes(stat) &&
      stat !== "gs" &&
      averageStats
    ) {
      //@ts-ignore
      const statsDiffsStep1 = playerStats[stat] - averageStats[stat] || 0;
      //@ts-ignore
      acc[stat] = divideStats(statsDiffsStep1, averageStats[stat]);
    }
    return acc;
  }, {});

  return statsDiffs;
};

const divideStats = (stat1: number, stat2: number) => {
  if (!stat1 || !stat2) return 0;
  return stat1 / stat2;
};

const getComputedStats = (stats: any) => {
  return {
    pssP: divideStats(stats["pssCmp"], stats["pss"]),
    pssYa: divideStats(stats["pssYds"], stats["pss"]),
    rusYa: divideStats(stats["rusYds"], stats["rus"]),
    capa: divideStats(stats["rec"], stats["tgt"]),
    recYa: divideStats(stats["recYds"], stats["tgt"]),
    fgP:
      +stats["fg0"] +
        +stats["fg20"] +
        +stats["fg30"] +
        +stats["fg40"] +
        +stats["fg50"] || 0,
    xpP: divideStats(stats["xp"], stats["xpa"]),
    pntA: divideStats(stats["pntYds"], stats["pnt"]),
    fmbP: divideStats(stats["fmb"], +stats["rec"] + +stats["rus"]),
    defTckT: +stats["defTckAst"] + +stats["defTckSolo"],
    defInt_plus_defPssDef: +stats["defPssDef"] + +stats["defInt"],
  };
};

const TIME_MODIFIERS = (time: number) => {
  if (time >= 30) {
    return 1;
  } else if (time >= 29) {
    return 0.976;
  } else if (time >= 28) {
    return 0.933;
  } else if (time >= 27) {
    return 0.9;
  } else if (time >= 26) {
    return 0.867;
  } else if (time >= 25) {
    return 0.833;
  } else if (time >= 24) {
    return 0.8;
  } else if (time >= 23) {
    return 0.767;
  } else if (time >= 22) {
    return 0.733;
  } else if (time >= 21) {
    return 0.7;
  } else if (time >= 20) {
    return 0.667;
  } else if (time >= 19) {
    return 0.633;
  } else if (time >= 18) {
    return 0.6;
  } else if (time >= 17) {
    return 0.567;
  } else if (time >= 16) {
    return 0.533;
  } else if (time >= 15) {
    return 0.5;
  } else if (time >= 14) {
    return 0.467;
  } else if (time >= 13) {
    return 0.433;
  } else if (time >= 12) {
    return 0.4;
  } else if (time >= 11) {
    return 0.367;
  } else if (time >= 10) {
    return 0.333;
  } else if (time >= 9) {
    return 0.3;
  } else if (time >= 8) {
    return 0.267;
  } else if (time >= 7) {
    return 0.233;
  } else if (time >= 6) {
    return 0.2;
  } else if (time >= 5) {
    return 0.167;
  }

  return 0;
};

function getVarianceTable(stat: any): keyof typeof statsAndVariancesRelation {
  let varianceTable;
  for (const table in statsAndVariancesRelation) {
    if (
      statsAndVariancesRelation[
        table as keyof typeof statsAndVariancesRelation
      ].map(s => s.toLowerCase()).includes(stat.toLowerCase())
    ) {
      varianceTable = table;
      break;
    }
  }
  return varianceTable as keyof typeof statsAndVariancesRelation;
}

function getVariance(
  value: number,
  varianceTableName: keyof typeof statsAndVariancesRelation
): number {
  const varianceTable = VARIANCES[varianceTableName];
  if (!varianceTable) return 0;
  for (const range of varianceTable) {
    if (value >= range.min && value < range.max) {
      return range.value;
    }
  }

  return 0;
}

function getMinuteFactoredVariance(
  value: number,
  stat: string,
  minutes: number
) {
  
  let varianceTable = getVarianceTable(stat);
  const variance = getVariance(value, varianceTable);
  return getTimeModifiedValue(variance, minutes);
}

function getTimeModifiedValue(value: number, minutes: number, pos?: string) {
  if ((pos === "K" || pos === "P") && !!minutes) {
    return value;
  }
  return value * TIME_MODIFIERS(minutes) || 0;
}

function getStatsFactors(statsDiffs: any, minutes: number, pos?: string) {
  const factors = Object.keys(statsDiffs).reduce((acc, stat) => {
    let min = minutes;
    if (pos === "K" || pos === "P") {
      min = 60;
    }
    if (stat === "opponentRusYds") {
      //@ts-ignore
      acc["defRunDef"] = getMinuteFactoredVariance(statsDiffs[stat], stat, min);
    } else {
      //@ts-ignore
      acc[stat] = getMinuteFactoredVariance(statsDiffs[stat], stat, min);
    }
    return acc;
  }, {});

  return factors;
}

function getTraitPotMultiplier (pot: number, trait: number) {
  const traitPotPctDiff = (trait - pot) / pot;
  return traitPotPctDiff > 0.6 
    ? 0.25 
    : traitPotPctDiff > 0.4 
      ? 0.5 
      : traitPotPctDiff > 0.2 
        ? 0.75 
        : traitPotPctDiff > -0.25 
            ? 1
            : traitPotPctDiff > -0.5
                ? 0.75
                : traitPotPctDiff > -0.75
                    ? 0.5
                    : 0.25;
}

function getFactorisedRatings(ratings: any, factors: any) {
  const { pos, ovr, pot, ovrs, pots, season, skills, ...rest } = ratings;

  const ratingsCopy = JSON.parse(JSON.stringify(rest));
  if (!Object.keys(factors).length) return ratingsCopy;

  const res = Object.keys(ratingsCopy).reduce((acc, trait) => {
    //@ts-ignore
    const relatedStats = STATS_RELATED_TO_TRAITS[trait];
    if (!relatedStats) return acc;

    for (const stat of relatedStats) {
      const multiplier = getTraitPotMultiplier(pot, ratingsCopy[trait]);
      //@ts-ignore
      acc[trait] = +acc[trait] || +ratingsCopy[trait] || 0;
      //@ts-ignore
      acc[trait] += (factors[stat] || 0) * multiplier;
    }
    return acc;
  }, {});
  return res;
}

function getAvgStatsByPos(pos: string) {
  const data = JSON.parse(
    JSON.stringify(avgStats.find((el) => el.pos === pos))
  );
  if (data) {
    //@ts-ignore
    delete data.pos;
  }
  return data;
}

const getProgressionRatingImpact = (
  playerPotential: number,
  newRating: number
) => {
  const diff = playerPotential - Math.abs(newRating);

  const thresholds = [
    { min: -Infinity, max: -25, value: -4 },
    { min: -25, max: -20, value: -3 },
    { min: -20, max: -10, value: -2 },
    { min: -10, max: 0, value: -1 },
    { min: 0, max: 5, value: 0 },
    { min: 5, max: 15, value: 1 },
    { min: 15, max: 30, value: 2 },
    { min: 30, max: 35, value: 3 },
    { min: 35, max: Infinity, value: 4 },
  ];

  for (const threshold of thresholds) {
    if (diff >= threshold.min && diff < threshold.max) {
      return threshold.value;
    }
  }
  return 0;
};

const statsWithNoPercentageComparsion = [
  "rusTD",
  "recTD",
  "defSk",
  "defTckLoss",
  "pssTD",
  "fmbLost",
  "fmb",
  "pssInt",
  "defFmbTD",
  "defSft",
  "defInt",
  "defPssDef",
  "defFmbFrc",
  "defFmbRec",
  "fmbP",
  "pssSk",
  "opponentRusYds",
  "defInt_plus_defPssDef",
  "pen",
  "defPssPct",
];

const getStatsWithNoPercentageComparsion = (
  obj: Record<string, number | string>
) => {
  const result = {};
  for (const key in obj) {
    if (statsWithNoPercentageComparsion.includes(key)) {
      //@ts-ignore
      result[key] = obj[key];
    }
  }

  return result;
};

export const comparsionTables = {
  STATS_OF_POSITION: statsOfPosition,
  NOT_USED_STATS: notUsedStats,
  VARIANCES,
  STATS_VARIANCES_RELATION: statsAndVariancesRelation,
  getComputedStats,
  getStatsFactors,
  getFactorisedRatings,
  getPlayerStatsComperesion,
  getTimeModifiedValue,
  getAvgStatsByPos,
  getProgressionRatingImpact,
  STATS_RELATED_TO_TRAITS,
  getStatsWithNoPercentageComparsion,
};
