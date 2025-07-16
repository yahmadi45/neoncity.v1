# File Manager (NeoCityOS)

## Overview
The File Manager is a core NeoCityOS application for navigating, organizing, and managing virtual files and folders in a cyberpunk-inspired interface.

[▶️ Watch the demo video](../../files-vid.mp4)

## Features
- Browse, create, rename, and delete files/folders
- Drag-and-drop file organization
- Context menus for file actions
- File previews and details
- Keyboard shortcuts for power users
- Responsive neon UI

## How to Use
- **Open**: Click the File Manager icon on the desktop.
- **Navigation**: Use the sidebar or double-click folders.
- **Actions**: Right-click for context menu (rename, delete, etc.).
- **Drag-and-drop**: Move files/folders by dragging.
- **Shortcuts**: Use keyboard shortcuts for quick actions (see in-app help).

## UI/UX Details
- Neon-glow folder/file icons
- Context menus with animated highlights
- File details panel with metadata
- Smooth transitions and error feedback

## Technical Architecture
- Main logic: `src/apps/fileManager.js`
- Styles: `src/styles/apps/fileManager.css`
- Uses event delegation for file/folder actions
- Modular functions for file system operations

## Customization & Extensibility
- Add new file types by extending the file type registry
- Customize context menu actions in the JS module
- Style via CSS variables for neon color themes

## Troubleshooting & FAQ
- **Files not appearing?** Check for JS errors in the console.
- **Drag-and-drop not working?** Ensure you’re not dragging to a read-only folder.
- **Performance issues?** Try reducing the number of files in a single folder.

---
**Developer Notes:**
- Entry: `src/apps/fileManager.js`
- Extend with new actions by adding to the context menu handler.

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