/**
 * NeonJump Utilities
 * Common utility functions used throughout the game
 */

// ===== UTILITY CLASS =====
class Utils {
    static random(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static distance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static angle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    static easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    static formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    static formatScore(score) {
        return score.toString().padStart(6, '0');
    }

    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    static createGradient(ctx, x0, y0, x1, y1, colorStops) {
        const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
        colorStops.forEach(stop => {
            gradient.addColorStop(stop.offset, stop.color);
        });
        return gradient;
    }

    static drawText(ctx, text, x, y, options = {}) {
        if (!ctx || !text) return;
        
        try {
            const {
                font = '20px Orbitron',
                color = '#00ff00',
                align = 'center',
                baseline = 'middle',
                shadow = true
            } = options;

            ctx.save();
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.textAlign = align;
            ctx.textBaseline = baseline;

            if (shadow) {
                ctx.shadowColor = color;
                ctx.shadowBlur = 10;
            }

            ctx.fillText(text, x, y);
            ctx.restore();
        } catch (error) {
            console.error('Error drawing text:', error);
        }
    }
}

// Make Utils globally available
window.Utils = Utils; 