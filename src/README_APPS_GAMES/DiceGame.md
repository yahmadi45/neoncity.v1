# Dice Game

## Overview
The Dice Game is a fast-paced, neon-themed game for NeoCityOS where users roll dice and compete for high scores. It features animated dice, sound effects, score tracking, and a responsive cyberpunk interface. The game is ideal for quick fun, probability exploration, or casual competition.

---

## Features
- **Roll one or more dice**: Choose the number of dice to roll each round.
- **Animated dice roll with sound effects**: Realistic dice animations and immersive audio.
- **Score tracking and history**: View your current score and a history of previous rolls.
- **Neon-glow UI and responsive design**: Modern, animated interface with cyberpunk visuals.
- **Customizable rules**: Easily extend the game with new dice types or scoring rules.

---

## How to Use
- **Open**: Click the Dice Game icon on the NeoCityOS desktop.
- **Roll**: Click the "Roll" button to roll the dice.
- **View Results**: See the outcome and score in the results panel.
- **History**: Review previous rolls and scores in the history panel.

---

## UI/UX Details
- **Animated dice with neon highlights**: Each roll is visualized with glowing dice and smooth transitions.
- **Sound effects for rolling**: Audio feedback for each roll enhances immersion.
- **Scoreboard with real-time updates**: Scores and history update instantly after each roll.
- **Responsive design**: Works on all screen sizes and input types.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Sets up the game, binds UI elements, and prepares the initial state.
- **Dice Logic**:
  - `rollDice()`: Handles the core dice rolling logic, including randomization and animation.
  - `getDiceResult()`: Calculates the result for each roll.
- **Score Tracking**:
  - `updateScore()`, `updateHistory()`: Manage the current score and roll history.
- **Rendering & Animation**:
  - `renderDice()`, `animateRoll()`: Visualize dice and animate rolls.
- **Sound Effects**:
  - `playSound()`: Play audio feedback for dice rolls and events.
- **Event Handling**:
  - Bind UI controls (roll button, dice selection, etc.) to game logic.

#### How Modules Are Used
- On app launch, `init()` prepares the UI and sets up event listeners.
- User clicks "Roll" to trigger `rollDice()`, which animates the dice and updates the score/history.
- All UI updates and sound effects are handled in real time for a smooth experience.

---

## Customization & Extensibility
- **Add new dice types or rules**: Extend the dice logic in the JS module to support custom dice or scoring systems.
- **Customize dice appearance**: Edit the CSS for new dice styles or neon effects.
- **Add new features**: Implement new game modes, leaderboards, or multiplayer support by extending the main logic.

---

## Troubleshooting & FAQ
- **Dice not rolling?**
  - Check for JavaScript errors or try reloading the app.
- **Sound not playing?**
  - Ensure your browser allows audio and the volume is not muted.
- **UI not updating?**
  - Try refreshing the page or clearing your browser cache.

---

## Code Structure & Extension Points
- **Entry point**: `src/games/dice.js`
- **Main class/module**: Dice game logic (see file for structure)
- **Add new rules or dice types**: Extend the main logic in `src/games/dice.js`.
- **UI customization**: Edit `src/styles/games/dice.css` for appearance tweaks.

---

**For developers:**
To add new rules, dice types, or features, extend the main logic in `src/games/dice.js` and update the UI as needed.

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