/**
 * NeonJump Physics Engine
 * Handles collision detection and physics calculations
 */

// ===== PHYSICS ENGINE CLASS =====
class Physics {
    constructor() {
        this.gravity = GAME_CONFIG.PLAYER_GRAVITY;
        this.maxFallSpeed = GAME_CONFIG.PLAYER_MAX_FALL_SPEED;
    }

    updatePlayerPhysics(player, deltaTime) {
        if (!player) return;
        
        try {
            // Apply gravity
            if (!player.onGround) {
                player.vy += this.gravity * deltaTime;
            }
            
            // Limit fall speed
            if (player.vy > this.maxFallSpeed) {
                player.vy = this.maxFallSpeed;
            }
            
            // Update position
            player.x += player.vx * deltaTime;
            player.y += player.vy * deltaTime;
        } catch (error) {
            console.error('Error updating player physics:', error);
        }
    }

    checkCollision(rect1, rect2) {
        if (!rect1 || !rect2) return false;
        
        try {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        } catch (error) {
            console.error('Error checking collision:', error);
            return false;
        }
    }

    checkPlatformCollision(player, platform) {
        if (!player || !platform) return false;
        
        try {
            // Check if player is falling and above the platform
            if (player.vy >= 0 && 
                player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y + player.height >= platform.y &&
                player.y < platform.y + platform.height) {
                
                // Land on platform
                player.y = platform.y - player.height;
                player.vy = 0;
                player.onGround = true;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error checking platform collision:', error);
            return false;
        }
    }

    checkEnemyCollision(player, enemy) {
        return this.checkCollision(player, enemy);
    }

    checkCheckpointCollision(player, checkpoint) {
        return this.checkCollision(player, checkpoint);
    }

    checkObstacleCollision(player, obstacle) {
        return this.checkCollision(player, obstacle);
    }

    applyJump(player, force) {
        if (!player) return;
        
        try {
            player.vy = -force;
            player.onGround = false;
        } catch (error) {
            console.error('Error applying jump:', error);
        }
    }

    updateEnemyPhysics(enemy, deltaTime) {
        if (!enemy) return;
        
        try {
            // Simple enemy movement
            enemy.x += enemy.vx * deltaTime;
            
            // Bounce off edges
            if (enemy.x <= 0 || enemy.x + enemy.width >= GAME_CONFIG.CANVAS_WIDTH) {
                enemy.vx *= -1;
            }
        } catch (error) {
            console.error('Error updating enemy physics:', error);
        }
    }
}

// Make Physics globally available
window.Physics = Physics; 