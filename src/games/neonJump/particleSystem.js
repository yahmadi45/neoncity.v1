/**
 * NeonJump Particle System
 * Handles particle effects and visual enhancements
 */

// ===== PARTICLE CLASS =====
class Particle {
    constructor(x, y, vx, vy, life, color, size) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = life;
        this.maxLife = life;
        this.color = color;
        this.size = size;
        this.gravity = 0.1;
        this.friction = 0.98;
        this.rotation = 0;
        this.rotationSpeed = Utils.random(-0.1, 0.1);
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += this.gravity * deltaTime;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life -= deltaTime;
        this.rotation += this.rotationSpeed * deltaTime;
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw particle as a square for better performance
        const size = this.size * alpha;
        ctx.fillRect(-size/2, -size/2, size, size);
        
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// ===== PARTICLE SYSTEM CLASS =====
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle(particle) {
        if (this.particles.length < GAME_CONFIG.PARTICLE_LIMIT) {
            this.particles.push(particle);
        }
    }

    createExplosion(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = Utils.random(2, 8);
            const particle = new Particle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                Utils.random(0.5, 1.5),
                color,
                Utils.random(2, 6)
            );
            this.addParticle(particle);
        }
    }

    createTrail(x, y, vx, vy) {
        const particle = new Particle(
            x, y,
            vx * 0.1, vy * 0.1,
            Utils.random(0.3, 0.8),
            '#00ff00',
            Utils.random(1, 3)
        );
        this.addParticle(particle);
    }

    createSparkle(x, y) {
        const particle = new Particle(
            x, y,
            Utils.random(-1, 1),
            Utils.random(-2, -0.5),
            Utils.random(0.5, 1.0),
            '#ffff00',
            Utils.random(1, 2)
        );
        this.addParticle(particle);
    }

    createDust(x, y) {
        const particle = new Particle(
            x, y,
            Utils.random(-0.5, 0.5),
            Utils.random(-1, 0),
            Utils.random(0.2, 0.5),
            '#666666',
            Utils.random(1, 2)
        );
        this.addParticle(particle);
    }

    createLaser(x, y, direction) {
        // Create a laser projectile
        const laser = new LaserProjectile(x, y, direction);
        this.addParticle(laser);
    }

    update(deltaTime) {
        try {
            this.particles = this.particles.filter(particle => {
                particle.update(deltaTime);
                return !particle.isDead();
            });
        } catch (error) {
            console.error('Error updating particles:', error);
            this.particles = [];
        }
    }

    draw(ctx) {
        if (!ctx) return;
        
        try {
            this.particles.forEach(particle => particle.draw(ctx));
        } catch (error) {
            console.error('Error drawing particles:', error);
        }
    }

    clear() {
        this.particles = [];
    }

    getParticleCount() {
        return this.particles.length;
    }
}

// Make classes globally available
window.Particle = Particle;
window.ParticleSystem = ParticleSystem;

// LaserProjectile class
class LaserProjectile extends Particle {
    constructor(x, y, direction) {
        super(x, y, direction * 8, 0, 3.0, '#00ffff', 3);
        this.direction = direction;
        this.width = 20;
        this.height = 4;
        this.damage = 25;
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.life -= deltaTime;
        
        // Check if laser hits player
        if (window.game && window.game.player) {
            const player = window.game.player;
            if (this.x < player.x + player.width &&
                this.x + this.width > player.x &&
                this.y < player.y + player.height &&
                this.y + this.height > player.y) {
                
                if (player.takeDamage(this.damage)) {
                    if (window.game.audioManager) {
                        window.game.audioManager.playDamage();
                    }
                    if (window.game.camera) {
                        window.game.camera.screenShake(5, 0.3);
                    }
                    if (window.game.particleSystem) {
                        window.game.particleSystem.createExplosion(
                            this.x + this.width/2, 
                            this.y + this.height/2, 
                            10, 
                            '#00ffff'
                        );
                    }
                }
                this.life = 0; // Destroy laser
            }
        }
    }

    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        
        // Draw laser beam
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw laser glow
        ctx.globalAlpha = alpha * 0.3;
        ctx.fillRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
        
        ctx.restore();
    }
}

// Make LaserProjectile available globally
window.LaserProjectile = LaserProjectile; 