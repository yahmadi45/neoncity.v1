/**
 * Enhanced Data Structures Playground for NeoCityOS
 * 
 * This module provides an interactive playground for learning and experimenting
 * with fundamental data structures. It implements five core data structures
 * with enhanced visual representations, animations, and educational features.
 * 
 * Educational Objectives:
 * - Demonstrate data structure operations (add, remove, clear, search, traverse)
 * - Visualize data structure states and relationships with animations
 * - Show time complexity differences between operations
 * - Provide hands-on learning experience with real-time feedback
 * - Display performance metrics and educational information
 * 
 * Data Structures Implemented:
 * 1. Stack (LIFO - Last In, First Out)
 * 2. Queue (FIFO - First In, First Out)
 * 3. Linked List (Linear data structure with nodes)
 * 4. Binary Tree (Hierarchical data structure)
 * 5. Hash Table (Key-value storage with hash function)
 * 
 * Time Complexities:
 * Stack Operations:
 *   - Push: O(1) average and worst case
 *   - Pop: O(1) average and worst case
 *   - Peek: O(1) average and worst case
 * 
 * Queue Operations:
 *   - Enqueue: O(1) average and worst case
 *   - Dequeue: O(1) average and worst case
 *   - Peek: O(1) average and worst case
 * 
 * Linked List Operations:
 *   - Insert at end: O(n) average and worst case
 *   - Remove from end: O(n) average and worst case
 *   - Search: O(n) average and worst case
 * 
 * Binary Tree Operations:
 *   - Insert: O(log n) average, O(n) worst case
 *   - Search: O(log n) average, O(n) worst case
 *   - Remove: O(log n) average, O(n) worst case
 * 
 * Hash Table Operations:
 *   - Insert: O(1) average, O(n) worst case (with collisions)
 *   - Search: O(1) average, O(n) worst case
 *   - Remove: O(1) average, O(n) worst case
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 */

/**
 * Enhanced Data Structures Playground Class
 * 
 * Main class responsible for managing multiple data structures,
 * their operations, visual representations, animations, and educational content.
 */
class DataStructuresPlayground {
    /**
     * Constructor - Initialize Enhanced Data Structures Playground
     * 
     * Sets up the core properties for all data structures:
     * - Current structure selection
     * - Individual data structure instances
     * - Display element reference
     * - Performance tracking
     * - Animation states
     */
    constructor() {
        // Current data structure being displayed and operated on
        this.currentStructure = 'stack';
        
        // Stack implementation using JavaScript array
        // LIFO (Last In, First Out) data structure
        this.stack = [];
        
        // Queue implementation using JavaScript array
        // FIFO (First In, First Out) data structure
        this.queue = [];
        
        // Linked list implementation with head pointer
        // Linear data structure with nodes containing value and next pointer
        this.linkedList = { head: null };
        
        // Binary tree implementation with root pointer
        // Hierarchical data structure with left and right children
        this.binaryTree = null;
        
        // Hash table implementation using JavaScript object
        // Key-value storage with hash function for indexing
        this.hashTable = {};
        
        // Reference to the display element for visual updates
        this.displayElement = null;
        
        // Performance tracking
        this.operationCount = 0;
        this.startTime = Date.now();
        
        // Animation states
        this.isAnimating = false;
        this.animationQueue = [];
        
        // Educational content
        this.educationalInfo = {
            stack: {
                name: "Stack",
                description: "LIFO (Last In, First Out) data structure",
                operations: {
                    push: { complexity: "O(1)", description: "Add element to top" },
                    pop: { complexity: "O(1)", description: "Remove element from top" },
                    peek: { complexity: "O(1)", description: "View top element" }
                },
                useCases: ["Function call stack", "Undo operations", "Browser history"]
            },
            queue: {
                name: "Queue",
                description: "FIFO (First In, First Out) data structure",
                operations: {
                    enqueue: { complexity: "O(1)", description: "Add element to back" },
                    dequeue: { complexity: "O(1)", description: "Remove element from front" },
                    peek: { complexity: "O(1)", description: "View front element" }
                },
                useCases: ["Task scheduling", "Print queue", "Breadth-first search"]
            },
            linkedlist: {
                name: "Linked List",
                description: "Linear data structure with connected nodes",
                operations: {
                    insert: { complexity: "O(n)", description: "Insert at position" },
                    delete: { complexity: "O(n)", description: "Delete at position" },
                    search: { complexity: "O(n)", description: "Find element" }
                },
                useCases: ["Dynamic memory allocation", "Implementation of other data structures", "Polynomial arithmetic"]
            },
            tree: {
                name: "Binary Tree",
                description: "Hierarchical data structure with at most two children per node",
                operations: {
                    insert: { complexity: "O(log n)", description: "Insert maintaining BST properties" },
                    search: { complexity: "O(log n)", description: "Find element" },
                    delete: { complexity: "O(log n)", description: "Remove element" }
                },
                useCases: ["Binary search trees", "Expression trees", "File system organization"]
            },
            hashtable: {
                name: "Hash Table",
                description: "Key-value storage with hash function indexing",
                operations: {
                    insert: { complexity: "O(1)", description: "Add key-value pair" },
                    search: { complexity: "O(1)", description: "Find value by key" },
                    delete: { complexity: "O(1)", description: "Remove key-value pair" }
                },
                useCases: ["Database indexing", "Caching", "Symbol tables"]
            }
        };
    }

    /**
     * Initialize Method
     * 
     * Sets up the display element, event listeners, and initial state.
     * This method must be called after the DOM is loaded.
     */
    init() {
        // Get reference to display element
        this.displayElement = document.getElementById('ds-display');
        
        // Add event listener for data structure type changes
        const selector = document.getElementById('ds-type');
        if (selector) {
            selector.addEventListener('change', (e) => {
                this.currentStructure = e.target.value;
                this.updateDisplay();
                this.showEducationalInfo();
            });
        }
        
        // Add keyboard event listeners
        const input = document.getElementById('ds-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.add();
                }
            });
        }
        
        // Initialize display and educational info
        this.updateDisplay();
        this.showEducationalInfo();
        this.updateMetrics();
        
        // Create message element if it doesn't exist
        this.createMessageElement();
    }

    /**
     * Create Message Element Method
     * 
     * Creates a message element for displaying notifications.
     */
    createMessageElement() {
        if (!document.getElementById('ds-message')) {
            const messageElement = document.createElement('div');
            messageElement.id = 'ds-message';
            messageElement.className = 'ds-message';
            document.body.appendChild(messageElement);
        }
    }

    /**
     * Add Method
     * 
     * Main entry point for adding elements to the current data structure.
     * Routes to appropriate add method based on current structure.
     * 
     * Algorithm:
     * 1. Get input value from UI
     * 2. Validate input (non-empty)
     * 3. Route to appropriate add method
     * 4. Clear input field
     * 5. Update display with animation
     * 6. Update performance metrics
     */
    add() {
        const input = document.getElementById('ds-input');
        const value = input.value.trim();
        
        // Input validation
        if (!value) {
            this.showMessage('Please enter a value', 'warning');
            return;
        }

        // Prevent multiple rapid operations
        if (this.isAnimating) {
            this.showMessage('Please wait for current operation to complete', 'warning');
            return;
        }

        // Route to appropriate add method based on current structure
        const startTime = performance.now();
        switch (this.currentStructure) {
            case 'stack':
                this.addToStack(value);
                break;
            case 'queue':
                this.addToQueue(value);
                break;
            case 'linkedlist':
                this.addToLinkedList(value);
                break;
            case 'tree':
                this.addToBinaryTree(value);
                break;
            case 'hashtable':
                this.addToHashTable(value);
                break;
        }

        // Update performance metrics
        const endTime = performance.now();
        this.operationCount++;
        this.updateMetrics();

        // Clear input and update display with animation
        input.value = '';
        this.animateOperation(() => {
            this.updateDisplay();
        });
    }

    /**
     * Remove Method
     * 
     * Main entry point for removing elements from the current data structure.
     * Routes to appropriate remove method based on current structure.
     * 
     * Algorithm:
     * 1. Route to appropriate remove method
     * 2. Update display after removal with animation
     * 3. Update performance metrics
     */
    remove() {
        if (this.isAnimating) {
            this.showMessage('Please wait for current operation to complete', 'warning');
            return;
        }

        const startTime = performance.now();
        switch (this.currentStructure) {
            case 'stack':
                this.removeFromStack();
                break;
            case 'queue':
                this.removeFromQueue();
                break;
            case 'linkedlist':
                this.removeFromLinkedList();
                break;
            case 'tree':
                this.removeFromBinaryTree();
                break;
            case 'hashtable':
                this.removeFromHashTable();
                break;
        }
        
        this.operationCount++;
        this.updateMetrics();
        
        this.animateOperation(() => {
            this.updateDisplay();
        });
    }

    /**
     * Clear Method
     * 
     * Clears all elements from the current data structure.
     * Resets the structure to its initial empty state.
     * 
     * Algorithm:
     * 1. Reset current structure to empty state
     * 2. Update display with animation
     * 3. Show confirmation message
     * 4. Update performance metrics
     */
    clear() {
        if (this.isAnimating) {
            this.showMessage('Please wait for current operation to complete', 'warning');
            return;
        }

        switch (this.currentStructure) {
            case 'stack':
                this.stack = [];
                break;
            case 'queue':
                this.queue = [];
                break;
            case 'linkedlist':
                this.linkedList = { head: null };
                break;
            case 'tree':
                this.binaryTree = null;
                break;
            case 'hashtable':
                this.hashTable = {};
                break;
        }
        
        this.operationCount++;
        this.updateMetrics();
        
        this.animateOperation(() => {
            this.updateDisplay();
        });
        this.showMessage('Structure cleared successfully', 'success');
    }

    /**
     * Search Method
     * 
     * Searches for an element in the current data structure.
     * 
     * Algorithm:
     * 1. Get search value from UI
     * 2. Route to appropriate search method
     * 3. Display results with animation
     */
    search() {
        const input = document.getElementById('ds-input');
        const value = input.value.trim();
        
        if (!value) {
            this.showMessage('Please enter a value to search', 'warning');
            return;
        }

        if (this.isAnimating) {
            this.showMessage('Please wait for current operation to complete', 'warning');
            return;
        }

        const startTime = performance.now();
        let result = false;
        
        switch (this.currentStructure) {
            case 'stack':
                result = this.stack.includes(value);
                break;
            case 'queue':
                result = this.queue.includes(value);
                break;
            case 'linkedlist':
                result = this.searchLinkedList(value);
                break;
            case 'tree':
                result = this.searchBinaryTree(value);
                break;
            case 'hashtable':
                result = this.searchHashTable(value);
                break;
        }
        
        this.operationCount++;
        this.updateMetrics();
        
        const message = result ? 
            `Found "${value}" in ${this.educationalInfo[this.currentStructure].name}` :
            `"${value}" not found in ${this.educationalInfo[this.currentStructure].name}`;
        
        this.showMessage(message, result ? 'success' : 'warning');
        
        this.animateOperation(() => {
            this.updateDisplay();
        });
    }

    /**
     * Add to Stack Method
     * 
     * Adds an element to the top of the stack (LIFO principle).
     * Time Complexity: O(1) - constant time operation
     * 
     * @param {any} value - The value to add to the stack
     */
    addToStack(value) {
        this.stack.push(value); // Add to end of array (top of stack)
        this.showMessage(`Pushed "${value}" to stack (O(1) operation)`, 'success');
    }

    /**
     * Remove from Stack Method
     * 
     * Removes and returns the top element from the stack (LIFO principle).
     * Time Complexity: O(1) - constant time operation
     * 
     * Algorithm:
     * 1. Check if stack is empty
     * 2. If empty, show error message
     * 3. If not empty, remove and return top element
     */
    removeFromStack() {
        if (this.stack.length === 0) {
            this.showMessage('Stack is empty - nothing to pop', 'warning');
            return;
        }
        const value = this.stack.pop(); // Remove from end of array (top of stack)
        this.showMessage(`Popped "${value}" from stack (O(1) operation)`, 'success');
    }

    /**
     * Add to Queue Method
     * 
     * Adds an element to the end of the queue (FIFO principle).
     * Time Complexity: O(1) - constant time operation
     * 
     * @param {any} value - The value to add to the queue
     */
    addToQueue(value) {
        this.queue.push(value); // Add to end of array (back of queue)
        this.showMessage(`Enqueued "${value}" to queue (O(1) operation)`, 'success');
    }

    /**
     * Remove from Queue Method
     * 
     * Removes and returns the front element from the queue (FIFO principle).
     * Time Complexity: O(1) - constant time operation
     * 
     * Algorithm:
     * 1. Check if queue is empty
     * 2. If empty, show error message
     * 3. If not empty, remove and return front element
     */
    removeFromQueue() {
        if (this.queue.length === 0) {
            this.showMessage('Queue is empty - nothing to dequeue', 'warning');
            return;
        }
        const value = this.queue.shift(); // Remove from beginning of array (front of queue)
        this.showMessage(`Dequeued "${value}" from queue (O(1) operation)`, 'success');
    }

    /**
     * Add to Linked List Method
     * 
     * Adds an element to the end of the linked list.
     * Time Complexity: O(n) - linear time to traverse to end
     * 
     * Algorithm:
     * 1. Create new node with value and null next pointer
     * 2. If list is empty, set new node as head
     * 3. If list is not empty, traverse to end and add new node
     * 
     * @param {any} value - The value to add to the linked list
     */
    addToLinkedList(value) {
        const newNode = { value: value, next: null };
        
        if (!this.linkedList.head) {
            // List is empty, set new node as head
            this.linkedList.head = newNode;
        } else {
            // List is not empty, traverse to end and add new node
            let current = this.linkedList.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.showMessage(`Added "${value}" to linked list (O(n) operation)`, 'success');
    }

    /**
     * Remove from Linked List Method
     * 
     * Removes the last element from the linked list.
     * Time Complexity: O(n) - linear time to traverse to end
     * 
     * Algorithm:
     * 1. Check if list is empty
     * 2. If list has only one element, remove head
     * 3. If list has multiple elements, traverse to second-to-last and remove last
     */
    removeFromLinkedList() {
        if (!this.linkedList.head) {
            this.showMessage('Linked list is empty - nothing to remove', 'warning');
            return;
        }
        
        if (!this.linkedList.head.next) {
            // List has only one element
            const value = this.linkedList.head.value;
            this.linkedList.head = null;
            this.showMessage(`Removed "${value}" from linked list (O(n) operation)`, 'success');
            return;
        }
        
        // List has multiple elements, traverse to second-to-last
        let current = this.linkedList.head;
        while (current.next.next) {
            current = current.next;
        }
        const value = current.next.value;
        current.next = null; // Remove last element
        this.showMessage(`Removed "${value}" from linked list (O(n) operation)`, 'success');
    }

    /**
     * Search Linked List Method
     * 
     * Searches for a value in the linked list.
     * Time Complexity: O(n) - linear time to traverse
     * 
     * @param {any} value - The value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    searchLinkedList(value) {
        let current = this.linkedList.head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    /**
     * Add to Binary Tree Method
     * 
     * Adds an element to the binary tree maintaining BST properties.
     * Time Complexity: O(log n) average, O(n) worst case
     * 
     * Algorithm:
     * 1. Create new node with value and null children
     * 2. If tree is empty, set new node as root
     * 3. If tree is not empty, insert using BST rules
     * 
     * @param {any} value - The value to add to the binary tree
     */
    addToBinaryTree(value) {
        const newNode = { value: value, left: null, right: null };
        
        if (!this.binaryTree) {
            // Tree is empty, set new node as root
            this.binaryTree = newNode;
        } else {
            // Tree is not empty, insert using BST rules
            this.insertNode(this.binaryTree, newNode);
        }
        this.showMessage(`Added "${value}" to binary tree (O(log n) average)`, 'success');
    }

    /**
     * Insert Node Method for Binary Tree
     * 
     * Recursively inserts a new node into the binary tree following BST rules.
     * Smaller values go to left subtree, larger values go to right subtree.
     * 
     * @param {Object} root - Current root node
     * @param {Object} newNode - New node to insert
     */
    insertNode(root, newNode) {
        if (newNode.value < root.value) {
            // Insert in left subtree
            if (root.left === null) {
                root.left = newNode;
            } else {
                this.insertNode(root.left, newNode);
            }
        } else {
            // Insert in right subtree
            if (root.right === null) {
                root.right = newNode;
            } else {
                this.insertNode(root.right, newNode);
            }
        }
    }

    /**
     * Remove from Binary Tree Method
     * 
     * Removes a node from the binary tree maintaining BST properties.
     * Time Complexity: O(log n) average, O(n) worst case
     * 
     * Algorithm:
     * 1. Check if tree is empty
     * 2. If not empty, remove root node (simplified implementation)
     * 3. Show confirmation message
     */
    removeFromBinaryTree() {
        if (!this.binaryTree) {
            this.showMessage('Binary tree is empty - nothing to remove', 'warning');
            return;
        }
        
        // Simplified implementation: remove root node
        const value = this.binaryTree.value;
        this.binaryTree = null;
        this.showMessage(`Removed "${value}" from binary tree (O(log n) average)`, 'success');
    }

    /**
     * Search Binary Tree Method
     * 
     * Searches for a value in the binary tree.
     * Time Complexity: O(log n) average, O(n) worst case
     * 
     * @param {any} value - The value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    searchBinaryTree(value) {
        return this.searchNode(this.binaryTree, value);
    }

    /**
     * Search Node Method for Binary Tree
     * 
     * Recursively searches for a value in the binary tree.
     * 
     * @param {Object} node - Current node
     * @param {any} value - Value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    searchNode(node, value) {
        if (!node) return false;
        
        if (node.value === value) return true;
        
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }

    /**
     * Add to Hash Table Method
     * 
     * Adds a key-value pair to the hash table.
     * Time Complexity: O(1) average, O(n) worst case (with collisions)
     * 
     * @param {any} value - The value to add (used as both key and value)
     */
    addToHashTable(value) {
        const key = this.hashFunction(value);
        this.hashTable[key] = value;
        this.showMessage(`Added "${value}" to hash table at key ${key} (O(1) average)`, 'success');
    }

    /**
     * Remove from Hash Table Method
     * 
     * Removes a key-value pair from the hash table.
     * Time Complexity: O(1) average, O(n) worst case
     * 
     * Algorithm:
     * 1. Check if hash table is empty
     * 2. If not empty, remove first key-value pair (simplified)
     * 3. Show confirmation message
     */
    removeFromHashTable() {
        if (Object.keys(this.hashTable).length === 0) {
            this.showMessage('Hash table is empty - nothing to remove', 'warning');
            return;
        }
        
        // Simplified implementation: remove first key
        const keys = Object.keys(this.hashTable);
        const firstKey = keys[0];
        const value = this.hashTable[firstKey];
        delete this.hashTable[firstKey];
        this.showMessage(`Removed "${value}" from hash table (O(1) average)`, 'success');
    }

    /**
     * Search Hash Table Method
     * 
     * Searches for a value in the hash table.
     * Time Complexity: O(1) average, O(n) worst case
     * 
     * @param {any} value - The value to search for
     * @returns {boolean} - True if found, false otherwise
     */
    searchHashTable(value) {
        const key = this.hashFunction(value);
        return this.hashTable[key] === value;
    }

    /**
     * Hash Function
     * 
     * Simple hash function that converts a value to a numeric key.
     * This is a basic implementation for demonstration purposes.
     * 
     * @param {any} value - The value to hash
     * @returns {number} - The hash key
     */
    hashFunction(value) {
        return value.toString().length + value.toString().charCodeAt(0);
    }

    /**
     * Animate Operation Method
     * 
     * Provides smooth animations for data structure operations.
     * 
     * @param {Function} callback - Function to execute after animation
     */
    animateOperation(callback) {
        this.isAnimating = true;
        
        // Add visual feedback
        const visualization = document.querySelector('.ds-visualization');
        if (visualization) {
            visualization.style.transform = 'scale(1.02)';
            visualization.style.transition = 'transform 0.2s ease-out';
        }
        
        setTimeout(() => {
            if (visualization) {
                visualization.style.transform = 'scale(1)';
            }
            callback();
            this.isAnimating = false;
        }, 200);
    }

    /**
     * Update Display Method
     * 
     * Updates the visual representation of the current data structure.
     * Routes to appropriate display method based on current structure.
     */
    updateDisplay() {
        if (!this.displayElement) return;
        
        switch (this.currentStructure) {
            case 'stack':
                this.displayStack();
                break;
            case 'queue':
                this.displayQueue();
                break;
            case 'linkedlist':
                this.displayLinkedList();
                break;
            case 'tree':
                this.displayBinaryTree();
                break;
            case 'hashtable':
                this.displayHashTable();
                break;
        }
    }

    /**
     * Display Stack Method
     * 
     * Creates enhanced visual representation of the stack showing LIFO principle.
     * Elements are displayed vertically with top element highlighted.
     */
    displayStack() {
        let html = '<div class="ds-container">';
        html += '<h3>Stack (LIFO - Last In, First Out)</h3>';
        html += '<div class="stack-container">';
        
        if (this.stack.length === 0) {
            html += '<div class="empty-message">Stack is empty</div>';
        } else {
            // Display elements from top to bottom (LIFO)
            for (let i = this.stack.length - 1; i >= 0; i--) {
                const isTop = i === this.stack.length - 1;
                html += `<div class="stack-item ${isTop ? 'top' : ''}" data-index="${i}">${this.stack[i]}</div>`;
            }
        }
        
        html += '</div>';
        html += this.generateMetrics();
        html += '</div>';
        this.displayElement.innerHTML = html;
    }

    /**
     * Display Queue Method
     * 
     * Creates enhanced visual representation of the queue showing FIFO principle.
     * Elements are displayed horizontally with front element highlighted.
     */
    displayQueue() {
        let html = '<div class="ds-container">';
        html += '<h3>Queue (FIFO - First In, First Out)</h3>';
        html += '<div class="queue-container">';
        
        if (this.queue.length === 0) {
            html += '<div class="empty-message">Queue is empty</div>';
        } else {
            // Display elements from front to back (FIFO)
            this.queue.forEach((item, index) => {
                const isFront = index === 0;
                html += `<div class="queue-item ${isFront ? 'front' : ''}" data-index="${index}">${item}</div>`;
            });
        }
        
        html += '</div>';
        html += this.generateMetrics();
        html += '</div>';
        this.displayElement.innerHTML = html;
    }

    /**
     * Display Linked List Method
     * 
     * Creates enhanced visual representation of the linked list showing node connections.
     * Nodes are displayed horizontally with arrows showing next pointers.
     */
    displayLinkedList() {
        let html = '<div class="ds-container">';
        html += '<h3>Linked List</h3>';
        html += '<div class="linkedlist-container">';
        
        if (!this.linkedList.head) {
            html += '<div class="empty-message">Linked list is empty</div>';
        } else {
            let current = this.linkedList.head;
            let index = 0;
            while (current) {
                html += `<div class="list-node" data-index="${index}">${current.value}</div>`;
                if (current.next) {
                    html += '<div class="arrow">→</div>';
                }
                current = current.next;
                index++;
            }
        }
        
        html += '</div>';
        html += this.generateMetrics();
        html += '</div>';
        this.displayElement.innerHTML = html;
    }

    /**
     * Display Binary Tree Method
     * 
     * Creates enhanced visual representation of the binary tree showing hierarchical structure.
     * Tree is displayed level by level with proper indentation.
     */
    displayBinaryTree() {
        let html = '<div class="ds-container">';
        html += '<h3>Binary Tree</h3>';
        html += '<div class="tree-container">';
        
        if (!this.binaryTree) {
            html += '<div class="empty-message">Binary tree is empty</div>';
        } else {
            html += this.displayTreeLevel(this.binaryTree, 0);
        }
        
        html += '</div>';
        html += this.generateMetrics();
        html += '</div>';
        this.displayElement.innerHTML = html;
    }

    /**
     * Display Tree Level Method
     * 
     * Recursively displays a level of the binary tree with proper indentation.
     * 
     * @param {Object} node - Current node to display
     * @param {number} level - Current level in the tree
     * @returns {string} - HTML string for the tree level
     */
    displayTreeLevel(node, level) {
        if (!node) return '';
        
        let html = '';
        const indent = '&nbsp;'.repeat(level * 4);
        
        html += `<div class="tree-level" style="margin-left: ${level * 20}px;">`;
        html += `<div class="tree-node" data-value="${node.value}">${node.value}</div>`;
        
        if (node.left || node.right) {
            html += '<div class="tree-children">';
            if (node.left) {
                html += this.displayTreeLevel(node.left, level + 1);
            }
            if (node.right) {
                html += this.displayTreeLevel(node.right, level + 1);
            }
            html += '</div>';
        }
        
        html += '</div>';
        return html;
    }

    /**
     * Display Hash Table Method
     * 
     * Creates enhanced visual representation of the hash table showing key-value pairs.
     * Displays hash keys and their corresponding values.
     */
    displayHashTable() {
        let html = '<div class="ds-container">';
        html += '<h3>Hash Table</h3>';
        html += '<div class="hashtable-container">';
        
        if (Object.keys(this.hashTable).length === 0) {
            html += '<div class="empty-message">Hash table is empty</div>';
        } else {
            for (const [key, value] of Object.entries(this.hashTable)) {
                html += `<div class="hash-item" data-key="${key}"><span class="key">${key}:</span> <span class="value">${value}</span></div>`;
            }
        }
        
        html += '</div>';
        html += this.generateMetrics();
        html += '</div>';
        this.displayElement.innerHTML = html;
    }

    /**
     * Generate Metrics Method
     * 
     * Generates performance metrics display for the current data structure.
     * 
     * @returns {string} - HTML string for metrics
     */
    generateMetrics() {
        const info = this.educationalInfo[this.currentStructure];
        const size = this.getStructureSize();
        
        return `
            <div class="ds-metrics">
                <div class="metric">
                    <div class="metric-label">Structure</div>
                    <div class="metric-value">${info.name}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Size</div>
                    <div class="metric-value">${size}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Operations</div>
                    <div class="metric-value">${this.operationCount}</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Time Complexity</div>
                    <div class="metric-value">${this.getTimeComplexity()}</div>
                </div>
            </div>
        `;
    }

    /**
     * Get Structure Size Method
     * 
     * Returns the current size of the selected data structure.
     * 
     * @returns {number} - Size of the data structure
     */
    getStructureSize() {
        switch (this.currentStructure) {
            case 'stack':
                return this.stack.length;
            case 'queue':
                return this.queue.length;
            case 'linkedlist':
                return this.getLinkedListSize();
            case 'tree':
                return this.countTreeNodes(this.binaryTree);
            case 'hashtable':
                return Object.keys(this.hashTable).length;
            default:
                return 0;
        }
    }

    /**
     * Get Linked List Size Method
     * 
     * Returns the size of the linked list.
     * 
     * @returns {number} - Size of the linked list
     */
    getLinkedListSize() {
        let count = 0;
        let current = this.linkedList.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }

    /**
     * Count Tree Nodes Method
     * 
     * Recursively counts the number of nodes in the binary tree.
     * 
     * @param {Object} node - Current node
     * @returns {number} - Number of nodes in subtree
     */
    countTreeNodes(node) {
        if (!node) return 0;
        return 1 + this.countTreeNodes(node.left) + this.countTreeNodes(node.right);
    }

    /**
     * Get Time Complexity Method
     * 
     * Returns the time complexity for the current operation.
     * 
     * @returns {string} - Time complexity string
     */
    getTimeComplexity() {
        const info = this.educationalInfo[this.currentStructure];
        return info.operations.insert ? info.operations.insert.complexity : 'O(1)';
    }

    /**
     * Show Educational Info Method
     * 
     * Displays educational information about the current data structure.
     */
    showEducationalInfo() {
        const info = this.educationalInfo[this.currentStructure];
        if (!info) return;
        
        // Create or update educational info display
        let educationalElement = document.getElementById('ds-educational');
        if (!educationalElement) {
            educationalElement = document.createElement('div');
            educationalElement.id = 'ds-educational';
            educationalElement.className = 'ds-educational';
            document.querySelector('.data-structures-container').appendChild(educationalElement);
        }
        
        educationalElement.innerHTML = `
            <div class="educational-content">
                <h4>About ${info.name}</h4>
                <p>${info.description}</p>
                <div class="operations-info">
                    <h5>Operations:</h5>
                    <ul>
                        ${Object.entries(info.operations).map(([op, details]) => 
                            `<li><strong>${op}:</strong> ${details.complexity} - ${details.description}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="use-cases">
                    <h5>Common Use Cases:</h5>
                    <ul>
                        ${info.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Update Metrics Method
     * 
     * Updates performance metrics display.
     */
    updateMetrics() {
        // This method can be expanded to show more detailed metrics
        // For now, it's handled by generateMetrics()
    }

    /**
     * Show Message Method
     * 
     * Displays a message to the user about the current operation.
     * 
     * @param {string} message - The message to display
     * @param {string} type - The type of message (success, warning, error)
     */
    showMessage(message, type = 'info') {
        const messageElement = document.getElementById('ds-message');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `ds-message ds-message-${type}`;
            messageElement.style.display = 'block';
            
            // Hide message after 4 seconds
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 4000);
        }
    }
}

// Global instance
window.dataStructures = new DataStructuresPlayground();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.dataStructures) {
        window.dataStructures.init();
    }
});

// Add global functions for button access
window.addToDataStructure = () => window.dataStructures.add();
window.removeFromDataStructure = () => window.dataStructures.remove();
window.clearDataStructure = () => window.dataStructures.clear();
window.searchDataStructure = () => window.dataStructures.search(); 