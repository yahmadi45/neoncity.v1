/**
 * NeonJump Audio Manager
 * Handles all audio playback and sound effects
 */

// ===== AUDIO MANAGER CLASS =====
class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.music = null;
        this.volume = 0.7;
        this.enabled = GAME_CONFIG.AUDIO_ENABLED;
        this.init();
    }

    init() {
        if (!this.enabled) return;
        
        // Create audio context
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Audio context not supported');
            this.enabled = false;
        }
    }

    async loadSound(name, frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            console.warn('Failed to play sound:', name, error);
        }
    }

    playJump() {
        this.loadSound('jump', 400, 0.2, 'square');
    }

    playCollect() {
        this.loadSound('collect', 800, 0.3, 'sine');
    }

    playDamage() {
        this.loadSound('damage', 200, 0.4, 'sawtooth');
    }

    playVictory() {
        this.loadSound('victory', 600, 0.5, 'triangle');
    }

    playExplosion() {
        this.loadSound('explosion', 150, 0.6, 'sawtooth');
    }

    playPowerUp() {
        this.loadSound('powerup', 1000, 0.4, 'triangle');
    }

    setVolume(volume) {
        this.volume = Utils.clamp(volume, 0, 1);
    }

    toggleAudio() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.audioContext) {
            this.audioContext.suspend();
        } else if (this.enabled && this.audioContext) {
            this.audioContext.resume();
        }
    }

    resumeAudio() {
        try {
            if (this.enabled && this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        } catch (error) {
            console.warn('Failed to resume audio:', error);
        }
    }
}

// Make AudioManager globally available
window.AudioManager = AudioManager; 