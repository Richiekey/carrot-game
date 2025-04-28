// web/src/lib/types.ts

// Represents a single farm plot as returned by the API
export interface Plot {
    plot_id: number
    planted_at: string       // ISO timestamp
    watered_days: string[]   // array of ISO timestamps
    last_watered_at: string | null
    harvested: boolean
  }
  
  // Represents the farm-wide state for a user
  export interface FarmState {
    seed_balance: number
    last_claimed: string | null
    upgrade_level: number
  }
  
  // Combined response from /api/farm
  export interface FarmData {
    plots: Plot[]
    state: FarmState
  }
  