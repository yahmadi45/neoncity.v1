/**
 * NeoBrowser - Advanced Web Browser for NeoCityOS
 * 
 * A feature-rich web browser with modern UI, enhanced navigation,
 * bookmarks, search suggestions, and security features.
 * 
 * @author NeoCityOS Development Team
 * @version 3.0.0
 * @license MIT
 */

class NeoBrowser {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.bookmarks = this.loadBookmarks();
        this.searchSuggestions = [];
        this.isLoading = false;
        this.currentURL = '';
        this.settings = this.loadSettings();
        
        this.init();
    }

    /**
     * Initialize the browser
     */
    init() {
        console.log('Initializing NeoBrowser...');
        this.bindElements();
        this.bindEvents();
        this.setupSearchSuggestions();
        this.loadWelcomePage();
        this.updateNavigationButtons();
        this.renderBookmarks();
        
        console.log('NeoBrowser initialized successfully');
        console.log('Elements bound:', this.elements);
    }

    /**
     * Bind DOM elements
     */
    bindElements() {
        this.elements = {
            addressBar: document.getElementById('browser-address-bar'),
            goBtn: document.getElementById('browser-go-btn'),
            iframe: document.getElementById('browser-iframe'),
            loading: document.getElementById('browser-loading'),
            errorPage: document.getElementById('browser-error'),
            welcome: document.getElementById('browser-welcome'),
            backBtn: document.getElementById('browser-back-btn'),
            forwardBtn: document.getElementById('browser-forward-btn'),
            refreshBtn: document.getElementById('browser-refresh-btn'),
            bookmarksContainer: document.getElementById('browser-bookmarks'),
            suggestionsContainer: document.getElementById('search-suggestions'),
            securityIndicator: document.getElementById('security-indicator'),
            progressBar: document.getElementById('progress-bar')
        };
        
        console.log('Binding elements:', {
            addressBar: !!this.elements.addressBar,
            goBtn: !!this.elements.goBtn,
            iframe: !!this.elements.iframe,
            welcome: !!this.elements.welcome
        });
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Address bar events
        if (this.elements.addressBar) {
            this.elements.addressBar.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.navigate();
            });
            
            this.elements.addressBar.addEventListener('input', (e) => {
                this.handleAddressBarInput(e.target.value);
            });
            
            this.elements.addressBar.addEventListener('focus', () => {
                this.showSearchSuggestions();
            });
        }

        // Navigation buttons
        if (this.elements.goBtn) {
            console.log('Binding click event to go button');
            this.elements.goBtn.addEventListener('click', () => {
                console.log('Go button clicked!');
                this.navigate();
            });
        } else {
            console.log('Go button not found!');
        }
        
        if (this.elements.backBtn) {
            this.elements.backBtn.addEventListener('click', () => this.goBack());
        }
        
        if (this.elements.forwardBtn) {
            this.elements.forwardBtn.addEventListener('click', () => this.goForward());
        }
        
        if (this.elements.refreshBtn) {
            this.elements.refreshBtn.addEventListener('click', () => this.refresh());
        }

        // Iframe events
        if (this.elements.iframe) {
            this.elements.iframe.addEventListener('load', () => this.handlePageLoad());
            this.elements.iframe.addEventListener('error', () => this.handlePageError());
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'r':
                        e.preventDefault();
                        this.refresh();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.elements.addressBar?.focus();
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.goBack();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.goForward();
                        break;
                }
            }
        });
    }

    /**
     * Handle address bar input for search suggestions
     */
    handleAddressBarInput(value) {
        if (value.length > 2) {
            this.updateSearchSuggestions(value);
        } else {
            this.hideSearchSuggestions();
        }
    }

    /**
     * Setup search suggestions
     */
    setupSearchSuggestions() {
        this.searchSuggestions = [
            'google.com',
            'github.com',
            'stackoverflow.com',
            'wikipedia.org',
            'youtube.com',
            'reddit.com',
            'twitter.com',
            'linkedin.com',
            'medium.com',
            'dev.to'
        ];
    }

    /**
     * Update search suggestions based on input
     */
    updateSearchSuggestions(query) {
        if (!this.elements.suggestionsContainer) return;
        
        const filtered = this.searchSuggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query.toLowerCase())
        );
        
        this.elements.suggestionsContainer.innerHTML = '';
        
        filtered.slice(0, 5).forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                this.elements.addressBar.value = suggestion;
                this.navigate();
                this.hideSearchSuggestions();
            });
            this.elements.suggestionsContainer.appendChild(item);
        });
        
        this.showSearchSuggestions();
    }

    /**
     * Show search suggestions
     */
    showSearchSuggestions() {
        if (this.elements.suggestionsContainer) {
            this.elements.suggestionsContainer.style.display = 'block';
        }
    }

    /**
     * Hide search suggestions
     */
    hideSearchSuggestions() {
        if (this.elements.suggestionsContainer) {
            this.elements.suggestionsContainer.style.display = 'none';
        }
    }

    /**
     * Navigate to URL or search
     */
    navigate() {
        console.log('Navigate called');
        const url = this.elements.addressBar?.value?.trim();
        console.log('URL from address bar:', url);
        
        if (!url) {
            console.log('No URL provided');
            return;
        }

        let finalURL = this.parseURL(url);
        console.log('Parsed URL:', finalURL);
        
        if (this.isValidURL(finalURL)) {
            console.log('Loading URL:', finalURL);
            this.loadURL(finalURL);
        } else {
            console.error('Invalid URL:', finalURL);
            this.showError('Invalid URL format');
        }
    }

    /**
     * Parse and validate URL
     */
    parseURL(input) {
        // If it looks like a URL, use it directly
        if (/^https?:\/\//i.test(input)) {
            return input;
        }
        
        // If it has a domain-like structure, add https://
        if (/\./.test(input) && !input.includes(' ')) {
            return 'https://' + input;
        }
        
        // Treat as search query
        return `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
    }

    /**
     * Validate URL format
     */
    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Load URL in iframe
     */
    loadURL(url, addToHistory = true) {
        if (!this.elements.iframe) return;

        this.isLoading = true;
        this.currentURL = url;
        
        this.showLoading(true);
        this.showError(false);
        this.showWelcome(false);
        this.showIframe(true);
        
        // Update progress bar
        this.updateProgress(10);
        
        // Add to history
        if (addToHistory) {
            this.addToHistory(url);
        }
        
        // Update address bar
        if (this.elements.addressBar) {
            this.elements.addressBar.value = url;
        }
        
        // Load in iframe
        this.elements.iframe.src = url;
        
        // Update security indicator
        this.updateSecurityIndicator(url);
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    /**
     * Add URL to history
     */
    addToHistory(url) {
        // Remove forward history if navigating to new URL
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(url);
        this.historyIndex = this.history.length - 1;
        
        // Limit history size
        if (this.history.length > 100) {
            this.history.shift();
            this.historyIndex--;
        }
    }

    /**
     * Handle page load completion
     */
    handlePageLoad() {
        this.isLoading = false;
        this.showLoading(false);
        this.showError(false);
        this.updateProgress(100);
        
        // Hide progress bar after a delay
        setTimeout(() => {
            this.updateProgress(0);
        }, 500);
    }

    /**
     * Handle page load error
     */
    handlePageError() {
        this.isLoading = false;
        this.showLoading(false);
        this.showError(true);
        this.updateProgress(0);
    }

    /**
     * Show loading indicator
     */
    showLoading(show) {
        if (this.elements.loading) {
            this.elements.loading.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Show error page
     */
    showError(show) {
        if (this.elements.errorPage) {
            this.elements.errorPage.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Show welcome page
     */
    showWelcome(show) {
        if (this.elements.welcome) {
            this.elements.welcome.style.display = show ? 'flex' : 'none';
        }
    }

    /**
     * Show iframe
     */
    showIframe(show) {
        if (this.elements.iframe) {
            this.elements.iframe.style.display = show ? 'block' : 'none';
        }
    }

    /**
     * Update progress bar
     */
    updateProgress(percentage) {
        if (this.elements.progressBar) {
            this.elements.progressBar.style.width = `${percentage}%`;
            this.elements.progressBar.style.opacity = percentage > 0 ? '1' : '0';
        }
    }

    /**
     * Update security indicator
     */
    updateSecurityIndicator(url) {
        if (!this.elements.securityIndicator) return;
        
        const isSecure = url.startsWith('https://');
        this.elements.securityIndicator.className = `security-indicator ${isSecure ? 'secure' : 'insecure'}`;
        this.elements.securityIndicator.title = isSecure ? 'Secure Connection' : 'Insecure Connection';
    }

    /**
     * Update navigation buttons state
     */
    updateNavigationButtons() {
        if (this.elements.backBtn) {
            this.elements.backBtn.disabled = this.historyIndex <= 0;
        }
        if (this.elements.forwardBtn) {
            this.elements.forwardBtn.disabled = this.historyIndex >= this.history.length - 1;
        }
    }

    /**
     * Go back in history
     */
    goBack() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadURL(this.history[this.historyIndex], false);
        }
    }

    /**
     * Go forward in history
     */
    goForward() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadURL(this.history[this.historyIndex], false);
        }
    }

    /**
     * Refresh current page
     */
    refresh() {
        if (this.historyIndex >= 0) {
            this.loadURL(this.history[this.historyIndex], false);
        }
    }

    /**
     * Load welcome page
     */
    loadWelcomePage() {
        this.showWelcome(true);
        this.showIframe(false);
        this.showLoading(false);
        this.showError(false);
    }

    /**
     * Show error message
     */
    showError(message) {
        if (this.elements.errorPage) {
            const errorText = this.elements.errorPage.querySelector('p');
            if (errorText) {
                errorText.textContent = message || 'Failed to load the page. Please check the URL and try again.';
            }
        }
    }

    /**
     * Add bookmark
     */
    addBookmark(url, title) {
        const bookmark = {
            id: Date.now(),
            url: url,
            title: title || url,
            icon: this.getFaviconURL(url),
            dateAdded: new Date().toISOString()
        };
        
        this.bookmarks.push(bookmark);
        this.saveBookmarks();
        this.renderBookmarks();
    }

    /**
     * Remove bookmark
     */
    removeBookmark(id) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== id);
        this.saveBookmarks();
        this.renderBookmarks();
    }

    /**
     * Get favicon URL
     */
    getFaviconURL(url) {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
        } catch {
            return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iIzAwRjdGRiIvPgo8cGF0aCBkPSJNOCA4SDI0VjI0SDhWOFoiIGZpbGw9IiMwMDAiLz4KPC9zdmc+';
        }
    }

    /**
     * Render bookmarks
     */
    renderBookmarks() {
        if (!this.elements.bookmarksContainer) return;
        
        this.elements.bookmarksContainer.innerHTML = '';
        
        this.bookmarks.forEach(bookmark => {
            const bookmarkElement = document.createElement('div');
            bookmarkElement.className = 'bookmark-item';
            bookmarkElement.innerHTML = `
                <img src="${bookmark.icon}" alt="" class="bookmark-icon" onerror="this.style.display='none'">
                <div class="bookmark-name">${bookmark.title}</div>
                <div class="bookmark-url">${bookmark.url}</div>
                <button class="bookmark-remove" onclick="browser.removeBookmark(${bookmark.id})">×</button>
            `;
            
            bookmarkElement.addEventListener('click', (e) => {
                if (!e.target.classList.contains('bookmark-remove')) {
                    this.loadURL(bookmark.url);
                }
            });
            
            this.elements.bookmarksContainer.appendChild(bookmarkElement);
        });
    }

    /**
     * Load bookmarks from localStorage
     */
    loadBookmarks() {
        try {
            const saved = localStorage.getItem('neobrowser-bookmarks');
            return saved ? JSON.parse(saved) : this.getDefaultBookmarks();
        } catch {
            return this.getDefaultBookmarks();
        }
    }

    /**
     * Save bookmarks to localStorage
     */
    saveBookmarks() {
        try {
            localStorage.setItem('neobrowser-bookmarks', JSON.stringify(this.bookmarks));
        } catch (error) {
            console.error('Error saving bookmarks:', error);
        }
    }

    /**
     * Get default bookmarks
     */
    getDefaultBookmarks() {
        return [
            {
                id: 1,
                url: 'https://github.com',
                title: 'GitHub',
                icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=32',
                dateAdded: new Date().toISOString()
            },
            {
                id: 2,
                url: 'https://stackoverflow.com',
                title: 'Stack Overflow',
                icon: 'https://www.google.com/s2/favicons?domain=stackoverflow.com&sz=32',
                dateAdded: new Date().toISOString()
            },
            {
                id: 3,
                url: 'https://developer.mozilla.org',
                title: 'MDN Web Docs',
                icon: 'https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=32',
                dateAdded: new Date().toISOString()
            }
        ];
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const saved = localStorage.getItem('neobrowser-settings');
            return saved ? JSON.parse(saved) : this.getDefaultSettings();
        } catch {
            return this.getDefaultSettings();
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('neobrowser-settings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    /**
     * Get default settings
     */
    getDefaultSettings() {
        return {
            searchEngine: 'duckduckgo',
            enableSuggestions: true,
            enableBookmarks: true,
            enableHistory: true,
            theme: 'dark',
            fontSize: 'medium'
        };
    }

    /**
     * Get browser statistics
     */
    getStats() {
        return {
            historyCount: this.history.length,
            bookmarksCount: this.bookmarks.length,
            currentURL: this.currentURL,
            isLoading: this.isLoading
        };
    }

    /**
     * Clear browser history
     */
    clearHistory() {
        this.history = [];
        this.historyIndex = -1;
        this.updateNavigationButtons();
    }

    /**
     * Export bookmarks
     */
    exportBookmarks() {
        const dataStr = JSON.stringify(this.bookmarks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'neobrowser-bookmarks.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * Import bookmarks
     */
    importBookmarks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    this.bookmarks = imported;
                    this.saveBookmarks();
                    this.renderBookmarks();
                    console.log('Bookmarks imported successfully');
                }
            } catch (error) {
                console.error('Error importing bookmarks:', error);
            }
        };
        reader.readAsText(file);
    }
}

// Initialize browser when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Don't initialize immediately - wait for browser to be opened
    console.log('NeoBrowser script loaded');
    console.log('NeoBrowser class available:', typeof NeoBrowser);
});

// Global function to initialize browser when app is opened
window.initializeNeoBrowser = function() {
    console.log('initializeNeoBrowser called');
    console.log('browser exists:', !!window.browser);
    console.log('address bar exists:', !!document.getElementById('browser-address-bar'));
    
    if (!window.browser && document.getElementById('browser-address-bar')) {
        console.log('Creating new NeoBrowser instance');
        try {
            window.browser = new NeoBrowser();
            console.log('NeoBrowser instance created successfully');
            return true;
        } catch (error) {
            console.error('Error creating NeoBrowser instance:', error);
            return false;
        }
    }
    console.log('Browser initialization skipped');
    return false;
};

// Test function to manually initialize browser
window.testBrowser = function() {
    console.log('Testing browser initialization...');
    console.log('NeoBrowser class:', typeof NeoBrowser);
    console.log('Address bar element:', document.getElementById('browser-address-bar'));
    console.log('Go button element:', document.getElementById('browser-go-btn'));
    
    if (document.getElementById('browser-address-bar')) {
        console.log('Browser elements found, initializing...');
        return window.initializeNeoBrowser();
    } else {
        console.log('Browser elements not found');
        return false;
    }
};

// Export for global access
window.NeoBrowser = NeoBrowser; 