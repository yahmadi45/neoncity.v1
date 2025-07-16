/**
 * NeoCityOS Main Application Entry Point
 * 
 * This file serves as the main entry point for the NeoCityOS cyberpunk-themed
 * web operating system. It handles user authentication, global event management,
 * and application initialization.
 * 
 * Key Features:
 * - User authentication and session management
 * - Global keyboard shortcuts (Escape, Alt+Tab)
 * - Mobile device detection and responsive adjustments
 * - Proximity effects for enhanced cyberpunk UI
 * - Error handling and logging
 * - Accessibility features
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 * @license MIT
 */

// Error handling is now managed by the dedicated ErrorManager system
// Global error handlers are set up in errorManager.js

/**
 * NeonJump Detection and Initialization
 * 
 * Checks if we're returning from NeonJump and handles the appropriate UI state.
 * This function runs immediately when the script loads.
 */
function detectNeonJumpReturn() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const fromNeonJump = urlParams.get('from');
        const showDesktop = urlParams.get('show');
        const openApp = urlParams.get('openApp');
        const directApp = urlParams.get('directApp');
        const returnToDesktop = sessionStorage.getItem('returnToDesktop');
        const fromNeonJumpStorage = sessionStorage.getItem('fromNeonJump');
        
        // If any NeonJump return condition is detected, show desktop immediately
        if (fromNeonJump === 'neonjump' || showDesktop === 'desktop' || 
            returnToDesktop === 'true' || fromNeonJumpStorage === 'true' ||
            directApp === 'neon-jump') {
            
            console.log('NeonJump return detected with params:', {
                fromNeonJump,
                showDesktop,
                returnToDesktop,
                fromNeonJumpStorage,
                directApp
            });
            
            // Add class to body for CSS-based state management
            document.body.classList.add('neonjump-return');
            
            // Check if we need to open a specific app
            if (openApp === 'neon-jump' || directApp === 'neon-jump') {
                console.log('Opening NeonJump app with:', { openApp, directApp });
                
                // For direct app opening, add class for CSS-based hiding
                if (directApp === 'neon-jump') {
                    document.body.classList.add('direct-app');
                }
                
                // Wait for appManager to be available, then open NeonJump welcome screen
                setTimeout(() => {
                    if (typeof appManager !== 'undefined') {
                        appManager.openApp('neon-jump', 'Neon Jump');
                    } else {
                        // Fallback: try again after a longer delay
                        setTimeout(() => {
                            if (typeof appManager !== 'undefined') {
                                appManager.openApp('neon-jump', 'Neon Jump');
                            }
                        }, 1000);
                    }
                }, 100);
            }
            
            console.log('NeonJump return detected - desktop shown immediately');
        } else {
            // If NOT coming from NeonJump, show login form
            document.body.classList.add('normal-login');
            console.log('Normal login flow - login form shown');
        }
    } catch (error) {
        // Use ErrorManager for consistent error handling
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'NeonJump Detection');
        } else {
            console.error('Error in detectNeonJumpReturn:', error);
        }
    }
}

/**
 * Login Form Event Handler
 * 
 * Handles user authentication with the following features:
 * - Form validation and error handling
 * - Auto-registration for new users
 * - Smooth transition animations
 * - Sound effects for user feedback
 * - Session persistence
 * - Accessibility support
 */
function initializeLoginForm() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) {
        console.error('Login form not found');
        return;
    }

    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        
        try {
            // Provide audio feedback for user interaction
            if (typeof playSound === 'function') {
                playSound("click");
            }

            // Extract and sanitize user input
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            // Enhanced input validation
            if (!username || !password) {
                if (typeof playSound === 'function') {
                    playSound("error");
                }
                showLoginError("Please fill in all fields");
                return;
            }

            // Validate username format (alphanumeric, 3-20 characters)
            if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
                showLoginError("Username must be 3-20 characters, alphanumeric only");
                return;
            }

            // Validate password strength (minimum 6 characters)
            if (password.length < 6) {
                showLoginError("Password must be at least 6 characters");
                return;
            }

            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'CONNECTING...';
            submitButton.disabled = true;

            // Check if required functions exist
            if (typeof verifyUserCredentials !== 'function') {
                throw new Error('verifyUserCredentials function not found');
            }
            if (typeof createNewUser !== 'function') {
                throw new Error('createNewUser function not found');
            }

            // Attempt to verify existing user credentials
            let userData = verifyUserCredentials(username, password);

            // Auto-registration system: create new user if credentials don't exist
            if (!userData) {
                userData = createNewUser(username, password);
                console.log("New user created:", username);
            }

            // Set current user in desktop.js for session management
            if (typeof setCurrentUser === 'function') {
                setCurrentUser(username);
            }

            // Success audio feedback
            if (typeof playSound === 'function') {
                playSound("login");
            }
            
            // Smooth transition animation sequence
            loginForm.style.opacity = "0";
            loginForm.style.transition = "opacity 0.5s ease";
            
            // Show terminal after animation completes
            setTimeout(() => {
                document.getElementById("login-section").style.display = "none";
                if (typeof showTerminal === 'function') {
                    showTerminal();
                } else {
                    console.error('showTerminal function not found');
                    // Fallback: show desktop directly
                    if (typeof appManager !== 'undefined' && appManager.showDesktop) {
                        appManager.showDesktop();
                    }
                }
            }, 500);

        } catch (error) {
            // Use ErrorManager for consistent error handling
            if (window.errorManager && typeof window.errorManager.handleError === 'function') {
                window.errorManager.handleError(error, 'Login Form');
            } else {
                console.error('Login error:', error);
                showLoginError("Login failed. Please try again.");
            }
            
            // Reset button state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'CONNECT';
            submitButton.disabled = false;
        }
    });

    // Add real-time validation
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const isValid = /^[a-zA-Z0-9_]{0,20}$/.test(this.value);
            this.setAttribute('aria-invalid', !isValid);
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const isValid = this.value.length >= 6;
            this.setAttribute('aria-invalid', !isValid);
        });
    }
}

/**
 * Taskbar Event Handlers
 * 
 * Handles taskbar button interactions and start menu functionality.
 */
function initializeTaskbarEvents() {
    const startMenuBtn = document.getElementById('start-menu-btn');
    if (startMenuBtn) {
        startMenuBtn.addEventListener('click', function() {
            if (typeof showStartMenu === 'function') {
                showStartMenu();
                // Update aria-expanded attribute for accessibility
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            } else {
                console.warn('showStartMenu function not available');
            }
        });
    }
}

/**
 * Login Error Display Function
 * 
 * Delegates to the ErrorManager system for consistent error handling.
 * 
 * @param {string} message - The error message to display
 */
function showLoginError(message) {
    if (window.errorManager && typeof window.errorManager.showLoginError === 'function') {
        window.errorManager.showLoginError(message);
    } else {
        // Fallback to basic error display
        console.error('Login error:', message);
        alert(message);
    }
}

/**
 * System Error Display Function
 * 
 * Delegates to the ErrorManager system for consistent error handling.
 * 
 * @param {string} message - The error message to display
 */
function showSystemError(message) {
    if (window.errorManager && typeof window.errorManager.showSystemError === 'function') {
        window.errorManager.showSystemError(message);
    } else {
        // Fallback to basic error display
        console.error('System error:', message);
        alert(message);
    }
}

/**
 * Global Keyboard Shortcuts Handler
 * 
 * Implements system-wide keyboard shortcuts for enhanced user experience:
 * - Escape key: Close the most recent application window
 * - Alt+Tab: Application switching (placeholder for future implementation)
 * - Ctrl+Shift+I: Toggle developer mode (for debugging)
 * 
 * This provides a desktop-like experience in the web environment
 */
function initializeGlobalShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Escape key functionality: close the most recent application window
        if (e.key === 'Escape') {
            const openWindows = document.querySelectorAll('.app-window');
            if (openWindows.length > 0) {
                const lastWindow = openWindows[openWindows.length - 1];
                const closeBtn = lastWindow.querySelector('.close-btn');
                if (closeBtn) {
                    closeBtn.click();
                }
            }
        }
        
        // Alt+Tab application switching (placeholder for future enhancement)
        if (e.altKey && e.key === 'Tab') {
            e.preventDefault();
            console.log('Alt+Tab navigation (to be implemented)');
        }
        
        // Developer mode toggle (Ctrl+Shift+I)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            toggleDeveloperMode();
        }
    });
}

/**
 * Developer Mode Toggle
 * 
 * Enables/disables developer mode for debugging purposes.
 */
function toggleDeveloperMode() {
    const isDevMode = localStorage.getItem('neocity_dev_mode') === 'true';
    localStorage.setItem('neocity_dev_mode', !isDevMode);
    
    if (!isDevMode) {
        console.log('Developer mode enabled');
        document.body.classList.add('dev-mode');
    } else {
        console.log('Developer mode disabled');
        document.body.classList.remove('dev-mode');
    }
}

/**
 * Application Initialization Function
 * 
 * Sets up the application environment and user preferences:
 * - Restores previous user session if available
 * - Configures audio feedback for form interactions
 * - Excludes terminal inputs from audio feedback
 * - Logs successful initialization
 * - Sets up error boundaries
 */
function initializeApp() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const loginSection = document.getElementById('login-section');
    
    try {
        console.log('NeoCityOS initializing...');
        
        // Immediately ensure login form is visible unless coming from NeonJump
        const urlParams = new URLSearchParams(window.location.search);
        const showDesktop = urlParams.get('show');
        const fromNeonJump = urlParams.get('from');
        const returnToDesktop = sessionStorage.getItem('returnToDesktop');
        const fromNeonJumpStorage = sessionStorage.getItem('fromNeonJump');
        
        if (!(showDesktop === 'desktop' || returnToDesktop === 'true' || fromNeonJump === 'neonjump' || fromNeonJumpStorage === 'true')) {
            // Show login form immediately
            if (loginSection) {
                loginSection.style.display = 'block';
                loginSection.style.opacity = '1';
                console.log('Login form made visible immediately');
            }
            
            // Hide loading indicator immediately
            if (loadingIndicator) {
                loadingIndicator.hidden = true;
                console.log('Loading indicator hidden immediately');
            }
        } else {
            // Show loading indicator only if coming from NeonJump
            if (loadingIndicator) {
                loadingIndicator.hidden = false;
            }
        }
        
        // Check for critical dependencies
        console.log('Checking dependencies...');
        const dependencies = {
            errorManager: typeof window.errorManager !== 'undefined',
            appManager: typeof window.appManager !== 'undefined',
            localStorage: typeof window.localStorage !== 'undefined',
            sessionStorage: typeof window.sessionStorage !== 'undefined'
        };
        
        console.log('Dependencies status:', dependencies);
        
        // Initialize core systems with error handling
        try {
            console.log('Initializing login form...');
            initializeLoginForm();
        } catch (error) {
            if (window.errorManager && typeof window.errorManager.handleError === 'function') {
                window.errorManager.handleError(error, 'Login Form Initialization');
            } else {
                console.error('Error initializing login form:', error);
            }
        }
        
        try {
            console.log('Initializing taskbar events...');
            initializeTaskbarEvents();
        } catch (error) {
            if (window.errorManager && typeof window.errorManager.handleError === 'function') {
                window.errorManager.handleError(error, 'Taskbar Events Initialization');
            } else {
                console.error('Error initializing taskbar events:', error);
            }
        }
        
        try {
            console.log('Initializing global shortcuts...');
            initializeGlobalShortcuts();
        } catch (error) {
            if (window.errorManager && typeof window.errorManager.handleError === 'function') {
                window.errorManager.handleError(error, 'Global Shortcuts Initialization');
            } else {
                console.error('Error initializing global shortcuts:', error);
            }
        }
        
        try {
            console.log('Detecting NeonJump return...');
            detectNeonJumpReturn();
        } catch (error) {
            if (window.errorManager && typeof window.errorManager.handleError === 'function') {
                window.errorManager.handleError(error, 'NeonJump Detection');
            } else {
                console.error('Error detecting NeonJump return:', error);
            }
        }
        
        // Check if we should show desktop directly (from NeonJump back button)
        console.log('URL parameters:', { showDesktop, fromNeonJump, returnToDesktop, fromNeonJumpStorage });
        
        // Always show desktop if coming from NeonJump
        if (showDesktop === 'desktop' || returnToDesktop === 'true' || fromNeonJump === 'neonjump' || fromNeonJumpStorage === 'true') {
            console.log('Initializing desktop from NeonJump (dynamic)');
            // Clear all session storage flags
            sessionStorage.removeItem('returnToDesktop');
            sessionStorage.removeItem('fromNeonJump');
            
            // Initialize desktop immediately
            setTimeout(() => {
                if (typeof appManager !== 'undefined' && appManager.showDesktop) {
                    console.log('Using appManager.showDesktop()');
                    appManager.showDesktop();
                } else {
                    console.warn('appManager not available for desktop initialization, using fallback');
                    // Fallback: show desktop manually
                    showDesktopManually();
                }
            }, 100);
        } else {
            console.log('Normal login flow - ensuring login form is visible');
            // Ensure login form is visible
            document.body.classList.add('normal-login');
            
            // Explicitly show login section and hide loading
            if (loginSection) {
                loginSection.style.display = 'block';
                loginSection.style.opacity = '1';
            }
            
            if (loadingIndicator) {
                loadingIndicator.hidden = true;
            }
            
            console.log('Login form should now be visible');
        }
        
        console.log('NeoCityOS initialized successfully');
        
    } catch (error) {
        console.error('Critical error during initialization:', error);
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'NeoCityOS Initialization');
        } else {
            console.error('Error initializing NeoCityOS:', error);
            showSystemError('Failed to initialize NeoCityOS. Please refresh the page.');
        }
    } finally {
        // Only hide loading indicator and show login if NOT coming from NeonJump
        if (!(showDesktop === 'desktop' || returnToDesktop === 'true' || fromNeonJump === 'neonjump' || fromNeonJumpStorage === 'true')) {
            if (loadingIndicator) {
                loadingIndicator.hidden = true;
                console.log('Loading indicator hidden in fallback');
            }
            
            if (loginSection) {
                loginSection.style.display = 'block';
                loginSection.style.opacity = '1';
                document.body.classList.add('normal-login');
                console.log('Fallback: Login form made visible');
            }
        } else {
            console.log('Coming from NeonJump - not showing login form in fallback');
        }
    }
}

/**
 * Initialize Desktop from NeonJump
 * 
 * Handles the special case of returning from NeonJump game.
 */
function initializeDesktopFromNeonJump() {
    try {
        console.log('Initializing desktop from NeonJump return');
        
        // Clear session storage flags
        sessionStorage.removeItem('returnToDesktop');
        sessionStorage.removeItem('fromNeonJump');
        
        // Show desktop immediately
        if (typeof appManager !== 'undefined' && appManager.showDesktop) {
            appManager.showDesktop();
        }
        
        // Update URL to remove parameters
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Desktop Initialization from NeonJump');
        } else {
            console.error('Error initializing desktop from NeonJump:', error);
            showSystemError('Failed to return to desktop.');
        }
    }
}

/**
 * Show Desktop Manually
 * 
 * Fallback method for showing desktop when appManager is not available.
 */
function showDesktopManually() {
    try {
        console.log('Showing desktop manually (fallback)');
        
        // Hide login and terminal
        const loginSection = document.getElementById("login-section");
        const terminal = document.getElementById("terminal");
        
        if (loginSection) loginSection.style.display = "none";
        if (terminal) terminal.style.display = "none";
        
        // Show desktop
        const desktop = document.getElementById("desktop-section");
        if (desktop) {
            desktop.style.display = "block";
            desktop.style.opacity = "1";
        }
        
        // Show taskbar
        const taskbar = document.getElementById("taskbar");
        if (taskbar) {
            taskbar.style.display = "flex";
            taskbar.style.opacity = "1";
        }
        
        // Initialize desktop icons if appManager is available
        if (typeof appManager !== 'undefined') {
            if (appManager.renderDesktopIcons) {
                appManager.renderDesktopIcons();
            }
            if (appManager.updateTaskbar) {
                appManager.updateTaskbar();
            }
        }
        
        // Initialize animation system
        if (typeof createProfessionalAnimation === 'function') {
            createProfessionalAnimation();
        }
        
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Show Desktop Manually');
        } else {
            console.error('Error showing desktop manually:', error);
            showSystemError('Failed to show desktop.');
        }
    }
}

/**
 * Show Desktop from NeonJump
 * 
 * Alternative method for showing desktop when returning from NeonJump.
 */
function showDesktopFromNeonJump() {
    try {
        console.log('Showing desktop from NeonJump');
        
        // Hide login and terminal
        const loginSection = document.getElementById("login-section");
        const terminal = document.getElementById("terminal");
        
        if (loginSection) loginSection.style.display = "none";
        if (terminal) terminal.style.display = "none";
        
        // Show desktop
        const desktop = document.getElementById("desktop-section");
        if (desktop) {
            desktop.style.display = "block";
            desktop.style.opacity = "1";
        }
        
        // Show taskbar
        const taskbar = document.getElementById("taskbar");
        if (taskbar) {
            taskbar.style.display = "flex";
            taskbar.style.opacity = "1";
        }
        
        // Initialize desktop icons
        if (typeof appManager !== 'undefined') {
            if (appManager.renderDesktopIcons) {
                appManager.renderDesktopIcons();
            }
            if (appManager.updateTaskbar) {
                appManager.updateTaskbar();
            }
        }
        
        // Initialize professional animation system
        if (typeof createProfessionalAnimation === 'function') {
            createProfessionalAnimation();
        }
        
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Show Desktop from NeonJump');
        } else {
            console.error('Error showing desktop from NeonJump:', error);
            showSystemError('Failed to show desktop.');
        }
    }
}

/**
 * Save Last User
 * 
 * Persists the last logged-in user for session restoration.
 * 
 * @param {string} username - The username to save
 */
function saveLastUser(username) {
    try {
        if (username && typeof username === 'string') {
            localStorage.setItem('lastUser', username);
            console.log('Last user saved:', username);
        }
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Save Last User');
        } else {
            console.error('Error saving last user:', error);
        }
    }
}

/**
 * Mobile Device Detection
 * 
 * Detects if the current device is mobile and applies appropriate adjustments.
 * 
 * @returns {boolean} True if the device is mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
}

/**
 * Add Proximity Effect
 * 
 * Creates a proximity effect for enhanced cyberpunk UI interactions.
 * 
 * @param {string} selector - CSS selector for elements to apply effect to
 * @param {number} radius - Radius of the proximity effect in pixels
 */
function addProximityEffect(selector, radius = 120) {
    try {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const distance = Math.sqrt(x * x + y * y);
                
                if (distance < radius) {
                    const intensity = 1 - (distance / radius);
                    this.style.transform = `scale(${1 + intensity * 0.05})`;
                    this.style.boxShadow = `0 0 ${20 + intensity * 10}px rgba(0, 247, 255, ${0.3 + intensity * 0.4})`;
                } else {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = 'none';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Proximity Effect');
        } else {
            console.error('Error adding proximity effect:', error);
        }
    }
}

// Brief loading animation then show login (only if not coming from NeonJump)
(function() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const loginSection = document.getElementById('login-section');
    
    // Check if we're coming from NeonJump
    const urlParams = new URLSearchParams(window.location.search);
    const showDesktop = urlParams.get('show');
    const fromNeonJump = urlParams.get('from');
    const returnToDesktop = sessionStorage.getItem('returnToDesktop');
    const fromNeonJumpStorage = sessionStorage.getItem('fromNeonJump');
    
    // If coming from NeonJump, don't run the loading animation
    if (showDesktop === 'desktop' || returnToDesktop === 'true' || fromNeonJump === 'neonjump' || fromNeonJumpStorage === 'true') {
        console.log('Coming from NeonJump - skipping loading animation');
        return;
    }
    
    // Ensure loading is visible initially
    if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
        loadingIndicator.hidden = false;
        loadingIndicator.style.opacity = '1';
        loadingIndicator.style.visibility = 'visible';
        console.log('Loading indicator shown briefly');
    }
    
    // Hide login initially
    if (loginSection) {
        loginSection.style.display = 'none';
        loginSection.style.opacity = '0';
        loginSection.style.visibility = 'hidden';
    }
    
    // After 2 seconds, hide loading and show login with fade effect
    setTimeout(() => {
        if (loadingIndicator) {
            loadingIndicator.style.opacity = '0';
            loadingIndicator.style.transition = 'opacity 0.5s ease';
            console.log('Loading indicator fading out');
        }
        
        if (loginSection) {
            loginSection.style.display = 'block';
            loginSection.style.visibility = 'visible';
            loginSection.style.transition = 'opacity 0.5s ease';
            
            // Small delay to start fade in
            setTimeout(() => {
                loginSection.style.opacity = '1';
                console.log('Login form fading in');
            }, 100);
        }
        
        document.body.classList.add('normal-login');
        
        // Hide loading completely after fade
        setTimeout(() => {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
                loadingIndicator.hidden = true;
                console.log('Loading indicator completely hidden');
            }
        }, 500);
    }, 2000); // 2 seconds
})();

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Immediate check to ensure login form is visible if not coming from NeonJump
document.addEventListener('DOMContentLoaded', function() {
    // Check if we should show login form immediately
    const urlParams = new URLSearchParams(window.location.search);
    const showDesktop = urlParams.get('show');
    const fromNeonJump = urlParams.get('from');
    const returnToDesktop = sessionStorage.getItem('returnToDesktop');
    const fromNeonJumpStorage = sessionStorage.getItem('fromNeonJump');
    
    if (!(showDesktop === 'desktop' || returnToDesktop === 'true' || fromNeonJump === 'neonjump' || fromNeonJumpStorage === 'true')) {
        // Show login form immediately
        const loginSection = document.getElementById('login-section');
        const loadingIndicator = document.getElementById('loading-indicator');
        
        if (loginSection) {
            loginSection.style.display = 'block';
            loginSection.style.opacity = '1';
        }
        
        if (loadingIndicator) {
            loadingIndicator.hidden = true;
        }
        
        document.body.classList.add('normal-login');
        console.log('DOM ready: Login form made visible immediately');
    }
});

// Multiple safety timeouts to ensure loading indicator is hidden
setTimeout(() => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator && !loadingIndicator.hidden) {
        console.warn('Loading indicator timeout (2s) - forcing hide');
        loadingIndicator.hidden = true;
        document.body.classList.add('normal-login');
        
        const loginSection = document.getElementById('login-section');
        if (loginSection) {
            loginSection.style.display = 'block';
            loginSection.style.opacity = '1';
        }
    }
}, 2000); // 2 second timeout

setTimeout(() => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator && !loadingIndicator.hidden) {
        console.warn('Loading indicator timeout (5s) - forcing hide');
        loadingIndicator.hidden = true;
        document.body.classList.add('normal-login');
        
        const loginSection = document.getElementById('login-section');
        if (loginSection) {
            loginSection.style.display = 'block';
            loginSection.style.opacity = '1';
        }
    }
}, 5000); // 5 second timeout

// Ultimate fallback - ensure login is visible after 8 seconds
setTimeout(() => {
    console.log('Ultimate fallback: Ensuring login form is visible');
    document.body.classList.add('normal-login');
    
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.hidden = true;
    }
    
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
        loginSection.style.display = 'block';
        loginSection.style.opacity = '1';
    }
}, 8000); // 8 second timeout

// Fallback mechanism for missing dependencies
window.addEventListener('load', function() {
    try {
        // Check if critical functions exist and provide fallbacks
        if (typeof verifyUserCredentials === 'undefined') {
            console.warn('verifyUserCredentials not found, creating fallback');
            window.verifyUserCredentials = function(username, password) {
                // Simple fallback - always return null to trigger new user creation
                return null;
            };
        }
        
        if (typeof createNewUser === 'undefined') {
            console.warn('createNewUser not found, creating fallback');
            window.createNewUser = function(username, password) {
                // Simple fallback - just return a basic user object
                return { username: username, created: new Date() };
            };
        }
        
        if (typeof showTerminal === 'undefined') {
            console.warn('showTerminal not found, creating fallback');
            window.showTerminal = function() {
                // Simple fallback - show desktop directly
                if (typeof appManager !== 'undefined' && appManager.showDesktop) {
                    appManager.showDesktop();
                } else {
                    // Ultimate fallback - show desktop manually
                    const loginSection = document.getElementById("login-section");
                    const terminal = document.getElementById("terminal");
                    const desktop = document.getElementById("desktop-section");
                    const taskbar = document.getElementById("taskbar");
                    
                    if (loginSection) loginSection.style.display = "none";
                    if (terminal) terminal.style.display = "none";
                    if (desktop) {
                        desktop.style.display = "block";
                        desktop.style.opacity = "1";
                    }
                    if (taskbar) {
                        taskbar.style.display = "flex";
                        taskbar.style.opacity = "1";
                    }
                }
            };
        }
        
        if (typeof playSound === 'undefined') {
            console.warn('playSound not found, creating fallback');
            window.playSound = function(type) {
                // Silent fallback - do nothing
                console.log('Audio requested:', type);
            };
        }
        
        console.log('Fallback mechanism initialized');
        
    } catch (error) {
        if (window.errorManager && typeof window.errorManager.handleError === 'function') {
            window.errorManager.handleError(error, 'Fallback Mechanism');
        } else {
            console.error('Error in fallback mechanism:', error);
        }
    }
});





