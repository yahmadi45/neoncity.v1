/**
 * NeoCityOS Animation Manager
 * 
 * This module provides centralized management for all animations in the NeoCityOS system.
 * It handles desktop animations, window transitions, and visual effects to create
 * a professional cyberpunk user experience.
 * 
 * Key Features:
 * - Desktop particle animations
 * - Window transition effects
 * - Neon visual effects
 * - Performance-optimized animations
 * - Error handling and cleanup
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 * @license MIT
 */

/**
 * Animation Manager Class
 * 
 * Main class responsible for managing all animations and visual effects
 * in the NeoCityOS system.
 */
class AnimationManager {
    /**
     * Constructor - Initialize Animation Manager
     * 
     * Sets up the core properties for animation management:
     * - Animation intervals tracking
     * - Active state management
     * - Performance monitoring
     */
    constructor() {
        this.animationIntervals = [];
        this.isActive = false;
        this.particleCount = 0;
        this.maxParticles = 50; // Performance limit
        this.animationFrame = null;
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
    }

    /**
     * Start Desktop Animations
     * 
     * Initializes and starts all desktop animations including:
     * - Light particles
     * - Neon effects
     * - Data particles
     * - Performance monitoring
     */
    startDesktopAnimations() {
        try {
            if (this.isActive) {
                console.log('Desktop animations already active');
                return;
            }

            this.isActive = true;
            console.log('Starting desktop animations...');

            // Light particle animation
            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.15 && this.particleCount < this.maxParticles) {
                        this.createLightParticle();
                    }
                }, 6000)
            );

            // Neon effect animation
            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.1 && this.particleCount < this.maxParticles) {
                        this.createModernNeonEffect();
                    }
                }, 8000)
            );

            // Data particle animation
            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.2 && this.particleCount < this.maxParticles) {
                        this.createDataParticle();
                    }
                }, 5000)
            );

            // Performance monitoring
            this.startPerformanceMonitoring();

            console.log('Desktop animations started successfully');

        } catch (error) {
            console.error('Error starting desktop animations:', error);
            this.stopAnimations();
        }
    }

    /**
     * Stop All Animations
     * 
     * Cleans up all running animations and resets the manager state.
     */
    stopAnimations() {
        try {
            this.isActive = false;
            
            // Clear all intervals
            this.animationIntervals.forEach(interval => {
                if (interval) {
                    clearInterval(interval);
                }
            });
            this.animationIntervals = [];

            // Cancel animation frame
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }

            // Remove all particles
            this.removeAllParticles();

            console.log('All animations stopped');

        } catch (error) {
            console.error('Error stopping animations:', error);
        }
    }

    /**
     * Create Light Particle
     * 
     * Creates a subtle light particle effect for ambient atmosphere.
     */
    createLightParticle() {
        try {
            const particle = document.createElement('div');
            particle.className = 'light-particle';
            particle.setAttribute('aria-hidden', 'true');
            
            // Random positioning and sizing
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${2 + Math.random() * 4}px`;
            particle.style.height = `${2 + Math.random() * 4}px`;
            
            const desktop = document.getElementById('desktop-section');
            if (desktop) {
                desktop.appendChild(particle);
                this.particleCount++;
                
                // Auto-remove after animation duration
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                        this.particleCount = Math.max(0, this.particleCount - 1);
                    }
                }, 8000);
            }

        } catch (error) {
            console.error('Error creating light particle:', error);
        }
    }

    /**
     * Create Modern Neon Effect
     * 
     * Creates a modern neon glow effect for cyberpunk aesthetics.
     */
    createModernNeonEffect() {
        try {
            const neonEffect = document.createElement('div');
            neonEffect.className = 'neon-effect';
            neonEffect.setAttribute('aria-hidden', 'true');
            
            // Random positioning and sizing
            neonEffect.style.top = `${Math.random() * 100}%`;
            neonEffect.style.left = `${Math.random() * 100}%`;
            neonEffect.style.width = `${80 + Math.random() * 120}px`;
            neonEffect.style.height = `${80 + Math.random() * 120}px`;
            
            const desktop = document.getElementById('desktop-section');
            if (desktop) {
                desktop.appendChild(neonEffect);
                this.particleCount++;
                
                // Auto-remove after animation duration
                setTimeout(() => {
                    if (neonEffect.parentNode) {
                        neonEffect.remove();
                        this.particleCount = Math.max(0, this.particleCount - 1);
                    }
                }, 6000);
            }

        } catch (error) {
            console.error('Error creating neon effect:', error);
        }
    }

    /**
     * Create Data Particle
     * 
     * Creates a data particle with random characters for matrix-like effects.
     */
    createDataParticle() {
        try {
            const dataParticle = document.createElement('div');
            dataParticle.className = 'data-particle';
            dataParticle.setAttribute('aria-hidden', 'true');
            
            // Random data characters
            const dataChars = ['1', '0', '•', '◦', '▪', '▫', '█', '░', '▒', '▓'];
            const randomChar = dataChars[Math.floor(Math.random() * dataChars.length)];
            
            dataParticle.style.top = `${Math.random() * 100}%`;
            dataParticle.style.left = `${Math.random() * 100}%`;
            dataParticle.style.fontSize = `${10 + Math.random() * 6}px`;
            dataParticle.textContent = randomChar;
            
            const desktop = document.getElementById('desktop-section');
            if (desktop) {
                desktop.appendChild(dataParticle);
                this.particleCount++;
                
                // Auto-remove after animation duration
                setTimeout(() => {
                    if (dataParticle.parentNode) {
                        dataParticle.remove();
                        this.particleCount = Math.max(0, this.particleCount - 1);
                    }
                }, 5000);
            }

        } catch (error) {
            console.error('Error creating data particle:', error);
        }
    }

    /**
     * Remove All Particles
     * 
     * Cleans up all active particles from the desktop.
     */
    removeAllParticles() {
        try {
            const particles = document.querySelectorAll('.light-particle, .neon-effect, .data-particle');
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.remove();
                }
            });
            this.particleCount = 0;

        } catch (error) {
            console.error('Error removing particles:', error);
        }
    }

    /**
     * Start Performance Monitoring
     * 
     * Monitors animation performance and adjusts settings accordingly.
     */
    startPerformanceMonitoring() {
        try {
            const monitorPerformance = (currentTime) => {
                if (!this.isActive) return;

                if (currentTime - this.lastFrameTime >= this.frameInterval) {
                    // Check performance and adjust if needed
                    if (this.particleCount > this.maxParticles * 0.8) {
                        console.warn('High particle count detected, reducing animation frequency');
                        this.adjustAnimationFrequency(0.5);
                    }

                    this.lastFrameTime = currentTime;
                }

                this.animationFrame = requestAnimationFrame(monitorPerformance);
            };

            this.animationFrame = requestAnimationFrame(monitorPerformance);

        } catch (error) {
            console.error('Error starting performance monitoring:', error);
        }
    }

    /**
     * Adjust Animation Frequency
     * 
     * Dynamically adjusts animation frequency based on performance.
     * 
     * @param {number} factor - Factor to adjust frequency by (0-1)
     */
    adjustAnimationFrequency(factor) {
        try {
            // Clear existing intervals
            this.animationIntervals.forEach(interval => {
                if (interval) {
                    clearInterval(interval);
                }
            });
            this.animationIntervals = [];

            // Restart with adjusted frequencies
            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.15 * factor && this.particleCount < this.maxParticles) {
                        this.createLightParticle();
                    }
                }, 6000 / factor)
            );

            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.1 * factor && this.particleCount < this.maxParticles) {
                        this.createModernNeonEffect();
                    }
                }, 8000 / factor)
            );

            this.animationIntervals.push(
                setInterval(() => {
                    if (Math.random() < 0.2 * factor && this.particleCount < this.maxParticles) {
                        this.createDataParticle();
                    }
                }, 5000 / factor)
            );

        } catch (error) {
            console.error('Error adjusting animation frequency:', error);
        }
    }

    /**
     * Fade In Window
     * 
     * Creates a smooth fade-in animation for application windows.
     * 
     * @param {HTMLElement} element - The element to animate
     * @param {number} duration - Animation duration in milliseconds
     */
    fadeInWindow(element, duration = 300) {
        try {
            if (!element) return;

            element.style.opacity = '0';
            element.style.transform = 'translate(-50%, -50%) scale(0.8)';
            element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
            
            // Force reflow
            element.offsetHeight;
            
            element.style.opacity = '1';
            element.style.transform = 'translate(-50%, -50%) scale(1)';

        } catch (error) {
            console.error('Error in fadeInWindow:', error);
        }
    }

    /**
     * Fade Out Window
     * 
     * Creates a smooth fade-out animation for application windows.
     * 
     * @param {HTMLElement} element - The element to animate
     * @param {number} duration - Animation duration in milliseconds
     * @returns {Promise} Promise that resolves when animation completes
     */
    fadeOutWindow(element, duration = 300) {
        return new Promise((resolve) => {
            try {
                if (!element) {
                    resolve();
                    return;
                }

                element.style.opacity = '0';
                element.style.transform = 'translate(-50%, -50%) scale(0.8)';
                element.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
                
                setTimeout(() => {
                    resolve();
                }, duration);

            } catch (error) {
                console.error('Error in fadeOutWindow:', error);
                resolve();
            }
        });
    }

    /**
     * Shake Element
     * 
     * Creates a shake animation for error feedback.
     * 
     * @param {HTMLElement} element - The element to shake
     */
    shakeElement(element) {
        try {
            if (!element) return;

            element.style.animation = 'shake 0.5s ease-in-out';
            
            setTimeout(() => {
                element.style.animation = '';
            }, 500);

        } catch (error) {
            console.error('Error in shakeElement:', error);
        }
    }

    /**
     * Get Animation Statistics
     * 
     * Returns current animation statistics for monitoring.
     * 
     * @returns {Object} Animation statistics
     */
    getAnimationStats() {
        return {
            isActive: this.isActive,
            particleCount: this.particleCount,
            maxParticles: this.maxParticles,
            activeIntervals: this.animationIntervals.length,
            targetFPS: this.targetFPS
        };
    }
}

// Global animation manager instance
const animationManager = new AnimationManager();

/**
 * Create Animation
 * 
 * Compatibility function for starting desktop animations.
 * This maintains backward compatibility with existing code.
 */
function createProfessionalAnimation() {
    try {
        animationManager.startDesktopAnimations();
    } catch (error) {
        console.error('Error creating animation:', error);
    }
}

/**
 * Add Styles
 * 
 * Compatibility function for adding animation styles.
 * Styles are now handled by external CSS files.
 */
function addProfessionalStyles() {
    // Styles are now in external CSS file (css/animations.css)
    console.log('Animation styles are loaded from external CSS file');
}

// Export for global access
window.animationManager = animationManager;
window.createProfessionalAnimation = createProfessionalAnimation;
window.addProfessionalStyles = addProfessionalStyles; 