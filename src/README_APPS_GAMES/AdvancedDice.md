# Advanced Dice Game

## Overview
The Advanced Dice Game is a feature-rich dice simulator for NeoCityOS, expanding on the classic dice game with multiple dice types, custom rules, advanced scoring, and achievement tracking. It’s designed for strategy and probability enthusiasts, all within a neon cyberpunk UI.

---

## Features
- **Multiple dice types**: Roll d4, d6, d8, d10, d12, d20, and more.
- **Custom roll rules and modifiers**: Apply custom rules and modifiers to each roll.
- **Scoreboard and roll history**: Track all rolls, statistics, and achievements.
- **Achievements**: Unlock badges for milestones (first roll, perfect roll, streaks, etc.).
- **Neon cyberpunk UI**: Animated dice, frequency charts, and glowing effects.

---

## How to Use
- **Open**: Click the Advanced Dice Game icon on the NeoCityOS desktop.
- **Select Dice**: Choose dice type and number.
- **Roll**: Click “Roll” to see results and scores.
- **History**: Review previous rolls, frequency charts, and achievements.

---

## UI/UX Details
- **Animated dice with neon effects**: Each roll is visualized with glowing dice and smooth transitions.
- **Customizable roll settings**: Select dice type and modifiers.
- **Scoreboard with detailed stats**: View total rolls, averages, high/low, and frequency charts.
- **Achievements panel**: See unlocked and locked achievements.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Loads statistics and prepares the UI.
- **Dice Logic**:
  - `roll()`: Handles dice rolling, randomization, and animation.
- **Statistics & Achievements**:
  - `updateStatistics()`, `checkAchievements()`, `saveStatistics()`, `loadStatistics()`: Track and persist stats and achievements.
- **Rendering**:
  - `updateDisplay()`, `generateFrequencyChart()`, `generateAchievementsList()`: Render stats, charts, and achievements.
- **Animation**:
  - `animateRoll(result)`: Animates the dice roll.
- **Import/Export**:
  - `exportData()`, `importData(file)`: Backup and restore roll history and stats.

#### How Modules Are Used
- On app launch, `init()` loads stats and sets up the UI.
- User rolls dice, triggering `roll()`, which updates stats, achievements, and UI.
- All stats and achievements are persisted for future sessions.

---

## Customization & Extensibility
- **Add new dice types or rules**: Extend the dice logic in the JS module.
- **Customize UI**: Edit CSS variables for neon themes.
- **Add new achievements**: Update the achievements logic and UI.

---

## Troubleshooting & FAQ
- **Rolls not updating?**
  - Check for JavaScript errors or invalid input.
- **UI glitches?**
  - Try reloading or clearing cache.

---

## Code Structure & Extension Points
- **Entry point**: `src/games/advancedDice.js`
- **Main class**: `AdvancedDiceGame`
- **Add new dice or rules**: Extend the main logic.
- **UI customization**: Edit `src/styles/games/advancedDice.css`.

---

**For developers:**
To add new dice, rules, or achievements, extend the class and update the UI logic.

---

## 🔗 Quick Navigation

- [🏠 Back to Main README](../../README.md) — Project overview
- [🛒 Store](./Store.md) — Virtual marketplace
- [📁 File Manager](./FileManager.md) — Manage files & folders
- [🌐 Browser](./Browser.md) — Web browsing
- [🧮 Algorithm Visualizer](./AlgorithmVisualizer.md) — Learn algorithms
- [🧱 Data Structures](./DataStructures.md) — Explore data structures
- [📝 Text Analyzer](./TextAnalyzer.md) — Analyze text
- [🎲 Dice Game](./DiceGame.md) — Classic dice game
- [🎲 Advanced Dice](./AdvancedDice.md) — Advanced dice rules
- [🧠 Memory Game](./MemoryGame.md) — Memory challenge
- [🔢 Number Guesser](./NumberGuesser.md) — Guess the number
- [🧩 Puzzle Solver](./PuzzleSolver.md) — Logic puzzles
- [🚀 Neon Jump](./NeonJump.md) — Platformer game 