/**
 * NeoCityOS Error Management System
 * 
 * A comprehensive error handling and management system for the NeoCityOS
 * cyberpunk-themed web operating system. This module provides centralized
 * error handling, logging, and user feedback mechanisms.
 * 
 * Features:
 * - Global error catching and handling
 * - User-friendly error messages
 * - Error logging and debugging
 * - Error boundary management
 * - Retry mechanisms
 * - Performance monitoring
 * 
 * @author NeoCityOS Development Team
 * @license MIT
 */

class ErrorManager {
    constructor() {
        this.errorCount = 0;
        this.maxErrors = 10;
        this.errorLog = [];
        this.isInitialized = false;
        this.errorBoundary = null;
        this.errorMessage = null;
        this.errorRetry = null;
        
        this.init();

        // --- AUTO-FIX: Prevent error boundary from blocking UI when not needed ---
        document.addEventListener('DOMContentLoaded', () => {
            const errorBoundary = document.getElementById('error-boundary');
            if (errorBoundary) {
                // Hide error boundary on any click outside it if not .error-active
                document.body.addEventListener('mousedown', (e) => {
                    if (
                        errorBoundary.classList.contains('error-active') &&
                        !errorBoundary.contains(e.target)
                    ) {
                        // Only hide if not user-interacted (i.e., not a real error)
                        if (!errorBoundary.classList.contains('user-interacted')) {
                            errorBoundary.hidden = true;
                            errorBoundary.classList.remove('error-active');
                        }
                    }
                });
                // MutationObserver to auto-hide if .error-active is removed
                const observer = new MutationObserver(() => {
                    if (!errorBoundary.classList.contains('error-active')) {
                        errorBoundary.hidden = true;
                    }
                });
                observer.observe(errorBoundary, { attributes: true, attributeFilter: ['class'] });
            }
        });
        // --- END AUTO-FIX ---
    }
    
    /**
     * Initialize the error management system
     */
    init() {
        try {
            // Set up global error handlers
            this.setupGlobalErrorHandlers();
            
            // Initialize error boundary elements
            this.initializeErrorBoundary();
            
            // Set up performance monitoring
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            console.log('ErrorManager initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize ErrorManager:', error);
            // Fallback to basic error handling
            this.setupBasicErrorHandling();
        }
    }
    
    /**
     * Set up global error handlers for unhandled exceptions
     */
    setupGlobalErrorHandlers() {
        // Global error handler for unhandled exceptions
        window.addEventListener('error', (event) => {
            this.handleError(event.error || new Error(event.message), 'Global Error');
        });
        
        // Global promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });
        
        // Console error interceptor for additional logging
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.logError('Console Error', args.join(' '));
            originalConsoleError.apply(console, args);
        };
    }
    
    /**
     * Initialize error boundary UI elements
     */
    initializeErrorBoundary() {
        this.errorBoundary = document.getElementById('error-boundary');
        this.errorMessage = document.getElementById('error-message');
        this.errorRetry = document.getElementById('error-retry');
        
        if (!this.errorBoundary) {
            this.createErrorBoundary();
        }
        
        // Set up retry functionality
        if (this.errorRetry) {
            this.errorRetry.addEventListener('click', () => {
                this.handleRetry();
            });
        }
    }
    
    /**
     * Create error boundary UI if it doesn't exist
     */
    createErrorBoundary() {
        const errorBoundary = document.createElement('div');
        errorBoundary.id = 'error-boundary';
        errorBoundary.className = 'error-boundary';
        errorBoundary.hidden = true;
        
        errorBoundary.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <h2>System Error</h2>
                <p id="error-message">An unexpected error occurred.</p>
                <div class="error-actions">
                    <button id="error-retry" class="error-btn retry-btn">Retry</button>
                    <button id="error-close" class="error-btn close-btn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(errorBoundary);
        
        this.errorBoundary = errorBoundary;
        this.errorMessage = document.getElementById('error-message');
        this.errorRetry = document.getElementById('error-retry');
        
        // Set up event listeners
        this.errorRetry.addEventListener('click', () => this.handleRetry());
        document.getElementById('error-close').addEventListener('click', () => this.hideError());
    }
    
    /**
     * Handle errors with appropriate user feedback
     * 
     * @param {Error} error - The error object
     * @param {string} context - Context where the error occurred
     */
    handleError(error, context = 'Unknown') {
        try {
            this.errorCount++;
            
            // Log the error
            this.logError(context, error.message || error, error.stack);
            
            // Check if we've exceeded max errors
            if (this.errorCount > this.maxErrors) {
                this.showSystemError('Too many errors occurred. Please refresh the page.');
                return;
            }
            
            // Determine error severity and appropriate response
            const severity = this.assessErrorSeverity(error, context);
            
            switch (severity) {
                case 'critical':
                    this.showSystemError('A critical system error occurred. Please refresh the page.');
                    break;
                case 'high':
                    this.showSystemError('A system error occurred. Please try again.');
                    break;
                case 'medium':
                    this.showUserError('An error occurred. Please try again.');
                    break;
                case 'low':
                    // Just log, don't show to user
                    console.warn('Minor error occurred:', error.message);
                    break;
            }
            
        } catch (errorHandlerError) {
            console.error('Error in error handler:', errorHandlerError);
            // Ultimate fallback
            alert('A system error occurred. Please refresh the page.');
        }
    }
    
    /**
     * Assess error severity based on context and type
     * 
     * @param {Error} error - The error object
     * @param {string} context - Context where the error occurred
     * @returns {string} Severity level: 'critical', 'high', 'medium', 'low'
     */
    assessErrorSeverity(error, context) {
        const criticalPatterns = [
            'appManager',
            'showDesktop',
            'verifyUserCredentials',
            'createNewUser',
            'showTerminal'
        ];
        
        const highPatterns = [
            'login',
            'authentication',
            'session',
            'initialization'
        ];
        
        const lowPatterns = [
            'animation',
            'sound',
            'proximity',
            'visual'
        ];
        
        const errorMessage = error.message || error.toString();
        const errorStack = error.stack || '';
        const fullError = `${errorMessage} ${errorStack}`.toLowerCase();
        
        // Check for critical patterns
        if (criticalPatterns.some(pattern => 
            fullError.includes(pattern.toLowerCase()) || 
            context.toLowerCase().includes(pattern.toLowerCase())
        )) {
            return 'critical';
        }
        
        // Check for high severity patterns
        if (highPatterns.some(pattern => 
            fullError.includes(pattern.toLowerCase()) || 
            context.toLowerCase().includes(pattern.toLowerCase())
        )) {
            return 'high';
        }
        
        // Check for low severity patterns
        if (lowPatterns.some(pattern => 
            fullError.includes(pattern.toLowerCase()) || 
            context.toLowerCase().includes(pattern.toLowerCase())
        )) {
            return 'low';
        }
        
        // Default to medium severity
        return 'medium';
    }
    
    /**
     * Log error for debugging purposes
     * 
     * @param {string} context - Context where the error occurred
     * @param {string} message - Error message
     * @param {string} stack - Error stack trace
     */
    logError(context, message, stack = '') {
        const errorEntry = {
            timestamp: new Date().toISOString(),
            context: context,
            message: message,
            stack: stack,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errorLog.push(errorEntry);
        
        // Keep only last 50 errors
        if (this.errorLog.length > 50) {
            this.errorLog.shift();
        }
        
        // Log to console for debugging
        console.group(`Error in ${context}`);
        console.error('Message:', message);
        if (stack) console.error('Stack:', stack);
        console.groupEnd();
    }
    
    /**
     * Show system-level error to user
     * 
     * @param {string} message - Error message to display
     */
    showSystemError(message) {
        if (!this.errorBoundary || !this.errorMessage) {
            // Fallback to alert if error boundary not available
            alert(message);
            return;
        }
        
        this.errorMessage.textContent = message;
        this.errorBoundary.hidden = false;
        
        // Add cyberpunk styling
        this.errorBoundary.classList.add('error-active');
        
        // Auto-hide after 10 seconds if user doesn't interact
        setTimeout(() => {
            if (!this.errorBoundary.classList.contains('user-interacted')) {
                this.hideError();
            }
        }, 10000);
    }
    
    /**
     * Show user-level error (less intrusive)
     * 
     * @param {string} message - Error message to display
     */
    showUserError(message) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'user-error-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    /**
     * Show login-specific error
     * 
     * @param {string} message - Error message to display
     */
    showLoginError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'login-error';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'assertive');
        errorDiv.textContent = message;
        
        // Insert error message after the login form
        const form = document.getElementById("login-form");
        if (form && form.parentNode) {
            form.parentNode.insertBefore(errorDiv, form.nextSibling);
            
            // Auto-remove error message after 5 seconds
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.remove();
                }
            }, 5000);
        }
    }
    
    /**
     * Hide error boundary
     */
    hideError() {
        if (this.errorBoundary) {
            this.errorBoundary.hidden = true;
            this.errorBoundary.classList.remove('error-active', 'user-interacted');
        }
    }
    
    /**
     * Handle retry action
     */
    handleRetry() {
        this.errorBoundary.classList.add('user-interacted');
        this.hideError();
        
        // Reload the page
        window.location.reload();
    }
    
    /**
     * Set up performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor for performance issues
        if ('performance' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 1000) { // 1 second threshold
                        this.logError('Performance', `Slow operation: ${entry.name} took ${entry.duration}ms`);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (error) {
                console.warn('Performance monitoring not supported');
            }
        }
    }
    
    /**
     * Set up basic error handling as fallback
     */
    setupBasicErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('Basic error handling:', event.error);
            alert('An error occurred. Please refresh the page.');
        });
    }
    
    /**
     * Get error statistics
     * 
     * @returns {Object} Error statistics
     */
    getErrorStats() {
        return {
            totalErrors: this.errorCount,
            errorLog: this.errorLog,
            isInitialized: this.isInitialized
        };
    }
    
    /**
     * Clear error log
     */
    clearErrorLog() {
        this.errorLog = [];
        this.errorCount = 0;
    }
}

// Create global error manager instance
window.errorManager = new ErrorManager();

// Export for module systems (if available)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorManager;
} 