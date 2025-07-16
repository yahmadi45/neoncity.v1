# Data Structures Playground

## Overview
The Data Structures Playground is an advanced interactive environment for NeoCityOS, designed for learning and experimenting with classic data structures in a visual, hands-on way. It supports stacks, queues, linked lists, binary trees, and hash tables, each with animated operations, performance metrics, and educational content in a neon cyberpunk UI.

---

## Features
- **Visualize stacks, queues, linked lists, trees, and hash tables**: Each structure is implemented and visualized with real-time updates.
- **Add, remove, search, and clear operations**: Full CRUD and search for each structure.
- **Step-by-step animations and explanations**: See each operation unfold visually.
- **Performance metrics**: Track operation counts and time.
- **Neon cyberpunk UI**: Animated nodes, pointers, and highlights.

---

## How to Use
- **Open**: Click the Data Structures icon on the NeoCityOS desktop.
- **Select Structure**: Choose from the menu (stack, queue, linked list, tree, hash table).
- **Operate**: Use the controls to add, remove, search, or clear.
- **Visualize**: Watch the structure update in real time, with educational info displayed.

---

## UI/UX Details
- **Animated nodes and pointers**: Each operation is visualized with glowing highlights.
- **Operation panel with tooltips**: Controls are clearly labeled and accessible.
- **Performance and educational panels**: See time complexity, use cases, and operation stats.
- **Error and success notifications**: User feedback for invalid or successful actions.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Sets up the display, event listeners, and initial state.
- **Structure Implementations**:
  - Stack, Queue, Linked List, Binary Tree, Hash Table — each with add, remove, search, and clear methods.
- **Rendering**:
  - `updateDisplay()`, `displayStack()`, `displayQueue()`, etc.: Draw the current state of each structure.
- **Operations**:
  - `add()`, `remove()`, `search()`, `clear()`: Dispatch to the correct structure’s method.
- **Animation**:
  - `animateOperation(callback)`: Animates each operation step-by-step.
- **Educational Content**:
  - `showEducationalInfo()`: Displays time complexity, use cases, and operation details.
- **Performance Tracking**:
  - `updateMetrics()`, `generateMetrics()`: Show operation counts and timing.

#### How Modules Are Used
- On app launch, `init()` prepares the UI and sets up the default structure.
- User actions (add, remove, search) are routed to the correct structure and visualized.
- Educational and performance panels update dynamically.

---

## Customization & Extensibility
- **Add new structures**: Extend the registry and implement new visualization logic.
- **Customize operation controls**: Add new buttons or operations in the UI.
- **Styling**: Edit `src/styles/apps/dataStructures.css` for neon themes and layout changes.

---

## Troubleshooting & FAQ
- **Operation not working?**
  - Check for JavaScript errors or invalid input.
- **UI glitches?**
  - Try reloading or clearing the structure.

---

## Code Structure & Extension Points
- **Entry point**: `src/apps/dataStructures.js`
- **Main class**: `DataStructuresPlayground`
- **Add new structures**: Extend the registry and implement new methods.
- **UI customization**: Edit `src/styles/apps/dataStructures.css`.

---

**For developers:**
To add new data structures, extend the class and update the registry and visualization logic.

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