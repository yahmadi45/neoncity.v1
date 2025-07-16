# Neon Jump

## Overview
Neon Jump is a fast-paced cyberpunk platformer for NeoCityOS, featuring advanced physics, procedurally generated levels, power-ups, and a vibrant neon aesthetic. Players jump, dodge, and collect power-ups to reach new heights, with smooth controls and dynamic challenges.

[▶️ Watch the demo video](../../neon-jump-vid.mp4)

---

## Features
- **Procedurally generated levels**: Each run is unique, with new layouts and obstacles.
- **Multiple difficulty modes**: Select from easy to hard for different challenges.
- **Power-ups and obstacles**: Collect boosts and avoid hazards to progress.
- **Advanced physics and smooth controls**: Responsive movement and realistic jumps.
- **Neon-glow graphics and sound effects**: Animated backgrounds, glowing effects, and immersive audio.
- **Score, health, and checkpoint tracking**: Real-time updates for progress and achievements.

---

## How to Use
- **Open**: Click the Neon Jump icon on the NeoCityOS desktop.
- **Start Game**: Select difficulty and begin.
- **Controls**: Use arrow keys to move/jump, ESC to pause, and follow on-screen prompts.
- **Progress**: Reach checkpoints, collect power-ups, and aim for high scores.

---

## UI/UX Details
- **Animated neon backgrounds and effects**: Dynamic visuals for every level.
- **Responsive controls and feedback**: Instant feedback for every action.
- **Scoreboard, health, and checkpoint display**: Always-visible stats for player progress.
- **Menus and overlays**: Welcome screen, pause menu, and game over overlays.
- **Responsive design**: Works on all screen sizes and input types.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Main Entry & Game Loop**:
  - `main.js`: Initializes the game, manages global state, and handles game start/menu logic.
- **Game Logic**:
  - `game.js`: Core gameplay loop, state management, and player progression.
- **UI & Menus**:
  - `game-ui.js`, `welcome.js`: Render menus, overlays, and handle UI events.
- **Entities & Physics**:
  - `entities.js`: Player, enemies, power-ups, and obstacles.
  - `physics.js`: Collision detection, gravity, and movement.
  - `camera.js`: Camera tracking and viewport management.
- **Level Generation**:
  - `levelGenerator.js`: Procedurally generates new levels and layouts.
- **Visual Effects**:
  - `particleSystem.js`: Particle and glow effects for jumps, power-ups, and more.
- **Audio**:
  - `audioManager.js`: Manages sound effects and background music.
- **Config & Utilities**:
  - `config.js`, `utils.js`: Game settings, constants, and helper functions.

#### How Modules Are Used
- On app launch, `main.js` initializes the game and shows the welcome/menu screen.
- User selects difficulty and starts the game, triggering the main game loop in `game.js`.
- All gameplay, physics, and UI updates are handled in real time by their respective modules.
- Level generation, effects, and audio are modular and extensible.

---

## Customization & Extensibility
- **Add new power-ups, obstacles, or levels**: Extend the relevant JS modules for new features.
- **Customize graphics and effects**: Edit CSS and particle system for new visuals.
- **Add new game modes or achievements**: Extend the game logic and UI modules.

---

## Troubleshooting & FAQ
- **Game not starting?**
  - Check for JavaScript errors or asset loading issues.
- **Controls not responding?**
  - Ensure the game window is focused and your keyboard is working.
- **Performance issues?**
  - Lower the difficulty or close other browser tabs.

---

## Code Structure & Extension Points
- **Main entry**: `src/games/neonJump/main.js`
- **Game logic**: `game.js`, `entities.js`, `levelGenerator.js`, `physics.js`, `particleSystem.js`, `audioManager.js`, `utils.js`, `camera.js`, `config.js`
- **UI**: `game-ui.js`, `welcome.js`
- **Styles**: `src/styles/games/neonJump/`
- **Add new features**: Extend the modular architecture in the relevant JS modules.
- **UI customization**: Edit CSS for new themes or effects.

---

**For developers:**
To add new features, power-ups, or game modes, extend the modular architecture and update the UI and logic as needed.

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