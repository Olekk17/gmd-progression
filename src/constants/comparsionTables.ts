import avgStats from "./availableTeams.avgPosStats.json";

const STATS_RELATED_TO_TRAITS = {
  thv: ["pssInt", "pssSk", "pssYds"],
  thp: ["pssLng", "pssYa"],
  tha: ["pssP", "pssTD"],
  bsc: ["fmb", "fmbLost"],
  elu: ["rusYa", "rusLng", "rusTD"],
  rtr: ["recTD", "recLng"],
  hnd: ["capa", "recYa"],
  rbk: ["penYds", "pen"],
  pcv: ["defPssDef", "defInt", "penYds", "pen"],
  tck: ["defTckSolo", "defTckAst", "defFmbFrc"],
  prs: ["defSk"],
  rns: ["defTckLoss", "defSft"],
  kpw: ["fgLng"],
  kac: ["fgP", "xpP"],
  ppw: ["pntLng", "pntTB", "pntA"],
  pac: ["pntIn20"],
};

const COMMON_POSTION_STATS = {
  "ratings.hgt": 1,
  "ratings.stre": 1,
  "ratings.spd": 1,
  "ratings.endu": 1,
  "ratings.ovr": 1,
  "ratings.skills": 1,
};

const POSITION_STATS = {
  QB: {
    ...COMMON_POSTION_STATS,
    "ratings.thv": 1,
    "ratings.tha": 1,
    "ratings.thp": 1,
    "ratings.run": "$ratings.elu",
  },
  RB: {
    ...COMMON_POSTION_STATS,
    "ratings.run": "$ratings.elu",
    "ratings.hnd": 1,
    "ratings.rtr": 1,
    "ratings.pbk": 1,
    "ratings.rbk": 1,
  },
  WR: {
    ...COMMON_POSTION_STATS,
    "ratings.rtr": 1,
    "ratings.run": "$ratings.elu",
    "ratings.hnd": 1,
    "ratings.rbk": 1,
    "ratings.pbk": 1,
  },
  TE: {
    ...COMMON_POSTION_STATS,
    "ratings.rbk": 1,
    "ratings.pbk": 1,
    "ratings.rtr": 1,
    "ratings.thv": 1,
    "ratings.tha": 1,
    "ratings.thp": 1,
    "ratings.run": "$ratings.elu",
    "ratings.hnd": 1,
  },
  OL: {
    ...COMMON_POSTION_STATS,
    "ratings.rbk": 1,
    "ratings.pbk": 1,
  },
  DL: {
    ...COMMON_POSTION_STATS,
    "ratings.tck": 1,
    "ratings.prs": 1,
    "ratings.rns": 1,
    "ratings.pcv": 1,
  },
  LB: {
    ...COMMON_POSTION_STATS,
    "ratings.tck": 1,
    "ratings.prs": 1,
    "ratings.rns": 1,
    "ratings.pcv": 1,
  },
  CB: {
    ...COMMON_POSTION_STATS,
    "ratings.tck": 1,
    "ratings.prs": 1,
    "ratings.rns": 1,
    "ratings.pcv": 1,
  },
  S: {
    ...COMMON_POSTION_STATS,
    "ratings.tck": 1,
    "ratings.prs": 1,
    "ratings.rns": 1,
    "ratings.pcv": 1,
  },
  K: {
    ...COMMON_POSTION_STATS,
    "ratings.kpw": 1,
    "ratings.kac": 1,
  },
  P: {
    ...COMMON_POSTION_STATS,
    "ratings.ppw": 1,
    "ratings.pac": 1,
  },
  KR: {
    ...COMMON_POSTION_STATS,
    "ratings.rtr": "$ratings.ovrs.KR",
  },
  PR: {
    ...COMMON_POSTION_STATS,
    "ratings.rtr": "$ratings.ovrs.PR",
  },
};

const leadersByPosition = new Map([
  ["QB", "Quarterback"],
  ["RB", "Running Backs"],
  ["WR", "Receivers"],
  ["TE", "Tight End"],
  ["CB", "Corner Backs"],
  ["S", "Safeties"],
  ["LB", "Linebacker"],
  ["DL", "Deffensive Tackles"],
  ["K", "Kicker"],
]);

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
  K: [
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
    "fgLng",
  ],
};

const statsAndVariancesRelation = {
  varianceTable1: [
    "pssCmp",
    "pss",
    "pssYds",
    "pssLng",
    "rus",
    // "rusYds",
    "rusLng",
    "pssP",
    "recYds",
    "capa",
    "prYds",
    "krYds",
    "krLng",
    "pntYds",
    "pntLng",
    "PntA",
  ],
  varianceTable2: [
    "pssTD",
    "rusTD",
    "recTD",
    "pr",
    "prTD",
    "kr",
    "krTD",
    "defInt",
    "defPssDef",
    "defFmbFrc",
    "defFmbRec",
    "defFmbTD",
    "defSk",
    "defTckLoss",
    "defSft",
    "xp",
    "xpa",
    "pnt",
    "pntTB",
    "pntIn20",
    "pntBlk",
    "pen",
  ],
  varianceTable3: [
    "pssYa",
    "rusYa",
    "tgt",
    "rec",
    "recYa",
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
  ],
  varianceTable4: ["fmb", "fmbLost", "pssInt" /*"pssSk"*/],
};

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

const varianceTable1 = JSON.parse(JSON.stringify(varianceTable2));

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

const VARIANCES = {
  varianceTable1,
  varianceTable2,
  varianceTable3,
  varianceTable4,
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

const pbkChangeByTeamPssSk = (num: number) => {
  if (num >= 8) {
    return -3;
  }
  if (num >= 6) {
    return -2;
  }
  if (num >= 4) {
    return -1;
  }
  if (num === 3) {
    return 0;
  }
  if (num === 2) {
    return 1;
  }
  if (num === 1) {
    return 2;
  }
  if (num === 0) {
    return 3;
  }
};

const rbkChangeByTeamRusYds = (num: number) => {
  if (num > 140) {
    return 3;
  }
  if (num > 130) {
    return 2;
  }
  if (num > 120) {
    return 1;
  }
  if (num > 110) {
    return 0;
  }
  if (num > 100) {
    return -1;
  }
  if (num > 80) {
    return -2;
  }
  return -3;
};

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
      stats["fg0"] +
        stats["fg20"] +
        stats["fg30"] +
        stats["fg40"] +
        stats["fg50"] || 0,
    xpP: divideStats(stats["xp"], stats["xpa"]),
    pntA: divideStats(stats["pntYds"], stats["pnt"]),
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
  } else if (time === 0) {
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
      ].includes(stat)
    ) {
      varianceTable = table;
      break;
    }
  }
  return varianceTable as keyof typeof statsAndVariancesRelation;
}

function getVariance(
  value: number,
  varianceTable: keyof typeof statsAndVariancesRelation
) {
  if (varianceTable === undefined) return 0;
  for (const range of VARIANCES[varianceTable]) {
    if (value >= range.min && value < range.max) {
      return range.value;
    }
  }
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

function getTimeModifiedValue(value: number, minutes: number) {
  return value * TIME_MODIFIERS(minutes) || 0;
}

function getStatsFactors(statsDiffs: any, minutes: number) {
  const factors = Object.keys(statsDiffs).reduce((acc, stat) => {
    //@ts-ignore
    acc[stat] = getMinuteFactoredVariance(statsDiffs[stat], stat, minutes);
    return acc;
  }, {});

  return factors;
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
      //@ts-ignore
      acc[trait] = +acc[trait] || +ratingsCopy[trait] || 0;
      //@ts-ignore
      acc[trait] += factors[stat] || 0;
    }
    return acc;
  }, {});
  return res;
}

function getAvgStatsByPos(pos: string) {
  const data = JSON.parse(
    JSON.stringify(avgStats.find((el) => el.pos === pos))
  );
  console.log(pos);
  console.log(data);
  if (data) {
    //@ts-ignore
    delete data.pos;
  }
  return data;
}

const getProgressionRatingImpact = (playerPotential: number, newRating: number) => {
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
    if (diff > threshold.min && diff <= threshold.max) {
      return threshold.value;
    }
  }
  return 0;
};

export const comparsionTables = {
  POSITION_STATS: POSITION_STATS,
  LEADERS_BY_POSITION: leadersByPosition,
  STATS_OF_POSITION: statsOfPosition,
  NOT_USED_STATS: notUsedStats,
  VARIANCES: { varianceTable1, varianceTable2, varianceTable3, varianceTable4 },
  STATS_VARIANCES_RELATION: statsAndVariancesRelation,
  BLOCKING_CHANGE_CALC: { pbkChangeByTeamPssSk, rbkChangeByTeamRusYds },
  getComputedStats,
  getStatsFactors,
  getFactorisedRatings,
  getPlayerStatsComperesion,
  getTimeModifiedValue,
  getAvgStatsByPos,
  getProgressionRatingImpact,
};
