/**
 * NeoCityOS Audio Manager
 * 
 * This module provides centralized audio management for the entire NeoCityOS system.
 * It handles both pre-recorded sound effects and procedurally generated audio using
 * the Web Audio API for an enhanced cyberpunk user experience.
 * 
 * Key Features:
 * - Pre-recorded sound effects for UI interactions
 * - Procedurally generated electronic sounds for terminal
 * - Volume control and audio state management
 * - Cross-browser compatibility with Web Audio API
 * - Fallback handling for unsupported audio features
 * 
 * Audio Types:
 * 1. Pre-recorded Sounds:
 *    - click: UI interaction feedback
 *    - login: Successful authentication
 *    - error: Error notification
 * 
 * 2. Procedurally Generated Sounds:
 *    - Electronic beep: Terminal feedback
 *    - Keyboard sound: Typing simulation
 * 
 * Technical Implementation:
 * - Uses Web Audio API for real-time audio synthesis
 * - Implements oscillator-based sound generation
 * - Provides gain control for volume management
 * - Supports both sine and triangle waveforms
 * 
 * Browser Compatibility:
 * - Modern browsers with Web Audio API support
 * - Graceful degradation for unsupported features
 * - Cross-browser AudioContext initialization
 * 
 * @author NeoCityOS Development Team
 * @version 1.0.0
 */

/**
 * Audio Manager Class
 * 
 * Main class responsible for managing all audio functionality in the system.
 * Handles sound loading, playback, generation, and state management.
 */
class AudioManager {
    /**
     * Constructor - Initialize Audio Manager
     * 
     * Sets up the audio system with the following components:
     * - Sound enabled/disabled state
     * - Web Audio API context
     * - Pre-loaded sound effects
     */
    constructor() {
        // Global sound enabled/disabled flag
        this.soundEnabled = true;
        
        // Web Audio API context for procedural sound generation
        this.audioContext = null;
        
        // Initialize Web Audio API context
        this.initAudioContext();
        
        // Load pre-recorded sound effects
        this.sounds = this.loadSounds();
    }

    /**
     * Initialize Audio Context Method
     * 
     * Sets up the Web Audio API context with cross-browser compatibility.
     * This context is required for procedural sound generation.
     * 
     * Algorithm:
     * 1. Try to create AudioContext with standard API
     * 2. Fall back to webkitAudioContext for older browsers
     * 3. Handle errors gracefully if AudioContext is not supported
     */
    initAudioContext() {
        try {
            // Create AudioContext with cross-browser compatibility
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('AudioContext not supported:', error);
        }
    }

    /**
     * Load Sounds Method
     * 
     * Loads pre-recorded sound effects from external URLs.
     * These sounds provide immediate feedback for user interactions.
     * 
     * Sound Sources:
     * - Mixkit: High-quality, royalty-free sound effects
     * - Optimized for web delivery
     * - Low latency for responsive feedback
     * 
     * @returns {Object} - Object containing Audio objects for each sound type
     */
    loadSounds() {
        return {
            // Click sound for UI interactions (button clicks, selections)
            click: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'),
            
            // Login sound for successful authentication
            login: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
            
            // Error sound for failed operations or notifications
            error: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
            // Power-up sounds
            powerup_shield: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-bonus-alert-767.mp3'),
            powerup_speed: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-fast-game-over-233.mp3'),
            powerup_life: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-extra-bonus-2054.mp3'),
            // Switch sound
            switch: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3')
        };
    }

    /**
     * Play Sound Method
     * 
     * Plays a pre-recorded sound effect with volume control and error handling.
     * 
     * Algorithm:
     * 1. Check if sound is enabled globally
     * 2. Verify sound type exists in loaded sounds
     * 3. Set volume to 30% for comfortable listening
     * 4. Play sound with error handling
     * 
     * @param {string} type - The type of sound to play ('click', 'login', 'error')
     */
    playSound(type) {
        // Check global sound enabled state
        if (!this.soundEnabled) return;
        
        // Verify sound type exists and play with error handling
        if (this.sounds[type]) {
            this.sounds[type].volume = 0.3; // Set volume to 30%
            this.sounds[type].play().catch(e => {
                // Only log if it's not a user interaction error (which is expected)
                if (e.name !== 'NotAllowedError') {
                    console.log('Audio play failed:', e);
                }
            });
        }
    }

    /**
     * Create Electronic Beep Sound Method
     * 
     * Generates a cyberpunk-style electronic beep sound using Web Audio API.
     * This sound is used for terminal feedback and system notifications.
     * 
     * Sound Characteristics:
     * - Dual oscillator design (sine + triangle waves)
     * - Frequency: 800Hz (sine) + 1200Hz (triangle)
     * - Duration: 120ms
     * - Volume envelope with attack and decay
     * 
     * Algorithm:
     * 1. Create two oscillators with different waveforms
     * 2. Create gain node for volume control
     * 3. Configure frequency and waveform types
     * 4. Set up volume envelope (attack, sustain, decay)
     * 5. Connect oscillators to gain node
     * 6. Connect gain node to audio output
     * 7. Start and stop oscillators with timing
     */
    createElectronicBeepSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        try {
            // Create oscillators for dual-tone sound
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Configure first oscillator (sine wave, 800Hz)
            osc1.frequency.setValueAtTime(800, this.audioContext.currentTime);
            osc1.type = 'sine';
            
            // Configure second oscillator (triangle wave, 1200Hz)
            osc2.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            osc2.type = 'triangle';
            
            // Configure volume envelope for natural sound
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime); // Start silent
            gainNode.gain.linearRampToValueAtTime(0.25, this.audioContext.currentTime + 0.01); // Quick attack
            gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime + 0.05); // Sustain
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12); // Decay
            
            // Connect oscillators to gain node
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Start and stop oscillators with precise timing
            osc1.start(this.audioContext.currentTime);
            osc2.start(this.audioContext.currentTime);
            osc1.stop(this.audioContext.currentTime + 0.12);
            osc2.stop(this.audioContext.currentTime + 0.12);
        } catch (error) {
            console.log('Error creating beep sound:', error);
        }
    }

    /**
     * Create Keyboard Sound Method
     * 
     * Generates a mechanical keyboard sound for terminal typing simulation.
     * Similar to electronic beep but with different volume characteristics.
     * 
     * Sound Characteristics:
     * - Same dual oscillator design as beep sound
     * - Lower volume (20% vs 25%) for subtlety
     * - Same frequency and duration as beep
     * - Used specifically for keyboard feedback
     * 
     * Algorithm:
     * 1. Create two oscillators with different waveforms
     * 2. Create gain node for volume control
     * 3. Configure frequency and waveform types
     * 4. Set up volume envelope with lower peak volume
     * 5. Connect and play with timing
     */
    createKeyboardSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        try {
            // Create oscillators for dual-tone sound
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Configure first oscillator (sine wave, 800Hz)
            osc1.frequency.setValueAtTime(800, this.audioContext.currentTime);
            osc1.type = 'sine';
            
            // Configure second oscillator (triangle wave, 1200Hz)
            osc2.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            osc2.type = 'triangle';
            
            // Configure volume envelope with lower peak volume for subtlety
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.01);
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12);
            
            // Connect oscillators to gain node
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Start and stop oscillators with precise timing
            osc1.start(this.audioContext.currentTime);
            osc2.start(this.audioContext.currentTime);
            osc1.stop(this.audioContext.currentTime + 0.12);
            osc2.stop(this.audioContext.currentTime + 0.12);
        } catch (error) {
            console.log('Error creating keyboard sound:', error);
        }
    }

    /**
     * Toggle Sound Method
     * 
     * Toggles the global sound enabled/disabled state.
     * 
     * @returns {boolean} - New sound enabled state
     */
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    /**
     * Set Sound Enabled Method
     * 
     * Sets the global sound enabled/disabled state explicitly.
     * 
     * @param {boolean} enabled - Whether sound should be enabled or disabled
     */
    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }

    /**
     * Is Sound Enabled Method
     * 
     * Returns the current global sound enabled/disabled state.
     * 
     * @returns {boolean} - Current sound enabled state
     */
    isSoundEnabled() {
        return this.soundEnabled;
    }

    /**
     * Set Volume Method
     * 
     * Sets the volume for all pre-recorded sounds.
     * Volume is clamped between 0 (muted) and 1 (full volume).
     * 
     * @param {number} volume - Volume level between 0 and 1
     */
    setVolume(volume) {
        // Set volume for all loaded sounds with bounds checking
        Object.values(this.sounds).forEach(sound => {
            sound.volume = Math.max(0, Math.min(1, volume));
        });
    }
}

// Global instance of the audio manager
const audioManager = new AudioManager();

/**
 * Compatibility Functions
 * 
 * These functions provide backward compatibility with existing code
 * that calls audio functions directly. They delegate to the audio manager instance.
 */

/**
 * Play Sound Compatibility Function
 * 
 * @param {string} type - The type of sound to play
 */
function playSound(type) {
    audioManager.playSound(type);
}

/**
 * Create Electronic Beep Sound Compatibility Function
 */
function createElectronicBeepSound() {
    audioManager.createElectronicBeepSound();
}

/**
 * Create Keyboard Sound Compatibility Function
 */
function createKeyboardSound() {
    audioManager.createKeyboardSound();
} 