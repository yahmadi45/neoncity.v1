/**
 * NeonJump Camera System
 * Handles camera movement and viewport management
 */

// ===== CAMERA CLASS =====
class Camera {
    constructor(canvasWidth, canvasHeight) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.targetX = 0;
        this.targetY = 0;
        this.smoothing = 0.1;
        this.shake = 0;
        this.shakeIntensity = 0;
        this.shakeDecay = 0.9;
    }

    follow(target) {
        if (!target) return;
        
        try {
            // Center camera on target
            this.targetX = target.x - this.width / 2;
            this.targetY = target.y - this.height / 2;
            
            // Apply smoothing
            this.x += (this.targetX - this.x) * this.smoothing;
            this.y += (this.targetY - this.y) * this.smoothing;
            
            // Apply screen shake
            if (this.shake > 0) {
                this.x += (Math.random() - 0.5) * this.shakeIntensity;
                this.y += (Math.random() - 0.5) * this.shakeIntensity;
                this.shake *= this.shakeDecay;
                
                if (this.shake < 0.1) {
                    this.shake = 0;
                    this.shakeIntensity = 0;
                }
            }
        } catch (error) {
            console.error('Error in camera follow:', error);
        }
    }

    apply(ctx) {
        if (!ctx) return;
        
        try {
            ctx.save();
            ctx.translate(-this.x, -this.y);
        } catch (error) {
            console.error('Error applying camera transform:', error);
        }
    }

    restore(ctx) {
        if (!ctx) return;
        
        try {
            ctx.restore();
        } catch (error) {
            console.error('Error restoring camera transform:', error);
        }
    }

    screenShake(intensity, duration) {
        this.shake = duration;
        this.shakeIntensity = intensity;
    }

    worldToScreen(worldX, worldY) {
        return {
            x: worldX - this.x,
            y: worldY - this.y
        };
    }

    screenToWorld(screenX, screenY) {
        return {
            x: screenX + this.x,
            y: screenY + this.y
        };
    }

    isInView(entity) {
        if (!entity) return false;
        
        try {
            return entity.x + entity.width > this.x &&
                   entity.x < this.x + this.width &&
                   entity.y + entity.height > this.y &&
                   entity.y < this.y + this.height;
        } catch (error) {
            console.error('Error checking if entity is in view:', error);
            return false;
        }
    }
}

// Make Camera globally available
window.Camera = Camera; 