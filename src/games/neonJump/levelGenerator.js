/**
 * Generates game levels procedurally
 */

// ===== LEVEL GENERATOR CLASS =====
class LevelGenerator {
    constructor() {
        this.seed = Date.now();
        this.platformTypes = ['normal', 'moving', 'breakable', 'bouncy', 'spikes'];
        this.enemyTypes = ['basic', 'advanced', 'flying', 'bomber', 'laser'];
    }

    setSeed(seed) {
        this.seed = seed;
    }

    random() {
        // Simple pseudo-random number generator
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    generateLevel(difficulty, level) {
        try {
            const platforms = [];
            const enemies = [];
            const checkpoints = [];
            const obstacles = [];
            
            const config = GAME_CONFIG.DIFFICULTY_MULTIPLIERS[difficulty] || GAME_CONFIG.DIFFICULTY_MULTIPLIERS.medium;
            const baseY = GAME_CONFIG.CANVAS_HEIGHT - 100;
            let currentX = 100;
            let currentY = baseY;
            
            // Generate starting platform
            platforms.push(new Platform(50, baseY, 150, 'normal'));
            
            // Generate level platforms (more platforms for higher levels)
            const numPlatforms = 20 + level * 5;
            for (let i = 0; i < numPlatforms; i++) {
                const gap = Utils.random(
                    GAME_CONFIG.PLATFORM_GAP_MIN * config.gap,
                    GAME_CONFIG.PLATFORM_GAP_MAX * config.gap
                );
                
                currentX += gap;
                currentY = Utils.random(baseY - 200, baseY + 50);
                
                const platformWidth = Utils.random(
                    GAME_CONFIG.PLATFORM_MIN_WIDTH,
                    GAME_CONFIG.PLATFORM_MAX_WIDTH
                );
                
                // Choose platform type based on level difficulty
                const platformType = this.selectPlatformType(level, difficulty);
                const platform = new Platform(currentX, currentY, platformWidth, platformType);
                
                // Configure platform behavior
                this.configurePlatform(platform, platformType, level);
                
                platforms.push(platform);
                
                // Add enemies with varied types
                this.addEnemies(enemies, currentX, currentY, platformWidth, level, difficulty, config);
                
                // Add obstacles
                this.addObstacles(obstacles, currentX, currentY, platformWidth, level, difficulty);
            }
            
            // Add exactly 4 checkpoints at strategic positions
            const checkpointPositions = [
                Math.floor(numPlatforms * 0.2), // 20% through the level
                Math.floor(numPlatforms * 0.4), // 40% through the level
                Math.floor(numPlatforms * 0.6), // 60% through the level
                Math.floor(numPlatforms * 0.8)  // 80% through the level
            ];
            
            checkpointPositions.forEach((platformIndex, checkpointIndex) => {
                if (platformIndex < platforms.length && platformIndex > 0) {
                    const platform = platforms[platformIndex];
                    const checkpointX = platform.x + platform.width / 2 - GAME_CONFIG.CHECKPOINT_WIDTH / 2;
                    const checkpointY = platform.y - GAME_CONFIG.CHECKPOINT_HEIGHT - 10;
                    checkpoints.push(new Checkpoint(checkpointX, checkpointY));
                }
            });
            
            // Add final platform
            const finalX = currentX + 200;
            platforms.push(new Platform(finalX, baseY, 200, 'normal'));
            
            return {
                platforms,
                enemies,
                checkpoints,
                obstacles,
                startX: 100,
                startY: baseY - GAME_CONFIG.PLAYER_HEIGHT,
                endX: finalX + 100,
                endY: baseY - GAME_CONFIG.PLAYER_HEIGHT
            };
        } catch (error) {
            console.error('Error generating level:', error);
            // Return a simple fallback level
            return {
                platforms: [new Platform(50, GAME_CONFIG.CANVAS_HEIGHT - 100, 200, 'normal')],
                enemies: [],
                checkpoints: [],
                obstacles: [],
                startX: 100,
                startY: GAME_CONFIG.CANVAS_HEIGHT - 100 - GAME_CONFIG.PLAYER_HEIGHT,
                endX: 250,
                endY: GAME_CONFIG.CANVAS_HEIGHT - 100 - GAME_CONFIG.PLAYER_HEIGHT
            };
        }
    }

    selectPlatformType(level, difficulty) {
        const weights = {
            normal: 0.4,
            moving: 0.2,
            breakable: 0.15,
            bouncy: 0.15,
            spikes: 0.1
        };
        
        // Adjust weights based on level and difficulty
        if (level > 2) {
            weights.moving += 0.1;
            weights.breakable += 0.1;
            weights.spikes += 0.05;
            weights.normal -= 0.25;
        }
        
        if (difficulty === 'hard') {
            weights.spikes += 0.1;
            weights.breakable += 0.1;
            weights.normal -= 0.2;
        }
        
        const rand = this.random();
        let cumulative = 0;
        
        for (const [type, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (rand <= cumulative) {
                return type;
            }
        }
        
        return 'normal';
    }

    configurePlatform(platform, type, level) {
        switch(type) {
            case 'moving':
                platform.moveSpeed = Utils.random(1, 3) + (level * 0.5);
                platform.moveRange = Utils.random(50, 150) + (level * 10);
                break;
            case 'bouncy':
                platform.bounceForce = Utils.random(20, 30) + (level * 5);
                break;
            case 'spikes':
                platform.spikeDamage = Utils.random(15, 25) + (level * 3);
                break;
            case 'breakable':
                platform.durability = Math.max(1, 3 - level); // Fewer hits in higher levels
                break;
        }
    }

    addEnemies(enemies, platformX, platformY, platformWidth, level, difficulty, config) {
        const enemySpawnChance = 0.3 * config.enemySpawn;
        
        if (this.random() < enemySpawnChance) {
            const enemyX = platformX + Utils.random(10, platformWidth - 30);
            const enemyY = platformY - GAME_CONFIG.ENEMY_HEIGHT;
            
            // Select enemy type based on level and difficulty
            const enemyType = this.selectEnemyType(level, difficulty);
            const enemy = new Enemy(enemyX, enemyY, enemyType);
            
            // Apply difficulty speed multiplier
            enemy.vx *= config.enemySpeed;
            enemies.push(enemy);
        }
        
        // Add flying enemies in higher levels
        if (level > 2 && this.random() < 0.2 * config.enemySpawn) {
            const flyingX = platformX + Utils.random(0, platformWidth);
            const flyingY = platformY - Utils.random(50, 150);
            const flyingEnemy = new Enemy(flyingX, flyingY, 'flying');
            flyingEnemy.vx *= config.enemySpeed;
            enemies.push(flyingEnemy);
        }
        
        // Add laser enemies in higher levels
        if (level > 3 && this.random() < 0.15 * config.enemySpawn) {
            const laserX = platformX + platformWidth / 2;
            const laserY = platformY - GAME_CONFIG.ENEMY_HEIGHT;
            const laserEnemy = new Enemy(laserX, laserY, 'laser');
            enemies.push(laserEnemy);
        }
    }

    selectEnemyType(level, difficulty) {
        const weights = {
            basic: 0.4,
            advanced: 0.3,
            flying: 0.15,
            bomber: 0.1,
            laser: 0.05
        };
        
        // Adjust weights based on level
        if (level > 2) {
            weights.advanced += 0.1;
            weights.flying += 0.1;
            weights.basic -= 0.2;
        }
        
        if (level > 4) {
            weights.bomber += 0.1;
            weights.laser += 0.1;
            weights.basic -= 0.2;
        }
        
        if (difficulty === 'hard') {
            weights.advanced += 0.1;
            weights.bomber += 0.05;
            weights.basic -= 0.15;
        }
        
        const rand = this.random();
        let cumulative = 0;
        
        for (const [type, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (rand <= cumulative) {
                return type;
            }
        }
        
        return 'basic';
    }

    addObstacles(obstacles, platformX, platformY, platformWidth, level, difficulty) {
        // Add spikes on platforms
        if (this.random() < 0.2) {
            const spikeX = platformX + Utils.random(10, platformWidth - 20);
            const spikeY = platformY - 15;
            obstacles.push(new Spike(spikeX, spikeY));
        }
        
        // Add floating obstacles in higher levels
        if (level > 2 && this.random() < 0.15) {
            const obstacleX = platformX + Utils.random(0, platformWidth);
            const obstacleY = platformY - Utils.random(30, 80);
            obstacles.push(new FloatingObstacle(obstacleX, obstacleY));
        }
    }

    generateBackground() {
        const stars = [];
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Utils.random(0, GAME_CONFIG.CANVAS_WIDTH),
                y: Utils.random(0, GAME_CONFIG.CANVAS_HEIGHT),
                size: Utils.random(1, 3),
                brightness: Utils.random(0.3, 1.0),
                twinkleSpeed: Utils.random(0.5, 2.0)
            });
        }
        
        return stars;
    }

    drawBackground(ctx, stars, time) {
        // Draw starfield
        ctx.save();
        stars.forEach(star => {
            const alpha = star.brightness * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed));
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(star.x, star.y, star.size, star.size);
        });
        ctx.restore();
    }
}

// ===== OBSTACLE CLASSES =====
class Spike {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
        this.damage = 25;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = '#ff0000';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 10;
        
        // Draw spike triangle
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }
}

class FloatingObstacle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.damage = 20;
        this.animationFrame = 0;
    }

    update(deltaTime) {
        this.animationFrame += deltaTime * 5;
    }

    draw(ctx) {
        ctx.save();
        
        const pulse = 1 + Math.sin(this.animationFrame) * 0.2;
        ctx.scale(pulse, pulse);
        
        ctx.fillStyle = '#ff8800';
        ctx.shadowColor = '#ff8800';
        ctx.shadowBlur = 15;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Add warning stripes
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, 3);
        ctx.fillRect(this.x + 2, this.y + this.height - 5, this.width - 4, 3);
        
        ctx.restore();
    }
}

// Make LevelGenerator globally available
window.LevelGenerator = LevelGenerator; 