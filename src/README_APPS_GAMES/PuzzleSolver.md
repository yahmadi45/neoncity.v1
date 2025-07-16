# Puzzle Solver

## Overview
Puzzle Solver is a challenging logic and pattern game for NeoCityOS, offering a variety of puzzles (Sudoku, 8-puzzle, crossword, sliding puzzle) with multiple difficulty levels. It features step-by-step hints, animated feedback, and a neon cyberpunk interface.

[▶️ Watch the demo video](../../puzzle-solver-vid.mp4)

---

## Features
- **Multiple puzzle types and levels**: Sudoku, 8-puzzle, crossword, sliding puzzle, each with easy to expert difficulties.
- **Step-by-step hints and solutions**: Request hints or view animated solution steps.
- **Score and progress tracking**: Track your score, hints used, and time.
- **Neon-glow UI and sound effects**: Animated puzzle boards and feedback.

---

## How to Use
- **Open**: Click the Puzzle Solver icon on the NeoCityOS desktop.
- **Select Puzzle**: Choose a puzzle type and difficulty.
- **Solve**: Use the controls to input your solution.
- **Hints**: Request hints or view solutions as needed.

---

## UI/UX Details
- **Animated puzzle board and feedback**: Visual cues for moves, hints, and completion.
- **Sound effects for correct/incorrect moves**: Audio feedback for every action.
- **Progress tracker and scoreboard**: Real-time updates for score, hints, and time.
- **Responsive design**: Works on all screen sizes.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Loads puzzle state, sets up event listeners, and starts a new puzzle.
- **Puzzle Management**:
  - `setPuzzleType()`, `setDifficulty()`, `newPuzzle()`: Select and generate puzzles.
- **Puzzle Generation**:
  - `generateSudokuPuzzle()`, `generateEightPuzzle()`, `generateCrosswordPuzzle()`, `generateSlidingPuzzle()`: Create puzzles for each type.
- **Game Logic**:
  - `flipCard()`, `moveEightPuzzle()`, `moveSlidingPuzzle()`, etc.: Handle user moves and input.
- **Hints & Solutions**:
  - `useHint()`, `giveSudokuHint()`, `giveEightPuzzleHint()`, `giveSlidingPuzzleHint()`, `solve()`, `showNextStep()`: Provide hints and step-by-step solutions.
- **Score & Progress**:
  - `updateStats()`, `formatTime()`, `savePuzzleState()`, `loadPuzzleState()`: Track and persist score, hints, and time.
- **Rendering**:
  - `renderPuzzle()`, `renderSudoku()`, `renderEightPuzzle()`, `renderCrossword()`, `renderSlidingPuzzle()`: Draw the puzzle board and update the UI.
- **Animation & Feedback**:
  - Animated transitions for moves, hints, and completion.

#### How Modules Are Used
- On app launch, `init()` loads state and prepares the UI.
- User selects puzzle and difficulty, then solves using UI controls.
- Hints and solutions are available at any time.
- All actions update the UI, score, and progress in real time.

---

## Customization & Extensibility
- **Add new puzzle types or levels**: Extend the JS module with new puzzle logic.
- **Customize board appearance**: Edit the CSS for new themes or effects.
- **Add new hint/solution logic**: Implement new algorithms for hints or solutions.

---

## Troubleshooting & FAQ
- **Puzzle not loading?**
  - Check for JavaScript errors or invalid input.
- **Hints not working?**
  - Ensure puzzle data is valid.

---

## Code Structure & Extension Points
- **Entry point**: `src/games/puzzleSolver.js`
- **Main class**: `PuzzleSolver`
- **Add new puzzles or solution logic**: Extend the main module.
- **UI customization**: Edit `src/styles/games/puzzleSolver.css`.

---

**For developers:**
To add new puzzles, solution logic, or features, extend the class and update the UI logic.

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