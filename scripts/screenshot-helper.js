/**
 * NeoCityOS Screenshot Helper
 * 
 * This script helps create consistent screenshots for the demo content.
 * Run this in the browser console to capture different app states.
 */

class ScreenshotHelper {
    constructor() {
        this.screenshots = [];
        this.currentApp = null;
    }

    /**
     * Take a screenshot of the current viewport
     * @param {string} name - Name for the screenshot
     * @param {string} description - Description of what's shown
     */
    async takeScreenshot(name, description) {
        try {
            // Use html2canvas if available, otherwise use browser's screenshot
            if (typeof html2canvas !== 'undefined') {
                const canvas = await html2canvas(document.body, {
                    backgroundColor: '#0a0a0a',
                    scale: 2, // High DPI
                    useCORS: true,
                    allowTaint: true
                });
                
                const link = document.createElement('a');
                link.download = `${name}.png`;
                link.href = canvas.toDataURL();
                link.click();
            } else {
                // Fallback: guide user to take manual screenshot
                console.log(`📸 Please take a screenshot of: ${name}`);
                console.log(`Description: ${description}`);
                console.log('Press F11 for fullscreen, then use your system screenshot tool');
            }
            
            this.screenshots.push({ name, description, timestamp: new Date() });
            console.log(`✅ Screenshot "${name}" captured`);
            
        } catch (error) {
            console.error('❌ Screenshot failed:', error);
        }
    }

    /**
     * Prepare the desktop for screenshot
     */
    prepareDesktop() {
        // Ensure all icons are visible
        const desktop = document.getElementById('desktop-section');
        if (desktop) {
            desktop.style.display = 'block';
        }
        
        // Hide any open windows
        const windows = document.querySelectorAll('.app-window');
        windows.forEach(window => window.style.display = 'none');
        
        console.log('🖥️ Desktop prepared for screenshot');
    }

    /**
     * Open an app and prepare it for screenshot
     * @param {string} appName - Name of the app to open
     */
    openApp(appName) {
        // Find and click the app icon
        const icons = document.querySelectorAll('#desktop-icons .desktop-icon');
        const targetIcon = Array.from(icons).find(icon => 
            icon.querySelector('.icon-label')?.textContent.includes(appName)
        );
        
        if (targetIcon) {
            targetIcon.click();
            this.currentApp = appName;
            console.log(`📱 Opened ${appName} for screenshot`);
            
            // Wait for app to load
            setTimeout(() => {
                console.log(`⏳ ${appName} should be ready for screenshot`);
            }, 1000);
        } else {
            console.error(`❌ App "${appName}" not found`);
        }
    }

    /**
     * Prepare algorithm visualizer with running algorithm
     */
    async prepareAlgorithmVisualizer() {
        this.openApp('Algorithm Visualizer');
        
        // Wait for app to load
        await this.wait(2000);
        
        // Start bubble sort
        const startBtn = document.querySelector('#start-btn');
        if (startBtn) {
            startBtn.click();
            console.log('🔄 Started bubble sort animation');
            
            // Wait for animation to be in progress
            await this.wait(3000);
        }
    }

    /**
     * Prepare data structures with a binary tree
     */
    async prepareDataStructures() {
        this.openApp('Data Structures');
        
        // Wait for app to load
        await this.wait(2000);
        
        // Switch to binary tree
        const selector = document.getElementById('ds-type');
        if (selector) {
            selector.value = 'tree';
            selector.dispatchEvent(new Event('change'));
            
            // Add some values to create a tree
            const input = document.getElementById('ds-input');
            const addBtn = document.querySelector('button[onclick*="add"]');
            
            if (input && addBtn) {
                const values = [50, 25, 75, 12, 37, 62, 87];
                for (let value of values) {
                    input.value = value;
                    addBtn.click();
                    await this.wait(500);
                }
            }
        }
    }

    /**
     * Prepare text analyzer with sample text
     */
    async prepareTextAnalyzer() {
        this.openApp('Text Analyzer');
        
        // Wait for app to load
        await this.wait(2000);
        
        // Add sample text
        const textarea = document.querySelector('#text-input');
        if (textarea) {
            const sampleText = `NeoCityOS is a futuristic browser-based operating system that combines education with entertainment. Built entirely with vanilla JavaScript, HTML5, and CSS3, it features interactive algorithm visualizations, data structure playgrounds, and cyberpunk-themed games. The system demonstrates modern web technologies while providing an engaging learning experience for computer science concepts.`;
            
            textarea.value = sampleText;
            textarea.dispatchEvent(new Event('input'));
            
            // Click analyze
            const analyzeBtn = document.querySelector('button[onclick*="analyze"]');
            if (analyzeBtn) {
                analyzeBtn.click();
                await this.wait(1000);
            }
        }
    }

    /**
     * Prepare puzzle solver with a Sudoku puzzle
     */
    async preparePuzzleSolver() {
        this.openApp('Puzzle Solver');
        
        // Wait for app to load
        await this.wait(2000);
        
        // Select Sudoku puzzle
        const sudokuBtn = document.querySelector('[data-type="sudoku"]');
        if (sudokuBtn) {
            sudokuBtn.click();
            await this.wait(1000);
        }
    }

    /**
     * Prepare Neon Jump game
     */
    async prepareNeonJump() {
        this.openApp('Neon Jump');
        
        // Wait for game to load
        await this.wait(3000);
        
        // Start the game
        const startBtn = document.querySelector('#start-game');
        if (startBtn) {
            startBtn.click();
            await this.wait(2000);
        }
    }

    /**
     * Utility function to wait
     * @param {number} ms - Milliseconds to wait
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get list of all taken screenshots
     */
    getScreenshots() {
        console.log('📋 Screenshots taken:');
        this.screenshots.forEach((screenshot, index) => {
            console.log(`${index + 1}. ${screenshot.name} - ${screenshot.description}`);
        });
    }

    /**
     * Run the complete screenshot sequence
     */
    async runCompleteSequence() {
        console.log('🚀 Starting complete screenshot sequence...');
        
        // 1. Desktop
        this.prepareDesktop();
        await this.takeScreenshot('desktop', 'Main desktop with neon icons');
        await this.wait(1000);
        
        // 2. Algorithm Visualizer
        await this.prepareAlgorithmVisualizer();
        await this.takeScreenshot('algorithm-visualizer', 'Bubble sort in progress');
        await this.wait(1000);
        
        // 3. Data Structures
        await this.prepareDataStructures();
        await this.takeScreenshot('data-structures', 'Binary tree visualization');
        await this.wait(1000);
        
        // 4. Text Analyzer
        await this.prepareTextAnalyzer();
        await this.takeScreenshot('text-analyzer', 'Text analysis results');
        await this.wait(1000);
        
        // 5. Puzzle Solver
        await this.preparePuzzleSolver();
        await this.takeScreenshot('puzzle-solver', 'Sudoku puzzle');
        await this.wait(1000);
        
        // 6. Neon Jump
        await this.prepareNeonJump();
        await this.takeScreenshot('neon-jump', 'Gameplay with particle effects');
        
        console.log('✅ Complete screenshot sequence finished!');
        this.getScreenshots();
    }
}

// Create global instance
window.screenshotHelper = new ScreenshotHelper();

// Add html2canvas if not present
if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    document.head.appendChild(script);
    console.log('📦 Loading html2canvas for better screenshots...');
}

console.log(`
🎬 NeoCityOS Screenshot Helper Loaded!

Available commands:
- screenshotHelper.takeScreenshot('name', 'description')
- screenshotHelper.prepareDesktop()
- screenshotHelper.openApp('App Name')
- screenshotHelper.prepareAlgorithmVisualizer()
- screenshotHelper.prepareDataStructures()
- screenshotHelper.prepareTextAnalyzer()
- screenshotHelper.preparePuzzleSolver()
- screenshotHelper.prepareNeonJump()
- screenshotHelper.runCompleteSequence()
- screenshotHelper.getScreenshots()

Example usage:
screenshotHelper.runCompleteSequence()
`); 