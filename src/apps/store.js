/**
 * NeoStore - Magasin Cyberpunk
 * 
 * A comprehensive cyberpunk-themed virtual marketplace featuring advanced
 * inventory management, dynamic pricing, rarity systems, and immersive
 * shopping experience for NeoCityOS.
 * 
 * Features:
 * - Virtual marketplace with cyberpunk-themed items
 * - Gold-based currency system with persistent user data
 * - Shopping cart with quantity management
 * - Category filtering system
 * - 5-tier rarity system with visual indicators
 * - Responsive design with neon cyberpunk styling
 * - Real-time updates and audio integration
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 * @license MIT
 */

class NeoStore {
    /**
     * Constructor - Initialize NeoStore
     * 
     * Sets up the store with predefined items, user data management,
     * and shopping cart functionality.
     */
    constructor() {
        // Initialize store items with cyberpunk theme
        this.items = this.initializeStoreItems();
        
        // User data management
        this.userGold = this.getUserGold();
        this.userInventory = this.getUserInventory();
        
        // Shopping cart
        this.cart = [];
        
        // Store state
        this.currentFilter = 'all';
        this.isInitialized = false;
        
        // Debug mode
        this.debugMode = localStorage.getItem('storeDebug') === 'true';
    }

    /**
     * Initialize Store Items
     * 
     * Creates the initial inventory of cyberpunk-themed items
     * with various categories, rarities, and prices.
     * 
     * @returns {Array} Array of item objects
     */
    initializeStoreItems() {
        return [
            {
                id: 1,
                name: "Neural Implant",
                description: "Enhances cognitive abilities and processing speed",
                price: 500,
                category: "implants",
                icon: "🧠",
                rarity: "rare",
                effects: ["+20% Intelligence", "+15% Processing Speed"]
            },
            {
                id: 2,
                name: "Cyber Eyes",
                description: "Night vision and integrated zoom with advanced HUD",
                price: 300,
                category: "implants",
                icon: "👁️",
                rarity: "uncommon",
                effects: ["Night Vision", "Zoom x5", "HUD Display"]
            },
            {
                id: 3,
                name: "Stealth Cloak",
                description: "Makes you invisible to radars and detection systems",
                price: 800,
                category: "equipment",
                icon: "👻",
                rarity: "epic",
                effects: ["Radar Invisibility", "Thermal Masking", "+30% Stealth"]
            },
            {
                id: 4,
                name: "Quantum Processor",
                description: "Portable quantum computing for solving complex problems",
                price: 1200,
                category: "tech",
                icon: "⚛️",
                rarity: "legendary",
                effects: ["Quantum Computing", "AI Integration", "+50% Problem Solving"]
            },
            {
                id: 5,
                name: "Energy Shield",
                description: "Protection against physical and energy attacks",
                price: 400,
                category: "equipment",
                icon: "🛡️",
                rarity: "common",
                effects: ["Physical Protection", "Energy Resistance", "+25% Defense"]
            },
            {
                id: 6,
                name: "Hologram Projector",
                description: "Creates realistic holographic illusions",
                price: 600,
                category: "tech",
                icon: "🎭",
                rarity: "rare",
                effects: ["Holographic Illusions", "Decoy Creation", "+20% Deception"]
            },
            {
                id: 7,
                name: "Memory Chip",
                description: "Advanced data storage with instant access",
                price: 200,
                category: "tech",
                icon: "💾",
                rarity: "common",
                effects: ["+1TB Storage", "Instant Access", "Data Encryption"]
            },
            {
                id: 8,
                name: "Cyber Legs",
                description: "Increased speed and agility with enhanced jump",
                price: 700,
                category: "implants",
                icon: "🦿",
                rarity: "rare",
                effects: ["+40% Speed", "+35% Agility", "Enhanced Jump"]
            },
            {
                id: 9,
                name: "Neural Interface",
                description: "Direct interface with computer systems",
                price: 900,
                category: "implants",
                icon: "🔌",
                rarity: "epic",
                effects: ["Direct System Access", "Hacking Bonus", "+30% Tech Skills"]
            },
            {
                id: 10,
                name: "Plasma Rifle",
                description: "High-tech plasma weapon",
                price: 1500,
                category: "equipment",
                icon: "🔫",
                rarity: "legendary",
                effects: ["Plasma Damage", "Auto-Targeting", "+45% Combat"]
            },
            {
                id: 11,
                name: "Nano Healing Kit",
                description: "Portable nanorepair kit for instant healing",
                price: 350,
                category: "equipment",
                icon: "🩹",
                rarity: "uncommon",
                effects: ["Instant Heal", "+20% Health Regen", "Removes Status Effects"]
            },
            {
                id: 12,
                name: "Ghostware Drive",
                description: "Stealth disk for undetectable data storage and transfer",
                price: 950,
                category: "tech",
                icon: "💽",
                rarity: "epic",
                effects: ["Stealth Storage", "Trace Erasure", "+40% Data Security"]
            },
            {
                id: 13,
                name: "Reflex Booster",
                description: "Implant that drastically increases reflexes and perception",
                price: 650,
                category: "implants",
                icon: "⚡",
                rarity: "rare",
                effects: ["+30% Reflexes", "+25% Perception", "Bullet Time"]
            },
            {
                id: 14,
                name: "Nano Surgeon's Kit",
                description: "Portable robotic surgery kit for emergency interventions.",
                price: 800,
                category: "equipment",
                icon: "🛠️",
                rarity: "epic",
                effects: ["Instant Surgery", "+30% Recovery", "Auto-Suture"]
            },
            {
                id: 15,
                name: "EMP Grenade",
                description: "Temporarily disables electronics and security systems.",
                price: 450,
                category: "tech",
                icon: "💣",
                rarity: "uncommon",
                effects: ["Disables Electronics", "Area Effect", "Bypass Security"]
            },
            {
                id: 16,
                name: "Neural Firewall",
                description: "Advanced protection against brain hacking attacks.",
                price: 1000,
                category: "implants",
                icon: "🧬",
                rarity: "epic",
                effects: ["Anti-Hack", "+50% Mental Defense", "Intrusion Alert"]
            },
            {
                id: 17,
                name: "Cloaking Module",
                description: "Allows total temporary invisibility.",
                price: 1200,
                category: "equipment",
                icon: "🕶️",
                rarity: "legendary",
                effects: ["Full Invisibility", "Silent Movement", "Short Duration"]
            },
            {
                id: 18,
                name: "Smart Ammo Pack",
                description: "Smart ammunition that adapts to the target.",
                price: 350,
                category: "equipment",
                icon: "🔋",
                rarity: "rare",
                effects: ["Adaptive Damage", "Auto-Reload", "+15% Accuracy"]
            },
            {
                id: 19,
                name: "BioMonitor",
                description: "Comprehensive monitoring of vital signs and medical alerts.",
                price: 250,
                category: "implants",
                icon: "📡",
                rarity: "common",
                effects: ["Vital Scan", "Health Alerts", "Remote Monitoring"]
            },
            {
                id: 20,
                name: "Drone Swarm",
                description: "Reconnaissance and sabotage with miniature drones.",
                price: 1400,
                category: "tech",
                icon: "🛸",
                rarity: "legendary",
                effects: ["Reconnaissance", "Sabotage", "Remote Control"]
            },
            {
                id: 21,
                name: "Adrenaline Pump",
                description: "Implant that boosts strength and speed temporarily.",
                price: 600,
                category: "implants",
                icon: "💉",
                rarity: "uncommon",
                effects: ["+25% Strength", "+20% Speed", "Short Burst"]
            },
            {
                id: 22,
                name: "Thermal Vision Goggles",
                description: "Allows you to see through smoke and total darkness.",
                price: 400,
                category: "equipment",
                icon: "🥽",
                rarity: "rare",
                effects: ["Thermal Vision", "Smoke Penetration", "Enhanced Night Ops"]
            },
            {
                id: 23,
                name: "Quantum Communicator",
                description: "Instant and secure communication worldwide.",
                price: 1100,
                category: "tech",
                icon: "📞",
                rarity: "epic",
                effects: ["Instant Global Call", "Untraceable", "Encrypted"]
            },
            {
                id: 24,
                name: "Muscle Fiber Upgrade",
                description: "Enhances muscle strength for increased performance.",
                price: 750,
                category: "implants",
                icon: "💪",
                rarity: "rare",
                effects: ["+35% Strength", "Fatigue Resistance", "Enhanced Endurance"]
            },
            {
                id: 25,
                name: "EMP Shield Vest",
                description: "Protects against electromagnetic attacks.",
                price: 500,
                category: "equipment",
                icon: "🦺",
                rarity: "uncommon",
                effects: ["EMP Protection", "Shock Absorption", "Lightweight"]
            },
            {
                id: 26,
                name: "Nano Spider Bot",
                description: "Miniature spy robot for discreet infiltration.",
                price: 900,
                category: "tech",
                icon: "🕷️",
                rarity: "rare",
                effects: ["Stealth Recon", "Remote Hacking", "Climb Walls"]
            },
            {
                id: 27,
                name: "Retinal Display",
                description: "Displays information directly on the retina.",
                price: 650,
                category: "implants",
                icon: "👓",
                rarity: "uncommon",
                effects: ["HUD Overlay", "Augmented Reality", "Navigation"]
            },
            {
                id: 28,
                name: "Gravity Boots",
                description: "Allows you to walk on walls and ceilings.",
                price: 1300,
                category: "equipment",
                icon: "🥾",
                rarity: "epic",
                effects: ["Wall Walking", "Fall Protection", "Enhanced Mobility"]
            },
            {
                id: 29,
                name: "Data Spike",
                description: "Quick hacking tool for unauthorized access.",
                price: 300,
                category: "tech",
                icon: "📀",
                rarity: "common",
                effects: ["Quick Hack", "Bypass Security", "Single Use"]
            },
            {
                id: 30,
                name: "Pain Editor",
                description: "Implant that reduces pain sensation.",
                price: 850,
                category: "implants",
                icon: "🧊",
                rarity: "epic",
                effects: ["Pain Reduction", "Focus Boost", "Stress Resistance"]
            }
        ];
    }

    /**
     * Get Current Username
     * 
     * Retrieves the current username from global variables or localStorage.
     * 
     * @returns {string} Current username or 'guest' as fallback
     */
    getCurrentUsername() {
        if (typeof currentUser !== 'undefined' && currentUser) {
            return currentUser;
        }
        
        const lastUser = localStorage.getItem('neo_last_user');
        return lastUser || 'guest';
    }

    /**
     * Get User Gold
     * 
     * Retrieves the user's current gold balance from localStorage.
     * Auto-fixes gold if it's 0 or missing.
     * 
     * @returns {number} User's gold balance (default: 1000)
     */
    getUserGold() {
        const username = this.getCurrentUsername();
        const users = JSON.parse(localStorage.getItem('neo_users')) || {};
        const userData = users[username] || {};
        let gold = typeof userData.gold === 'number' ? userData.gold : 1000;
        
        // Auto-fix: If gold is 0 or missing, reset to 1000
        if (gold <= 0) {
            gold = 1000;
            if (!users[username]) users[username] = {};
            users[username].gold = gold;
            localStorage.setItem('neo_users', JSON.stringify(users));
            
            if (this.debugMode) {
                console.log(`🛠️ Auto-fixed gold for ${username}: reset to ${gold}`);
            }
        }
        
        return gold;
    }

    /**
     * Save User Gold
     * 
     * Saves the user's gold balance to localStorage and updates local state.
     * 
     * @param {number} gold - New gold balance
     */
    saveUserGold(gold) {
        const username = this.getCurrentUsername();
        const users = JSON.parse(localStorage.getItem('neo_users')) || {};
        if (!users[username]) users[username] = {};
        users[username].gold = gold;
        localStorage.setItem('neo_users', JSON.stringify(users));
        this.userGold = gold;
        
        if (this.debugMode) {
            console.log(`Gold saved: ${gold} for user ${username}`);
        }
    }

    /**
     * Get User Inventory
     * 
     * Retrieves the user's inventory from localStorage.
     * 
     * @returns {Array} User's inventory array
     */
    getUserInventory() {
        const username = this.getCurrentUsername();
        const users = JSON.parse(localStorage.getItem('neo_users')) || {};
        const userData = users[username] || {};
        return Array.isArray(userData.inventory) ? userData.inventory : [];
    }

    /**
     * Save User Inventory
     * 
     * Saves the user's inventory to localStorage and updates local state.
     * 
     * @param {Array} inventory - New inventory array
     */
    saveUserInventory(inventory) {
        const username = this.getCurrentUsername();
        const users = JSON.parse(localStorage.getItem('neo_users')) || {};
        if (!users[username]) users[username] = {};
        users[username].inventory = inventory;
        localStorage.setItem('neo_users', JSON.stringify(users));
        this.userInventory = inventory;
        
        if (this.debugMode) {
            console.log(`Inventory saved: ${inventory.length} items for user ${username}`);
        }
    }

    /**
     * Initialize Store
     * 
     * Initializes the store interface and sets up event listeners.
     * Called when the store is opened.
     */
    init() {
        if (this.debugMode) {
            console.log('🛒 Initializing NeoStore...');
        }
        
        // Update user data
        this.userGold = this.getUserGold();
        this.userInventory = this.getUserInventory();
        
        // Wait for DOM to be ready
        setTimeout(() => {
            this.renderStore();
            this.updateGoldDisplay();
            this.updateCartDisplay();
            this.setupEventListeners();
            this.isInitialized = true;
            
            if (this.debugMode) {
                console.log('✅ NeoStore initialized successfully');
            }
        }, 100);
    }

    /**
     * Render Store Interface
     * 
     * Generates and displays the complete store interface including
     * header, filters, items grid, cart, and inventory sections.
     */
    renderStore() {
        const storeContainer = document.querySelector('.store-container');
        if (!storeContainer) {
            console.error('❌ Store container not found');
            return;
        }

        if (this.debugMode) {
            console.log('🎨 Rendering store interface...');
        }

        storeContainer.innerHTML = `
            <div class="store-header">
                <h2>🛒 NeoStore - Cyberpunk Store</h2>
                <div class="user-info">
                    <span class="gold-display">💰 Gold: <span id="user-gold-display">${this.userGold}</span></span>
                    <span class="inventory-count">📦 Inventory: <span id="inventory-count">${this.userInventory.length}</span> items</span>
                </div>
            </div>
            
            <div class="store-filters">
                <button class="filter-btn active" data-category="all">All</button>
                <button class="filter-btn" data-category="implants">Implants</button>
                <button class="filter-btn" data-category="equipment">Equipment</button>
                <button class="filter-btn" data-category="tech">Technology</button>
            </div>
            
            <div class="store-content">
                <div class="items-grid" id="items-grid">
                    ${this.renderItems(this.items)}
                </div>
                
                <div class="cart-section">
                    <h3>🛒 Cart</h3>
                    <div class="cart-items" id="cart-items">
                        <p class="empty-cart">Your cart is empty</p>
                    </div>
                    <div class="cart-total">
                        <span>Total: <span id="cart-total">0</span> gold</span>
                    </div>
                    <button class="buy-btn" id="buy-btn" disabled>💳 Buy</button>
                </div>
            </div>
            
            <div class="inventory-section">
                <h3>📦 My Inventory</h3>
                <div class="inventory-grid" id="inventory-grid">
                    ${this.renderInventory()}
                </div>
            </div>
        `;

        if (this.debugMode) {
            console.log('✅ Store interface rendered successfully');
        }

        // --- AUTO-FIX: Always set up item events after rendering ---
        this.setupItemEvents();
        // --- END AUTO-FIX ---
    }

    /**
     * Render Items Grid
     * 
     * Generates HTML for the items grid with all available items.
     * 
     * @param {Array} items - Array of items to render
     * @returns {string} HTML string for items grid
     */
    renderItems(items) {
        const html = items.map(item => `
            <div class="store-item ${item.rarity}" data-id="${item.id}">
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-description">${item.description}</p>
                    <div class="item-effects">
                        ${item.effects ? item.effects.map(effect => `<span class="effect-tag">${effect}</span>`).join('') : ''}
                    </div>
                    <div class="item-meta">
                        <span class="item-price">💰 ${item.price}</span>
                        <span class="item-rarity">${this.getRarityIcon(item.rarity)} ${item.rarity}</span>
                    </div>
                </div>
                <button class="add-to-cart-btn" data-item-id="${item.id}">
                    ➕ Add
                </button>
            </div>
        `).join('');
        // Log for debugging
        if (!items || items.length === 0) {
            console.warn('[Store] No items to render in store');
        } else {
            console.log(`[Store] Rendering ${items.length} items in store`);
        }
        return html;
    }

    /**
     * Render Inventory
     * 
     * Generates HTML for the user's inventory section.
     * 
     * @returns {string} HTML string for inventory
     */
    renderInventory() {
        if (this.userInventory.length === 0) {
            return '<p class="empty-inventory">Your inventory is empty</p>';
        }

        return this.userInventory.map(item => `
            <div class="inventory-item ${item.rarity}">
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    ${item.effects ? `
                        <div class="item-effects">
                            ${item.effects.map(effect => `<span class="effect-tag">${effect}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    /**
     * Get Rarity Icon
     * 
     * Returns the appropriate icon for each rarity level.
     * 
     * @param {string} rarity - Rarity level
     * @returns {string} Rarity icon
     */
    getRarityIcon(rarity) {
        const icons = {
            common: '⚪',
            uncommon: '🟢',
            rare: '🔵',
            epic: '🟣',
            legendary: '🟡'
        };
        return icons[rarity] || '⚪';
    }

    /**
     * Setup Event Listeners
     * 
     * Sets up all event listeners for the store interface.
     */
    setupEventListeners() {
        this.setupFilterEvents();
        this.setupCartEvents();
        this.setupItemEvents();
    }

    /**
     * Setup Filter Events
     * 
     * Sets up event listeners for category filter buttons.
     */
    setupFilterEvents() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                const category = e.target.dataset.category;
                this.filterItems(category);
                
                if (this.debugMode) {
                    console.log(`Filter changed to: ${category}`);
                }
            });
        });
    }

    /**
     * Setup Cart Events
     * 
     * Sets up event listeners for cart-related buttons.
     */
    setupCartEvents() {
        const buyBtn = document.getElementById('buy-btn');
        if (buyBtn) {
            buyBtn.addEventListener('click', () => this.buyItems());
        }
    }

    /**
     * Setup Item Events
     * 
     * Sets up event listeners for item interaction buttons.
     */
    setupItemEvents() {
        const itemsGrid = document.getElementById('items-grid');
        if (!itemsGrid) {
            console.error('[Store] #items-grid not found when setting up item events');
            return;
        }
        // Remove any previous event listener to avoid duplicates
        if (this._itemGridClickHandler) {
            itemsGrid.removeEventListener('click', this._itemGridClickHandler, false);
        }
        // Define and store the handler so it can be removed later
        this._itemGridClickHandler = (e) => {
            const btn = e.target.closest('.add-to-cart-btn');
            if (btn) {
                const itemId = parseInt(btn.dataset.itemId);
                if (isNaN(itemId)) {
                    console.error('[Store] Invalid itemId on add-to-cart button:', btn.dataset.itemId);
                    return;
                }
                try {
                    this.addToCart(itemId);
                } catch (err) {
                    console.error('[Store] Error in addToCart:', err);
                }
            }
        };
        itemsGrid.addEventListener('click', this._itemGridClickHandler, false);
        // Log for debugging
        console.log('[Store] Item events set up on #items-grid');

        // --- AUTO-FIX: Force direct click handler and highlight ---
        const addBtns = itemsGrid.querySelectorAll('.add-to-cart-btn');
        addBtns.forEach(btn => {
            btn.style.outline = '3px solid lime'; // Visual debug
            btn.removeEventListener('click', btn._forceDirectHandler);
            btn._forceDirectHandler = (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                console.log('[Store] Forced direct click handler fired for itemId:', itemId);
                if (isNaN(itemId)) {
                    console.error('[Store] Invalid itemId on forced direct add-to-cart:', btn.dataset.itemId);
                    return;
                }
                try {
                    this.addToCart(itemId);
                } catch (err) {
                    console.error('[Store] Error in forced direct addToCart:', err);
                }
            };
            btn.addEventListener('click', btn._forceDirectHandler);
        });
        if (addBtns.length > 0) {
            console.log(`[Store] Forced direct handlers attached to ${addBtns.length} add-to-cart buttons`);
        }
        // --- END AUTO-FIX ---

        // --- BULLETPROOF AUTO-FIX: ABSOLUTE FORCE BUTTON ON TOP ---
        addBtns.forEach(btn => {
            btn.style.position = 'relative';
            btn.style.zIndex = '2147483647'; // Max z-index
            btn.style.pointerEvents = 'auto';
            btn.style.outline = '4px solid lime'; // Debug
            btn.removeEventListener('click', btn._absoluteForceHandler);
            btn._absoluteForceHandler = (e) => {
                e.stopPropagation();
                const itemId = parseInt(btn.dataset.itemId);
                console.log('[Store] ABSOLUTE FORCE click handler fired for itemId:', itemId);
                if (isNaN(itemId)) {
                    console.error('[Store] Invalid itemId on absolute force add-to-cart:', btn.dataset.itemId);
                    return;
                }
                try {
                    this.addToCart(itemId);
                } catch (err) {
                    console.error('[Store] Error in absolute force addToCart:', err);
                }
            };
            btn.addEventListener('click', btn._absoluteForceHandler);
        });
        if (addBtns.length > 0) {
            console.log(`[Store] ABSOLUTE FORCE handlers attached to ${addBtns.length} add-to-cart buttons`);
        }
        // --- END BULLETPROOF AUTO-FIX ---
    }

    /**
     * Filter Items
     * 
     * Filters the items grid based on the selected category.
     * 
     * @param {string} category - Category to filter by
     */
    filterItems(category) {
        const itemsGrid = document.getElementById('items-grid');
        let filteredItems = this.items;
        
        if (category !== 'all') {
            filteredItems = this.items.filter(item => item.category === category);
        }
        
        this.currentFilter = category;
        itemsGrid.innerHTML = this.renderItems(filteredItems);
        // --- AUTO-FIX: Always set up item events after filtering ---
        this.setupItemEvents();
        // --- END AUTO-FIX ---
        
        if (this.debugMode) {
            console.log(`Items filtered: ${filteredItems.length} items in category ${category}`);
        }
    }

    /**
     * Add Item to Cart
     * 
     * Adds an item to the shopping cart with quantity management.
     * 
     * @param {number} itemId - ID of the item to add
     */
    addToCart(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) {
            console.error(`[Store] Item with ID ${itemId} not found in addToCart`);
            return;
        }

        const cartItem = this.cart.find(i => i.id === itemId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }

        this.updateCartDisplay();
        this.playSound('click');
        
        if (this.debugMode) {
            console.log(`[Store] Item added to cart: ${item.name} (ID: ${itemId})`);
        } else {
            console.log(`[Store] Item added to cart: ${item.name} (ID: ${itemId})`);
        }
    }

    /**
     * Remove Item from Cart
     * 
     * Removes an item from the shopping cart.
     * 
     * @param {number} itemId - ID of the item to remove
     */
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
        this.playSound('click');
        
        if (this.debugMode) {
            console.log(`Item removed from cart: ${itemId}`);
        }
    }

    /**
     * Update Cart Display
     * 
     * Updates the cart section with current items and total.
     */
    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const buyBtn = document.getElementById('buy-btn');

        if (!cartItems || !cartTotal || !buyBtn) {
            console.error('Cart elements not found');
            return;
        }

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '0';
            buyBtn.disabled = true;
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-icon">${item.icon}</span>
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-quantity">x${item.quantity}</span>
                </div>
                <div class="cart-item-actions">
                    <span class="cart-item-price">💰 ${item.price * item.quantity}</span>
                    <button class="remove-btn" data-item-id="${item.id}">🗑️</button>
                </div>
            </div>
        `).join('');

        // Setup remove buttons
        const removeBtns = cartItems.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.itemId);
                this.removeFromCart(itemId);
            });
        });

        buyBtn.disabled = total > this.userGold;
    }

    /**
     * Buy Items
     * 
     * Processes the purchase of all items in the cart.
     */
    buyItems() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        if (total > this.userGold) {
            this.showNotification('❌ Not enough gold!', 'error');
            return;
        }

        // Add items to inventory
        this.cart.forEach(cartItem => {
            for (let i = 0; i < cartItem.quantity; i++) {
                this.userInventory.push({
                    id: cartItem.id,
                    name: cartItem.name,
                    description: cartItem.description,
                    icon: cartItem.icon,
                    rarity: cartItem.rarity,
                    category: cartItem.category,
                    effects: cartItem.effects
                });
            }
        });

        // Deduct gold
        this.saveUserGold(this.userGold - total);
        this.saveUserInventory(this.userInventory);

        // Clear cart
        this.cart = [];

        // Update displays
        this.updateGoldDisplay();
        this.updateCartDisplay();
        this.renderInventory();

                    this.showNotification(`✅ Purchase successful! You spent ${total} gold.`, 'success');
        this.playSound('login');
        
        if (this.debugMode) {
            console.log(`Purchase completed: ${total} gold spent, ${this.userInventory.length} items in inventory`);
        }
    }

    /**
     * Update Gold Display
     * 
     * Updates the gold and inventory count displays.
     */
    updateGoldDisplay() {
        const goldDisplay = document.getElementById('user-gold-display');
        const inventoryCount = document.getElementById('inventory-count');
        
        if (goldDisplay) goldDisplay.textContent = this.userGold;
        if (inventoryCount) inventoryCount.textContent = this.userInventory.length;
    }

    /**
     * Play Sound
     * 
     * Plays a sound effect if the audio system is available.
     * 
     * @param {string} soundName - Name of the sound to play
     */
    playSound(soundName) {
        if (typeof playSound === 'function') {
            playSound(soundName);
        }
    }

    /**
     * Show Notification
     * 
     * Shows a notification message to the user.
     * 
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `store-notification ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    /**
     * Get Store Statistics
     * 
     * Returns statistics about the store and user data.
     * 
     * @returns {Object} Store statistics
     */
    getStoreStats() {
        return {
            totalItems: this.items.length,
            cartItems: this.cart.length,
            cartTotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            userGold: this.userGold,
            inventoryCount: this.userInventory.length,
            currentFilter: this.currentFilter
        };
    }

    /**
     * Reset Store Data
     * 
     * Resets the store to initial state (for debugging/testing).
     */
    resetStoreData() {
        this.cart = [];
        this.currentFilter = 'all';
        this.updateCartDisplay();
        this.filterItems('all');
        
        if (this.debugMode) {
            console.log('Store data reset');
        }
    }

    /**
     * Auto-Fix Gold Issue
     * 
     * Manually triggers gold auto-fix and updates display.
     * Can be called from console: store.autoFixGold()
     */
    autoFixGold() {
        const username = this.getCurrentUsername();
        const users = JSON.parse(localStorage.getItem('neo_users')) || {};
        
        if (!users[username]) users[username] = {};
        
        // Force reset gold to 1000
        users[username].gold = 1000;
        localStorage.setItem('neo_users', JSON.stringify(users));
        
        // Update local state
        this.userGold = 1000;
        this.updateGoldDisplay();
        
        console.log(`🛠️ Manual gold fix: ${username} now has 1000 gold`);
        this.showNotification('💰 Gold auto-fixed to 1000!', 'success');
        
        return 1000;
    }
}

// Global store instance
const store = new NeoStore();
window.store = store;
// Export for module systems (if available)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeoStore;
}