# Algorithm Visualizer

## Overview
The Algorithm Visualizer is an advanced educational tool for NeoCityOS, enabling users to explore, understand, and interact with classic algorithms through animated, step-by-step visualizations. It covers sorting, searching, and graph algorithms, providing both code and conceptual explanations in a neon cyberpunk UI.

---

## Features
- **Visualize sorting, searching, and pathfinding algorithms**: Includes Bubble Sort, Quick Sort, Merge Sort, Selection Sort, Linear Search, Binary Search, DFS, BFS, and more.
- **Step-by-step animation controls**: Play, pause, resume, and reset algorithm execution.
- **Adjustable speed and array size**: Fine-tune the pace and complexity of visualizations.
- **Code display and explanation panel**: Shows pseudocode, time complexity, and algorithm description.
- **Neon cyberpunk UI**: Animated bars, nodes, and grids with glowing effects.
- **Error handling and status feedback**: User-friendly error overlays and status messages.
- **Responsive controls**: Works on all screen sizes and input types.

---

## How to Use
- **Open**: Click the Algorithm Visualizer icon on the NeoCityOS desktop.
- **Select Algorithm**: Choose from the dropdown menu (sorting, searching, or graph algorithms).
- **Visualize**: Click "Start" to animate, use controls to pause, resume, or reset.
- **Adjust**: Change speed or array size with sliders for a custom experience.
- **View Code**: Read the pseudocode and explanation in the side panel.

---

## UI/UX Details
- **Animated bars, nodes, or grids**: Each algorithm has a unique, glowing visualization.
- **Code and explanation panel**: Syntax-highlighted pseudocode and detailed algorithm info.
- **Status and error overlays**: Real-time feedback for errors or completion.
- **Responsive controls**: Sliders, dropdowns, and buttons adapt to all devices.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Sets up the canvas, generates the initial data array, and prepares the UI.
- **Data Generation**:
  - `generateArray()`: Creates a new random array for sorting/searching visualizations.
- **Rendering**:
  - `draw()`, `drawGraph()`: Renders the current state of the array or graph on the canvas.
- **Algorithm Execution**:
  - `startVisualization()`, `pauseVisualization()`, `resumeVisualization()`, `togglePause()`, `reset()`: Control the animation lifecycle.
  - `runSortingAlgorithm()`, `runSearchingAlgorithm()`, `runGraphAlgorithm()`: Dispatch to the selected algorithm.
- **Algorithm Implementations**:
  - `bubbleSort()`, `quickSort()`, `mergeSort()`, `selectionSort()`, `linearSearch()`, `binarySearch()`, `depthFirstSearch()`, `breadthFirstSearch()`: Each algorithm is implemented as an async method for stepwise animation.
- **UI Controls**:
  - `onAlgorithmTypeChange()`, `onSpecificAlgorithmChange()`, `onSpeedChange()`, `updateUI()`, `updateButtonStates()`: Manage user input and UI state.
- **Code & Explanation**:
  - `algorithmDescriptions`, `pseudocode`, `complexityDetails`: Store and display educational content for each algorithm.
- **Status & Error Handling**:
  - `updateStatus()`, error overlays, and integration with `ErrorManager` for user feedback.

#### How Modules Are Used
- On app launch, `init()` prepares the canvas and UI, and generates the initial data.
- User selects an algorithm and starts visualization; the corresponding async method animates the process step by step.
- UI controls allow pausing, resuming, resetting, and adjusting speed/array size at any time.
- Code and explanation panels update dynamically based on the selected algorithm.
- Errors (e.g., missing canvas) are shown as overlays with retry options.

---

## Customization & Extensibility
- **Add new algorithms**: Extend the algorithms registry and implement new async methods for visualization.
- **Customize animation speed and color themes**: Adjust speed variables and color mappings in the class.
- **Add new visualization types**: Implement new draw methods for graphs, trees, or custom data structures.
- **UI/UX**: Edit `src/styles/apps/algorithms.css` for appearance tweaks.

---

## Troubleshooting & FAQ
- **Animation not starting?**
  - Check for JavaScript errors or invalid input. Ensure the canvas is present in the DOM.
- **UI not responsive?**
  - Try reloading the app or reducing the array size for smoother performance.
- **Error overlay shown?**
  - Click "Retry" or check the console for more details.

---

## Code Structure & Extension Points
- **Entry point**: `src/apps/algorithmVisualizer.js`
- **Main class**: `AlgorithmVisualizer`
- **Add new algorithms**: Extend the registry and implement new async methods.
- **UI customization**: Edit `src/styles/apps/algorithms.css` for appearance tweaks.
- **Error handling**: Integrate with `ErrorManager` for custom overlays.

---

**For developers:**
To add new algorithms, extend the `AlgorithmVisualizer` class and update the registry, pseudocode, and explanation mappings. For new visualization types, implement new draw methods and UI controls as needed.

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