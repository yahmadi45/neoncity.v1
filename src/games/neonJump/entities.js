/**
 * NeonJump Game Entities
 * Player, Platform, Enemy, and Checkpoint classes
 */

// ===== PLAYER CLASS =====
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG.PLAYER_WIDTH;
        this.height = GAME_CONFIG.PLAYER_HEIGHT;
        this.vx = 0;
        this.vy = 0;
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.jumpForce = GAME_CONFIG.PLAYER_JUMP_FORCE;
        this.onGround = false;
        this.health = GAME_CONFIG.PLAYER_MAX_HEALTH;
        this.maxHealth = GAME_CONFIG.PLAYER_MAX_HEALTH;
        this.invulnerable = false;
        this.invulnerabilityTime = 0;
        this.animationFrame = 0;
        this.direction = 1; // 1 for right, -1 for left
        
        // New: Coyote time and jump buffering for better feel
        this.coyoteTime = 0.1; // 100ms window to jump after leaving ground
        this.coyoteTimeRemaining = 0;
        this.jumpBufferTime = 0.1; // 100ms window to buffer jump input
        this.jumpBufferRemaining = 0;
        this.wasOnGround = false;
        
        // New: Variable jump height
        this.isJumping = false;
        this.jumpHoldTime = 0;
        this.maxJumpHoldTime = 0.3; // Maximum time to hold jump for extra height
        this.jumpHoldMultiplier = 0.7; // How much extra height holding gives
    }

    update(deltaTime) {
        // Update invulnerability
        if (this.invulnerable) {
            this.invulnerabilityTime -= deltaTime;
            if (this.invulnerabilityTime <= 0) {
                this.invulnerable = false;
            }
        }

        // Update animation
        this.animationFrame += deltaTime * 10;
        if (this.animationFrame > 4) {
            this.animationFrame = 0;
        }
        
        // Update coyote time
        if (this.onGround) {
            this.coyoteTimeRemaining = this.coyoteTime;
            this.wasOnGround = true;
            this.isJumping = false; // Reset jumping state when on ground
        } else if (this.wasOnGround) {
            this.coyoteTimeRemaining -= deltaTime;
            if (this.coyoteTimeRemaining <= 0) {
                this.wasOnGround = false;
            }
        }
        
        // Update jump buffer
        if (this.jumpBufferRemaining > 0) {
            this.jumpBufferRemaining -= deltaTime;
        }
        
        // Update variable jump height
        if (this.isJumping) {
            this.jumpHoldTime += deltaTime;
        }
    }

    // New method to check if player can jump (including coyote time)
    canJump() {
        return this.onGround || this.coyoteTimeRemaining > 0;
    }
    
    // New method to buffer jump input
    bufferJump() {
        this.jumpBufferRemaining = this.jumpBufferTime;
    }
    
    // New method to consume jump buffer
    consumeJumpBuffer() {
        if (this.jumpBufferRemaining > 0) {
            this.jumpBufferRemaining = 0;
            return true;
        }
        return false;
    }
    
    // New method to start a jump
    startJump() {
        this.isJumping = true;
        this.jumpHoldTime = 0;
    }
    
    // New method to handle variable jump height
    handleJumpHold(isHoldingJump) {
        if (this.isJumping && isHoldingJump && this.jumpHoldTime < this.maxJumpHoldTime && this.vy < 0) {
            // Apply extra upward force while holding jump
            this.vy -= this.jumpForce * this.jumpHoldMultiplier * (1/60);
        }
    }

    // Method to reset jump state
    resetJumpState() {
        this.isJumping = false;
        this.jumpHoldTime = 0;
        this.jumpBufferRemaining = 0;
    }

    draw(ctx) {
        if (!ctx) return;
        
        try {
            ctx.save();
            
            // Draw player with neon effect
            const alpha = this.invulnerable ? 0.5 + Math.sin(this.invulnerabilityTime * 10) * 0.3 : 1;
            ctx.globalAlpha = alpha;
            
            // Visual feedback for coyote time (slight glow when in coyote time)
            if (this.coyoteTimeRemaining > 0 && !this.onGround) {
                ctx.shadowColor = '#ffff00';
                ctx.shadowBlur = 20;
            } else {
                ctx.shadowColor = '#00ff00';
                ctx.shadowBlur = 15;
            }
            
            // Main body
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Eyes
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 5;
            const eyeSize = 4;
            const eyeY = this.y + 8;
            ctx.fillRect(this.x + 6, eyeY, eyeSize, eyeSize);
            ctx.fillRect(this.x + this.width - 10, eyeY, eyeSize, eyeSize);
            
            // Movement trail
            if (Math.abs(this.vx) > 0.1) {
                ctx.globalAlpha = 0.3;
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(this.x - 10, this.y, 10, this.height);
            }
            
            // Visual feedback for jump buffering (pulse effect)
            if (this.jumpBufferRemaining > 0) {
                ctx.globalAlpha = 0.7 + Math.sin(this.jumpBufferRemaining * 20) * 0.3;
                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
            }
            
            ctx.restore();
        } catch (error) {
            console.error('Error drawing player:', error);
        }
    }

    takeDamage(amount) {
        if (!this.invulnerable) {
            this.health -= amount;
            this.invulnerable = true;
            this.invulnerabilityTime = GAME_CONFIG.PLAYER_INVULNERABILITY_TIME;
            return true;
        }
        return false;
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    isDead() {
        return this.health <= 0;
    }
}

// ===== PLATFORM CLASS =====
class Platform {
    constructor(x, y, width, type = 'normal') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = GAME_CONFIG.PLATFORM_HEIGHT;
        this.type = type; // normal, moving, breakable, bouncy, spikes
        this.originalX = x;
        this.moveSpeed = 0;
        this.moveRange = 0;
        this.moveDirection = 1;
        this.durability = type === 'breakable' ? 3 : Infinity;
        
        // Initialize platform properties
        this.initializePlatformType();
    }

    initializePlatformType() {
        switch(this.type) {
            case 'moving':
                this.moveSpeed = Utils.random(1, 3);
                this.moveRange = Utils.random(50, 150);
                break;
            case 'bouncy':
                this.bounceForce = Utils.random(20, 30);
                break;
            case 'spikes':
                this.spikeDamage = Utils.random(15, 25);
                break;
        }
    }

    update(deltaTime) {
        if (this.type === 'moving') {
            this.x += this.moveSpeed * this.moveDirection * deltaTime;
            
            if (this.x <= this.originalX - this.moveRange || 
                this.x >= this.originalX + this.moveRange) {
                this.moveDirection *= -1;
            }
        }
    }

    draw(ctx) {
        if (!ctx) return;
        
        try {
            ctx.save();
            
            // Platform color based on type
            let color = '#00ff00';
            if (this.type === 'moving') color = '#0088ff';
            if (this.type === 'breakable') color = '#ff8800';
            if (this.type === 'bouncy') color = '#ff00ff';
            if (this.type === 'spikes') color = '#ff0000';
            
            ctx.fillStyle = color;
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Add some detail
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
            
            // Add platform-specific visual details
            this.drawPlatformDetails(ctx);
            
            ctx.restore();
        } catch (error) {
            console.error('Error drawing platform:', error);
        }
    }

    drawPlatformDetails(ctx) {
        switch(this.type) {
            case 'breakable':
                // Draw cracks
                ctx.strokeStyle = '#880000';
                ctx.lineWidth = 1;
                for (let i = 0; i < 3; i++) {
                    const x = this.x + 10 + i * 20;
                    ctx.beginPath();
                    ctx.moveTo(x, this.y + 5);
                    ctx.lineTo(x + 5, this.y + this.height - 5);
                    ctx.stroke();
                }
                break;
            case 'bouncy':
                // Draw bounce arrows
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 3; i++) {
                    const x = this.x + 15 + i * 25;
                    ctx.fillRect(x, this.y + 5, 3, 10);
                    ctx.fillRect(x - 2, this.y + 3, 7, 3);
                }
                break;
            case 'spikes':
                // Draw spikes
                ctx.fillStyle = '#ff0000';
                for (let i = 0; i < 5; i++) {
                    const x = this.x + 10 + i * 15;
                    ctx.beginPath();
                    ctx.moveTo(x, this.y);
                    ctx.lineTo(x + 5, this.y - 10);
                    ctx.lineTo(x + 10, this.y);
                    ctx.closePath();
                    ctx.fill();
                }
                break;
        }
    }

    takeDamage() {
        if (this.type === 'breakable') {
            this.durability--;
            return this.durability <= 0;
        }
        return false;
    }

    // Handle player interaction with platform
    handlePlayerInteraction(player) {
        switch(this.type) {
            case 'bouncy':
                if (player && this.bounceForce) {
                    player.vy = -this.bounceForce;
                    player.onGround = false;
                }
                break;
            case 'spikes':
                if (player && this.spikeDamage) {
                    player.takeDamage(this.spikeDamage);
                }
                break;
            case 'breakable':
                // Breakable platforms take damage when player lands on them
                if (player && player.vy > 0) { // Player is falling
                    this.takeDamage();
                }
                break;
        }
    }

    // Check if platform should be removed (for breakable platforms)
    shouldRemove() {
        return this.type === 'breakable' && this.durability <= 0;
    }
}

// ===== ENEMY CLASS =====
class Enemy {
    constructor(x, y, type = 'basic') {
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG.ENEMY_WIDTH;
        this.height = GAME_CONFIG.ENEMY_HEIGHT;
        this.type = type;
        this.health = this.getHealthForType(type);
        this.damage = this.getDamageForType(type);
        this.animationFrame = 0;
        this.startX = x;
        this.startY = y;
        this.movePattern = this.getMovePattern(type);
        this.moveTimer = 0;
        this.attackCooldown = 0;
        
        // Initialize movement based on type
        this.initializeMovement();
    }

    getHealthForType(type) {
        switch(type) {
            case 'basic': return 1;
            case 'advanced': return 2;
            case 'flying': return 1;
            case 'bomber': return 3;
            case 'laser': return 1;
            default: return 1;
        }
    }

    getDamageForType(type) {
        switch(type) {
            case 'basic': return 20;
            case 'advanced': return 30;
            case 'flying': return 25;
            case 'bomber': return 40;
            case 'laser': return 35;
            default: return 20;
        }
    }

    getMovePattern(type) {
        switch(type) {
            case 'basic': return 'horizontal';
            case 'advanced': return 'patrol';
            case 'flying': return 'vertical';
            case 'bomber': return 'dive';
            case 'laser': return 'stationary';
            default: return 'horizontal';
        }
    }

    initializeMovement() {
        switch(this.type) {
            case 'basic':
                this.vx = -GAME_CONFIG.ENEMY_SPEED;
                this.vy = 0;
                break;
            case 'advanced':
                this.vx = -GAME_CONFIG.ENEMY_SPEED * 1.5;
                this.vy = 0;
                this.patrolRange = 100;
                this.patrolDirection = 1;
                break;
            case 'flying':
                this.vx = -GAME_CONFIG.ENEMY_SPEED * 0.8;
                this.vy = Math.sin(0) * 2;
                this.flyHeight = 50;
                break;
            case 'bomber':
                this.vx = -GAME_CONFIG.ENEMY_SPEED * 2;
                this.vy = 0;
                this.diveSpeed = 5;
                this.isDiving = false;
                break;
            case 'laser':
                this.vx = 0;
                this.vy = 0;
                this.laserCooldown = 0;
                this.laserTimer = 0;
                break;
        }
    }

    update(deltaTime) {
        this.moveTimer += deltaTime;
        this.attackCooldown -= deltaTime;
        this.animationFrame += deltaTime * 8;
        
        if (this.animationFrame > 4) {
            this.animationFrame = 0;
        }

        // Update movement based on type
        this.updateMovement(deltaTime);
        
        // Remove enemy if it goes too far left
        if (this.x < this.startX - 1000) {
            this.health = 0;
        }
    }

    updateMovement(deltaTime) {
        switch(this.type) {
            case 'basic':
                this.x += this.vx * deltaTime;
                break;
                
            case 'advanced':
                this.x += this.vx * deltaTime;
                // Patrol movement
                if (Math.abs(this.x - this.startX) > this.patrolRange) {
                    this.vx *= -1;
                }
                break;
                
            case 'flying':
                this.x += this.vx * deltaTime;
                this.vy = Math.sin(this.moveTimer * 2) * 2;
                this.y += this.vy * deltaTime;
                break;
                
            case 'bomber':
                this.x += this.vx * deltaTime;
                if (!this.isDiving && this.moveTimer > 2) {
                    this.isDiving = true;
                    this.vy = this.diveSpeed;
                }
                if (this.isDiving) {
                    this.y += this.vy * deltaTime;
                }
                break;
                
            case 'laser':
                this.laserCooldown -= deltaTime;
                if (this.laserCooldown <= 0) {
                    this.laserCooldown = 3; // Fire every 3 seconds
                    this.fireLaser();
                }
                break;
        }
    }

    fireLaser() {
        // Create a laser projectile
        if (window.game && window.game.particleSystem) {
            window.game.particleSystem.createLaser(this.x, this.y + this.height/2, -1);
        }
    }

    draw(ctx) {
        if (!ctx) return;
        
        try {
            ctx.save();
            
            // Enemy color and effects based on type
            const colors = this.getEnemyColors();
            ctx.fillStyle = colors.primary;
            ctx.shadowColor = colors.primary;
            ctx.shadowBlur = 15;
            
            // Draw enemy body
            if (this.type === 'laser') {
                this.drawLaserEnemy(ctx);
            } else if (this.type === 'flying') {
                this.drawFlyingEnemy(ctx);
            } else if (this.type === 'bomber') {
                this.drawBomberEnemy(ctx);
            } else {
                this.drawBasicEnemy(ctx);
            }
            
            // Health indicator for advanced enemies
            if (this.type === 'advanced' || this.type === 'bomber') {
                this.drawHealthBar(ctx);
            }
            
            ctx.restore();
        } catch (error) {
            console.error('Error drawing enemy:', error);
        }
    }

    getEnemyColors() {
        switch(this.type) {
            case 'basic': return { primary: '#ff0000', secondary: '#ff6666' };
            case 'advanced': return { primary: '#ff8800', secondary: '#ffaa44' };
            case 'flying': return { primary: '#ff00ff', secondary: '#ff66ff' };
            case 'bomber': return { primary: '#ff0000', secondary: '#880000' };
            case 'laser': return { primary: '#00ffff', secondary: '#66ffff' };
            default: return { primary: '#ff0000', secondary: '#ff6666' };
        }
    }

    drawBasicEnemy(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 5, this.y + 5, 4, 4);
        ctx.fillRect(this.x + this.width - 9, this.y + 5, 4, 4);
    }

    drawAdvancedEnemy(ctx) {
        // Main body
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Spikes
        ctx.fillStyle = '#ffaa44';
        for (let i = 0; i < 3; i++) {
            const spikeX = this.x + 5 + i * 7;
            ctx.fillRect(spikeX, this.y - 5, 3, 8);
        }
        
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 3, this.y + 3, 3, 3);
        ctx.fillRect(this.x + this.width - 6, this.y + 3, 3, 3);
    }

    drawFlyingEnemy(ctx) {
        // Wings
        ctx.fillStyle = '#ff66ff';
        ctx.fillRect(this.x - 8, this.y + 5, 8, 8);
        ctx.fillRect(this.x + this.width, this.y + 5, 8, 8);
        
        // Body
        ctx.fillStyle = '#ff00ff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 3, this.y + 3, 3, 3);
        ctx.fillRect(this.x + this.width - 6, this.y + 3, 3, 3);
    }

    drawBomberEnemy(ctx) {
        // Bomber body
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Bomber details
        ctx.fillStyle = '#880000';
        ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 3, this.y + 3, 3, 3);
        ctx.fillRect(this.x + this.width - 6, this.y + 3, 3, 3);
    }

    drawLaserEnemy(ctx) {
        // Laser base
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Laser cannon
        ctx.fillStyle = '#66ffff';
        ctx.fillRect(this.x - 10, this.y + this.height/2 - 2, 15, 4);
        
        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 3, this.y + 3, 3, 3);
        ctx.fillRect(this.x + this.width - 6, this.y + 3, 3, 3);
    }

    drawHealthBar(ctx) {
        const barWidth = this.width;
        const barHeight = 4;
        const barX = this.x;
        const barY = this.y - 8;
        
        // Background
        ctx.fillStyle = '#333333';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Health
        const healthPercent = this.health / this.getHealthForType(this.type);
        ctx.fillStyle = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffff00' : '#ff0000';
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    }

    takeDamage(amount) {
        this.health -= amount;
        return this.health <= 0;
    }

    isDead() {
        return this.health <= 0;
    }
}

// ===== CHECKPOINT CLASS =====
class Checkpoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = GAME_CONFIG.CHECKPOINT_WIDTH;
        this.height = GAME_CONFIG.CHECKPOINT_HEIGHT;
        this.collected = false;
        this.animationTime = 0;
    }

    update(deltaTime) {
        this.animationTime += deltaTime;
    }

    draw(ctx) {
        if (!ctx || this.collected) return;
        
        try {
            ctx.save();
            
            // Animated checkpoint
            const pulse = 1 + Math.sin(this.animationTime * 3) * 0.2;
            ctx.scale(pulse, pulse);
            
            ctx.fillStyle = '#ffff00';
            ctx.shadowColor = '#ffff00';
            ctx.shadowBlur = 20;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Checkpoint symbol
            ctx.fillStyle = '#000000';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('✓', this.x + this.width/2, this.y + this.height/2 + 7);
            
            ctx.restore();
        } catch (error) {
            console.error('Error drawing checkpoint:', error);
        }
    }

    collect() {
        if (!this.collected) {
            this.collected = true;
            return true;
        }
        return false;
    }
}

// Make all entity classes globally available
window.Player = Player;
window.Platform = Platform;
window.Enemy = Enemy;
window.Checkpoint = Checkpoint; 