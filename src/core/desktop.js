/**
 * NeoCityOS Desktop Manager
 * 
 * This module manages the desktop environment and user session state.
 * It provides functions for user management, desktop initialization,
 * and system-wide utilities.
 * 
 * Key Features:
 * - User session management
 * - Desktop state tracking
 * - System utilities and helpers
 * - Time synchronization
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 * @license MIT
 */

// Global state variables
let currentUser = null;
let currentLocation = 'desktop';
let systemTime = new Date();

/**
 * Set Current User
 * 
 * Updates the current user session and notifies the taskbar.
 * 
 * @param {string} username - The username to set as current user
 */
function setCurrentUser(username) {
    try {
        currentUser = username;
        
        // Update taskbar if appManager is available
        if (typeof appManager !== 'undefined' && appManager.updateTaskbar) {
            appManager.updateTaskbar();
        }
        
        // Save user to localStorage for session persistence
        if (username) {
            localStorage.setItem('currentUser', username);
            console.log('Current user set to:', username);
        }
        
    } catch (error) {
        console.error('Error setting current user:', error);
    }
}

/**
 * Get Current User
 * 
 * Retrieves the current user from session or localStorage.
 * 
 * @returns {string|null} The current username or null if not set
 */
function getCurrentUser() {
    if (currentUser) {
        return currentUser;
    }
    
    // Try to restore from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        return savedUser;
    }
    
    return null;
}

/**
 * Clear Current User
 * 
 * Clears the current user session and localStorage.
 */
function clearCurrentUser() {
    try {
        currentUser = null;
        localStorage.removeItem('currentUser');
        console.log('Current user cleared');
    } catch (error) {
        console.error('Error clearing current user:', error);
    }
}

/**
 * Get Current Location
 * 
 * Returns the current application location/context.
 * 
 * @returns {string} The current location identifier
 */
function getCurrentLocation() {
    return currentLocation;
}

/**
 * Set Current Location
 * 
 * Updates the current application location/context.
 * 
 * @param {string} location - The new location identifier
 */
function setCurrentLocation(location) {
    try {
        currentLocation = location;
        console.log('Current location set to:', location);
    } catch (error) {
        console.error('Error setting current location:', error);
    }
}

/**
 * Get System Time
 * 
 * Returns the current system time with cyberpunk formatting.
 * 
 * @returns {string} Formatted system time
 */
function getSystemTime() {
    try {
        systemTime = new Date();
        const hours = systemTime.getHours().toString().padStart(2, '0');
        const minutes = systemTime.getMinutes().toString().padStart(2, '0');
        const seconds = systemTime.getSeconds().toString().padStart(2, '0');
        
        return `${hours}:${minutes}:${seconds}`;
    } catch (error) {
        console.error('Error getting system time:', error);
        return '00:00:00';
    }
}

/**
 * Get System Date
 * 
 * Returns the current system date with cyberpunk formatting.
 * 
 * @returns {string} Formatted system date
 */
function getSystemDate() {
    try {
        systemTime = new Date();
        const year = systemTime.getFullYear();
        const month = (systemTime.getMonth() + 1).toString().padStart(2, '0');
        const day = systemTime.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error getting system date:', error);
        return '2024-01-01';
    }
}

/**
 * Initialize Desktop Environment
 * 
 * Sets up the desktop environment with proper state management.
 */
function initializeDesktop() {
    try {
        console.log('Initializing desktop environment...');
        
        // Restore user session if available
        const savedUser = getCurrentUser();
        if (savedUser) {
            console.log('Restored user session:', savedUser);
        }
        
        // Set up time synchronization
        updateSystemTime();
        
        // Initialize desktop icons if appManager is available
        if (typeof appManager !== 'undefined' && appManager.renderDesktopIcons) {
            appManager.renderDesktopIcons();
        }
        
        console.log('Desktop environment initialized successfully');
        
    } catch (error) {
        console.error('Error initializing desktop environment:', error);
    }
}

/**
 * Update System Time
 * 
 * Updates the system time display and schedules the next update.
 */
function updateSystemTime() {
    try {
        // Update time display if taskbar is available
        if (typeof appManager !== 'undefined' && appManager.updateTaskbar) {
            appManager.updateTaskbar();
        }
        
        // Schedule next update in 1 second
        setTimeout(updateSystemTime, 1000);
        
    } catch (error) {
        console.error('Error updating system time:', error);
    }
}

/**
 * Create New Folder
 * 
 * Placeholder function for creating new folders in the file system.
 * To be implemented in future versions.
 */
function createNewFolder() {
    try {
        console.log('Creating new folder...');
        // TODO: Implement folder creation functionality
        // This will be integrated with the file manager in future versions
    } catch (error) {
        console.error('Error creating new folder:', error);
    }
}

/**
 * Upload File
 * 
 * Placeholder function for file upload functionality.
 * To be implemented in future versions.
 */
function uploadFile() {
    try {
        console.log('Uploading file...');
        // TODO: Implement file upload functionality
        // This will be integrated with the file manager in future versions
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Browser functionality has been moved to js/apps/browser.js

/**
 * Roll Dice
 * 
 * Placeholder function for dice rolling functionality.
 * To be implemented in future versions.
 */
function rollDice() {
    try {
        console.log('Rolling dice...');
        // TODO: Implement dice rolling functionality
        // This will be integrated with the dice game in future versions
    } catch (error) {
        console.error('Error rolling dice:', error);
    }
}

/**
 * Get System Information
 * 
 * Returns system information for display purposes.
 * 
 * @returns {Object} System information object
 */
function getSystemInfo() {
    try {
        return {
            user: getCurrentUser() || 'Guest',
            location: getCurrentLocation(),
            time: getSystemTime(),
            date: getSystemDate(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine
        };
    } catch (error) {
        console.error('Error getting system info:', error);
        return {
            user: 'Unknown',
            location: 'unknown',
            time: '00:00:00',
            date: '2024-01-01',
            error: error.message
        };
    }
}

/**
 * Logout User
 * 
 * Logs out the current user and clears session data.
 */
function logoutUser() {
    try {
        console.log('Logging out user:', currentUser);
        
        // Clear user session
        clearCurrentUser();
        
        // Reset location
        setCurrentLocation('desktop');
        
        // Redirect to login
        window.location.reload();
        
    } catch (error) {
        console.error('Error logging out user:', error);
    }
}

// Initialize desktop when module loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDesktop();
});

// Export functions for global access
window.setCurrentUser = setCurrentUser;
window.getCurrentUser = getCurrentUser;
window.clearCurrentUser = clearCurrentUser;
window.getCurrentLocation = getCurrentLocation;
window.setCurrentLocation = setCurrentLocation;
window.getSystemTime = getSystemTime;
window.getSystemDate = getSystemDate;
window.getSystemInfo = getSystemInfo;
window.logoutUser = logoutUser;
  