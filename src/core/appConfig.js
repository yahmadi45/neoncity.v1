/**
 * NeoCityOS Application Configuration System
 * 
 * This module provides centralized configuration management for all applications
 * in the NeoCityOS system. It defines the structure, metadata, and navigation
 * patterns for the entire application ecosystem.
 * 
 * Key Features:
 * - Centralized app registry with metadata
 * - Dynamic navigation system
 * - Icon and description management
 * - Location-based app filtering
 * - Modular architecture support
 * 
 * @author NeoCityOS Development Team
 * @version 1.0.0
 */

/**
 * Main Application Configuration Object
 * 
 * Contains all application definitions organized by location/context.
 * Each app entry includes:
 * - name: Display name for the application
 * - icon: Path to the application icon
 * - location: Internal identifier for app launching
 * - description: Tooltip and accessibility text
 * 
 * Structure:
 * - desktop: Main desktop applications (13 apps total)
 * - [app-specific]: Navigation apps for each application context
 */
const APP_CONFIG = {
    /**
     * Desktop Applications Array
     * 
     * Contains all 13 main applications available on the desktop:
     * 1. Core System Apps (Files, Terminal, Browser)
     * 2. Entertainment Apps (Dice Game, Platform Game)
     * 3. Utility Apps (Store)
     * 4. Educational Apps (Algorithm Visualizer, Data Structures, etc.)
     * 5. Interactive Apps (Memory Game, Puzzle Solver, etc.)
     */
    desktop: [
        // Core System Applications
        { name: "Files", icon: "assets/icons/files.png", location: "filemanager", description: "File Manager" },
        { name: "Terminal", icon: "assets/icons/terminal.png", location: "terminal", description: "System Terminal" },
        { name: "Browser", icon: "assets/icons/browser.png", location: "browser", description: "Web Browser" },
        
        // Entertainment Applications
        { name: "Dice Game", icon: "assets/icons/dice.png", location: "dicegame", description: "Dice Game" },
        { name: "Neon Jump", icon: "assets/icons/neonJump.png", location: "neon-jump", description: "Neon Platformer Game" },

        
        // Utility Applications
        { name: "Store", icon: "assets/icons/store.png", location: "store", description: "Cyberpunk Store" },
        
        // Educational Applications (Algorithm & Data Structure Learning)
        { name: "Algorithm Visualizer", icon: "assets/icons/algorithmVisualizer.png", location: "algorithm", description: "Algorithm Visualizer" },
        { name: "Advanced Dice", icon: "assets/icons/advancedDice.png", location: "advanced-dice", description: "Advanced Dice Game" },
        { name: "Data Structures", icon: "assets/icons/dataStructures.png", location: "data-structures", description: "Data Structures Playground" },
        { name: "Memory Game", icon: "assets/icons/memoryGame.png", location: "memory-game", description: "Memory Game" },
        { name: "Puzzle Solver", icon: "assets/icons/puzzleSolver.png", location: "puzzle-solver", description: "Puzzle Solver" },
        { name: "Text Analyzer", icon: "assets/icons/textAnalyzer.png", location: "text-analyzer", description: "Text Analyzer" },
        { name: "Number Guesser", icon: "assets/icons/numberGuesser.png", location: "number-guesser", description: "Number Guessing Game" }
    ],
    
    /**
     * Navigation Applications
     * 
     * Each application context has a "Back to Desktop" option that allows
     * users to return to the main desktop from any application. This creates
     * a consistent navigation pattern throughout the system.
     * 
     * Note: Not all educational apps have navigation entries as they may
     * use different navigation patterns or be launched differently.
     */
    filemanager: [
        { name: "Back to Desktop", icon: "assets/icons/files.png", location: "desktop", description: "Back to Desktop" }
    ],
    terminal: [
        { name: "Back to Desktop", icon: "assets/icons/terminal.png", location: "desktop", description: "Back to Desktop" }
    ],
    browser: [
        { name: "Back to Desktop", icon: "assets/icons/browser.png", location: "desktop", description: "Back to Desktop" }
    ],
    dicegame: [
        { name: "Back to Desktop", icon: "assets/icons/dice.png", location: "desktop", description: "Back to Desktop" }
    ],
    "neon-jump": [
        { name: "Back to Desktop", icon: "assets/icons/neonJump.png", location: "desktop", description: "Back to Desktop" }
    ],
    store: [
        { name: "Back to Desktop", icon: "assets/icons/store.png", location: "desktop", description: "Back to Desktop" }
    ],

};

/**
 * Get Applications for Specific Location
 * 
 * Retrieves the list of applications available in a given location/context.
 * This function enables dynamic app loading based on the current user context.
 * 
 * Algorithm: 
 * - Look up the location in APP_CONFIG
 * - Return the app array if found, otherwise return desktop apps as fallback
 * 
 * @param {string} location - The location/context to get apps for
 * @returns {Array} Array of application objects for the specified location
 */
function getAppsForLocation(location) {
    return APP_CONFIG[location] || APP_CONFIG.desktop;
}

/**
 * Get Specific Application by Name
 * 
 * Finds and returns a specific application within a given location.
 * This is useful for app launching, validation, and metadata retrieval.
 * 
 * Algorithm:
 * - Get all apps for the location using getAppsForLocation()
 * - Use Array.find() to locate the app with matching name
 * - Return the app object or undefined if not found
 * 
 * @param {string} location - The location/context to search in
 * @param {string} appName - The name of the application to find
 * @returns {Object|undefined} The application object or undefined if not found
 */
function getApp(location, appName) {
    const apps = getAppsForLocation(location);
    return apps.find(app => app.name === appName);
}

/**
 * Check if Application Exists
 * 
 * Validates whether a specific application exists in a given location.
 * This function is used for error checking and conditional logic.
 * 
 * Algorithm:
 * - Attempt to get the app using getApp()
 * - Return true if app is found, false otherwise
 * 
 * @param {string} location - The location/context to check
 * @param {string} appName - The name of the application to validate
 * @returns {boolean} True if the application exists, false otherwise
 */
function appExists(location, appName) {
    return getApp(location, appName) !== undefined;
}

/**
 * Module Export for Node.js Compatibility
 * 
 * Enables this configuration module to be used in both browser and Node.js
 * environments. This supports potential future server-side functionality
 * or testing frameworks.
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APP_CONFIG, getAppsForLocation, getApp, appExists };
} 