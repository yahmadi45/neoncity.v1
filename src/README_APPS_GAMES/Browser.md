# Browser (NeoBrowser)

## Overview
NeoBrowser is the built-in web browser for NeoCityOS, designed with a cyberpunk aesthetic. It supports modern web navigation, bookmarks, search suggestions, and a secure sandboxed environment, all within a responsive neon-glow UI.

---

## Features
- **Address bar for URLs and search**: Enter web addresses or search terms directly.
- **Navigation controls**: Back, forward, refresh, and home buttons for seamless browsing.
- **Bookmarks and history management**: Save, remove, export, and import bookmarks; view and clear browsing history.
- **Sandboxed iframe**: All web content is loaded in a secure, isolated iframe.
- **Search suggestions**: Get instant suggestions as you type in the address bar.
- **Neon-glow UI and animated transitions**: Modern, animated interface with cyberpunk visuals.
- **Keyboard shortcuts**: Power-user navigation (e.g., Ctrl+L for address bar, Ctrl+R to refresh).
- **Error handling and notifications**: User feedback for navigation and loading issues.

---

## How to Use
- **Open**: Click the Browser icon on the NeoCityOS desktop.
- **Navigate**: Enter a URL or search term in the address bar and press Enter or click Go.
- **Bookmarks**: Add, remove, or export bookmarks using the toolbar controls.
- **History**: View and clear browsing history from the menu.
- **Navigation**: Use the back, forward, and refresh buttons for page control.
- **Search**: Type in the address bar for instant suggestions.

---

## UI/UX Details
- **Neon address bar and toolbar**: All controls feature glowing neon highlights.
- **Animated progress bar**: Shows page load status with smooth transitions.
- **Bookmarks bar**: Quick access to saved sites with favicons.
- **Responsive design**: Adapts to all screen sizes and input types.
- **Error overlays**: Friendly error pages for failed loads or invalid URLs.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Initialization**:
  - `init()`: Sets up the browser, binds elements and events, loads welcome page, and renders bookmarks.
- **DOM Binding**:
  - `bindElements()`: Caches all relevant DOM elements for fast access.
- **Event Handling**:
  - `bindEvents()`: Binds all UI events (address bar, navigation buttons, keyboard shortcuts, iframe events).
- **Navigation**:
  - `navigate()`, `goBack()`, `goForward()`, `refresh()`, `loadURL()`: Handle all navigation logic and history management.
- **Bookmarks**:
  - `addBookmark()`, `removeBookmark()`, `renderBookmarks()`, `loadBookmarks()`, `saveBookmarks()`, `exportBookmarks()`, `importBookmarks()`: Full bookmark CRUD and import/export.
- **History**:
  - `addToHistory()`, `clearHistory()`: Manage browsing history.
- **Search Suggestions**:
  - `setupSearchSuggestions()`, `updateSearchSuggestions()`, `showSearchSuggestions()`, `hideSearchSuggestions()`: Provide instant suggestions as user types.
- **UI Feedback**:
  - `showLoading()`, `showError()`, `showWelcome()`, `updateProgress()`, `updateSecurityIndicator()`, `updateNavigationButtons()`: Visual feedback for navigation and security.
- **Settings**:
  - `loadSettings()`, `saveSettings()`, `getDefaultSettings()`: Manage browser preferences.

#### How Modules Are Used
- On app launch, `init()` binds all elements and events, loads the welcome page, and renders bookmarks.
- User actions (navigation, bookmarking, search) are routed through event listeners to the appropriate handler.
- All web content is loaded in a sandboxed iframe for security.
- UI updates are immediate and reflect the current state of navigation, bookmarks, and history.

---

## Customization & Extensibility
- **Add new toolbar buttons**: Extend the toolbar in the JS module and bind new actions in `bindEvents()`.
- **Customize search provider**: Update the address bar logic to use a different search engine or API.
- **Styling**: Edit `src/styles/apps/browser.css` for neon themes and layout changes.
- **Bookmarks**: Add new bookmark management features by extending the relevant methods.

---

## Troubleshooting & FAQ
- **Page not loading?**
  - Check the URL for typos and ensure your internet connection is active.
- **Bookmarks not saving?**
  - Ensure localStorage is enabled and not full. Try clearing storage and reloading.
- **UI glitches?**
  - Try reloading the app or clearing the browser cache.
- **Security warnings?**
  - Only load trusted URLs. The browser uses a sandboxed iframe for safety.

---

## Code Structure & Extension Points
- **Entry point**: `src/apps/browser.js`
- **Main class**: `NeoBrowser`
- **Add new features**: Extend class methods or add new ones for custom logic.
- **UI customization**: Edit `src/styles/apps/browser.css` for appearance tweaks.
- **Bookmarks import/export**: Use `exportBookmarks()` and `importBookmarks()` for backup and restore.

---

**For developers:**
To add new features, extend the `NeoBrowser` class and update the UI rendering logic. For new navigation or search features, update the relevant event handlers and modules accordingly.

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