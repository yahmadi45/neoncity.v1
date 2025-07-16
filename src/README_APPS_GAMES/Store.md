# Store (NeoStore)

## Overview
The Store (NeoStore) is a cyberpunk-themed virtual marketplace for NeoCityOS, where users can browse, filter, and purchase high-tech items using in-game gold. It features a persistent cart, inventory, rarity-based item system, and a highly interactive neon UI.

---

## Features
- **Browse 30+ unique cyberpunk items**: Each with category, rarity, price, and effects.
- **Category filtering**: Instantly filter items by implants, equipment, or tech.
- **Add to cart, remove, and buy**: Full shopping cart experience with quantity management.
- **Inventory management**: Purchased items are stored in a persistent inventory.
- **Rarity system**: Items range from common to legendary, with visual indicators.
- **Gold-based currency**: All purchases use in-game gold, tracked per user.
- **Neon-glow UI and sound effects**: Animated, immersive shopping experience.
- **Error handling and notifications**: User feedback for all actions.

---

## How to Use
- **Open**: Click the Store icon on the NeoCityOS desktop.
- **Browse**: Scroll through the item grid, filter by category using the sidebar or dropdown.
- **Add to Cart**: Click the green "Add" button on any item card.
- **Cart**: Review, remove, or buy items in the cart panel. Cart persists until checkout.
- **Buy**: Click "Buy" to purchase all items in the cart (if you have enough gold).
- **Inventory**: View all purchased items in the inventory panel.
- **Gold**: Your current gold balance is always visible at the top.

---

## UI/UX Details
- **Animated neon item cards**: Each item is displayed with a glowing border and animated hover effects.
- **Rarity icons and color coding**: Items are visually distinguished by rarity (common, uncommon, rare, epic, legendary).
- **Cart and inventory panels**: Slide-in panels update in real time as you add/remove/buy items.
- **Sound effects**: Actions like adding to cart, buying, or errors play immersive sounds.
- **Notifications**: Success and error messages appear as animated toasts.
- **Responsive design**: Works on all screen sizes.

---

## Technical Architecture

### Main Modules ("Chapters")
- **Store Items Initialization**: 
  - `initializeStoreItems()`: Defines the full catalog of items, each with id, name, description, price, category, icon, rarity, and effects.
- **User Data Management**:
  - `getCurrentUsername()`, `getUserGold()`, `saveUserGold()`, `getUserInventory()`, `saveUserInventory()`: Handle persistent storage of user gold and inventory in localStorage.
- **Cart Logic**:
  - `addToCart(itemId)`, `removeFromCart(itemId)`, `updateCartDisplay()`, `buyItems()`: Manage cart state, display, and purchase flow.
- **Rendering**:
  - `renderStore()`, `renderItems(items)`, `renderInventory()`: Generate the UI for the store, item grid, and inventory.
- **Filtering**:
  - `filterItems(category)`, `setupFilterEvents()`: Enable category-based filtering of items.
- **Rarity & Visuals**:
  - `getRarityIcon(rarity)`: Returns the appropriate icon and color for each rarity tier.
- **Event Handling**:
  - `setupEventListeners()`, `setupCartEvents()`, `setupItemEvents()`: Bind all UI events for interactivity.
- **Audio & Notifications**:
  - `playSound(soundName)`, `showNotification(message, type)`: Provide feedback for user actions.
- **Debug & Stats**:
  - `getStoreStats()`, `resetStoreData()`: Developer tools for debugging and resetting store state.

#### How Modules Are Used
- On app launch, the constructor initializes items, user data, and cart, then calls `init()` to render the UI and bind events.
- All user actions (add to cart, buy, filter) are routed through event listeners to the appropriate handler.
- Purchases update user gold and inventory, with persistent storage in localStorage.
- UI updates are immediate and reflect the current state of the store, cart, and inventory.

---

## Customization & Extensibility
- **Add new items**: Extend the array in `initializeStoreItems()` with new item objects.
- **Change rarity icons/colors**: Update `getRarityIcon()` to modify visuals for each rarity.
- **Extend cart logic**: Add discounts, bundles, or special offers by extending cart methods.
- **Styling**: Edit `src/styles/apps/store.css` for neon themes and layout changes.
- **Audio**: Add new sound effects in the audio manager and call them from relevant actions.

---

## Troubleshooting & FAQ
- **Button not working?**
  - Check for overlays blocking the UI or JavaScript errors in the console.
- **Gold not updating?**
  - Ensure localStorage is enabled and not full. Try clearing storage and reloading.
- **Inventory missing?**
  - Try clearing localStorage and reloading the app. Ensure you are logged in as the correct user.
- **Cart not persisting?**
  - Cart is reset on checkout or page reload. This is by design for a fresh shopping session.

---

## Code Structure & Extension Points
- **Entry point**: `src/apps/store.js`
- **Main class**: `NeoStore`
- **Add new features**: Extend class methods or add new ones for custom logic.
- **UI customization**: Edit `src/styles/apps/store.css` for appearance tweaks.
- **Developer tools**: Use `getStoreStats()` and `resetStoreData()` for debugging.

---

**For developers:**
To add new features, extend the `NeoStore` class and update the UI rendering logic. For new item types or categories, update the item initialization and filtering logic accordingly.

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