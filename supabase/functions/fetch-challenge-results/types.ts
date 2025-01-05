export interface ApiResponse {
  items: Item[];
}

export interface Item {
  gameToken: string;
  playerName: string;
  userId: string;
  totalScore: number;
  isLeader: boolean;
  pinUrl: string;
  game: Game;
}

export interface Game {
  token: string;
  type: string;
  mode: string;
  state: string;
  roundCount: number;
  timeLimit: number;
  forbidMoving: boolean;
  forbidZooming: boolean;
  forbidRotating: boolean;
  streakType: string;
  map: string;
  mapName: string;
  panoramaProvider: number;
  bounds: Bounds;
  round: number;
  rounds: Round[];
  player: Player;
  progressChange: ProgressChange;
}

export interface Bounds {
  min: LatLng;
  max: LatLng;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Round {
  lat: number;
  lng: number;
  panoId: string;
  heading: number;
  pitch: number;
  zoom: number;
  streakLocationCode: string;
  startTime: string; // ISO date string
}

export interface Player {
  totalScore: Score;
  totalDistance: Distance;
  totalDistanceInMeters: number;
  totalStepsCount: number;
  totalTime: number;
  totalStreak: number;
  guesses: Guess[];
  isLeader: boolean;
  currentPosition: number;
  pin: Pin;
  newBadges: any[]; // Adjust if necessary
  explorer: any; // Adjust if necessary
  id: string;
  nick: string;
  isVerified: boolean;
  flair: number;
  countryCode: string;
}

export interface Score {
  amount: string; // May be a numeric string
  unit: string;
  percentage: number;
}

export interface Distance {
  meters: DistanceUnit;
  miles: DistanceUnit;
}

export interface DistanceUnit {
  amount: string; // May be a numeric string
  unit: string;
}

export interface Guess {
  lat: number;
  lng: number;
  timedOut: boolean;
  timedOutWithGuess: boolean;
  skippedRound: boolean;
  roundScore: Score;
  roundScoreInPercentage: number;
  roundScoreInPoints: number;
  distance: Distance;
  distanceInMeters: number;
  stepsCount: number | null;
  streakLocationCode: string | null;
  time: number;
}

export interface Pin {
  url: string;
  anchor: string;
  isDefault: boolean;
}

export interface ProgressChange {
  xpProgressions: XPProgression[];
  awardedXp: AwardedXp;
  medal: number;
  competitiveProgress: any; // Adjust if necessary
  rankedSystemProgress: any; // Adjust if necessary
  rankedTeamDuelsProgress: any; // Adjust if necessary
}

export interface XPProgression {
  xp: number;
  currentLevel: Level;
  nextLevel: Level;
  currentTitle: Title;
}

export interface Level {
  level: number;
  xpStart: number;
}

export interface Title {
  id: number;
  tierId: number;
  minimumLevel: number;
  name: string;
}

export interface AwardedXp {
  totalAwardedXp: number;
  xpAwards: XPAward[];
}

export interface XPAward {
  xp: number;
  reason: string;
  count: number;
}
