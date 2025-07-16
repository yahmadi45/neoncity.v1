/**
 * NeonJump Main Entry Point
 * Initializes and manages the game instance
 */

// ===== GLOBAL INSTANCE =====
let neonJumpGame = null;
let selectedDifficulty = 'medium';

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing NeonJump...');
    
    // Check if we're coming from the welcome screen
    const difficulty = localStorage.getItem('neonJump_difficulty');
    const level = localStorage.getItem('neonJump_level');
    
    // Wait a bit for all scripts to be fully loaded
    setTimeout(() => {
        try {
            // Create game instance
            neonJumpGame = new NeonJump();
            console.log('NeonJump game instance created:', neonJumpGame);
            
            // Verify game initialization
            if (neonJumpGame && neonJumpGame.canvas) {
                console.log('Game initialized successfully with canvas:', neonJumpGame.canvas);
                console.log('Canvas focusable:', neonJumpGame.canvas.tabIndex);
            } else {
                console.error('Game initialization failed - missing canvas');
                // Try again after a longer delay
                setTimeout(() => {
                    try {
                        neonJumpGame = new NeonJump();
                        if (neonJumpGame && neonJumpGame.canvas) {
                            console.log('Game initialized on second attempt');
                        }
                    } catch (retryError) {
                        console.error('Failed to initialize NeonJump on retry:', retryError);
                    }
                }, 500);
                return;
            }
            
            // If we have difficulty and level from welcome screen, start game directly
            if (difficulty && level && neonJumpGame) {
                console.log(`Starting game with difficulty: ${difficulty}, level: ${level}`);
                neonJumpGame.startGame(difficulty, parseInt(level));
                // Clear localStorage
                localStorage.removeItem('neonJump_difficulty');
                localStorage.removeItem('neonJump_level');
            } else if (neonJumpGame) {
                // Show menu by default
                neonJumpGame.showMenu();
            }
        } catch (error) {
            console.error('Failed to initialize NeonJump:', error);
            // Try alternative initialization
            setTimeout(() => {
                initializeNeonJump();
            }, 200);
        }
    }, 100);
});

// Alternative initialization for when scripts are loaded dynamically
function initializeNeonJump() {
    if (neonJumpGame) return; // Already initialized
    
    try {
        neonJumpGame = new NeonJump();
        console.log('NeonJump game instance created:', neonJumpGame);
        
        if (neonJumpGame) {
            neonJumpGame.showMenu();
        }
    } catch (error) {
        console.error('Failed to initialize NeonJump:', error);
    }
}

// Global functions for UI interaction
function startNeonJumpGame(difficulty, level) {
    console.log('Starting game with difficulty:', difficulty, 'level:', level);
    selectedDifficulty = difficulty;
    if (neonJumpGame) {
        neonJumpGame.startGame(difficulty, level);
    } else {
        console.error('Game not loaded yet');
    }
}

function restartNeonJumpGame() {
    console.log('Restarting game');
    if (neonJumpGame) {
        // Reset to level 1 when restarting
        neonJumpGame.startGame(neonJumpGame.currentDifficulty, 1);
    }
}

function showNeonJumpMenu() {
    console.log('Showing menu');
    if (neonJumpGame) {
        neonJumpGame.showMenu();
    }
}

function togglePause() {
    console.log('Toggling pause');
    if (neonJumpGame) {
        neonJumpGame.togglePause();
    }
}

// Function to go back to welcome screen
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

// Function to go back to desktop
function goBackToDesktop() {
    console.log('Going back to desktop');
    
    // Navigate to desktop with parameters
    window.location.href = 'index.html?from=neonjump&show=desktop';
}

// Function to exit game and go back to desktop immediately
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

// Enhanced game features
function getGameStats() {
    if (neonJumpGame) {
        return {
            difficulty: neonJumpGame.currentDifficulty,
            level: neonJumpGame.currentLevel,
            score: neonJumpGame.score,
            health: neonJumpGame.player ? neonJumpGame.player.health : 0,
            checkpoints: neonJumpGame.checkpointsCollected,
            totalCheckpoints: neonJumpGame.totalCheckpoints,
            gameTime: neonJumpGame.gameTime
        };
    }
    return null;
}

// Make all functions globally available
window.startNeonJumpGame = startNeonJumpGame;
window.restartNeonJumpGame = restartNeonJumpGame;
window.showNeonJumpMenu = showNeonJumpMenu;
window.togglePause = togglePause;
window.goBackToWelcome = goBackToWelcome;
window.goBackToDesktop = goBackToDesktop;
window.goBackToDesktopFromGame = goBackToDesktopFromGame;
window.initializeNeonJump = initializeNeonJump;
window.getGameStats = getGameStats; 