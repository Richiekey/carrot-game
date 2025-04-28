# 🌿 Seed-to-Harvest Carrot Game – Full Game Logic Overview

## 1. 🌱 Planting Logic
- Function: `plantCarrot(farm, plotIndex)`
- Deducts 1 SEED, checks if plot is empty
- Sets `plantedAt = Date.now()` and generates unique `id`

## 2. 🪴 Growth Logic
- Function: `getCarrotStage(plantedAt, currentTime)`
- Visual stage (1–7) updates based on real-time days since planting
- Only updates visuals if watered using `isWateredToday()`
- Sprite: `<CarrotStageSprite stage={stage} watered={true} />`

## 3. 💧 Watering Logic
- Function: `waterCarrot(plot)`
- Adds `Date.now()` to `wateredDays[]`, updates `lastWateredAt`
- Prevents watering more than once per UTC day

## 4. 🥕 Harvest Logic
- Function: `getHarvestOutcome(daysMissed)`
- Outcomes based on watering days missed:

| Days Missed | Golden | Perfect | Normal | Dried |
|-------------|--------|---------|--------|-------|
| 0           | 5%     | 10%     | 85%    | 0%    |
| 1           | 0%     | 5%      | 85%    | 10%   |
| 2           | 0%     | 2.5%    | 80%    | 17.5% |
| 3           | 0%     | 0%      | 75%    | 25%   |
| 4           | 0%     | 0%      | 50%    | 50%   |
| 5           | 0%     | 0%      | 25%    | 75%   |
| 6           | 0%     | 0%      | 0%     | 100%  |
| 7           | 0%     | 0%      | 0%     | 0% (Dead) |

## 5. ☠️ Death & Expiry Logic
- Watering neglect death: 7 missed days
- Expiry death: unharvested after 3 days post-maturity (Day 10)
- Functions: `isCarrotDead()`, `reviveCarrot()`, `burnCarrot()`

## 6. 🌾 Farmland System Logic
- Start with 10 plots, upgrade to max 30
- Costs: +5 SEED per upgrade tier (up to 20)
- Full 30-plot farms eligible for NFT mint

## 7. 🌿 SEED Economy
- Spend: Planting (1), Upgrades (5–20), Revival (10)
- Earn: Daily claim (+100), Dried carrot crush (+5)
- Function: `claimSeed()`, `crushDriedCarrot()`

## 8. 🧺 Claim Logic
- One claim per UTC day (tracked by `lastClaimed`)
- SEED added if claim is valid

## 9. 🖼️ Visual Sync Logic
- Stage only updates visually if watered that day
- Controlled by: `useCarrotGrowth()` hook and sprite props

## 10. 🔄 Backend Sync (Supabase)
- carrot_plots: `planted_at`, `watered_days`, `last_watered_at`, `harvested`
- carrot_farms: `plots[]`, `seedBalance`, `lastClaimed`

## 11. 🧪 QA & Edge Case Enforcement
- Block: double watering, pre-Day 7 harvest, low SEED actions, replanting full plot
- Death if 7 waterings missed or expired post-Day 10

here are all the problems with the wagmiclient.ts
1. [{
	"resource": "/workspaces/carrot-game/web/src/lib/wagmiClient.ts",
	"owner": "typescript",
	"code": "2749",
	"severity": 8,
	"message": "'WagmiProvider' refers to a value, but is being used as a type here. Did you mean 'typeof WagmiProvider'?",
	"source": "ts",
	"startLineNumber": 27,
	"startColumn": 11,
	"endLineNumber": 27,
	"endColumn": 24
}]
