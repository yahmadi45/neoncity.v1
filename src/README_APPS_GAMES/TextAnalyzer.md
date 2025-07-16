# Text Analyzer

## Overview
The Text Analyzer is a comprehensive utility app for NeoCityOS, designed to analyze, summarize, and transform text using advanced algorithms. It provides detailed statistics, frequency analysis, readability metrics, and transformation tools, all within a neon cyberpunk UI.

---

## Features
- **Word/character count, frequency analysis**: Get counts for words, characters (with/without spaces), sentences, paragraphs, lines, and unique words.
- **Text summarization and transformation tools**: Includes case conversion, palindrome/anagram detection, and more.
- **Readability and complexity metrics**: Flesch score, reading/speaking time, and complexity assessment.
- **Copy, clear, and export results**: Easily copy results, clear input, or export analysis.
- **Neon-glow UI and accessibility features**: Modern, accessible interface with keyboard navigation and notifications.

---

## How to Use
- **Open**: Click the Text Analyzer icon on the NeoCityOS desktop.
- **Paste or type**: Enter text in the main area.
- **Analyze**: Click "Analyze" to see results and statistics.
- **Transform**: Use available tools for case conversion, summary, palindrome/anagram checks, etc.
- **Export**: Copy or export the analysis results as needed.

---

## UI/UX Details
- **Results panel with highlights and stats**: All analysis results are clearly displayed with visual emphasis.
- **Accessible controls and keyboard navigation**: All features are accessible via keyboard and screen readers.
- **Notifications**: Error and info messages appear as animated toasts.
- **Responsive design**: Works on all screen sizes.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Loads saved text and prepares the UI.
- **Text Analysis**:
  - `analyze()`, `performAnalysis()`: Main entry points for analyzing the current text.
  - `countWords()`, `countSentences()`, `countParagraphs()`, `countLines()`, `getUniqueWords()`, etc.: Compute all basic statistics.
  - `getLetterFrequency()`, `wordFrequency()`, `findPalindromes()`, `findAnagrams()`: Advanced analysis tools.
  - `calculateReadingTime()`, `calculateSpeakingTime()`, `calculateFleschScore()`, `assessComplexity()`: Readability and complexity metrics.
- **Transformation Tools**:
  - Case conversion, palindrome/anagram detection, and other text transformations.
- **Display & UI**:
  - `updateDisplay()`, `generateLetterFrequencyDisplay()`, `showResults()`: Render results and update the UI.
- **Persistence**:
  - `saveText()`, `loadSavedText()`: Save and restore text between sessions.
- **Export & Clipboard**:
  - `exportAnalysis()`: Export results for external use.
- **Notifications**:
  - `showMessage()`: Display error/info messages to the user.

#### How Modules Are Used
- On app launch, `init()` loads any saved text and prepares the UI.
- User enters or pastes text, then clicks "Analyze" to trigger `analyze()` and display results.
- Transformation tools and export features are available via UI controls.
- All results and notifications are updated in real time.

---

## Customization & Extensibility
- **Add new analysis tools**: Implement new methods in the JS module and add UI controls.
- **Customize result display and color themes**: Edit the display logic and CSS for new styles.
- **Accessibility**: Enhance keyboard navigation or add ARIA labels as needed.

---

## Troubleshooting & FAQ
- **Results not updating?**
  - Check for JavaScript errors or invalid input.
- **Copy/export not working?**
  - Ensure clipboard permissions are enabled and your browser supports the feature.
- **UI not responsive?**
  - Try reloading the app or clearing the input.

---

## Code Structure & Extension Points
- **Entry point**: `src/apps/textAnalyzer.js`
- **Main class**: `TextAnalyzer`
- **Add new tools**: Implement new analysis or transformation methods and update the UI.
- **UI customization**: Edit `src/styles/apps/textAnalyzer.css` for appearance tweaks.

---

**For developers:**
To add new analysis or transformation tools, extend the `TextAnalyzer` class and update the UI logic accordingly.

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