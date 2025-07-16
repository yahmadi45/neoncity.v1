/**
 * Algorithm Visualizer for NeoCityOS
 * 
 * This module provides an interactive visualization system for various algorithms
 * including sorting, searching, and graph algorithms. It demonstrates algorithmic
 * concepts through animated visual representations on HTML5 Canvas.
 * 
 * Educational Objectives:
 * - Visualize algorithm execution step-by-step
 * - Demonstrate time complexity differences
 * - Show comparison and swap operations
 * - Provide interactive learning experience
 * 
 * Algorithms Implemented:
 * Sorting: Bubble Sort, Quick Sort, Merge Sort, Selection Sort
 * Searching: Linear Search, Binary Search
 * Graphs: Basic graph visualization
 * 
 * Time Complexities:
 * - Bubble Sort: O(n²) average and worst case
 * - Quick Sort: O(n log n) average, O(n²) worst case
 * - Merge Sort: O(n log n) average and worst case
 * - Selection Sort: O(n²) average and worst case
 * - Linear Search: O(n) average and worst case
 * - Binary Search: O(log n) average and worst case
 * 
 * @author NeoCityOS Development Team
 * @version 2.0.0
 */

/**
 * Algorithm Visualizer Class
 * 
 * Main class responsible for managing algorithm visualizations,
 * canvas rendering, and animation control.
 */
class AlgorithmVisualizer {
    /**
     * Constructor - Initialize Algorithm Visualizer
     * 
     * Sets up the core properties for algorithm visualization:
     * - Canvas and context for rendering
     * - Data array for algorithm operations
     * - Animation control variables
     * - Color scheme for visual states
     */
    constructor() {
        // Canvas elements for rendering
        this.canvas = null;
        this.ctx = null;
        
        // Data array that algorithms will operate on
        this.array = [];
        
        // Current algorithm selection (default: bubble sort)
        this.currentAlgorithm = 'bubble';
        this.currentAlgorithmType = 'sorting';
        
        // Animation control flag to prevent multiple simultaneous executions
        this.isRunning = false;
        this.isPaused = false;
        
        // Step counter for performance analysis
        this.steps = 0;
        
        // Animation speed in milliseconds (controls visualization pace)
        this.animationSpeed = 100;
        
        // Animation frame ID for cancellation
        this.animationFrameId = null;
        
        // Color scheme for different element states
        this.colors = {
            default: '#00f7ff',    // Default state (cyan)
            comparing: '#ff6b6b',  // Elements being compared (red)
            sorted: '#51cf66',     // Sorted elements (green)
            current: '#ffd43b',    // Current element being processed (yellow)
            pivot: '#ff8c00',      // Pivot element (orange)
            searching: '#9370db'   // Searching element (purple)
        };

        // Algorithm descriptions
        this.algorithmDescriptions = {
            'bubble': 'Bubble Sort: Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order. Time Complexity: O(n²)',
            'quick': 'Quick Sort: Divide-and-conquer algorithm that picks a pivot element and partitions the array around it. Time Complexity: O(n log n) average, O(n²) worst case',
            'merge': 'Merge Sort: Divide-and-conquer algorithm that recursively divides the array into halves, sorts them, and merges the sorted halves. Time Complexity: O(n log n)',
            'selection': 'Selection Sort: Simple sorting algorithm that repeatedly finds the minimum element from the unsorted portion and swaps it. Time Complexity: O(n²)',
            'linear': 'Linear Search: Sequential search algorithm that iterates through the array to find a target element. Time Complexity: O(n)',
            'binary': 'Binary Search: Divide-and-conquer search algorithm that requires the array to be sorted. Time Complexity: O(log n)',
            'dfs': 'Depth-First Search: Graph traversal algorithm that explores as far as possible along each branch before backtracking. Time Complexity: O(V + E)',
            'bfs': 'Breadth-First Search: Graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level. Time Complexity: O(V + E)'
        };

        // Pseudocode mapping for educational content
        this.pseudocode = {
            'bubble': `procedure bubbleSort(array)\n    n = length(array)\n    for i = 0 to n-1\n        for j = 0 to n-i-1\n            if array[j] > array[j+1]\n                swap(array[j], array[j+1])\n            end if\n        end for\n    end for\nend procedure`,
            'quick': `procedure quickSort(array, low, high)\n    if low < high\n        pi = partition(array, low, high)\n        quickSort(array, low, pi-1)\n        quickSort(array, pi+1, high)\n    end if\nend procedure`,
            'merge': `procedure mergeSort(array)\n    if length(array) > 1\n        mid = length(array) / 2\n        left = array[0..mid-1]\n        right = array[mid..end]\n        mergeSort(left)\n        mergeSort(right)\n        merge(left, right, array)\n    end if\nend procedure`,
            'selection': `procedure selectionSort(array)\n    n = length(array)\n    for i = 0 to n-1\n        minIndex = i\n        for j = i+1 to n-1\n            if array[j] < array[minIndex]\n                minIndex = j\n            end if\n        end for\n        swap(array[i], array[minIndex])\n    end for\nend procedure`,
            'linear': `procedure linearSearch(array, target)\n    for i = 0 to length(array)-1\n        if array[i] == target\n            return i\n        end if\n    end for\n    return -1\nend procedure`,
            'binary': `procedure binarySearch(array, target)\n    left = 0\n    right = length(array) - 1\n    while left <= right\n        mid = (left + right) / 2\n        if array[mid] == target\n            return mid\n        else if array[mid] < target\n            left = mid + 1\n        else\n            right = mid - 1\n        end if\n    end while\n    return -1\nend procedure`,
            'dfs': `procedure DFS(graph, v, visited)\n    visited[v] = true\n    for each neighbor u of v\n        if not visited[u]\n            DFS(graph, u, visited)\n        end if\n    end for\nend procedure`,
            'bfs': `procedure BFS(graph, start)\n    create queue Q\n    mark start as visited\n    enqueue start onto Q\n    while Q not empty\n        v = dequeue Q\n        for each neighbor u of v\n            if not visited[u]\n                mark u as visited\n                enqueue u onto Q\n            end if\n        end for\n    end while\nend procedure`
        };

        // Detailed time complexity mapping
        this.complexityDetails = {
            'bubble': { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' },
            'quick': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)' },
            'merge': { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' },
            'selection': { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)' },
            'linear': { best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
            'binary': { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
            'dfs': { best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)' },
            'bfs': { best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)' }
        };

        // Time complexity mapping
        this.complexities = {
            'bubble': 'O(n²)',
            'quick': 'O(n log n)',
            'merge': 'O(n log n)',
            'selection': 'O(n²)',
            'linear': 'O(n)',
            'binary': 'O(log n)',
            'dfs': 'O(V + E)',
            'bfs': 'O(V + E)'
        };

        // Algorithm configurations
        this.algorithmConfigs = {
            'sorting': [
                { value: 'bubble', text: 'Bubble Sort' },
                { value: 'quick', text: 'Quick Sort' },
                { value: 'merge', text: 'Merge Sort' },
                { value: 'selection', text: 'Selection Sort' }
            ],
            'searching': [
                { value: 'linear', text: 'Linear Search' },
                { value: 'binary', text: 'Binary Search' }
            ],
            'graphs': [
                { value: 'dfs', text: 'Depth-First Search' },
                { value: 'bfs', text: 'Breadth-First Search' }
            ]
        };
    }

    /**
     * Initialize Method
     * 
     * Sets up the canvas context and generates initial data array.
     * This method must be called after the DOM is loaded.
     */
    init() {
        try {
            console.log('AlgorithmVisualizer.init() called');
            this.canvas = document.getElementById('algorithm-canvas');
            console.log('Canvas element:', this.canvas);
            if (!this.canvas) {
                throw new Error('Canvas element not found');
            }
            this.ctx = this.canvas.getContext('2d');
            console.log('Canvas context:', this.ctx);
            if (!this.ctx) {
                throw new Error('Failed to get canvas context');
            }
            this.generateArray();
            this.draw();
            this.updateUI();
            this.updateStatus('Ready');
            console.log('AlgorithmVisualizer initialized successfully');
        } catch (error) {
            console.error('Error initializing AlgorithmVisualizer:', error);
            this.updateStatus(`Error: ${error.message}`);
            // User-visible error overlay
            if (window.ErrorManager && typeof window.ErrorManager.showSystemError === 'function') {
                window.ErrorManager.showSystemError('Failed to initialize Algorithm Visualizer: ' + error.message);
            } else {
                let overlay = document.getElementById('error-boundary');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'error-boundary';
                    overlay.className = 'error-boundary';
                    overlay.innerHTML = `<div class="error-content"><div class="error-icon">⚠️</div><h2>System Error</h2><p id="error-message">${error.message}</p><button id="error-retry" class="error-btn retry-btn">Retry</button></div>`;
                    document.body.appendChild(overlay);
                } else {
                    overlay.hidden = false;
                    document.getElementById('error-message').textContent = error.message;
                }
                document.getElementById('error-retry').onclick = () => { window.location.reload(); };
            }
        }
    }

    /**
     * Generate Array Method
     * 
     * Creates a new random array for algorithm visualization.
     * Generates 20 random integers between 10 and 210.
     * 
     * Algorithm:
     * 1. Clear existing array
     * 2. Generate 20 random integers
     * 3. Reset step counter
     * 4. Redraw visualization
     */
    generateArray() {
        try {
            this.array = [];
            const size = 20; // Fixed size for optimal visualization
            
            // Generate random integers between 10 and 210
            for (let i = 0; i < size; i++) {
                this.array.push(Math.floor(Math.random() * 200) + 10);
            }
            
            this.steps = 0; // Reset step counter
            this.draw();    // Update visualization
            this.updateStatus('Array generated');
            
        } catch (error) {
            console.error('Error generating array:', error);
            this.updateStatus('Error generating array');
        }
    }

    /**
     * Draw Method
     * 
     * Renders the current state of the array as a bar chart on canvas.
     * Displays algorithm information and step count.
     * 
     * Algorithm:
     * 1. Clear canvas with dark background
     * 2. Calculate bar dimensions based on array size
     * 3. Draw each array element as a colored bar
     * 4. Display element values below bars
     * 5. Show algorithm info and step count
     */
    draw(highlightedIndices = {}) {
        if (!this.ctx || !this.canvas) return;

        try {
            // Clear entire canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw dark background for cyberpunk theme
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Calculate bar dimensions
            const barWidth = this.canvas.width / this.array.length;
            const maxHeight = this.canvas.height - 50; // Leave space for text

            // Draw each array element as a bar
            this.array.forEach((value, index) => {
                // Calculate bar height proportional to value
                const height = (value / 210) * maxHeight;
                const x = index * barWidth;
                const y = this.canvas.height - height - 25;

                // Determine bar color and shadow based on highlighting
                let barColor = this.colors.default;
                let shadowColor = 'rgba(0,0,0,0)';
                let glow = false;
                if (highlightedIndices.comparing && highlightedIndices.comparing.includes(index)) {
                    barColor = this.colors.comparing;
                    shadowColor = 'rgba(255,107,107,0.7)';
                    glow = true;
                } else if (highlightedIndices.sorted && highlightedIndices.sorted.includes(index)) {
                    barColor = this.colors.sorted;
                    shadowColor = 'rgba(81,207,102,0.7)';
                    glow = true;
                } else if (highlightedIndices.current && highlightedIndices.current.includes(index)) {
                    barColor = this.colors.current;
                    shadowColor = 'rgba(255,212,59,0.7)';
                    glow = true;
                } else if (highlightedIndices.pivot && highlightedIndices.pivot.includes(index)) {
                    barColor = this.colors.pivot;
                    shadowColor = 'rgba(255,140,0,0.7)';
                    glow = true;
                } else if (highlightedIndices.searching && highlightedIndices.searching.includes(index)) {
                    barColor = this.colors.searching;
                    shadowColor = 'rgba(147,112,219,0.7)';
                    glow = true;
                }

                // Animate bar height (optional: could interpolate for smoother effect)
                this.ctx.save();
                if (glow) {
                    this.ctx.shadowColor = shadowColor;
                    this.ctx.shadowBlur = 20;
                } else {
                    this.ctx.shadowBlur = 0;
                }
                this.ctx.fillStyle = barColor;
                this.ctx.fillRect(x + 1, y, barWidth - 2, height);
                this.ctx.restore();

                // Draw value below bar (with better contrast for highlighted bars)
                this.ctx.save();
                this.ctx.font = '12px Orbitron';
                this.ctx.textAlign = 'center';
                if (glow) {
                    this.ctx.fillStyle = '#000';
                    this.ctx.globalAlpha = 0.7;
                    this.ctx.fillRect(x + barWidth / 2 - 18, this.canvas.height - 20, 36, 18);
                    this.ctx.globalAlpha = 1.0;
                    this.ctx.fillStyle = '#fff';
                } else {
                    this.ctx.fillStyle = '#ffffff';
                }
                this.ctx.fillText(value, x + barWidth / 2, this.canvas.height - 5);
                this.ctx.restore();
            });

            // Display algorithm information
            this.ctx.fillStyle = '#00f7ff';
            this.ctx.font = '16px Orbitron';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`Algorithm: ${this.currentAlgorithm}`, 10, 25);
            this.ctx.fillText(`Steps: ${this.steps}`, 10, 45);
            
            // Update UI elements
            this.updateUI();
        } catch (error) {
            console.error('Error drawing visualization:', error);
        }
    }

    /**
     * Start Visualization Method
     * 
     * Main entry point for running algorithm visualizations.
     * Routes to appropriate algorithm category based on user selection.
     * 
     * Algorithm:
     * 1. Check if visualization is already running
     * 2. Get selected algorithm type from UI
     * 3. Route to appropriate algorithm category
     * 4. Reset running flag when complete
     */
    async startVisualization() {
        if (this.isRunning) return; // Prevent multiple simultaneous executions

        try {
            this.isRunning = true;
            this.isPaused = false;
            this.updateButtonStates();
            this.updateStatus('Running');

            // Route to appropriate algorithm category
            switch (this.currentAlgorithmType) {
                case 'sorting':
                    await this.runSortingAlgorithm();
                    break;
                case 'searching':
                    await this.runSearchingAlgorithm();
                    break;
                case 'graphs':
                    await this.runGraphAlgorithm();
                    break;
                default:
                    throw new Error(`Unknown algorithm type: ${this.currentAlgorithmType}`);
            }

            this.updateStatus('Complete');
            
        } catch (error) {
            console.error('Error during visualization:', error);
            this.updateStatus(`Error: ${error.message}`);
        } finally {
            this.isRunning = false; // Reset flag when complete
            this.updateButtonStates();
        }
    }

    /**
     * Pause Visualization Method
     * 
     * Pauses the current algorithm execution.
     */
    pauseVisualization() {
        this.isPaused = true;
        this.updateButtonStates();
        this.updateStatus('Paused');
    }

    /**
     * Resume Visualization Method
     * 
     * Resumes the current algorithm execution.
     */
    resumeVisualization() {
        this.isPaused = false;
        this.updateButtonStates();
        this.updateStatus('Running');
    }

    /**
     * Toggle Pause Method
     * 
     * Toggles between pause and resume states.
     */
    togglePause() {
        if (this.isPaused) {
            this.resumeVisualization();
        } else {
            this.pauseVisualization();
        }
    }

    /**
     * Run Sorting Algorithm Method
     *
     * Routes to the selected sorting algorithm based on currentAlgorithm.
     * Supports four different sorting algorithms with different complexities.
     */
    async runSortingAlgorithm() {
        const algorithm = this.currentAlgorithm;
        switch (algorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'quick':
                await this.quickSort();
                break;
            case 'merge':
                await this.mergeSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            default:
                throw new Error(`Unknown sorting algorithm: ${algorithm}`);
        }
    }

    /**
     * Bubble Sort Algorithm
     *
     * @async
     * @description Simple sorting algorithm that repeatedly steps through the list,
     * compares adjacent elements and swaps them if they are in wrong order.
     * @complexity Time: O(n²) average/worst, Space: O(1)
     */
    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                while (this.isPaused) await this.sleep(100);
                this.draw({
                    comparing: [j, j + 1],
                    sorted: Array.from({length: i}, (_, k) => n - 1 - k)
                });
                await this.sleep(this.animationSpeed);
                if (this.array[j] > this.array[j + 1]) {
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.steps++;
                }
            }
        }
        this.draw({ sorted: Array.from({length: n}, (_, i) => i) });
    }

    /**
     * Quick Sort Algorithm
     *
     * @async
     * @description Divide-and-conquer algorithm that picks a pivot element and partitions
     * the array around it, then recursively sorts the sub-arrays.
     * @complexity Time: O(n log n) avg, O(n²) worst; Space: O(log n)
     */
    async quickSort() {
        await this.quickSortHelper(0, this.array.length - 1);
    }

    /**
     * Quick Sort Helper (recursive)
     * @private
     * @param {number} low
     * @param {number} high
     */
    async quickSortHelper(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSortHelper(low, pi - 1);
            await this.quickSortHelper(pi + 1, high);
        }
    }

    /**
     * Partition for Quick Sort
     * @private
     * @param {number} low
     * @param {number} high
     * @returns {number}
     */
    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            while (this.isPaused) await this.sleep(100);
            this.draw({ comparing: [j, high], pivot: [high], current: [j] });
            await this.sleep(this.animationSpeed);
            if (this.array[j] < pivot) {
                i++;
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.steps++;
            }
        }
        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.steps++;
        return i + 1;
    }

    /**
     * Merge Sort Algorithm
     *
     * @async
     * @description Divide-and-conquer algorithm that recursively divides the array
     * into halves, sorts them, and then merges the sorted halves.
     * @complexity Time: O(n log n) avg/worst, Space: O(n)
     */
    async mergeSort() {
        await this.mergeSortHelper(0, this.array.length - 1);
    }

    /**
     * Merge Sort Helper (recursive)
     * @private
     * @param {number} left
     * @param {number} right
     */
    async mergeSortHelper(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSortHelper(left, mid);
            await this.mergeSortHelper(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    /**
     * Merge for Merge Sort
     * @private
     * @param {number} left
     * @param {number} mid
     * @param {number} right
     */
    async merge(left, mid, right) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        while (i < leftArray.length && j < rightArray.length) {
            while (this.isPaused) await this.sleep(100);
            this.steps++;
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
            }
            k++;
            if (this.steps % 5 === 0) {
                this.draw({ comparing: [left + i, mid + 1 + j], current: [k - 1] });
                await this.sleep(this.animationSpeed);
            }
        }
        while (i < leftArray.length) {
            this.array[k] = leftArray[i]; i++; k++; this.steps++;
        }
        while (j < rightArray.length) {
            this.array[k] = rightArray[j]; j++; k++; this.steps++;
        }
        this.draw();
        await this.sleep(this.animationSpeed);
    }

    /**
     * Selection Sort Algorithm
     *
     * @async
     * @description Simple sorting algorithm that repeatedly finds the minimum element
     * from the unsorted portion and swaps it with the first element of the unsorted portion.
     * @complexity Time: O(n²) avg/worst, Space: O(1)
     */
    async selectionSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                while (this.isPaused) await this.sleep(100);
                this.draw({ comparing: [j, minIndex], sorted: Array.from({length: i}, (_, k) => k), current: [j] });
                await this.sleep(this.animationSpeed);
                if (this.array[j] < this.array[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [this.array[i], this.array[minIndex]] = [this.array[minIndex], this.array[i]];
                this.steps++;
            }
        }
        this.draw({ sorted: Array.from({length: n}, (_, i) => i) });
    }

    /**
     * Run Searching Algorithm Method
     *
     * Routes to the selected searching algorithm based on currentAlgorithm.
     * Supports two different searching algorithms with different complexities.
     */
    async runSearchingAlgorithm() {
        const target = Math.floor(Math.random() * 200) + 10;
        const algorithm = this.currentAlgorithm;
        switch (algorithm) {
            case 'linear':
                await this.linearSearch(target);
                break;
            case 'binary':
                await this.binarySearch(target);
                break;
            default:
                throw new Error(`Unknown searching algorithm: ${algorithm}`);
        }
    }

    /**
     * Linear Search Algorithm
     *
     * @async
     * @description Sequential search algorithm that iterates through the array
     * to find a target element.
     * @complexity Time: O(n) avg/worst, Space: O(1)
     * @param {number} target - The value to search for
     * @returns {number} - Index of target if found, -1 otherwise
     */
    async linearSearch(target) {
        for (let i = 0; i < this.array.length; i++) {
            while (this.isPaused) await this.sleep(100);
            this.steps++;
            this.draw({ searching: [i], current: [i] });
            await this.sleep(this.animationSpeed);
            if (this.array[i] === target) {
                this.draw({ sorted: [i] });
                this.updateStatus(`Found ${target} at index ${i}`);
                return i;
            }
        }
        this.updateStatus(`${target} not found`);
        return -1;
    }

    /**
     * Binary Search Algorithm
     *
     * @async
     * @description Divide-and-conquer search algorithm that requires the array to be sorted.
     * It repeatedly divides the search interval in half and compares the middle element.
     * @complexity Time: O(log n) avg/worst, Space: O(1)
     * @param {number} target - The value to search for
     * @returns {number} - Index of target if found, -1 otherwise
     */
    async binarySearch(target) {
        this.array.sort((a, b) => a - b);
        this.draw();
        let left = 0;
        let right = this.array.length - 1;
        while (left <= right) {
            while (this.isPaused) await this.sleep(100);
            const mid = Math.floor((left + right) / 2);
            this.steps++;
            const searchRange = Array.from({length: right - left + 1}, (_, i) => left + i);
            this.draw({ searching: searchRange, current: [mid] });
            await this.sleep(this.animationSpeed);
            if (this.array[mid] === target) {
                this.draw({ sorted: [mid] });
                this.updateStatus(`Found ${target} at index ${mid}`);
                return mid;
            } else if (this.array[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        this.updateStatus(`${target} not found`);
        return -1;
    }

    /**
     * Run Graph Algorithm Method
     *
     * Routes to the selected graph algorithm based on currentAlgorithm.
     * Supports DFS and BFS traversal algorithms.
     */
    async runGraphAlgorithm() {
        switch (this.currentAlgorithm) {
            case 'dfs':
                await this.depthFirstSearch();
                break;
            case 'bfs':
                await this.breadthFirstSearch();
                break;
            default:
                this.drawGraph();
        }
    }

    /**
     * Draw Graph Method
     *
     * @description Renders a basic graph visualization on the canvas.
     * @param {number[]} visitedNodes - Array of visited node IDs
     * @param {number[]} currentNodes - Array of current node IDs
     */
    drawGraph(visitedNodes = [], currentNodes = []) {
        if (!this.ctx || !this.canvas) return;
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            const nodes = [
                { x: 100, y: 100, value: 'A', id: 0 },
                { x: 300, y: 100, value: 'B', id: 1 },
                { x: 500, y: 100, value: 'C', id: 2 },
                { x: 200, y: 200, value: 'D', id: 3 },
                { x: 400, y: 200, value: 'E', id: 4 },
                { x: 600, y: 200, value: 'F', id: 5 }
            ];
            const edges = [[0, 1], [0, 3], [1, 2], [1, 4], [2, 5], [3, 4], [4, 5]];

            // Draw edges
            this.ctx.strokeStyle = '#00f7ff';
            this.ctx.lineWidth = 2;
            edges.forEach(([from, to]) => {
                this.ctx.beginPath();
                this.ctx.moveTo(nodes[from].x, nodes[from].y);
                this.ctx.lineTo(nodes[to].x, nodes[to].y);
                this.ctx.stroke();
            });

            // Draw nodes
            nodes.forEach(node => {
                let nodeColor = '#00f7ff';
                if (currentNodes.includes(node.id)) {
                    nodeColor = this.colors.current;
                } else if (visitedNodes.includes(node.id)) {
                    nodeColor = this.colors.sorted;
                }
                this.ctx.fillStyle = nodeColor;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.fillStyle = '#000000';
                this.ctx.font = '16px Orbitron';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(node.value, node.x, node.y + 5);
            });
            this.updateUI();
        } catch (error) {
            console.error('Error drawing graph:', error);
        }
    }

    /**
     * Depth-First Search Algorithm
     *
     * @async
     * @description Graph traversal algorithm that explores as far as possible
     * along each branch before backtracking.
     * @complexity Time: O(V + E), Space: O(V)
     */
    async depthFirstSearch() {
        const graph = {
            0: [1, 3], 1: [0, 2, 4], 2: [1, 5],
            3: [0, 4], 4: [1, 3, 5], 5: [2, 4]
        };
        const visited = new Set();
        const stack = [0];
        while (stack.length > 0) {
            while (this.isPaused) await this.sleep(100);
            const current = stack.pop();
            if (!visited.has(current)) {
                visited.add(current);
                this.steps++;
                this.drawGraph(Array.from(visited), [current]);
                await this.sleep(this.animationSpeed);
                const neighbors = graph[current] || [];
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    if (!visited.has(neighbors[i])) {
                        stack.push(neighbors[i]);
                    }
                }
            }
        }
        this.drawGraph(Array.from(visited), []);
        this.updateStatus('DFS Complete');
    }

    /**
     * Breadth-First Search Algorithm
     *
     * @async
     * @description Graph traversal algorithm that explores all vertices at the
     * present depth before moving to vertices at the next depth level.
     * @complexity Time: O(V + E), Space: O(V)
     */
    async breadthFirstSearch() {
        const graph = {
            0: [1, 3], 1: [0, 2, 4], 2: [1, 5],
            3: [0, 4], 4: [1, 3, 5], 5: [2, 4]
        };
        const visited = new Set();
        const queue = [0];
        while (queue.length > 0) {
            while (this.isPaused) await this.sleep(100);
            const current = queue.shift();
            if (!visited.has(current)) {
                visited.add(current);
                this.steps++;
                this.drawGraph(Array.from(visited), [current]);
                await this.sleep(this.animationSpeed);
                const neighbors = graph[current] || [];
                neighbors.forEach(neighbor => {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                });
            }
        }
        this.drawGraph(Array.from(visited), []);
        this.updateStatus('BFS Complete');
    }

    /**
     * Reset Method
     *
     * @description Resets the visualization state to its initial state.
     */
    reset() {
        try {
            this.isRunning = false;
            this.isPaused = false;
            this.steps = 0;
            this.updateButtonStates();
            this.updateStatus('Ready');
            this.generateArray();
        } catch (error) {
            console.error('Error resetting visualization:', error);
            this.updateStatus('Error resetting');
        }
    }

    /**
     * Sleep Method
     *
     * @description Pauses the execution for a specified number of milliseconds.
     * @param {number} ms - Number of milliseconds to sleep
     * @returns {Promise} - A promise that resolves after the sleep duration
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set Algorithm Method
     *
     * @description Updates the current algorithm and updates the time complexity display.
     * @param {string} algorithm - The name of the algorithm to set
     */
    setAlgorithm(algorithm) {
        this.currentAlgorithm = algorithm;
        this.updateComplexity();
    }

    /**
     * Update Complexity Method
     * 
     * Updates the time complexity display in the UI based on the current algorithm.
     * 
     * Algorithm:
     * 1. Get the complexity element from the UI
     * 2. Define a dictionary of complexities for different algorithms
     * 3. Update the text content of the complexity element
     */
    updateComplexity() {
        try {
            const complexityElement = document.getElementById('time-complexity');
            if (complexityElement) {
                complexityElement.textContent = this.complexities[this.currentAlgorithm] || 'O(n)';
            }
        } catch (error) {
            console.error('Error updating complexity:', error);
        }
    }

    /**
     * Update UI Method
     * 
     * Updates all UI elements with current state information.
     */
    updateUI() {
        try {
            // Update steps counter with animation
            const stepsElement = document.getElementById('current-steps');
            if (stepsElement) {
                const oldSteps = parseInt(stepsElement.textContent) || 0;
                const newSteps = this.steps;
                
                if (oldSteps !== newSteps) {
                    // Add animation class
                    stepsElement.classList.add('numberPulse');
                    stepsElement.textContent = newSteps;
                    
                    // Remove animation class after animation completes
                    setTimeout(() => {
                        stepsElement.classList.remove('numberPulse');
                    }, 1000);
                }
            }

            // Update algorithm description
            const descElement = document.getElementById('algorithm-description');
            if (descElement) {
                descElement.textContent = this.algorithmDescriptions[this.currentAlgorithm] || '';
            }

            // Update complexity
            this.updateComplexity();

            // Update steps progress bar
            const progressBar = document.getElementById('steps-progress');
            if (progressBar && this.array && this.array.length) {
                // Estimate max steps for progress (roughly n^2 for bubble/selection, n*logn for quick/merge)
                let maxSteps = 0;
                switch (this.currentAlgorithm) {
                    case 'bubble':
                    case 'selection':
                        maxSteps = this.array.length * this.array.length;
                        break;
                    case 'quick':
                    case 'merge':
                        maxSteps = this.array.length * Math.ceil(Math.log2(this.array.length));
                        break;
                    default:
                        maxSteps = 100;
                }
                const percent = Math.min(100, Math.round((this.steps / maxSteps) * 100));
                progressBar.style.width = percent + '%';
                progressBar.setAttribute('aria-valuenow', percent);
                progressBar.setAttribute('aria-valuemax', '100');
                progressBar.setAttribute('aria-valuemin', '0');
            }

            // Update pseudocode
            const pseudocodeElement = document.getElementById('pseudocode');
            if (pseudocodeElement) {
                pseudocodeElement.textContent = this.pseudocode[this.currentAlgorithm] || '';
            }

            // Update detailed complexity
            const bestElem = document.getElementById('best-complexity');
            const avgElem = document.getElementById('avg-complexity');
            const worstElem = document.getElementById('worst-complexity');
            const details = this.complexityDetails[this.currentAlgorithm];
            if (bestElem && details) bestElem.textContent = details.best;
            if (avgElem && details) avgElem.textContent = details.avg;
            if (worstElem && details) worstElem.textContent = details.worst;
        } catch (error) {
            console.error('Error updating UI:', error);
        }
    }

    /**
     * Update Status Method
     * 
     * Updates the status display in the UI and ARIA live region for accessibility.
     * 
     * @param {string} status - The status message to display
     */
    updateStatus(status) {
        try {
            const statusElement = document.getElementById('algorithm-status');
            const statusIndicator = document.getElementById('status-indicator');
            
            if (statusElement) {
                statusElement.textContent = status;
                
                // Remove all status classes
                statusElement.classList.remove('running', 'completed', 'paused', 'error');
                if (statusIndicator) {
                    statusIndicator.classList.remove('running', 'completed', 'paused', 'error');
                }
                
                // Add appropriate status class based on status text
                const statusLower = status.toLowerCase();
                if (statusLower.includes('running') || statusLower.includes('executing')) {
                    statusElement.classList.add('running');
                    if (statusIndicator) statusIndicator.classList.add('running');
                } else if (statusLower.includes('completed') || statusLower.includes('finished') || statusLower.includes('done')) {
                    statusElement.classList.add('completed');
                    if (statusIndicator) statusIndicator.classList.add('completed');
                } else if (statusLower.includes('paused') || statusLower.includes('stopped')) {
                    statusElement.classList.add('paused');
                    if (statusIndicator) statusIndicator.classList.add('paused');
                } else if (statusLower.includes('error') || statusLower.includes('failed')) {
                    statusElement.classList.add('error');
                    if (statusIndicator) statusIndicator.classList.add('error');
                }
            }
            
            // ARIA live region for screen readers
            let liveRegion = document.getElementById('algorithm-status-live');
            if (!liveRegion) {
                liveRegion = document.createElement('div');
                liveRegion.id = 'algorithm-status-live';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.style.position = 'absolute';
                liveRegion.style.left = '-9999px';
                document.body.appendChild(liveRegion);
            }
            liveRegion.textContent = status;
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    /**
     * Update Button States Method
     * 
     * Manages the visibility and state of control buttons based on current algorithm status.
     * Provides visual feedback for user interactions and prevents conflicting operations.
     * 
     * Algorithm:
     * 1. Get references to all control buttons
     * 2. Update start button visibility and text based on running state
     * 3. Update pause button visibility and text based on pause state
     * 4. Update reset button state based on current status
     * 5. Handle both old and new button IDs for compatibility
     */
    updateButtonStates() {
        try {
            // Get button references (handle both old and new IDs)
            const startBtn = document.getElementById('start-btn') || document.getElementById('start-btn-under');
            const pauseBtn = document.getElementById('pause-btn') || document.getElementById('pause-btn-under');
            const resetBtn = document.getElementById('reset-btn') || document.getElementById('reset-btn-under');
            const generateBtn = document.getElementById('generate-array-btn');
            
            if (startBtn) {
                if (this.isRunning) {
                    startBtn.style.display = 'none';
                    startBtn.disabled = true;
                } else {
                    startBtn.style.display = 'inline-block';
                    startBtn.disabled = false;
                }
            } else {
                console.warn('Start button not found.');
            }
            
            if (pauseBtn) {
                if (this.isRunning) {
                    pauseBtn.style.display = 'inline-block';
                    pauseBtn.disabled = false;
                    pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
                    pauseBtn.classList.remove('pause-btn-hidden');
                } else {
                    pauseBtn.style.display = 'none';
                    pauseBtn.disabled = true;
                    if (!pauseBtn.classList.contains('pause-btn-hidden')) {
                        pauseBtn.classList.add('pause-btn-hidden');
                    }
                }
            } else {
                console.warn('Pause button not found.');
            }
            
            if (resetBtn) {
                resetBtn.disabled = this.isRunning;
            } else {
                console.warn('Reset button not found.');
            }
            
            if (generateBtn) {
                generateBtn.disabled = this.isRunning;
            } else {
                console.warn('Generate Array button not found.');
            }
            
        } catch (error) {
            console.error('Error updating button states:', error);
        }
    }

    /**
     * Algorithm Type Change Handler
     * 
     * Handles changes to the algorithm type dropdown.
     */
    onAlgorithmTypeChange() {
        try {
            // Get value from custom dropdown
            const selectedType = document.getElementById('algorithm-type-selected');
            const algorithmType = selectedType ? selectedType.dataset.value : 'sorting';
            this.currentAlgorithmType = algorithmType;

            // Update specific algorithm custom dropdown
            const specificAlgorithmList = document.getElementById('specific-algorithm-list');
            const specificAlgorithmSelected = document.getElementById('specific-algorithm-selected');
            if (specificAlgorithmList && specificAlgorithmSelected) {
                specificAlgorithmList.innerHTML = '';
                const algorithms = this.algorithmConfigs[algorithmType] || [];
                algorithms.forEach(alg => {
                    const option = document.createElement('div');
                    option.className = 'dropdown-option';
                    option.dataset.value = alg.value;
                    option.textContent = alg.text;
                    specificAlgorithmList.appendChild(option);
                });
                // Set first algorithm as default
                if (algorithms.length > 0) {
                    this.currentAlgorithm = algorithms[0].value;
                    specificAlgorithmSelected.textContent = algorithms[0].text;
                    specificAlgorithmSelected.dataset.value = algorithms[0].value;
                    this.updateUI();
                }
                // Handle special case for graph algorithms
                if (algorithmType === 'graphs') {
                    this.drawGraph();
                    this.updateStatus('Graph visualization ready');
                } else {
                    this.generateArray();
                }
            }
        } catch (error) {
            console.error('Error handling algorithm type change:', error);
        }
    }

    /**
     * Specific Algorithm Change Handler
     * 
     * Handles changes to the specific algorithm dropdown.
     */
    onSpecificAlgorithmChange() {
        try {
            // Get value from custom dropdown
            const specificAlgorithmSelected = document.getElementById('specific-algorithm-selected');
            if (specificAlgorithmSelected) {
                this.currentAlgorithm = specificAlgorithmSelected.dataset.value;
                this.updateUI();
                if (this.currentAlgorithmType === 'graphs') {
                    this.drawGraph();
                    this.updateStatus('Graph visualization ready');
                }
            }
        } catch (error) {
            console.error('Error handling specific algorithm change:', error);
        }
    }

    /**
     * Speed Change Handler
     *
     * Handles changes to the speed slider.
     */
    onSpeedChange() {
        try {
            // Handle both old and new speed sliders
            const speedSlider = document.getElementById('speed-slider') || document.getElementById('speed-slider-under');
            const speedValue = document.getElementById('speed-value') || document.getElementById('speed-value-under');
            
            if (speedSlider && speedValue) {
                this.animationSpeed = parseInt(speedSlider.value);
                speedValue.textContent = `${this.animationSpeed}ms`;
                
                // Update both speed displays if they exist
                const oldSpeedValue = document.getElementById('speed-value');
                const newSpeedValue = document.getElementById('speed-value-under');
                if (oldSpeedValue) oldSpeedValue.textContent = `${this.animationSpeed}ms`;
                if (newSpeedValue) newSpeedValue.textContent = `${this.animationSpeed}ms`;
            }
        } catch (error) {
            console.error('Error handling speed change:', error);
        }
    }
}

// Global instance - use consistent naming
window.algorithmVisualizer = new AlgorithmVisualizer();
// Also create alias for compatibility with inline code
window.visualizer = window.algorithmVisualizer;

// Remove old goBackToOS definition and replace with centralized logic
window.goBackToOS = function() {
    try {
        if (window.appManager && typeof window.appManager.closeApp === 'function') {
            window.appManager.closeApp('algorithm');
        } else if (window.parent && window.parent !== window) {
            if (typeof window.parent.closeApp === 'function') {
                window.parent.closeApp('algorithm');
            } else if (typeof window.parent.appManager !== 'undefined' && typeof window.parent.appManager.closeApp === 'function') {
                window.parent.appManager.closeApp('algorithm');
            } else if (typeof window.parent.showDesktop === 'function') {
                window.parent.showDesktop();
            } else {
                window.parent.location.href = 'index.html';
            }
        } else {
            window.location.href = 'index.html';
        }
    } catch (e) {
        if (window.ErrorManager && typeof window.ErrorManager.showSystemError === 'function') {
            window.ErrorManager.showSystemError('Could not return to OS.');
        } else {
            alert('Could not return to OS.');
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (window.algorithmVisualizer) {
            window.algorithmVisualizer.init();
        }
        
        // Add keyboard shortcuts for standalone version
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case ' ':
                    e.preventDefault();
                    if (window.algorithmVisualizer && window.algorithmVisualizer.isRunning) {
                        window.algorithmVisualizer.togglePause();
                    }
                    break;
                case 'r':
                case 'R':
                    if (window.algorithmVisualizer) {
                        window.algorithmVisualizer.reset();
                    }
                    break;
                case 's':
                case 'S':
                    if (window.algorithmVisualizer && !window.algorithmVisualizer.isRunning) {
                        window.algorithmVisualizer.startVisualization();
                    }
                    break;
                case 'Escape':
                    window.goBackToOS();
                    break;
            }
        });
        
        // Add keyboard shortcuts info
        const shortcutsInfo = document.createElement('div');
        shortcutsInfo.className = 'features-list';
        shortcutsInfo.innerHTML = `
            <h3>⌨️ Keyboard Shortcuts</h3>
            <ul style="color: #ffffff;">
                <li><strong>Spacebar:</strong> Pause/Resume algorithm execution</li>
                <li><strong>R:</strong> Reset visualization</li>
                <li><strong>S:</strong> Start algorithm execution</li>
                <li><strong>Escape:</strong> Back to NeoCityOS</li>
            </ul>
        `;
        const container = document.querySelector('.algorithm-container');
        if (container) {
            container.appendChild(shortcutsInfo);
        }
    } catch (error) {
        console.error('Error during DOM initialization:', error);
    }
});

// Also initialize when script loads (for dynamic loading)
if (document.readyState === 'loading') {
    // DOM not ready yet, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        if (window.algorithmVisualizer) {
            window.algorithmVisualizer.init();
        }
    });
} else {
    // DOM already ready, initialize immediately
    if (window.algorithmVisualizer) {
        window.algorithmVisualizer.init();
    }
} 