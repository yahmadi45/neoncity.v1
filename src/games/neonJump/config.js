/**
 * NeonJump Game Configuration
 * Central configuration for all game settings
 */

// ===== GAME CONFIGURATION =====
const GAME_CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 1200,
    CANVAS_HEIGHT: 800,
    FPS: 60,
    
    // Player settings
    PLAYER_WIDTH: 30,
    PLAYER_HEIGHT: 30,
    PLAYER_SPEED: 300, // Increased for better responsiveness
    PLAYER_ACCELERATION: 1500, // Increased for snappier movement
    PLAYER_DECELERATION: 0.8, // Adjusted for better stopping
    PLAYER_JUMP_FORCE: 450, // Increased for better jump feel
    PLAYER_GRAVITY: 1400, // Increased for more responsive falling
    PLAYER_MAX_FALL_SPEED: 700, // Increased for realistic fall speed
    PLAYER_MAX_HEALTH: 100,
    PLAYER_DAMAGE_AMOUNT: 20,
    PLAYER_INVULNERABILITY_TIME: 2.0,
    
    // Platform settings
    PLATFORM_MIN_WIDTH: 60,
    PLATFORM_MAX_WIDTH: 200,
    PLATFORM_HEIGHT: 20,
    PLATFORM_GAP_MIN: 80,
    PLATFORM_GAP_MAX: 150,
    
    // Enemy settings
    ENEMY_WIDTH: 25,
    ENEMY_HEIGHT: 25,
    ENEMY_SPEED: 3, // Increased from 2
    ENEMY_MOVE_LEFT: true, // New: enemies move left
    ENEMY_DAMAGE: 20,
    
    // Checkpoint settings
    CHECKPOINT_WIDTH: 40,
    CHECKPOINT_HEIGHT: 40,
    
    // Audio settings
    AUDIO_ENABLED: true,
    VOLUME: 0.7,
    
    // Particle settings
    PARTICLE_LIMIT: 200,
    
    // Level settings
    LEVELS_PER_DIFFICULTY: 3,
    
    // Difficulty multipliers
    DIFFICULTY_MULTIPLIERS: {
        easy: { 
            speed: 0.8, 
            gap: 0.9, 
            enemySpawn: 0.5,
            enemySpeed: 0.7,
            health: 1.2
        },
        medium: { 
            speed: 1.0, 
            gap: 1.0, 
            enemySpawn: 1.0,
            enemySpeed: 1.0,
            health: 1.0
        },
        hard: { 
            speed: 1.3, 
            gap: 1.2, 
            enemySpawn: 1.5,
            enemySpeed: 1.3,
            health: 0.8
        }
    }
};

// Make config globally available
window.GAME_CONFIG = GAME_CONFIG; 