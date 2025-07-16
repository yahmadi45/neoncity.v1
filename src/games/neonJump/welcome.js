/**
 * NeonJump Welcome Screen JavaScript
 * Handles navigation and game initialization for the welcome screen
 */

/**
 * Navigate back to the desktop
 */
function goBackToDesktop() {
    // Clear all NeonJump-related session storage flags
    sessionStorage.removeItem('neonJump_fromDesktop');
    sessionStorage.removeItem('fromNeonJump');
    sessionStorage.removeItem('returnToDesktop');
    sessionStorage.setItem('returnToDesktop', 'true');

    // Go directly to desktop without any delay or intermediate screens
    window.location.href = 'index.html?show=desktop&from=neonjump&t=' + Date.now();
}

function backToDesktop() {
    // Go directly to desktop without any delay or intermediate screens
    window.location.href = 'index.html?show=desktop&from=neonjump&t=' + Date.now();
}

/**
 * Start the game with specified difficulty and level
 * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @param {number} level - The starting level (default: 1)
 */
function startGame(difficulty, level) {
    // Store difficulty and level in localStorage
    localStorage.setItem('neonJump_difficulty', difficulty);
    localStorage.setItem('neonJump_level', level);
    
    // Set flag indicating we came from desktop environment (for standalone welcome page)
    sessionStorage.setItem('neonJump_fromDesktop', 'true');
    
    // Redirect to the actual game
    window.location.href = 'neonjump.html';
}

/**
 * Start NeonJump game from welcome screen
 * This function is called by the difficulty buttons in the welcome screen
 * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard')
 * @param {number} level - The starting level (default: 1)
 */
function startNeonJumpGame(difficulty, level) {
    // Store difficulty and level in localStorage
    localStorage.setItem('neonJump_difficulty', difficulty);
    localStorage.setItem('neonJump_level', level);
    
    // Set flag indicating we came from desktop environment
    sessionStorage.setItem('neonJump_fromDesktop', 'true');
    
    // Close the welcome window
    if (typeof appManager !== 'undefined') {
        appManager.closeApp('neon-jump');
    }
    
    // Redirect to the actual game
    window.location.href = 'neonjump.html';
}

// Add any additional welcome screen functionality here
// For example, animations, sound effects, or interactive elements 