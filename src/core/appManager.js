/**
 * NeoCityOS Application Manager
 * 
 * This module provides centralized management for opening, closing, and managing
 * all applications within the NeoCityOS system. It implements a window management
 * system similar to modern operating systems with taskbar integration.
 * 
 * Key Features:
 * - Dynamic application window creation and management
 * - Location-based navigation system
 * - Taskbar integration and window state tracking
 * - Content generation for all application types
 * - Animations and transitions
 * 
 * Architecture:
 * - Uses Map data structure for efficient window tracking
 * - Implements state management for current location
 * - Provides content generation for 13 different applications
 * - Supports both system and educational applications
 * 
 * @author NeoCityOS Development Team
 * @version 1.0.0
 */

/**
 * Application Manager Class
 * 
 * Main class responsible for managing the lifecycle of all applications
 * in the NeoCityOS system. Implements window management, navigation,
 * and content generation patterns.
 */
class AppManager {
    /**
     * Constructor - Initialize Application Manager
     * 
     * Sets up the core data structures and initial state:
     * - openWindows: Map to track currently open application windows
     * - currentLocation: String tracking the current application context
     */
    constructor() {
        // Map to store open windows with their IDs as keys
        // This provides O(1) lookup time for window management
        this.openWindows = new Map();
        
        // Track current location for navigation and context switching
        // Defaults to 'desktop' on system startup
        this.currentLocation = 'desktop';
    }

    /**
     * Open Application Method
     * 
     * Main entry point for launching applications. Handles:
     * - Audio feedback for user interactions
     * - Location-based routing to appropriate display methods
     * - State management and context switching
     * 
     * Algorithm:
     * 1. Log the application launch for debugging
     * 2. Provide audio feedback for user interaction
     * 3. Update current location state
     * 4. Route to appropriate display method based on location
     * 5. Fallback to desktop if location is unknown
     * 
     * @param {string} location - The application location/context identifier
     * @param {string} appName - The name of the application to open
     */
    openApp(location, appName) {
        console.log(`Opening ${appName} at location: ${location}`);
        
        // Provide audio feedback for user interaction
        // This enhances the cyberpunk experience with sound effects
        if (typeof playSound === 'function') {
            playSound('click');
        }
        
        // Update current location for state management
        // This enables proper navigation and context awareness
        this.currentLocation = location;
        
        // Route to appropriate display method based on location
        // This switch statement handles all 13 application types
        switch(location) {
            case 'desktop':
                this.showDesktop();
                break;
            case 'ai-agent':
                this.showAIAgent();
                break;
            case 'external-apps':
                this.showExternalApps();
                break;
            case 'external-games':
                this.showExternalGames();
                break;
            case 'filemanager':
                this.showFileManager();
                break;
            case 'terminal':
                this.showTerminalApp();
                break;
            case 'browser':
                this.showBrowser();
                break;
            case 'dicegame':
                this.showDiceGame();
                break;
            case 'neon-jump':
                this.showNeonJump();
                break;
            case 'store':
                this.showStore();
                break;
            case 'devops':
                this.showDevOpsDashboard();
                break;

            case 'algorithm':
                this.showAlgorithmVisualizer();
                break;
            case 'advanced-dice':
                this.showAdvancedDiceGame();
                break;
            case 'data-structures':
                this.showDataStructuresPlayground();
                break;
            case 'memory-game':
                this.showMemoryGame();
                break;
            case 'puzzle-solver':
                this.showPuzzleSolver();
                break;
            case 'text-analyzer':
                this.showTextAnalyzer();
                break;
            case 'number-guesser':
                this.showNumberGuesser();
                break;
            default:
                // Fallback to desktop for unknown locations
                this.showDesktop();
        }
    }

    /**
     * Show Desktop Method
     * 
     * Displays the main desktop interface with application icons.
     * This is the primary navigation hub for the entire system.
     * 
     * Algorithm:
     * 1. Update current location to desktop
     * 2. Hide all other applications and windows
     * 3. Show desktop section with fade-in animation
     * 4. Render desktop icons for all available applications
     * 5. Update taskbar to reflect current state
     * 6. Initialize animations
     */
    showDesktop() {
        this.currentLocation = 'desktop';
        this.hideAllApps();
        const loginSection = document.getElementById('login-section');
        if (loginSection) {
            loginSection.style.display = 'none';
            loginSection.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('normal-login');
        
        // Get desktop section and display it with animation
        const desktop = document.getElementById("desktop-section");
        if (desktop) {
            desktop.style.display = "block";
            desktop.style.visibility = "visible"; // Ensure visibility is restored
            this.renderDesktopIcons();
            this.updateTaskbar();
            
            // Show taskbar
            const taskbar = document.getElementById("taskbar");
            if (taskbar) {
                taskbar.style.display = "flex";
                taskbar.style.opacity = "1";
            }
            
                    // Initialize animation system
        // This creates the cyberpunk visual effects
        if (typeof createProfessionalAnimation === 'function') {
            createProfessionalAnimation();
        }
            
            // Fade-in animation for smooth transition
            setTimeout(() => {
                desktop.style.opacity = "1";
            }, 10);
        }
    }

    /**
     * Hide All Applications Method
     * 
     * Utility method to hide all application windows and the startup terminal.
     * This ensures clean transitions between different application contexts.
     * 
     * Algorithm:
     * 1. Hide the startup terminal if visible
     * 2. Find all application windows using CSS selector
     * 3. Hide each window by setting display to 'none'
     */
    hideAllApps() {
        const loginSection = document.getElementById('login-section');
        if (loginSection && this.currentLocation !== 'desktop') {
            loginSection.style.display = 'none';
        }
        // Hide the startup terminal that appears after login
        const terminal = document.getElementById("terminal");
        if (terminal) terminal.style.display = "none";
        
        // Hide all application windows currently open
        // This uses CSS selector to find all elements with 'app-window' class
        const appWindows = document.querySelectorAll('.app-window');
        appWindows.forEach(window => window.style.display = 'none');
    }

    /**
     * Show File Manager Method
     * 
     * Launches the file manager application with its custom interface.
     * The file manager provides file system navigation and management.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create application window with file manager content
     * 3. Render desktop icons for navigation
     * 4. Initialize file manager functionality after DOM is ready
     */
    showFileManager() {
        this.hideAllApps();
        this.createAppWindow('filemanager', 'File Manager', this.generateFileManagerContent());
        this.renderDesktopIcons();
        
        // Initialize file manager after DOM elements are created
        // This ensures all required elements are available
        setTimeout(() => {
            if (typeof fileManager !== 'undefined' && fileManager.init) {
                fileManager.init();
            }
        }, 100);
    }

    /**
     * Show Terminal Application Method
     * 
     * Launches the terminal application with full command-line interface.
     * The terminal provides access to system commands and special features.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create terminal window with custom content
     * 3. Initialize NeoTerminal class if not already instantiated
     * 4. Configure event listeners for input handling
     * 5. Display welcome message with cyberpunk styling
     * 6. Set up command execution system
     */
    showTerminalApp() {
        this.hideAllApps();
        this.createAppWindow('terminal-app', 'NeoTerminal', this.generateTerminalContent());
        this.renderDesktopIcons();
        
        // Initialize terminal functionality after DOM is ready
        setTimeout(() => {
            // Create NeoTerminal instance if it doesn't exist
            if (typeof window.terminal === 'undefined') {
                window.terminal = new NeoTerminal();
            }
            
            // Configure terminal input event handling
            // Remove existing listeners to prevent duplicates
            const input = document.getElementById('terminal-input');
            if (input) {
                input.removeEventListener('keydown', window.terminal.handleKeyDown);
                input.addEventListener('keydown', (e) => window.terminal.handleKeyDown(e));
                input.focus();
            }
            
            // Display welcome message with cyberpunk styling
            // This provides user guidance and sets the tone
            const outputElement = document.getElementById('terminal-output');
            if (outputElement) {
                outputElement.innerHTML = `
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">🚀 Welcome to NeoTerminal v2.0 - Cyberpunk Interface</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">💡 Type 'help' to see all available commands</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">🎮 Special commands: 'dice', 'store', 'matrix', 'hack'</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="cursor">_</span>
                    </div>
                `;
            }
            
            // Configure send button for command execution
            // This provides an alternative to Enter key for command submission
            const sendButton = document.querySelector('.terminal-send-btn');
            if (sendButton) {
                sendButton.addEventListener('click', function() {
                    const input = document.getElementById('terminal-input');
                    const command = input.value.trim();
                    if (command && window.terminal) {
                        window.terminal.executeCommand(command);
                        input.value = '';
                        input.focus();
                    }
                });
            }
        }, 100);
    }

    /**
     * Show Browser Method
     * 
     * Launches the web browser application for internet access.
     * The browser provides a simplified web browsing experience.
     */
    showBrowser() {
        this.hideAllApps();
        this.createAppWindow('browser', 'NeoBrowser', this.generateBrowserContent());
        this.renderDesktopIcons();
        
        // Load the new browser script
        setTimeout(() => {
            this.loadBrowserScript();
        }, 200);
    }

    /**
     * Show Dice Game Method
     * 
     * Launches the dice game application for entertainment.
     * The dice game provides interactive dice rolling with animations.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create dice game window with custom content
     * 3. Initialize DiceGame class if not already instantiated
     * 4. Set up game functionality after DOM is ready
     */
    showDiceGame() {
        this.hideAllApps();
        this.createAppWindow('dicegame', 'Dice Game', this.generateDiceGameContent());
        this.renderDesktopIcons();
        
        // Initialize dice game after DOM elements are created
        setTimeout(() => {
            if (window.diceGame) {
                window.diceGame.initialize();
            } else {
                window.diceGame = new DiceGame();
            }
        }, 100);
    }

    /**
     * Show Store Method
     * 
     * Launches the cyberpunk store application for virtual shopping.
     * The store provides an interactive marketplace experience.
     */
    showStore() {
        console.log('Opening Store...');
        this.hideAllApps();
        this.createAppWindow('store', 'NeoStore', this.generateStoreContent());
        // --- AUTO-FIX: Ensure store window is visible and on top ---
        setTimeout(() => {
            const storeWin = document.getElementById('store');
            if (storeWin) {
                storeWin.style.display = 'block';
                storeWin.style.zIndex = '9999';
                storeWin.style.opacity = '1';
            } else {
                console.error('[Store] Store app window not found after creation!');
            }
        }, 50);
        // --- END AUTO-FIX ---
        this.renderDesktopIcons();
        // Initialize the store after DOM is ready
        setTimeout(() => {
            console.log('Initializing Store...');
            if (window.store) {
                console.log('Store instance found, initializing...');
                window.store.init();
                // --- AUTO-FIX: Confirm store.init() called ---
                console.log('[Store] window.store.init() called');
                // --- END AUTO-FIX ---
            } else {
                console.error('Store instance not found!');
            }
        }, 200);
    }

    /**
     * Show Neon Jump Method
     * 
     * Launches the Neon Jump platformer game with fire-themed design.
     * The game features multiple difficulty levels and animations.
     */
    showDevOpsDashboard() {
        this.hideAllApps();
        this.createAppWindow('devops-app', 'DevOps Control Room', '<div id="devops-dashboard"></div>');
        this.renderDesktopIcons();
        if (window.devOpsDashboard) window.devOpsDashboard.render();
    }

    showAIAgent() {
        this.hideAllApps();
        this.createAppWindow('ai-agent', 'AI Agent', this.generateAIAgentContent());
        this.renderDesktopIcons();
        setTimeout(() => this.initializeExternalLauncher('ai-agent'), 50);
    }

    showExternalApps() {
        this.hideAllApps();
        this.createAppWindow('external-apps', 'External Apps', this.generateExternalLauncherContent('app'));
        this.renderDesktopIcons();
        setTimeout(() => this.initializeExternalLauncher('external-app'), 50);
    }

    showExternalGames() {
        this.hideAllApps();
        this.createAppWindow('external-games', 'External Games', this.generateExternalLauncherContent('game'));
        this.renderDesktopIcons();
        setTimeout(() => this.initializeExternalLauncher('external-game'), 50);
    }

    escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, (character) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    getStoredIntegration(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || '{}');
            return value && typeof value === 'object' ? value : {};
        } catch (_) {
            localStorage.removeItem(key);
            return {};
        }
    }

    generateAIAgentContent() {
        const saved = this.getStoredIntegration('neocityAIAgent');
        const image = this.escapeHTML(saved.image || '');
        const url = this.escapeHTML(saved.url || 'http://localhost:3000');
        return `
            <div class="integration-shell">
                <div class="integration-panel">
                    <span class="integration-eyebrow">LOCAL CONTAINER</span>
                    <h3>AI Agent</h3>
                    <p>Start the recommended local AI stack, choose a model in Open WebUI, then connect it here. NeoCityOS remains static and does not run a backend.</p>
                    <label>Docker Hub image
                        <input class="integration-image" type="text" placeholder="owner/agent-image:latest" value="${image}">
                    </label>
                    <label>Agent web URL
                        <input class="integration-url" type="url" placeholder="http://localhost:3000" value="${url}">
                    </label>
                    <button type="button" class="integration-connect">Connect Agent</button>
                    <pre class="integration-command"></pre>
                </div>
                <div class="integration-preview">
                    <iframe class="integration-frame" title="AI Agent" sandbox="allow-scripts allow-forms allow-same-origin allow-downloads"></iframe>
                    <div class="integration-empty">
                        <strong>Agent not connected</strong>
                        <span>Enter a Docker web URL and connect.</span>
                    </div>
                </div>
            </div>`;
    }

    generateExternalLauncherContent(type) {
        const kind = type === 'game' ? 'game' : 'app';
        const title = kind === 'game' ? 'External Game' : 'External App';
        const saved = this.getStoredIntegration(`neocityExternal${kind === 'game' ? 'Games' : 'Apps'}`);
        const name = this.escapeHTML(saved.name || '');
        const url = this.escapeHTML(saved.url || '');
        const catalog = kind === 'game'
            ? [
                ['Neon Jump', 'neon-jump', 'assets/icons/neonJump.png'],
                ['Dice Game', 'dicegame', 'assets/icons/dice.png'],
                ['Advanced Dice', 'advanced-dice', 'assets/icons/advancedDice.png'],
                ['Memory Game', 'memory-game', 'assets/icons/memoryGame.png'],
                ['Puzzle Solver', 'puzzle-solver', 'assets/icons/puzzleSolver.png'],
                ['Number Guesser', 'number-guesser', 'assets/icons/numberGuesser.png']
              ]
            : [
                ['DevOps', 'devops', 'assets/icons/terminal.png'],
                ['Files', 'filemanager', 'assets/icons/files.png'],
                ['Browser', 'browser', 'assets/icons/browser.png'],
                ['Store', 'store', 'assets/icons/store.png'],
                ['Algorithm Visualizer', 'algorithm', 'assets/icons/algorithmVisualizer.png'],
                ['Data Structures', 'data-structures', 'assets/icons/dataStructures.png'],
                ['Text Analyzer', 'text-analyzer', 'assets/icons/textAnalyzer.png']
              ];
        const catalogMarkup = catalog.map(([itemName, location, icon]) => `
            <button type="button" class="integration-card" data-location="${location}">
                <img src="${icon}" alt="">
                <span>${itemName}</span>
            </button>`).join('');
        return `
            <div class="integration-shell">
                <div class="integration-panel">
                    <span class="integration-eyebrow">${kind === 'game' ? 'CONTAINER OR HOSTED GAME' : 'DOCKER OR GITHUB WEB APP'}</span>
                    <h3>${title}</h3>
                    <p>Open a web application or game inside NeoCityOS. GitHub Pages and Docker web containers are supported through an isolated iframe.</p>
                    <div class="integration-catalog" aria-label="Built-in ${kind === 'game' ? 'games' : 'applications'}">
                        ${catalogMarkup}
                    </div>
                    <label>Display name
                        <input class="integration-name" type="text" placeholder="${kind === 'game' ? 'My Container Game' : 'My Web App'}" value="${name}">
                    </label>
                    <label>Public or localhost URL
                        <input class="integration-url" type="url" placeholder="https://example.github.io/app/" value="${url}">
                    </label>
                    <button type="button" class="integration-connect">Open ${title}</button>
                </div>
                <div class="integration-preview">
                    <iframe class="integration-frame" title="${title}" sandbox="allow-scripts allow-forms allow-same-origin allow-downloads allow-popups"></iframe>
                    <div class="integration-empty">
                        <strong>No ${kind} connected</strong>
                        <span>Add a public URL or a local Docker URL.</span>
                    </div>
                </div>
            </div>`;
    }

    initializeExternalLauncher(mode) {
        const windowId = mode === 'ai-agent' ? 'ai-agent' : mode === 'external-app' ? 'external-apps' : 'external-games';
        const windowElement = document.getElementById(windowId);
        if (!windowElement) return;

        const urlInput = windowElement.querySelector('.integration-url');
        const imageInput = windowElement.querySelector('.integration-image');
        const nameInput = windowElement.querySelector('.integration-name');
        const button = windowElement.querySelector('.integration-connect');
        const frame = windowElement.querySelector('.integration-frame');
        const empty = windowElement.querySelector('.integration-empty');
        const command = windowElement.querySelector('.integration-command');

        if (mode === 'ai-agent' && command) {
            const updateCommand = () => {
                const image = imageInput.value.trim();
                command.textContent = image
                    ? `docker run --rm -p 3000:8080 ${image}\nThen open http://localhost:3000`
                    : 'docker compose -f docker-compose.ai.yml up -d\ndocker compose -f docker-compose.ai.yml exec ollama ollama pull llama3.2\nThen open http://localhost:3000';
            };
            imageInput.addEventListener('input', updateCommand);
            updateCommand();
        }

        const connect = () => {
            const url = urlInput.value.trim();
            if (!url) {
                empty.innerHTML = '<strong>URL required</strong><span>Enter a valid public or localhost URL.</span>';
                empty.style.display = 'flex';
                return;
            }

            try {
                const parsed = new URL(url);
                if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid protocol');
            } catch (_) {
                empty.innerHTML = '<strong>Invalid URL</strong><span>Use http:// or https://.</span>';
                empty.style.display = 'flex';
                return;
            }

            if (mode === 'ai-agent') {
                localStorage.setItem('neocityAIAgent', JSON.stringify({
                    image: imageInput.value.trim(),
                    url
                }));
            } else {
                const key = mode === 'external-app' ? 'neocityExternalApps' : 'neocityExternalGames';
                localStorage.setItem(key, JSON.stringify({ name: nameInput.value.trim(), url }));
            }

            empty.style.display = 'none';
            frame.src = url;
        };

        button.addEventListener('click', connect);
        windowElement.querySelectorAll('.integration-card').forEach((card) => {
            card.addEventListener('click', () => {
                const location = card.dataset.location;
                const name = card.querySelector('span')?.textContent || location;
                this.openApp(location, name);
            });
        });
        urlInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') connect();
        });

        if (urlInput.value && urlInput.value !== 'http://localhost:3000') connect();
    }
    showNeonJump() {
        console.log('Opening Neon Jump - NeoCityOS Edition...');
        this.hideAllApps();
        
        // Check if this is a direct app opening (from game menu)
        const urlParams = new URLSearchParams(window.location.search);
        const directApp = urlParams.get('directApp');
        
        if (directApp === 'neon-jump') {
            // For direct app opening, keep desktop completely hidden
            const desktop = document.getElementById('desktop-section');
            if (desktop) {
                desktop.style.display = 'block';
                desktop.style.opacity = '0';
                desktop.style.visibility = 'hidden';
            }
            
            // Don't render desktop icons for direct app opening
            this.createAppWindow('neon-jump', '🔥 Neon Jump - Welcome 🔥', this.generateNeonJumpWelcomeContent());
        } else {
            // Normal desktop opening
            const desktop = document.getElementById('desktop-section');
            if (desktop) {
                desktop.style.display = 'block';
                desktop.style.opacity = '1';
            }
            
            this.createAppWindow('neon-jump', '🔥 Neon Jump - Welcome 🔥', this.generateNeonJumpWelcomeContent());
            this.renderDesktopIcons();
        }
        
        // Load external CSS and JS files dynamically
        this.loadNeonJumpResources();
    }





    /**
     * Create Application Window Method
     * 
     * Creates a new application window with a header, content, and close button.
     * Handles window creation, animation, and state management.
     * 
     * @param {string} id - Unique identifier for the window
     * @param {string} title - Title of the application window
     * @param {string} content - HTML content for the application window
     */
    createAppWindow(id, title, content) {
        // Remove existing window if it exists
        const existingWindow = document.getElementById(id);
        if (existingWindow) {
            existingWindow.remove();
        }
        
        const appWindow = document.createElement('div');
        appWindow.id = id;
        appWindow.className = 'app-window';
        appWindow.tabIndex = -1;
        appWindow.setAttribute('role', 'dialog');
        appWindow.setAttribute('aria-modal', 'true');
        appWindow.setAttribute('aria-label', title);
        appWindow.innerHTML = `
            <div class="app-header">
                <div class="window-drag-area">
                    <span class="window-status" aria-hidden="true"></span>
                    <h3></h3>
                </div>
                <div class="window-controls">
                    <button class="minimize-btn" type="button" aria-label="Minimize ${title}" title="Minimize">−</button>
                    <button class="maximize-btn" type="button" aria-label="Maximize ${title}" title="Maximize">□</button>
                    <button class="close-btn" type="button" aria-label="Close ${title}" title="Close">×</button>
                </div>
            </div>
            <div class="app-content">
                ${content}
            </div>
        `;
        appWindow.querySelector('.app-header h3').textContent = title;
        appWindow.querySelector('.close-btn').addEventListener('click', () => this.closeApp(id));
        appWindow.querySelector('.maximize-btn').addEventListener('click', () => this.toggleMaximize(appWindow));
        appWindow.querySelector('.minimize-btn').addEventListener('click', () => this.minimizeApp(id));
        this.setupWindowInteractions(appWindow);
        
        const desktop = document.getElementById('desktop-section');
        if (desktop) {
            desktop.appendChild(appWindow);
            
            // Animation of appearance
            setTimeout(() => {
                appWindow.style.opacity = '1';
                appWindow.style.transform = 'translate(-50%, -50%) scale(1)';
                appWindow.focus();
            }, 10);
        }
    }

    setupWindowInteractions(appWindow) {
        const header = appWindow.querySelector('.app-header');
        let dragging = false;
        let startX = 0;
        let startY = 0;
        let originX = 0;
        let originY = 0;

        appWindow.addEventListener('pointerdown', () => {
            document.querySelectorAll('.app-window').forEach((windowElement) => {
                windowElement.style.zIndex = '500';
            });
            appWindow.style.zIndex = '700';
        });

        header.addEventListener('pointerdown', (event) => {
            if (event.target.closest('button') || appWindow.classList.contains('maximized') || window.innerWidth <= 768) return;
            const rect = appWindow.getBoundingClientRect();
            dragging = true;
            startX = event.clientX;
            startY = event.clientY;
            originX = rect.left;
            originY = rect.top;
            header.setPointerCapture(event.pointerId);
            appWindow.classList.add('dragging');
        });

        header.addEventListener('pointermove', (event) => {
            if (!dragging) return;
            const inset = 12;
            const maxX = window.innerWidth - appWindow.offsetWidth - inset;
            const maxY = window.innerHeight - appWindow.offsetHeight - 56;
            const left = Math.min(Math.max(inset, originX + event.clientX - startX), Math.max(inset, maxX));
            const top = Math.min(Math.max(inset, originY + event.clientY - startY), Math.max(inset, maxY));
            appWindow.style.left = `${left}px`;
            appWindow.style.top = `${top}px`;
            appWindow.style.transform = 'none';
        });

        header.addEventListener('pointerup', (event) => {
            if (!dragging) return;
            dragging = false;
            appWindow.classList.remove('dragging');
            if (header.hasPointerCapture(event.pointerId)) header.releasePointerCapture(event.pointerId);
        });
    }

    toggleMaximize(appWindow) {
        const maximized = appWindow.classList.toggle('maximized');
        const button = appWindow.querySelector('.maximize-btn');
        if (button) {
            button.textContent = maximized ? '❐' : '□';
            button.title = maximized ? 'Restore' : 'Maximize';
            button.setAttribute('aria-label', maximized ? 'Restore window' : 'Maximize window');
        }
    }

    /**
     * Close Application Method
     * 
     * Closes an application window with a fade-out animation.
     * After the animation, the window is removed from the DOM.
     * 
     * @param {string} appId - The ID of the application window to close
     */
    closeApp(appId) {
        const appWindow = document.getElementById(appId);
        if (appWindow) {
            document.getElementById(`restore-${appId}`)?.remove();
            // For NeonJump, close immediately without animation delay
            if (appId === 'neon-jump') {
                appWindow.remove();
                this.showDesktop();
                return;
            }
            
            // For other apps, use the normal animation
            appWindow.style.opacity = '0';
            appWindow.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                appWindow.remove();
                
                // Check if we came from direct app opening
                const urlParams = new URLSearchParams(window.location.search);
                const directApp = urlParams.get('directApp');
                
                if (directApp === 'neon-jump') {
                    // If we came from direct app, show proper desktop
                    const desktop = document.getElementById('desktop-section');
                    if (desktop) {
                        desktop.style.opacity = '1';
                        desktop.style.visibility = 'visible';
                    }
                    
                    const taskbar = document.getElementById('taskbar');
                    if (taskbar) {
                        taskbar.style.display = 'flex';
                        taskbar.style.opacity = '1';
                    }
                    
                    this.renderDesktopIcons();
                    this.updateTaskbar();
                } else {
                    // Normal desktop return
                    this.showDesktop();
                }
            }, 300);
        }
    }

    minimizeApp(appId) {
        const appWindow = document.getElementById(appId);
        if (!appWindow) return;
        appWindow.dataset.minimized = 'true';
        appWindow.style.display = 'none';

        let tray = document.getElementById('window-restores');
        if (!tray) {
            tray = document.createElement('div');
            tray.id = 'window-restores';
            tray.className = 'window-restores';
            document.getElementById('desktop-section')?.appendChild(tray);
        }

        const title = appWindow.querySelector('.app-header h3')?.textContent || appId;
        const existing = document.getElementById(`restore-${appId}`);
        if (!existing) {
            const button = document.createElement('button');
            button.id = `restore-${appId}`;
            button.type = 'button';
            button.textContent = title;
            button.addEventListener('click', () => this.restoreApp(appId));
            tray.appendChild(button);
        }
    }

    restoreApp(appId) {
        const appWindow = document.getElementById(appId);
        if (!appWindow) return;
        appWindow.dataset.minimized = 'false';
        appWindow.style.display = 'block';
        appWindow.style.opacity = '1';
        appWindow.style.zIndex = '700';
        document.getElementById(`restore-${appId}`)?.remove();
    }

    /**
     * Render Desktop Icons Method
     * 
     * Renders the application icons on the desktop based on the current location.
     * This method fetches the application list for the current location.
     * 
     * @param {string} location - The current application context
     */
    renderDesktopIcons() {
        const iconsContainer = document.getElementById("desktop-icons");
        if (!iconsContainer) return;

        const currentApps = getAppsForLocation ? getAppsForLocation(this.currentLocation) : [];
        
        iconsContainer.innerHTML = currentApps.map(app => `
            <div class="icon" onclick="appManager.openApp('${app.location}', '${app.name}')">
                <img src="${app.icon}" alt="${app.name}" onerror="this.style.background='linear-gradient(45deg, #9d00ff, #00f7ff)'; this.style.border='2px solid #00f7ff';">
                <p>${app.name}</p>
            </div>
        `).join('');
    }

    /**
     * Update Taskbar Method
     * 
     * Updates the taskbar with current user information and time.
     * This method rebuilds the entire taskbar structure.
     */
    updateTaskbar() {
        const taskbar = document.getElementById('taskbar');
        if (!taskbar) return;

        if (taskbar.dataset.initialized !== 'true') {
            taskbar.innerHTML = `
                <button class="taskbar-btn" onclick="showStartMenu()">
                    <img src="assets/icons/Start.png" alt="Start">
                </button>
                <div class="user-info">
                    <span class="username"></span>
                    <span class="time"></span>
                </div>
                <div></div>
            `;
            taskbar.dataset.initialized = 'true';
        }

        // Update time
        const now = new Date();
        const timeString = now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit'
        });
        const username = taskbar.querySelector('.username');
        const time = taskbar.querySelector('.time');
        if (username) username.textContent = typeof getCurrentUser === 'function'
            ? (getCurrentUser() || 'Guest')
            : (typeof currentUser !== 'undefined' && currentUser ? currentUser : 'Guest');
        if (time) time.textContent = timeString;
    }

    /**
     * Generate File Manager Content Method
     * 
     * Generates the HTML content for the File Manager application.
     * This includes a toolbar, path display, and file list.
     * 
     * @returns {string} - HTML string for the File Manager
     */
    generateFileManagerContent() {
        return `
            <div class="file-manager">
                <div class="file-toolbar">
                    <div class="path-display">
                        <span>📁</span>
                        <span id="current-path">/</span>
                    </div>
                    <div class="toolbar-buttons">
                        <button onclick="fileManager.createNewFolder()" title="New Folder">📁 Folder</button>
                        <button onclick="fileManager.createNewFile()" title="New File">📄 File</button>
                        <button onclick="fileManager.deleteSelected()" title="Delete">🗑️ Delete</button>
                        <button onclick="fileManager.pasteItem()" title="Paste">📋 Paste</button>
                    </div>
                </div>
                <div class="file-list" id="file-list">
                    <p>Loading...</p>
                </div>
            </div>
        `;
    }

    /**
     * Generate Terminal Content Method
     * 
     * Generates the HTML content for the Terminal application.
     * This includes a header, output area, input area, and controls.
     * 
     * @returns {string} - HTML string for the Terminal
     */
    generateTerminalContent() {
        return `
            <div class="terminal-container">
                <div class="terminal-header">
                    <h3>🖥️ NeoTerminal v2.0</h3>
                    <div class="terminal-controls">
                        <button onclick="terminal.clear()" title="Clear">🗑️</button>
                        <button onclick="terminal.showHelp()" title="Help">❓</button>
                    </div>
                </div>
                <div class="terminal-output" id="terminal-output">
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">🚀 Welcome to NeoTerminal v2.0 - Cyberpunk Interface</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">💡 Type 'help' to see all available commands</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="welcome">🎮 Special commands: 'dice', 'store', 'matrix', 'hack'</span>
                    </div>
                    <div class="terminal-line">
                        <span class="prompt">user@neocity:~$</span>
                        <span class="cursor">_</span>
                    </div>
                </div>
                <div class="terminal-input-container">
                    <span class="prompt">user@neocity:~$</span>
                    <input type="text" class="terminal-input" id="terminal-input" placeholder="Enter a command and press Enter or click ▶️" autocomplete="off">
                    <button class="terminal-send-btn" title="Send command">▶️</button>
                </div>
            </div>
        `;
    }

    /**
     * Generate Browser Content Method
     * 
     * Generates the HTML content for the Browser application.
     * This includes a toolbar, address bar, and a welcome message.
     * 
     * @returns {string} - HTML string for the Browser
     */
    generateBrowserContent() {
        return `
            <div class="browser-container">
                <div class="browser-progress" id="progress-bar"></div>
                <div class="browser-toolbar">
                    <div class="browser-nav">
                        <button class="nav-btn" id="browser-back-btn" title="Back">⟵</button>
                        <button class="nav-btn" id="browser-forward-btn" title="Forward">⟶</button>
                        <button class="nav-btn" id="browser-refresh-btn" title="Refresh">⟳</button>
                    </div>
                    <div class="security-indicator" id="security-indicator"></div>
                    <div class="address-bar-container">
                        <input type="text" class="address-bar" id="browser-address-bar" placeholder="Search or enter URL...">
                        <div class="search-suggestions" id="search-suggestions"></div>
                    </div>
                    <button class="go-btn" id="browser-go-btn" onclick="if(window.browser) { window.browser.navigate(); } else { console.log('Browser not initialized'); }">GO</button>
                </div>
                <div class="browser-content" id="browser-content">
                    <div class="loading-indicator" id="browser-loading" style="display:none;">
                        <span class="loading-spinner"></span> Loading...
                    </div>
                    <iframe id="browser-iframe" class="browser-iframe" src="about:blank" sandbox="allow-scripts allow-same-origin allow-forms" style="width:100%;height:100%;border:none;display:none;"></iframe>
                    <div class="welcome-page" id="browser-welcome">
                        <div class="welcome-icon">🌐</div>
                        <h1>NeoBrowser</h1>
                        <p>Your cyberpunk web experience starts here. Enter a URL or search term to begin browsing the digital frontier.</p>
                    </div>
                    <div class="error-page" id="browser-error" style="display:none;">
                        <h2>⚠️ Connection Error</h2>
                        <p>Sorry, the page could not be loaded. Please check the URL or your connection.</p>
                        <button onclick="browser.refresh()">Try Again</button>
                    </div>
                </div>
                <div class="bookmarks-section">
                    <h3>📚 Quick Access</h3>
                    <div class="bookmarks-grid" id="browser-bookmarks"></div>
                </div>
                <div class="browser-controls">
                    <div class="control-group">
                        <button class="control-btn" onclick="browser.addBookmark(browser.currentURL, 'Current Page')">📚 Add Bookmark</button>
                        <button class="control-btn" onclick="browser.clearHistory()">🗑️ Clear History</button>
                        <button class="control-btn" onclick="browser.exportBookmarks()">💾 Export</button>
                    </div>
                    <div class="browser-stats">
                        <div class="stat-item">History: <span class="stat-value" id="history-count">0</span></div>
                        <div class="stat-item">Bookmarks: <span class="stat-value" id="bookmarks-count">0</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate Dice Game Content Method
     * 
     * Generates the HTML content for the Dice Game application.
     * This includes a game header, dice area, betting area, and stats.
     * 
     * @returns {string} - HTML string for the Dice Game
     */
    generateDiceGameContent() {
        return `
            <div class="dice-game-container">
                <div class="game-header">
                    <h2>🎲 Dice Game</h2>
                    <div class="user-stats">
                        <span>Level: <span id="user-level">1</span></span>
                        <span>XP: <span id="user-xp">0</span></span>
                        <span>Gold: <span id="user-gold">100</span></span>
                    </div>
                </div>
                
                <div class="dice-area">
                    <div class="dice-container">
                        <img id="dice1" src="assets/icons/dice-1.png" alt="Dice 1" class="dice">
                        <img id="dice2" src="assets/icons/dice-2.png" alt="Dice 2" class="dice">
                    </div>
                    <div id="dice-total" class="dice-total">Total: 3</div>
                </div>
                
                <div class="betting-area">
                    <label for="bet-amount">Bet:</label>
                    <input type="number" id="bet-amount" value="10" min="1" max="50" onchange="diceGame.setBet(this.value)">
                    <div class="bet-buttons">
                        <button onclick="diceGame.setBet(5)">5</button>
                        <button onclick="diceGame.setBet(10)">10</button>
                        <button onclick="diceGame.setBet(25)">25</button>
                        <button onclick="diceGame.setBet(50)">50</button>
                    </div>
                </div>
                
                <button id="roll-dice-btn" class="roll-button" onclick="diceGame.rollDice()">
                    🎲 Roll Dice
                </button>
                
                <div id="game-result" class="game-result"></div>
                
                <div class="game-stats">
                    <div class="stat">
                        <span>Games: <span id="total-games">0</span></span>
                    </div>
                    <div class="stat">
                        <span>Wins: <span id="total-winnings">0</span></span>
                    </div>
                    <div class="stat">
                        <span>Losses: <span id="total-losses">0</span></span>
                    </div>
                    <div class="stat">
                        <span>Streak: <span id="current-streak">0</span></span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate Store Content Method
     * 
     * Generates the HTML content for the Store application.
     * This includes a header, filters, items grid, cart, and inventory.
     * 
     * @returns {string} - HTML string for the Store
     */
    generateStoreContent() {
        return `
            <div class="store-container">
                <div class="store-header">
                    <h2>🛒 NeoStore - Cyberpunk Marketplace</h2>
                    <div class="user-info">
                        <span class="gold-display">💰 Gold: <span id="user-gold-display">1000</span></span>
                        <span class="inventory-count">📦 Inventory: <span id="inventory-count">0</span> items</span>
                    </div>
                </div>
                
                <div class="store-filters">
                    <button class="filter-btn active" data-category="all">All</button>
                    <button class="filter-btn" data-category="implants">Implants</button>
                    <button class="filter-btn" data-category="equipment">Equipment</button>
                    <button class="filter-btn" data-category="tech">Technology</button>
                </div>
                
                <div class="store-content">
                    <div class="items-grid" id="items-grid">
                        <p>Loading items...</p>
                    </div>
                    
                    <div class="cart-section">
                        <h3>🛒 Cart</h3>
                        <div class="cart-items" id="cart-items">
                            <p class="empty-cart">Your cart is empty</p>
                        </div>
                        <div class="cart-total">
                            <span>Total: <span id="cart-total">0</span> gold</span>
                        </div>
                        <button class="buy-btn" onclick="store.buyItems()" disabled>💳 Buy</button>
                    </div>
                </div>
                
                <div class="inventory-section">
                    <h3>📦 My Inventory</h3>
                    <div class="inventory-grid" id="inventory-grid">
                        <p class="empty-inventory">Your inventory is empty</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show Algorithm Visualizer Method
     * 
     * Launches the algorithm visualizer application with interactive controls.
     * This application demonstrates various algorithms through visual animations.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create algorithm visualizer window with custom content
     * 3. Render desktop icons for navigation
     * 4. Initialize algorithm visualizer after DOM is ready
     * 5. Add event listeners for controls
     */
    showAlgorithmVisualizer() {
        this.hideAllApps();
        this.createAppWindow('algorithm', 'Algorithm Visualizer', this.generateAlgorithmContent());
        this.renderDesktopIcons();
        
        // Initialize algorithm visualizer and add event listeners
        setTimeout(() => {
            this.loadAlgorithmVisualizerScript();
            this.addAlgorithmVisualizerEventListeners();
        }, 200);
    }

    /**
     * Add Algorithm Visualizer Event Listeners Method
     * 
     * Adds event listeners to the algorithm visualizer controls.
     * This replaces the inline onclick handlers with proper event listeners.
     */
    addAlgorithmVisualizerEventListeners() {
        try {
            // Algorithm type change
            const algorithmTypeDropdown = document.getElementById('algorithm-type-dropdown');
            if (algorithmTypeDropdown && window.algorithmVisualizer) {
                algorithmTypeDropdown.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent dropdown from closing on click
                    const list = document.getElementById('algorithm-type-list');
                    if (list) {
                        list.style.display = 'block';
                        list.style.top = `${algorithmTypeDropdown.offsetHeight}px`;
                        list.style.left = `${algorithmTypeDropdown.offsetLeft}px`;
                    }
                });

                document.addEventListener('click', function(event) {
                    const list = document.getElementById('algorithm-type-list');
                    if (list && !list.contains(event.target) && !algorithmTypeDropdown.contains(event.target)) {
                        list.style.display = 'none';
                    }
                });

                document.getElementById('algorithm-type-list').addEventListener('click', function(event) {
                    const selected = document.getElementById('algorithm-type-selected');
                    if (selected) {
                        selected.textContent = event.target.textContent;
                        selected.dataset.value = event.target.dataset.value;
                    }
                    const list = document.getElementById('algorithm-type-list');
                    if (list) {
                        list.style.display = 'none';
                    }
                    window.algorithmVisualizer.onAlgorithmTypeChange();
                });
            }
            
            // Specific algorithm change
            const specificAlgorithmDropdown = document.getElementById('specific-algorithm-dropdown');
            if (specificAlgorithmDropdown && window.algorithmVisualizer) {
                specificAlgorithmDropdown.addEventListener('click', function(event) {
                    event.stopPropagation(); // Prevent dropdown from closing on click
                    const list = document.getElementById('specific-algorithm-list');
                    if (list) {
                        list.style.display = 'block';
                        list.style.top = `${specificAlgorithmDropdown.offsetHeight}px`;
                        list.style.left = `${specificAlgorithmDropdown.offsetLeft}px`;
                    }
                });

                document.addEventListener('click', function(event) {
                    const list = document.getElementById('specific-algorithm-list');
                    if (list && !list.contains(event.target) && !specificAlgorithmDropdown.contains(event.target)) {
                        list.style.display = 'none';
                    }
                });

                document.getElementById('specific-algorithm-list').addEventListener('click', function(event) {
                    const selected = document.getElementById('specific-algorithm-selected');
                    if (selected) {
                        selected.textContent = event.target.textContent;
                        selected.dataset.value = event.target.dataset.value;
                    }
                    const list = document.getElementById('specific-algorithm-list');
                    if (list) {
                        list.style.display = 'none';
                    }
                    window.algorithmVisualizer.onSpecificAlgorithmChange();
                });
            }
            
            // Speed slider change
            const speedSlider = document.getElementById('speed-slider');
            if (speedSlider && window.algorithmVisualizer) {
                speedSlider.addEventListener('change', function() {
                    window.algorithmVisualizer.onSpeedChange();
                });
            }
            
            // Generate array button
            const generateArrayBtn = document.getElementById('generate-array-btn');
            if (generateArrayBtn && window.algorithmVisualizer) {
                generateArrayBtn.addEventListener('click', function() {
                    window.algorithmVisualizer.generateArray();
                });
            }
            
            // Start button
            const startBtn = document.getElementById('start-btn');
            if (startBtn && window.algorithmVisualizer) {
                startBtn.addEventListener('click', function() {
                    window.algorithmVisualizer.startVisualization();
                });
            }
            
            // Pause button
            const pauseBtn = document.getElementById('pause-btn');
            if (pauseBtn && window.algorithmVisualizer) {
                pauseBtn.addEventListener('click', function() {
                    window.algorithmVisualizer.togglePause();
                });
            }
            
            // Reset button
            const resetBtn = document.getElementById('reset-btn');
            if (resetBtn && window.algorithmVisualizer) {
                resetBtn.addEventListener('click', function() {
                    window.algorithmVisualizer.reset();
                });
            }
            
        } catch (error) {
            console.error('Error adding algorithm visualizer event listeners:', error);
        }
    }

    /**
     * Load Algorithm Visualizer Script Method
     * 
     * Initializes the algorithm visualizer using the existing script.
     * The script is already loaded in the main index.html file.
     */
    loadAlgorithmVisualizerScript() {
        // The algorithm visualizer script is already loaded in index.html
        // Just initialize the existing instance
        setTimeout(() => {
            if (window.algorithmVisualizer) {
                try {
                    console.log('Initializing existing algorithm visualizer instance...');
                    window.algorithmVisualizer.init();
                    console.log('Algorithm visualizer initialized successfully');
                } catch (error) {
                    console.error('Error initializing algorithm visualizer:', error);
                }
            } else {
                console.error('Algorithm visualizer instance not found - script may not be loaded');
            }
        }, 200); // Give more time for DOM elements to be created
    }

    /**
     * Load Browser Script Method
     * 
     * Initializes the browser using the pre-loaded script.
     */
    loadBrowserScript() {
        try {
            console.log('loadBrowserScript called');
            console.log('initializeNeoBrowser exists:', !!window.initializeNeoBrowser);
            
            // The browser script is already loaded in index.html
            // Just initialize the browser instance
            setTimeout(() => {
                console.log('Attempting to initialize browser...');
                if (window.initializeNeoBrowser && window.initializeNeoBrowser()) {
                    console.log('NeoBrowser initialized successfully');
                    
                    // Update stats display
                    const stats = window.browser.getStats();
                    const historyCount = document.getElementById('history-count');
                    const bookmarksCount = document.getElementById('bookmarks-count');
                    
                    if (historyCount) historyCount.textContent = stats.historyCount;
                    if (bookmarksCount) bookmarksCount.textContent = stats.bookmarksCount;
                } else {
                    console.error('Failed to initialize NeoBrowser');
                }
            }, 200); // Give time for DOM elements to be created
        } catch (error) {
            console.error('Error initializing browser:', error);
        }
    }

    /**
     * Generate Algorithm Content Method
     * 
     * Generates the HTML content for the Algorithm Visualizer application.
     * This includes a header, controls, visualization area, and info.
     * 
     * @returns {string} - HTML string for the Algorithm Visualizer
     */
    generateAlgorithmContent() {
        return `
            <div class="algovis-main">
                <header class="algovis-header">
                    <h1>Algorithm Visualizer</h1>
                    <nav>
                        <ul>
                            <li><a href="#visualizer">Visualizer</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </nav>
                </header>
                <section id="visualizer" class="algovis-controls">
                    <label for="algorithm-type">Choose Algorithm Type:</label>
                    <div class="custom-dropdown" id="algorithm-type-dropdown" tabindex="0">
                        <div class="dropdown-selected" id="algorithm-type-selected" data-value="sorting">Sorting Algorithms</div>
                        <div class="dropdown-list" id="algorithm-type-list">
                            <div class="dropdown-option" data-value="sorting">Sorting Algorithms</div>
                            <div class="dropdown-option" data-value="searching">Searching Algorithms</div>
                            <div class="dropdown-option" data-value="graphs">Graph Algorithms</div>
                        </div>
                    </div>
                    <div class="custom-dropdown" id="specific-algorithm-dropdown" tabindex="0">
                        <div class="dropdown-selected" id="specific-algorithm-selected" data-value="bubble">Bubble Sort</div>
                        <div class="dropdown-list" id="specific-algorithm-list">
                            <div class="dropdown-option" data-value="bubble">Bubble Sort</div>
                            <div class="dropdown-option" data-value="quick">Quick Sort</div>
                            <div class="dropdown-option" data-value="merge">Merge Sort</div>
                            <div class="dropdown-option" data-value="selection">Selection Sort</div>
                        </div>
                    </div>
                    <button id="generate-array-btn">Generate Array</button>
                    <button id="start-btn">Start</button>
                    <button id="pause-btn" disabled>Pause</button>
                    <button id="reset-btn">Reset</button>
                    <label for="speed-slider">Speed: <span id="speed-value">100ms</span></label>
                    <input type="range" id="speed-slider" min="10" max="500" value="100">
                </section>
                <section class="algovis-canvas" aria-label="Algorithm Visualization Area">
                    <div id="visualization-area">
                        <canvas id="algorithm-canvas" width="800" height="400"></canvas>
                    </div>
                </section>
                <section class="algovis-info">
                    <div class="algorithm-info">
                        <div class="complexity-info">
                            <h3>Time Complexity</h3>
                            <p id="time-complexity">O(n²)</p>
                        </div>
                        <div class="steps-info">
                            <h3>Steps</h3>
                            <p id="current-steps">0</p>
                        </div>
                        <div class="status-info">
                            <h3>Status</h3>
                            <p id="algorithm-status">Ready</p>
                        </div>
                    </div>
                    <div class="algorithm-details">
                        <h3>Algorithm Description</h3>
                        <p id="algorithm-description">Bubble Sort: Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order. Time Complexity: O(n²)</p>
                    </div>
                </section>
                <footer class="algovis-footer">
                    <section id="about">
                        <h2>About</h2>
                        <p>This Algorithm Visualizer helps you understand how different algorithms work through interactive visualizations. Select an algorithm and watch it in action!</p>
                    </section>
                    <p>&copy; 2024 Algorithm Visualizer. All rights reserved.</p>
                </footer>
            </div>
        `;
    }

    /**
     * Show Advanced Dice Game Method
     * 
     * Launches the advanced dice game application with customizable dice.
     * This game offers more complex dice rolling mechanics.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create advanced dice game window with custom content
     * 3. Render desktop icons for navigation
     */
    showAdvancedDiceGame() {
        this.hideAllApps();
        this.createAppWindow('advanced-dice', 'Advanced Dice Game', this.generateAdvancedDiceContent());
        this.renderDesktopIcons();
    }

    /**
     * Generate Advanced Dice Content Method
     * 
     * Generates the HTML content for the Advanced Dice Game application.
     * This includes a game header, dice selector, and a dice display area.
     * 
     * @returns {string} - HTML string for the Advanced Dice Game
     */
    generateAdvancedDiceContent() {
        return `
            <div class="advanced-dice-container">
                <div class="game-header">
                    <h2>🎲 Advanced Dice Game</h2>
                    <div class="dice-selector">
                        <label>Dice Type:</label>
                        <select id="dice-type">
                            <option value="4">D4</option>
                            <option value="6" selected>D6</option>
                            <option value="8">D8</option>
                            <option value="10">D10</option>
                            <option value="12">D12</option>
                            <option value="20">D20</option>
                        </select>
                    </div>
                </div>
                <div class="dice-area">
                    <div id="dice-display" class="dice-display">Roll the dice!</div>
                    <button onclick="advancedDiceGame.roll()" class="roll-btn">Roll Dice</button>
                </div>
                <div class="statistics">
                    <h3>Statistics</h3>
                    <div id="dice-stats"></div>
                </div>
            </div>
        `;
    }

    /**
     * Show Data Structures Playground Method
     * 
     * Launches the data structures playground application.
     * This application allows users to interact with various data structures.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create data structures playground window with custom content
     * 3. Render desktop icons for navigation
     */
    showDataStructuresPlayground() {
        this.hideAllApps();
        this.createAppWindow('data-structures', 'Data Structures Playground', this.generateDataStructuresContent());
        // Ensure Data Structures Playground is initialized after rendering
        if (window.dataStructures) window.dataStructures.init();
        this.renderDesktopIcons();
    }

    /**
     * Generate Data Structures Content Method
     * 
     * Generates the HTML content for the Data Structures Playground application.
     * This includes a header, selector, visualization area, and controls.
     * 
     * @returns {string} - HTML string for the Data Structures Playground
     */
    generateDataStructuresContent() {
        return `
            <div class="data-structures-container">
                <div class="ds-header">
                    <h2>📊 Data Structures Playground</h2>
                    <div class="ds-selector">
                        <label for="ds-type">Select Structure:</label>
                        <select id="ds-type">
                            <option value="stack">Stack (LIFO)</option>
                            <option value="queue">Queue (FIFO)</option>
                            <option value="linkedlist">Linked List</option>
                            <option value="tree">Binary Tree</option>
                            <option value="hashtable">Hash Table</option>
                        </select>
                    </div>
                </div>
                <div class="ds-visualization">
                    <div id="ds-display" class="ds-display"></div>
                </div>
                <div class="ds-controls">
                    <input type="text" id="ds-input" placeholder="Enter value to add/search" aria-label="Data structure input">
                    <button onclick="addToDataStructure()" class="btn-add">Add</button>
                    <button onclick="removeFromDataStructure()" class="btn-remove">Remove</button>
                    <button onclick="searchDataStructure()" class="btn-search">Search</button>
                    <button onclick="clearDataStructure()" class="btn-clear">Clear</button>
                </div>
                <div id="ds-educational" class="ds-educational"></div>
            </div>
        `;
    }

    /**
     * Show Memory Game Method
     * 
     * Launches the memory card game application.
     * This game tests users' memory and concentration.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create memory game window with custom content
     * 3. Render desktop icons for navigation
     */
    showMemoryGame() {
        this.hideAllApps();
        this.createAppWindow('memory-game', 'Memory Card Game', this.generateMemoryGameContent());
        this.renderDesktopIcons();
    }

    /**
     * Generate Memory Game Content Method
     * 
     * Generates the HTML content for the Memory Card Game application.
     * This includes a game header, difficulty selector, and a grid.
     * 
     * @returns {string} - HTML string for the Memory Card Game
     */
    generateMemoryGameContent() {
        return `
            <div class="memory-game-container">
                <div class="game-header">
                    <h2>🎮 Memory Card Game</h2>
                    <div class="game-info">
                        <span>Time: <span id="memory-time">00:00</span></span>
                        <span>Moves: <span id="memory-moves">0</span></span>
                        <span>Score: <span id="memory-score">0</span></span>
                    </div>
                </div>
                <div class="difficulty-selector">
                                    <button onclick="memoryGame.setDifficulty('easy', event)">Easy (4x4)</button>
                <button onclick="memoryGame.setDifficulty('medium', event)">Medium (6x6)</button>
                <button onclick="memoryGame.setDifficulty('hard', event)">Hard (8x8)</button>
                </div>
                <div id="memory-grid" class="memory-grid"></div>
                <button onclick="memoryGame.newGame()" class="new-game-btn">New Game</button>
            </div>
        `;
    }

    /**
     * Show Puzzle Solver Method
     * 
     * Launches the puzzle solver application.
     * This application can solve various types of puzzles (Sudoku, 8-Puzzle, Crossword).
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create puzzle solver window with custom content
     * 3. Render desktop icons for navigation
     */
    showPuzzleSolver() {
        this.hideAllApps();
        this.createAppWindow('puzzle-solver', 'Puzzle Solver', this.generatePuzzleSolverContent());
        this.renderDesktopIcons();
    }

    /**
     * Generate Puzzle Solver Content Method
     * 
     * Generates the HTML content for the Puzzle Solver application.
     * This includes a header, selector, puzzle area, and controls.
     * 
     * @returns {string} - HTML string for the Puzzle Solver
     */
    generatePuzzleSolverContent() {
        return `
            <div class="puzzle-solver-container">
                <div class="puzzle-type-controls">
                    <button class="puzzle-type-btn active" data-type="sudoku">🧩 Sudoku</button>
                    <button class="puzzle-type-btn" data-type="8puzzle">🎯 8-Puzzle</button>
                    <button class="puzzle-type-btn" data-type="crossword">📝 Crossword</button>
                    <button class="puzzle-type-btn" data-type="sliding">🔲 Sliding Puzzle</button>
                </div>
                <div id="puzzle-display" class="puzzle-display"></div>
            </div>
        `;
    }

    /**
     * Show Text Analyzer Method
     * 
     * Launches the text analyzer application.
     * This application provides tools for analyzing text (palindromes, anagrams, word frequency).
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create text analyzer window with custom content
     * 3. Render desktop icons for navigation
     */
    showTextAnalyzer() {
        this.hideAllApps();
        this.createAppWindow('text-analyzer', 'Text Analyzer', this.generateTextAnalyzerContent());
        this.renderDesktopIcons();
    }

    /**
     * Generate Text Analyzer Content Method
     * 
     * Generates the HTML content for the Text Analyzer application.
     * This includes a header and a text input area.
     * 
     * @returns {string} - HTML string for the Text Analyzer
     */
    generateTextAnalyzerContent() {
        return `
            <div class="text-analyzer-container">
                <div class="analyzer-header">
                    <h2>📝 Text Analyzer</h2>
                </div>
                <div class="text-input-area">
                    <textarea id="text-input" placeholder="Enter text to analyze..."></textarea>
                    <button onclick="textAnalyzer.analyze()">Analyze</button>
                </div>
                <div class="analysis-results">
                    <div class="statistics">
                        <h3>Statistics</h3>
                        <div id="text-stats"></div>
                    </div>
                    <div class="analysis-tools">
                        <h3>Analysis Tools</h3>
                        <button onclick="textAnalyzer.findPalindromes()">Find Palindromes</button>
                        <button onclick="textAnalyzer.findAnagrams()">Find Anagrams</button>
                        <button onclick="textAnalyzer.wordFrequency()">Word Frequency</button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Show Number Guesser Method
     * 
     * Launches the number guessing game application.
     * This game allows users to guess a number within a specified range.
     * 
     * Algorithm:
     * 1. Hide all other applications
     * 2. Create number guesser window with custom content
     * 3. Render desktop icons for navigation
     */
    showNumberGuesser() {
        this.hideAllApps();
        this.createAppWindow('number-guesser', 'Number Guessing Game', this.generateNumberGuesserContent());
        this.renderDesktopIcons();
    }

    /**
     * Generate Number Guesser Content Method
     * 
     * Generates the HTML content for the Number Guessing Game application.
     * This includes a game header, game area, and hint area.
     * 
     * @returns {string} - HTML string for the Number Guessing Game
     */
    generateNumberGuesserContent() {
        return `
            <div class="number-guesser-container">
                <div class="game-header">
                    <h2>🎯 Number Guessing Game</h2>
                    <div class="game-info">
                        <span>Range: <span id="number-range">1-100</span></span>
                        <span>Attempts: <span id="guess-attempts">0</span></span>
                        <span>Best Score: <span id="best-score">-</span></span>
                    </div>
                </div>
                <div class="game-area">
                    <div id="game-message" class="game-message">I'm thinking of a number...</div>
                    <input type="number" id="guess-input" placeholder="Enter your guess">
                    <button onclick="numberGuesser.makeGuess()">Guess</button>
                    <button onclick="numberGuesser.newGame()">New Game</button>
                </div>
                <div class="hint-area">
                    <div id="hint-display" class="hint-display"></div>
                </div>
            </div>
        `;
    }

    /**
     * Load Neon Jump Resources Method
     * 
     * Dynamically loads the CSS and JavaScript files for the Neon Jump welcome screen.
     * This ensures the welcome screen has all necessary styles and functionality.
     */
    loadNeonJumpResources() {
        // Load CSS file if not already loaded
        if (!document.querySelector('link[href="src/styles/games/neonJump/welcome.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'src/styles/games/neonJump/welcome.css';
            document.head.appendChild(link);
        }
        
        // Load JavaScript file if not already loaded
        if (!window.neonJumpWelcomeLoaded) {
            const script = document.createElement('script');
            script.src = 'src/games/neonJump/welcome.js';
            script.onload = () => {
                window.neonJumpWelcomeLoaded = true;
                console.log('NeonJump welcome resources loaded successfully');
            };
            document.head.appendChild(script);
        }
    }

    /**
     * Generate Neon Jump Welcome Content Method
     * 
     * Generates the HTML content for the Neon Jump welcome screen.
     * This includes the game title, features, controls, and difficulty selection.
     * 
     * @returns {string} - HTML string for the Neon Jump welcome screen
     */
    generateNeonJumpWelcomeContent() {
        return `
            <div class="welcome-container">
                <button class="back-btn" onclick="appManager.closeApp('neon-jump')">← Back to Desktop</button>
                
                <div class="welcome-content">
                    <h1 class="game-title">Neon Jump</h1>
                    <p class="game-subtitle">Cyberpunk Platformer Adventure</p>
                    
                    <div class="difficulty-section">
                        <h3 class="difficulty-title">Select Difficulty</h3>
                        <div class="difficulty-buttons">
                            <button class="difficulty-btn easy" onclick="startNeonJumpGame('easy', 1)">Easy</button>
                            <button class="difficulty-btn medium" onclick="startNeonJumpGame('medium', 1)">Medium</button>
                            <button class="difficulty-btn hard" onclick="startNeonJumpGame('hard', 1)">Hard</button>
                        </div>
                    </div>
                    
                    <div class="controls-section">
                        <h3 class="controls-title">Controls</h3>
                        <div class="controls-grid">
                            <div class="control-item">
                                <span class="control-key">←</span>
                                <span class="control-action">Move Left</span>
                            </div>
                            <div class="control-item">
                                <span class="control-key">→</span>
                                <span class="control-action">Move Right</span>
                            </div>
                            <div class="control-item">
                                <span class="control-key">↑</span>
                                <span class="control-action">Jump</span>
                            </div>
                            <div class="control-item">
                                <span class="control-key">ESC</span>
                                <span class="control-action">Pause</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate Neon Jump Content Method
     * 
     * Generates the HTML content for the Neon Jump game.
     * Features enhanced graphics, physics, and modern UI.
     * 
     * @returns {string} - HTML string for the Neon Jump game
     */
    generateNeonJumpContent() {
        return `
            <div class="neon-jump-container">
                <!-- Menu Screen -->
                <div id="neon-menu-screen" class="neon-menu-screen">
                    <div class="neon-title">
                        <h1>NEON JUMP</h1>
                        <div class="neon-subtitle">CYBERPUNK PLATFORMER</div>
                    </div>
                    <div class="difficulty-selector">
                        <h3>SELECT DIFFICULTY</h3>
                        <div class="difficulty-buttons">
                            <button class="neon-btn btn-easy" onclick="startNeonJumpGame('easy', 1)">
                                <div class="btn-text">EASY</div>
                                <div class="btn-subtitle">Beginner Friendly</div>
                            </button>
                            <button class="neon-btn btn-medium" onclick="startNeonJumpGame('medium', 1)">
                                <div class="btn-text">MEDIUM</div>
                                <div class="btn-subtitle">Challenging</div>
                            </button>
                            <button class="neon-btn btn-hard" onclick="startNeonJumpGame('hard', 1)">
                                <div class="btn-text">HARD</div>
                                <div class="btn-subtitle">Expert Level</div>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Game Screen -->
                <div id="neon-game-screen" class="neon-game-screen">
                    <div class="game-header">
                        <div class="game-info">
                            <span>Health: <span id="health-display">100</span></span>
                            <span>Score: <span id="score-display">0</span></span>
                            <span>Checkpoints: <span id="checkpoint-display">0/3</span></span>
                        </div>
                        <button class="neon-pause-btn" onclick="neonJumpGame.togglePause()">PAUSE</button>
                    </div>
                    <canvas id="neon-canvas" width="1200" height="800"></canvas>
                </div>

                <!-- Game Over Screen -->
                <div id="neon-game-over-screen" class="neon-game-over-screen">
                    <h2>GAME OVER</h2>
                    <div class="game-over-stats">
                        <p>Time Survived: <span id="game-over-time">00:00</span></p>
                        <p>Score: <span id="game-over-score">0</span></p>
                        <p>Checkpoints Collected: <span id="game-over-checkpoints">0</span></p>
                    </div>
                    <button class="neon-btn btn-easy" onclick="restartNeonJumpGame()">RETRY</button>
                    <button class="neon-btn btn-medium" onclick="showNeonJumpMenu()">MENU</button>
                </div>

                <!-- Victory Screen -->
                <div id="neon-victory-screen" class="neon-victory-screen">
                    <h2>LEVEL COMPLETE!</h2>
                    <div class="victory-stats">
                        <p>Time: <span id="victory-time">00:00</span></p>
                        <p>Score: <span id="victory-score">0</span></p>
                        <p>Checkpoints: <span id="victory-checkpoints">0/3</span></p>
                    </div>
                    <button class="neon-btn btn-easy" onclick="startNeonJumpGame(neonJumpGame.currentDifficulty, neonJumpGame.currentLevel + 1)">NEXT LEVEL</button>
                    <button class="neon-btn btn-medium" onclick="showNeonJumpMenu()">MENU</button>
                </div>
            </div>
        `;
    }

    // Centralized navigation for returning to OS
    goBackToOS() {
        if (typeof this.closeApp === 'function') {
            this.closeApp('algorithm');
        } else if (typeof this.showDesktop === 'function') {
            this.showDesktop();
        } else {
            window.location.href = 'index.html';
        }
    }
}

// Global instance of the application manager
const appManager = new AppManager();

// Compatibility functions for old code
function openApp(location, appName) {
    appManager.openApp(location, appName);
}

function closeApp(appId) {
    appManager.closeApp(appId);
}

function renderDesktopIcons() {
    appManager.renderDesktopIcons();
}

function updateTaskbar() {
    appManager.updateTaskbar();
} 