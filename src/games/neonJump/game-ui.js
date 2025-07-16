/**
 * NeonJump Game UI Controller
 * 
 * This file contains the inline JavaScript extracted from neonjump.html
 * for handling game UI interactions and navigation.
 */

/**
 * Navigate back to the welcome screen
 * Handles different navigation scenarios based on how the user arrived at the game
 */
function goBackToWelcome() {
    console.log('Going back to welcome screen');
    
    // Clear game state
    sessionStorage.removeItem('neonJump_difficulty');
    sessionStorage.removeItem('neonJump_level');
    
    // Check if we came from the desktop app system
    const fromDesktop = sessionStorage.getItem('neonJump_fromDesktop');
    
    if (fromDesktop === 'true' && typeof appManager !== 'undefined') {
        // If we came from desktop app, open the welcome screen in the app
        console.log('Opening welcome screen in desktop app');
        appManager.openApp('neon-jump', 'Neon Jump');
    } else {
        // If we're standalone, go directly to welcome screen
        console.log('Going directly to welcome screen');
        window.location.href = 'neonjump-welcome.html?t=' + Date.now();
    }
}

/**
 * Navigate back to the desktop environment
 * Clears session storage flags and redirects to desktop
 */
function goBackToDesktop() {
    // Clear all NeonJump-related session storage flags
    sessionStorage.removeItem('neonJump_fromDesktop');
    sessionStorage.removeItem('fromNeonJump');
    sessionStorage.removeItem('returnToDesktop');
    
    // Set flags to indicate return to desktop
    sessionStorage.setItem('returnToDesktop', 'true');
    
    // Navigate back to desktop
    window.location.href = 'index.html?show=desktop&from=neonjump';
}

/**
 * Exit game and go back to desktop immediately
 * This function handles the actual navigation away from the game
 */
function goBackToDesktopFromGame() {
    console.log('Exiting game and returning to desktop immediately');
    // Clear all NeonJump-related session storage flags
    sessionStorage.removeItem('neonJump_difficulty');
    sessionStorage.removeItem('neonJump_level');
    sessionStorage.removeItem('neonJump_fromDesktop');
    sessionStorage.removeItem('fromNeonJump');
    sessionStorage.removeItem('returnToDesktop');

    // Check if we came from the desktop app system
    const fromDesktop = sessionStorage.getItem('neonJump_fromDesktop');
    
    if (fromDesktop === 'true' && typeof appManager !== 'undefined') {
        // If we came from desktop app, close the app window and return to desktop
        console.log('Closing NeonJump app window and returning to desktop');
        appManager.closeApp('neon-jump');
    } else {
        // If we're standalone, go directly to desktop
        console.log('Going directly to desktop from standalone game');
        window.location.href = 'index.html?show=desktop&from=neonjump&t=' + Date.now();
    }
}

/**
 * Initialize game when page loads
 * Sets up event listeners and handles game startup
 */
function initializeGameUI() {
    console.log('NeonJump game page loaded');
    
    // Add global keyboard listener for debugging
    document.addEventListener('keydown', (e) => {
        console.log('Global keydown:', e.code, 'Target:', e.target.tagName);
    });
    
    document.addEventListener('keyup', (e) => {
        console.log('Global keyup:', e.code, 'Target:', e.target.tagName);
    });
    
    // Check if we have difficulty and level from welcome screen
    const difficulty = localStorage.getItem('neonJump_difficulty');
    const level = localStorage.getItem('neonJump_level');
    
    if (difficulty && level) {
        // Clear localStorage
        localStorage.removeItem('neonJump_difficulty');
        localStorage.removeItem('neonJump_level');
        
        // Start game with selected difficulty
        setTimeout(() => {
            if (window.startNeonJumpGame) {
                window.startNeonJumpGame(difficulty, parseInt(level));
            }
        }, 500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGameUI); 