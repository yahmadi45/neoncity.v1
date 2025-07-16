# Number Guesser

## Overview
Number Guesser is a fast-paced guessing game for NeoCityOS where players try to guess a randomly chosen number in as few attempts as possible. It features a neon cyberpunk interface, real-time feedback, and score tracking.

[▶️ Watch the demo video](../../number-guesser-vid.mp4)

---

## Features
- **Random number generation**: Each game picks a new number within a configurable range.
- **Input validation and feedback**: Real-time hints (higher/lower), input checks, and animated feedback.
- **Score and attempt tracking**: Track your attempts, score, and best performance.
- **Guess history and efficiency**: Review your guesses and see efficiency stats.
- **Neon-glow UI and sound effects**: Animated feedback and immersive audio.

---

## How to Use
- **Open**: Click the Number Guesser icon on the NeoCityOS desktop.
- **Start Game**: Click "New Game" to begin.
- **Guess**: Enter a number and submit your guess.
- **Feedback**: Receive hints (higher/lower), see your guess history, and track attempts.
- **Win/Lose**: Find the number within the allowed attempts to win, or try again.

---

## UI/UX Details
- **Animated feedback for correct/incorrect guesses**: Visual and audio cues for every guess.
- **Scoreboard and attempt counter**: Real-time updates for attempts, score, and best score.
- **Guess history and efficiency**: See all previous guesses and efficiency stats in a modal.
- **Sound effects for win/loss**: Audio feedback for game results.
- **Responsive design**: Works on all screen sizes and input types.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Starts a new game and prepares the UI.
- **Game Logic**:
  - `newGame()`: Generates a new target number and resets state.
  - `makeGuess()`: Handles user input, validates guesses, and updates state.
  - `provideFeedback()`, `generateHint()`: Give real-time hints and feedback.
- **Score & Stats**:
  - `calculateScore()`, `calculateEfficiency()`, `showGameStats()`: Compute and display score, efficiency, and guess history.
- **Persistence**:
  - `saveBestScore()`, `loadBestScore()`, `resetBestScore()`: Store and manage best scores.
- **UI & Feedback**:
  - `updateDisplay()`, `updateMessage()`, `updateHint()`, `showEndModal()`: Update the UI and show modals for win/loss.
- **Customization**:
  - `setRange(min, max)`: Change the guessing range.
  - `demonstrateBinarySearch()`, `showBinarySearchDemo()`: Educational demo for binary search strategy.

#### How Modules Are Used
- On app launch, `init()` starts a new game and prepares the UI.
- User enters guesses, triggering `makeGuess()`, which updates attempts, feedback, and score.
- All results, hints, and stats are updated in real time.
- Game end triggers a modal with stats and options to play again.

---

## Customization & Extensibility
- **Change number range or scoring rules**: Update the JS module to set new ranges or scoring logic.
- **Add new feedback types**: Extend the feedback logic for more hints or educational features.
- **UI customization**: Edit the CSS for new themes or effects.

---

## Troubleshooting & FAQ
- **Guesses not registering?**
  - Check for JavaScript errors or invalid input.
- **Score not updating?**
  - Ensure game state is not corrupted or try starting a new game.
- **UI not updating?**
  - Try refreshing the page or clearing your browser cache.

---

## Code Structure & Extension Points
- **Entry point**: `src/games/numberGuesser.js`
- **Main class**: `NumberGuesser`
- **Add new rules or feedback types**: Extend the main logic.
- **UI customization**: Edit `src/styles/games/numberGuesser.css` for appearance tweaks.

---

**For developers:**
To add new rules, feedback types, or features, extend the class and update the UI logic as needed. 

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