/**
 * NeonJump Main Game Class
 * Core game logic and state management
 */

// ===== NEON JUMP GAME CLASS =====
class NeonJump {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        this.isPaused = false;
        this.lastTime = 0;
        
        // Game state
        this.currentDifficulty = 'medium';
        this.currentLevel = 1;
        this.score = 0;
        this.gameTime = 0;
        this.checkpointsCollected = 0;
        this.totalCheckpoints = 0;
        
        // New: Win message state
        this.showingWinMessage = false;
        this.winMessageTime = 0;
        this.winMessageDuration = 2.0; // Show win message for 2 seconds
        
        // Game objects
        this.player = null;
        this.platforms = [];
        this.enemies = [];
        this.checkpoints = [];
        this.particleSystem = null;
        this.camera = null;
        this.levelGenerator = null;
        this.audioManager = null;
        this.physics = null;
        this.backgroundStars = [];
        
        // Input handling
        this.keys = {
            left: false,
            right: false,
            up: false,
            down: false,
            space: false
        };
        
        // UI elements
        this.menuScreen = null;
        this.gameScreen = null;
        this.gameOverScreen = null;
        this.victoryScreen = null;
        
        this.init();
    }

    init() {
        // Get canvas and context
        this.canvas = document.getElementById('neon-canvas');
        if (!this.canvas) {
            console.error('Canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get canvas context');
            return;
        }
        
        // Set canvas size to match viewport
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Update config to match actual canvas size
        GAME_CONFIG.CANVAS_WIDTH = this.canvas.width;
        GAME_CONFIG.CANVAS_HEIGHT = this.canvas.height;
        
        // Set CSS size for full viewport
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        
        // Ensure canvas can receive focus for keyboard input
        this.canvas.tabIndex = 0;
        this.canvas.style.outline = 'none'; // Remove focus outline
        
        // Initialize systems
        try {
            this.particleSystem = new ParticleSystem();
            this.camera = new Camera(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
            this.levelGenerator = new LevelGenerator();
            this.audioManager = new AudioManager();
            this.physics = new Physics();
        } catch (error) {
            console.error('Failed to initialize game systems:', error);
            return;
        }
        
        // Get UI elements
        this.menuScreen = document.getElementById('neon-menu-screen');
        this.gameScreen = null; // Game runs directly on canvas
        this.gameOverScreen = document.getElementById('neon-game-over-screen');
        this.victoryScreen = document.getElementById('neon-victory-screen');
        
        // Setup input handlers
        this.setupInputHandlers();
        
        // Setup window resize handler
        this.setupResizeHandler();
        
        // Focus canvas immediately
        this.canvas.focus();
        
        // Re-focus canvas when window gains focus
        window.addEventListener('focus', () => {
            if (this.isRunning) {
                this.canvas.focus();
            }
        });
        
        // Keep canvas focused during gameplay
        this.canvas.addEventListener('blur', () => {
            if (this.isRunning) {
                setTimeout(() => this.canvas.focus(), 10);
            }
        });
        
        // Focus canvas when clicked
        this.canvas.addEventListener('click', () => {
            this.canvas.focus();
            console.log('Canvas clicked and focused');
        });
        
        // Focus canvas when touched (for mobile)
        this.canvas.addEventListener('touchstart', () => {
            this.canvas.focus();
        });
        
        // Generate background
        this.backgroundStars = this.levelGenerator.generateBackground();
        
        // Make game instance available globally
        window.game = this;
        
        console.log('NeonJump initialized successfully');
    }

    setupInputHandlers() {
        console.log('Setting up input handlers...');
        
        document.addEventListener('keydown', (e) => {
            console.log('Global keydown:', e.code, 'Game running:', this.isRunning);
            
            // Handle game input when running
            if (this.isRunning) {
                switch(e.code) {
                    case 'ArrowLeft':
                    case 'KeyA':
                        e.preventDefault();
                        this.keys.left = true;
                        console.log('Left key pressed');
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        e.preventDefault();
                        this.keys.right = true;
                        console.log('Right key pressed');
                        break;
                    case 'ArrowUp':
                    case 'Space':
                    case 'KeyW':
                        e.preventDefault();
                        this.keys.up = true;
                        // Buffer jump input for responsive jumping
                        if (this.player) {
                            this.player.bufferJump();
                        }
                        console.log('Up/Space/W key pressed');
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        e.preventDefault();
                        this.keys.down = true;
                        console.log('Down key pressed');
                        break;
                    case 'Escape':
                        e.preventDefault();
                        this.togglePause();
                        break;
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            console.log('Global keyup:', e.code, 'Game running:', this.isRunning);
            
            // Handle game input when running
            if (this.isRunning) {
                switch(e.code) {
                    case 'ArrowLeft':
                    case 'KeyA':
                        e.preventDefault();
                        this.keys.left = false;
                        console.log('Left key released');
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        e.preventDefault();
                        this.keys.right = false;
                        console.log('Right key released');
                        break;
                    case 'ArrowUp':
                    case 'Space':
                    case 'KeyW':
                        e.preventDefault();
                        this.keys.up = false;
                        console.log('Up/Space/W key released');
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        e.preventDefault();
                        this.keys.down = false;
                        console.log('Down key released');
                        break;
                }
            }
        });
        
        console.log('Input handlers set up successfully');
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            if (this.canvas) {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
                GAME_CONFIG.CANVAS_WIDTH = this.canvas.width;
                GAME_CONFIG.CANVAS_HEIGHT = this.canvas.height;
                
                // Update camera if it exists
                if (this.camera) {
                    this.camera.width = this.canvas.width;
                    this.camera.height = this.canvas.height;
                }
            }
        });
    }

    startGame(difficulty, level) {
        try {
            this.currentDifficulty = difficulty;
            this.currentLevel = level;
            this.score = 0;
            this.gameTime = 0;
            this.checkpointsCollected = 0;
            
            // Generate level
            const levelData = this.levelGenerator.generateLevel(difficulty, level);
            this.platforms = levelData.platforms;
            this.enemies = levelData.enemies;
            this.checkpoints = levelData.checkpoints;
            this.obstacles = levelData.obstacles || [];
            this.totalCheckpoints = this.checkpoints.length;
            
            // Create player with difficulty-based health
            this.player = new Player(levelData.startX, levelData.startY);
            const config = GAME_CONFIG.DIFFICULTY_MULTIPLIERS[difficulty] || GAME_CONFIG.DIFFICULTY_MULTIPLIERS.medium;
            this.player.health = Math.floor(GAME_CONFIG.PLAYER_MAX_HEALTH * config.health);
            this.player.maxHealth = this.player.health;
            
            // Reset systems
            this.particleSystem.clear();
            this.camera.x = 0;
            this.camera.y = 0;
            
            // Show game screen
            this.showGameScreen();
            
            // Reset key states
            this.keys = {
                left: false,
                right: false,
                up: false,
                down: false,
                space: false
            };
            
            // Start game loop
            this.isRunning = true;
            this.isPaused = false;
            this.lastTime = performance.now();
            
            // Ensure canvas is focused for input
            this.canvas.focus();
            
            this.gameLoop();
            
            console.log(`Game started: ${difficulty} level ${level}`);
            console.log('Game state:', {
                isRunning: this.isRunning,
                isPaused: this.isPaused,
                player: this.player ? 'created' : 'missing',
                playerPosition: this.player ? { x: this.player.x, y: this.player.y } : 'N/A',
                keys: this.keys
            });
        } catch (error) {
            console.error('Failed to start game:', error);
        }
    }

    gameLoop(currentTime = performance.now()) {
        if (!this.isRunning) return;
        
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        if (!this.isPaused) {
            this.update(deltaTime);
        }
        
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        try {
            this.gameTime += deltaTime;
            
            // Handle win message timing
            if (this.showingWinMessage) {
                this.winMessageTime += deltaTime;
                if (this.winMessageTime >= this.winMessageDuration) {
                    this.showingWinMessage = false;
                    this.proceedToNextLevel();
                }
                return; // Don't update game logic while showing win message
            }
            
            // Update player input
            this.updatePlayerInput();
            
            // Update player physics using the physics system
            if (this.player && this.physics) {
                this.physics.updatePlayerPhysics(this.player, deltaTime);
            }
            
            // Update player
            if (this.player) {
                this.player.update(deltaTime);
            }
            
            // Update platforms
            this.platforms.forEach(platform => {
                platform.update(deltaTime);
            });
            
            // Remove broken platforms
            this.platforms = this.platforms.filter(platform => !platform.shouldRemove());
            
            // Update enemies
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                // Update enemy physics
                if (this.physics) {
                    this.physics.updateEnemyPhysics(enemy, deltaTime);
                }
            });
            
            // Update obstacles
            this.obstacles.forEach(obstacle => {
                if (obstacle.update) {
                    obstacle.update(deltaTime);
                }
            });
            
            // Update checkpoints
            this.checkpoints.forEach(checkpoint => {
                checkpoint.update(deltaTime);
            });
            
            // Update particles
            if (this.particleSystem) {
                this.particleSystem.update(deltaTime);
            }
            
            // Update camera
            if (this.camera && this.player) {
                this.camera.follow(this.player);
            }
            
            // Check collisions
            this.checkCollisions();
            
            // Check game state
            this.checkGameState();
            
            // Update UI
            this.updateUI();
            
            // Clean up dead enemies
            this.enemies = this.enemies.filter(enemy => !enemy.isDead());
            
        } catch (error) {
            console.error('Error in game update:', error);
        }
    }

    updatePlayerInput() {
        if (!this.player || !this.physics) {
            console.log('Player or physics not available:', { player: !!this.player, physics: !!this.physics });
            return;
        }
        
        try {
            // Debug: Log key states occasionally
            if (Math.random() < 0.01) { // Log 1% of the time
                console.log('Key states:', this.keys);
                console.log('Player velocity:', { vx: this.player.vx, vy: this.player.vy });
                console.log('Player position:', { x: this.player.x, y: this.player.y });
            }
            
            // Horizontal movement with smooth acceleration/deceleration
            if (this.keys.left) {
                // Apply acceleration in left direction
                this.player.vx -= GAME_CONFIG.PLAYER_ACCELERATION * (1/60); // Using fixed timestep for consistent feel
                this.player.direction = -1;
            } else if (this.keys.right) {
                // Apply acceleration in right direction
                this.player.vx += GAME_CONFIG.PLAYER_ACCELERATION * (1/60);
                this.player.direction = 1;
            } else {
                // Apply deceleration when no keys pressed
                this.player.vx *= GAME_CONFIG.PLAYER_DECELERATION;
            }
            
            // Limit horizontal speed
            const maxSpeed = GAME_CONFIG.PLAYER_SPEED;
            if (this.player.vx > maxSpeed) {
                this.player.vx = maxSpeed;
            } else if (this.player.vx < -maxSpeed) {
                this.player.vx = -maxSpeed;
            }
            
            // Stop very small movements (prevent sliding)
            if (Math.abs(this.player.vx) < 5) {
                this.player.vx = 0;
            }
            
            // Jumping with coyote time and jump buffering
            if (this.keys.up) {
                // Check if we can jump (on ground or within coyote time)
                if (this.player.canJump()) {
                    this.physics.applyJump(this.player, this.player.jumpForce);
                    this.player.onGround = false;
                    this.player.coyoteTimeRemaining = 0; // Consume coyote time
                    this.player.startJump(); // Start variable jump tracking
                    if (this.audioManager) {
                        this.audioManager.playJump();
                    }
                    if (this.particleSystem) {
                        this.particleSystem.createDust(this.player.x + this.player.width/2, this.player.y + this.player.height);
                    }
                }
                
                // Handle variable jump height
                this.player.handleJumpHold(true);
            } else {
                // Stop variable jump when not holding up
                this.player.handleJumpHold(false);
            }
            
            // Check for buffered jump input
            if (this.player.consumeJumpBuffer() && this.player.canJump()) {
                this.physics.applyJump(this.player, this.player.jumpForce);
                this.player.onGround = false;
                this.player.coyoteTimeRemaining = 0; // Consume coyote time
                this.player.startJump(); // Start variable jump tracking
                if (this.audioManager) {
                    this.audioManager.playJump();
                }
                if (this.particleSystem) {
                    this.particleSystem.createDust(this.player.x + this.player.width/2, this.player.y + this.player.height);
                }
            }
            
            // Boundary checking - prevent player from going off screen horizontally
            const worldBounds = this.getWorldBounds();
            if (this.player.x < worldBounds.left) {
                this.player.x = worldBounds.left;
                this.player.vx = 0; // Stop movement at boundary
            } else if (this.player.x + this.player.width > worldBounds.right) {
                this.player.x = worldBounds.right - this.player.width;
                this.player.vx = 0; // Stop movement at boundary
            }
            
            // Reset ground state (will be set to true in collision detection if on platform)
            this.player.onGround = false;
        } catch (error) {
            console.error('Error in player input update:', error);
        }
    }

    // New method to get world boundaries
    getWorldBounds() {
        // Calculate world bounds based on camera position and canvas size
        const margin = 100; // Extra space beyond screen edges
        const left = this.camera ? this.camera.x - margin : -margin;
        const right = this.camera ? this.camera.x + GAME_CONFIG.CANVAS_WIDTH + margin : GAME_CONFIG.CANVAS_WIDTH + margin;
        
        return { left, right };
    }

    checkCollisions() {
        if (!this.player || !this.physics) return;
        
        try {
            // Platform collisions
            this.platforms.forEach(platform => {
                if (platform && !platform.shouldRemove() && this.physics.checkPlatformCollision(this.player, platform)) {
                    // Reset jump state when landing
                    this.player.resetJumpState();
                    
                    // Handle platform-specific interactions
                    platform.handlePlayerInteraction(this.player);
                    
                    if (this.particleSystem) {
                        this.particleSystem.createDust(this.player.x + this.player.width/2, this.player.y + this.player.height);
                    }
                }
            });
            
            // Enemy collisions
            this.enemies.forEach(enemy => {
                if (enemy && !enemy.isDead() && this.physics.checkEnemyCollision(this.player, enemy)) {
                    if (this.player.takeDamage(enemy.damage)) {
                        if (this.audioManager) {
                            this.audioManager.playDamage();
                        }
                        if (this.camera) {
                            this.camera.screenShake(10, 0.5);
                        }
                        if (this.particleSystem) {
                            this.particleSystem.createExplosion(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 20, '#ff0000');
                        }
                    }
                }
            });
            
            // Obstacle collisions
            this.obstacles.forEach(obstacle => {
                if (obstacle && this.physics.checkObstacleCollision(this.player, obstacle)) {
                    if (this.player.takeDamage(obstacle.damage)) {
                        if (this.audioManager) {
                            this.audioManager.playDamage();
                        }
                        if (this.camera) {
                            this.camera.screenShake(8, 0.3);
                        }
                        if (this.particleSystem) {
                            this.particleSystem.createExplosion(this.player.x + this.player.width/2, this.player.y + this.player.height/2, 15, '#ff8800');
                        }
                    }
                }
            });
            
            // Checkpoint collisions
            this.checkpoints.forEach(checkpoint => {
                if (checkpoint && !checkpoint.collected && this.physics.checkCheckpointCollision(this.player, checkpoint)) {
                    if (checkpoint.collect()) {
                        this.checkpointsCollected++;
                        this.score += 1000;
                        if (this.audioManager) {
                            this.audioManager.playCollect();
                        }
                        if (this.particleSystem) {
                            this.particleSystem.createExplosion(checkpoint.x + checkpoint.width/2, checkpoint.y + checkpoint.height/2, 15, '#ffff00');
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error in collision detection:', error);
        }
    }

    checkGameState() {
        if (!this.player) return;
        
        try {
            // Check if player fell off screen
            if (this.player.y > GAME_CONFIG.CANVAS_HEIGHT + 100) {
                this.gameOver();
                return;
            }
            
            // Check if player is dead
            if (this.player.isDead()) {
                this.gameOver();
                return;
            }
            
            // Check if player collected 4 checkpoints (new win condition)
            if (this.checkpointsCollected >= 4) {
                this.victory();
                return;
            }
            
            // Keep the old win condition as backup (reaching end of platforms)
            if (this.platforms.length > 0 && this.player.x > this.platforms[this.platforms.length - 1].x + 200) {
                this.victory();
                return;
            }
        } catch (error) {
            console.error('Error in game state check:', error);
        }
    }

    updateUI() {
        // Update health display
        const healthDisplay = document.getElementById('health-display');
        if (healthDisplay) {
            healthDisplay.textContent = `Health: ${this.player.health}`;
        }
        
        // Update score display
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${this.score}`;
        }
        
        // Update level display
        const levelDisplay = document.getElementById('level-display');
        if (levelDisplay) {
            levelDisplay.textContent = `Level: ${this.currentLevel}`;
        }
        
        // Update checkpoint display
        const checkpointDisplay = document.getElementById('checkpoint-display');
        if (checkpointDisplay) {
            checkpointDisplay.textContent = `Checkpoints: ${this.checkpointsCollected}/${this.totalCheckpoints}`;
        }
    }

    render() {
        if (!this.ctx || !this.canvas) return;
        
        try {
            // Clear canvas
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Apply camera transform
            if (this.camera) {
                this.camera.apply(this.ctx);
            }
            
            // Draw background
            if (this.levelGenerator && this.backgroundStars) {
                this.levelGenerator.drawBackground(this.ctx, this.backgroundStars, this.gameTime);
            }
            
            // Draw game objects
            this.platforms.forEach(platform => {
                if (this.camera && this.camera.isInView(platform)) {
                    platform.draw(this.ctx);
                }
            });
            
            this.enemies.forEach(enemy => {
                if (this.camera && this.camera.isInView(enemy)) {
                    enemy.draw(this.ctx);
                }
            });
            
            this.obstacles.forEach(obstacle => {
                if (this.camera && this.camera.isInView(obstacle)) {
                    obstacle.draw(this.ctx);
                }
            });
            
            this.checkpoints.forEach(checkpoint => {
                if (this.camera && this.camera.isInView(checkpoint)) {
                    checkpoint.draw(this.ctx);
                }
            });
            
            if (this.player) {
                this.player.draw(this.ctx);
            }
            
            // Draw particles
            if (this.particleSystem) {
                this.particleSystem.draw(this.ctx);
            }
            
            // Restore camera transform
            if (this.camera) {
                this.camera.restore(this.ctx);
            }
            
            // Draw UI elements (not affected by camera)
            this.drawUI();
        } catch (error) {
            console.error('Error in rendering:', error);
        }
    }

    drawUI() {
        // Draw win message overlay
        if (this.showingWinMessage) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            Utils.drawText(this.ctx, 'YOU WIN!', this.canvas.width/2, this.canvas.height/2 - 50, {
                font: '64px Orbitron',
                color: '#00ff00'
            });
            
            Utils.drawText(this.ctx, 'Proceeding to next level...', this.canvas.width/2, this.canvas.height/2 + 50, {
                font: '24px Orbitron',
                color: '#00ff00'
            });
        }
        
        // Draw pause overlay
        if (this.isPaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            Utils.drawText(this.ctx, 'PAUSED', this.canvas.width/2, this.canvas.height/2, {
                font: '48px Orbitron',
                color: '#00ff00'
            });
        }
    }

    showMenu() {
        this.isRunning = false;
        this.hideAllScreens();
        if (this.menuScreen) {
            this.menuScreen.style.display = 'flex';
            this.menuScreen.classList.add('active');
        }
    }

    showGameScreen() {
        this.hideAllScreens();
        // Game runs directly on canvas, no need for separate game screen
        console.log('Game screen shown - game will run on canvas');
    }

    showGameOverScreen() {
        this.isRunning = false;
        this.hideAllScreens();
        
        // Update game over reason
        const gameOverReason = document.getElementById('game-over-reason');
        if (gameOverReason) {
            if (this.player && this.player.isDead()) {
                gameOverReason.textContent = 'Health points depleted!';
            } else {
                gameOverReason.textContent = 'You fell off the platforms!';
            }
        }
        
        // Update final stats
        const finalScore = document.getElementById('final-score');
        const timeSurvived = document.getElementById('time-survived');
        const checkpointsCollected = document.getElementById('checkpoints-collected');
        
        if (finalScore) finalScore.textContent = this.score;
        if (timeSurvived) timeSurvived.textContent = Utils.formatTime(this.gameTime);
        if (checkpointsCollected) checkpointsCollected.textContent = this.checkpointsCollected;
        
        if (this.gameOverScreen) {
            this.gameOverScreen.style.display = 'flex';
            this.gameOverScreen.classList.add('active');
        }
    }

    showVictoryScreen() {
        this.isRunning = false;
        this.hideAllScreens();
        
        // Update victory stats
        const victoryScore = document.getElementById('victory-score');
        const victoryTime = document.getElementById('victory-time');
        const victoryCheckpoints = document.getElementById('victory-checkpoints');
        
        if (victoryScore) victoryScore.textContent = this.score;
        if (victoryTime) victoryTime.textContent = Utils.formatTime(this.gameTime);
        if (victoryCheckpoints) victoryCheckpoints.textContent = this.checkpointsCollected;
        
        if (this.victoryScreen) {
            this.victoryScreen.style.display = 'flex';
            this.victoryScreen.classList.add('active');
        }
    }

    hideAllScreens() {
        if (this.menuScreen) {
            this.menuScreen.style.display = 'none';
            this.menuScreen.classList.remove('active');
        }
        // Game screen is handled by canvas, no need to hide
        if (this.gameOverScreen) {
            this.gameOverScreen.style.display = 'none';
            this.gameOverScreen.classList.remove('active');
        }
        if (this.victoryScreen) {
            this.victoryScreen.style.display = 'none';
            this.victoryScreen.classList.remove('active');
        }
    }

    togglePause() {
        if (this.isRunning) {
            this.isPaused = !this.isPaused;
            if (this.isPaused) {
                this.audioManager.audioContext?.suspend();
            } else {
                this.audioManager.resumeAudio();
            }
        }
    }

    gameOver() {
        try {
            if (this.audioManager) {
                this.audioManager.playExplosion();
            }
            this.showGameOverScreen();
        } catch (error) {
            console.error('Error in game over:', error);
        }
    }

    victory() {
        try {
            if (this.audioManager) {
                this.audioManager.playVictory();
            }
            
            // Show win message first
            this.showingWinMessage = true;
            this.winMessageTime = 0;
            
            // Level progression is handled in the update loop
        } catch (error) {
            console.error('Error in victory:', error);
        }
    }

    // Method to proceed to next level
    proceedToNextLevel() {
        try {
            // Increment level first
            this.currentLevel++;
            
            // Check if there are more levels in this difficulty
            if (this.currentLevel <= GAME_CONFIG.LEVELS_PER_DIFFICULTY) {
                // Move to next level
                this.startGame(this.currentDifficulty, this.currentLevel);
            } else {
                // Completed all levels in this difficulty
                this.showVictoryScreen();
            }
        } catch (error) {
            console.error('Error proceeding to next level:', error);
        }
    }
}

// Make NeonJump globally available
window.NeonJump = NeonJump; 