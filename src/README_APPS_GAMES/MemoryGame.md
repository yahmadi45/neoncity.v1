# Memory Game

## Overview
The Memory Game is a classic card-matching game for NeoCityOS, reimagined with a neon cyberpunk interface. Test your memory and pattern recognition skills across multiple difficulty levels, with animated cards, sound effects, and score tracking.

---

## Features
- **Multiple difficulty levels**: Choose from easy, medium, or hard (4x4, 6x6, 8x8 grids).
- **Animated card flips and matches**: Smooth, glowing animations for every action.
- **Score and best time tracking**: Track your score, moves, and best completion times.
- **Sound effects**: Audio feedback for matches, errors, and game completion.
- **Neon-glow UI**: Modern, animated interface with cyberpunk visuals.

---

## How to Use
- **Open**: Click the Memory Game icon on the NeoCityOS desktop.
- **Start Game**: Click "New Game" to begin.
- **Select Difficulty**: Choose your preferred difficulty level.
- **Match Cards**: Click cards to flip and find pairs. Match all pairs to win.
- **Track Score**: View your score, moves, and best time on the scoreboard.

---

## UI/UX Details
- **Animated card flips and match highlights**: Each card action is visualized with glowing effects.
- **Sound effects for matches and errors**: Audio feedback for every match, mismatch, and game completion.
- **Scoreboard and timer**: Real-time updates for score, moves, and elapsed time.
- **Completion modal**: Animated modal with final stats and bonuses.
- **Responsive design**: Works on all screen sizes and input types.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Loads game state, sets default difficulty, and starts a new game.
- **Game Logic**:
  - `newGame()`, `setDifficulty()`, `createCards()`, `shuffleCards()`: Set up the game board and cards.
- **Card Actions**:
  - `flipCard(cardId)`, `checkMatch()`: Handle card flipping and matching logic.
- **Score & Timer**:
  - `updateDisplay()`, `startTimer()`, `stopTimer()`, `formatTime()`: Track and display score, moves, and time.
- **Game Completion**:
  - `gameComplete()`, `showCompletionMessage()`, `saveBestScore()`, `showBestScores()`: Handle end-of-game logic and best score tracking.
- **Persistence**:
  - `saveGameState()`, `loadGameState()`: Save and restore game progress.
- **Rendering**:
  - `renderCards()`: Draw the card grid and update the UI.

#### How Modules Are Used
- On app launch, `init()` loads the game state and prepares the UI.
- User starts a new game, selects difficulty, and matches cards by clicking.
- All actions update the UI, score, and timer in real time.
- Game completion triggers a modal with final stats and bonuses.

---

## Customization & Extensibility
- **Add new card sets or difficulty levels**: Extend the card symbol set or add new grid sizes in the JS module.
- **Customize card appearance**: Edit the CSS for new card styles or neon effects.
- **Add new features**: Implement new game modes, leaderboards, or multiplayer support by extending the main logic.

---

## Troubleshooting & FAQ
- **Cards not flipping?**
  - Check for JavaScript errors or try reloading the app.
- **Score not updating?**
  - Ensure game state is not corrupted or try starting a new game.
- **UI not updating?**
  - Try refreshing the page or clearing your browser cache.

---

## Code Structure & Extension Points
- **Entry point**: `src/games/memoryGame.js`
- **Main class**: `MemoryGame`
- **Add new card sets or rules**: Extend the main logic.
- **UI customization**: Edit `src/styles/games/memoryGame.css` for appearance tweaks.

---

**For developers:**
To add new card sets, rules, or features, extend the class and update the UI logic as needed.

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