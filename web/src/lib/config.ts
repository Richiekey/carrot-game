// how many real days until a carrot is “ripe”
export const CARROT_GROWTH_DAYS = 7

// extra days past ripeness to allow harvest before it “expires”
export const HARVEST_WINDOW_DAYS = 3

// SEED costs
export const SEED_COSTS = {
  plant: 1,
  revive: 5,
  upgradeTier: {
    1: 5,  // +5 plots
    2: 10, // +5 more
    3: 15, // etc.
    4: 20,
  }
}

// probability table based on missed water days
export interface ProbRow {
  daysMissed: number
  golden: number
  perfect: number
  normal: number
  dried: number
  dead: number
}

export const PROBABILITY_TABLE: ProbRow[] = [
  { daysMissed: 0, golden: 0.05, perfect: 0.10, normal: 0.85, dried: 0,    dead: 0 },
  { daysMissed: 1, golden: 0,    perfect: 0.05, normal: 0.85, dried: 0.10,   dead: 0 },
  { daysMissed: 2, golden: 0,    perfect: 0.025,normal: 0.80, dried: 0.175,  dead: 0 },
  { daysMissed: 3, golden: 0,    perfect: 0,     normal: 0.75, dried: 0.25,   dead: 0 },
  { daysMissed: 4, golden: 0,    perfect: 0,     normal: 0.50, dried: 0.50,   dead: 0 },
  { daysMissed: 5, golden: 0,    perfect: 0,     normal: 0.25, dried: 0.75,   dead: 0 },
  { daysMissed: 6, golden: 0,    perfect: 0,     normal: 0,    dried: 1.0,    dead: 0 },
  { daysMissed: 7, golden: 0,    perfect: 0,     normal: 0,    dried: 0,      dead: 1.0 },
]
