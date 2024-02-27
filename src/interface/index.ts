import { weightings } from "../constants/ratingWeightings";

export type TraitsToDisplay = {
  hgt: number;
  stre: number;
  spd: number;
  endu: number;
  thv: number;
  thp: number;
  tha: number;
  bsc: number;
  elu: number;
  rtr: number;
  hnd: number;
  rbk: number;
  pbk: number;
  pcv: number;
  tck: number;
  prs: number;
  rns: number;
  kpw: number;
  kac: number;
  ppw: number;
  pac: number;
};

export type AllTraitsLoaded = TraitsToDisplay & {
  fuzz: number;
  pos: keyof typeof weightings;
  pot: number;
  season: number;
  skills: string[];
  cch: number;
  dst: number;
  mgt: number;
  ost: number;
  sst: number;
};

export type GameStats = {
  gs: number;
  min: number;
  fmb: number;
  fmbLost: number;
  pssCmp: number;
  pss: number;
  pssYds: number;
  pssTD: number;
  pssInt: number;
  pssLng: number;
  pssSk: number;
  pssSkYds: number;
  rus: number;
  rusYds: number;
  rusTD: number;
  rusLng: number;
  tgt: number;
  rec: number;
  recYds: number;
  recTD: number;
  recLng: number;
  pr: number;
  prYds: number;
  prTD: number;
  prLng: number;
  kr: number;
  krYds: number;
  krTD: number;
  krLng: number;
  defInt: number;
  defIntYds: number;
  defIntTD: number;
  defIntLng: number;
  defPssDef: number;
  defFmbFrc: number;
  defFmbRec: number;
  defFmbYds: number;
  defFmbTD: number;
  defFmbLng: number;
  defSk: number;
  defTckSolo: number;
  defTckAst: number;
  defTckLoss: number;
  defSft: number;
  fg0: number;
  fga0: number;
  fg20: number;
  fga20: number;
  fg30: number;
  fga30: number;
  fg40: number;
  fga40: number;
  fg50: number;
  fga50: number;
  fgLng: number;
  xp: number;
  xpa: number;
  pnt: number;
  pntYds: number;
  pntLng: number;
  pntTB: number;
  pntIn20: number;
  pntBlk: number;
  pen: number;
  penYds: number;
  teamPssSk: number;
  teamRusYds: number;
};


export type MainState = {
  traitsBefore: AllTraitsLoaded;
  gameStats: GameStats;
  traitsAfter: AllTraitsLoaded;
};