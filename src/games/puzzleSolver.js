// Enhanced Puzzle Solver for NeoCityOS
class PuzzleSolver {
    constructor() {
        this.currentPuzzle = 'sudoku';
        this.difficulty = 'medium';
        this.sudokuBoard = [];
        this.eightPuzzleBoard = [];
        this.crosswordBoard = [];
        this.slidingPuzzleBoard = [];
        this.solution = null;
        this.isSolving = false;
        this.solveSteps = [];
        this.currentStep = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.score = 0;
        this.hints = 3;
        this.animations = true;
    }

    init() {
        this.loadPuzzleState();
        this.setupEventListeners();
        this.newPuzzle();
        this.startTimer();
    }

    loadPuzzleState() {
        const saved = localStorage.getItem('puzzleSolverState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentPuzzle = state.currentPuzzle || 'sudoku';
            this.difficulty = state.difficulty || 'medium';
            this.score = state.score || 0;
            this.hints = state.hints || 3;
        }
    }

    savePuzzleState() {
        const state = {
            currentPuzzle: this.currentPuzzle,
            difficulty: this.difficulty,
            score: this.score,
            hints: this.hints
        };
        localStorage.setItem('puzzleSolverState', JSON.stringify(state));
    }

    setupEventListeners() {
        // Puzzle type selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('puzzle-type-btn')) {
                const type = e.target.dataset.type;
                this.setPuzzleType(type);
            }
            
            if (e.target.classList.contains('difficulty-btn')) {
                const difficulty = e.target.dataset.difficulty;
                this.setDifficulty(difficulty);
            }
        });

        // Control buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('solve-btn')) {
                this.solve();
            }
            if (e.target.classList.contains('new-puzzle-btn')) {
                this.newPuzzle();
            }
            if (e.target.classList.contains('hint-btn')) {
                this.useHint();
            }
            if (e.target.classList.contains('reset-btn')) {
                this.reset();
            }
            if (e.target.classList.contains('step-btn')) {
                this.showNextStep();
            }
        });
    }

    setPuzzleType(type) {
        this.currentPuzzle = type;
        this.savePuzzleState();
        this.newPuzzle();
        this.updateUI();
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.savePuzzleState();
        this.newPuzzle();
        this.updateUI();
    }

    updateUI() {
        // Update active buttons
        document.querySelectorAll('.puzzle-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-type="${this.currentPuzzle}"]`).classList.add('active');

        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-difficulty="${this.difficulty}"]`).classList.add('active');

        // Update stats
        this.updateStats();
    }

    updateStats() {
        const statsElement = document.getElementById('puzzle-stats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Score:</span>
                    <span class="stat-value">${this.score}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Hints:</span>
                    <span class="stat-value">${this.hints}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Time:</span>
                    <span class="stat-value" id="timer-display">${this.formatTime(this.timer)}</span>
                </div>
            `;
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            const timerDisplay = document.getElementById('timer-display');
            if (timerDisplay) {
                timerDisplay.textContent = this.formatTime(this.timer);
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    newPuzzle() {
        this.stopTimer();
        this.timer = 0;
        this.startTimer();
        this.isSolving = false;
        this.solveSteps = [];
        this.currentStep = 0;

        switch (this.currentPuzzle) {
            case 'sudoku':
                this.generateSudokuPuzzle();
                break;
            case '8puzzle':
                this.generateEightPuzzle();
                break;
            case 'crossword':
                this.generateCrosswordPuzzle();
                break;
            case 'sliding':
                this.generateSlidingPuzzle();
                break;
        }
        this.renderPuzzle();
        this.updateUI();
    }

    // Enhanced Sudoku Puzzle
    generateSudokuPuzzle() {
        this.sudokuBoard = this.generateSolvedSudoku();
        
        const puzzle = this.sudokuBoard.map(row => [...row]);
        let cellsToRemove;
        
        switch (this.difficulty) {
            case 'easy': cellsToRemove = 30; break;
            case 'medium': cellsToRemove = 45; break;
            case 'hard': cellsToRemove = 55; break;
            case 'expert': cellsToRemove = 64; break;
            default: cellsToRemove = 45;
        }
        
        for (let i = 0; i < cellsToRemove; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
            } else {
                i--; // Try again
            }
        }
        
        this.sudokuBoard = puzzle;
        this.solution = this.generateSolvedSudoku();
    }

    generateSolvedSudoku() {
        const board = Array(9).fill().map(() => Array(9).fill(0));
        
        // Fill diagonal boxes first
        for (let i = 0; i < 9; i += 4) {
            this.fillBox(board, i, i);
        }
        
        // Solve the rest
        this.solveSudoku(board);
        return board;
    }

    fillBox(board, row, col) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                board[row + i][col + j] = numbers[randomIndex];
                numbers.splice(randomIndex, 1);
            }
        }
    }

    solveSudoku(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (this.isValidSudokuMove(board, row, col, num)) {
                            board[row][col] = num;
                            if (this.solveSudoku(board)) {
                                return true;
                            }
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    isValidSudokuMove(board, row, col, num) {
        // Check row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num) return false;
        }
        
        // Check column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num) return false;
        }
        
        // Check box
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i + startRow][j + startCol] === num) return false;
            }
        }
        
        return true;
    }

    // Enhanced 8-Puzzle
    generateEightPuzzle() {
        this.eightPuzzleBoard = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        this.shuffleEightPuzzle();
    }

    shuffleEightPuzzle() {
        let moves = 0;
        const maxMoves = this.difficulty === 'easy' ? 50 : 
                        this.difficulty === 'medium' ? 100 :
                        this.difficulty === 'hard' ? 150 : 200;
        
        while (moves < maxMoves) {
            const emptyIndex = this.eightPuzzleBoard.indexOf(0);
            const possibleMoves = this.getPossibleMoves(emptyIndex);
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveEightPuzzle(randomMove);
            moves++;
        }
    }

    getPossibleMoves(emptyIndex) {
        const moves = [];
        const row = Math.floor(emptyIndex / 3);
        const col = emptyIndex % 3;
        
        if (row > 0) moves.push(emptyIndex - 3);
        if (row < 2) moves.push(emptyIndex + 3);
        if (col > 0) moves.push(emptyIndex - 1);
        if (col < 2) moves.push(emptyIndex + 1);
        
        return moves;
    }

    moveEightPuzzle(index) {
        const emptyIndex = this.eightPuzzleBoard.indexOf(0);
        if (this.getPossibleMoves(emptyIndex).includes(index)) {
            [this.eightPuzzleBoard[emptyIndex], this.eightPuzzleBoard[index]] = 
            [this.eightPuzzleBoard[index], this.eightPuzzleBoard[emptyIndex]];
        }
    }

    // Enhanced Crossword
    generateCrosswordPuzzle() {
        const wordLists = {
            easy: ['HELLO', 'WORLD', 'GAME', 'FUN'],
            medium: ['PUZZLE', 'SOLVER', 'LOGIC', 'BRAIN', 'THINK'],
            hard: ['ALGORITHM', 'COMPLEXITY', 'OPTIMIZATION', 'EFFICIENCY'],
            expert: ['COMPUTATIONAL', 'MATHEMATICAL', 'PROBLEM_SOLVING', 'LOGICAL_REASONING']
        };
        
        const words = wordLists[this.difficulty] || wordLists.medium;
        this.crosswordBoard = this.createCrosswordGrid(words);
    }

    createCrosswordGrid(words) {
        const size = this.difficulty === 'easy' ? 12 : 
                    this.difficulty === 'medium' ? 15 :
                    this.difficulty === 'hard' ? 18 : 20;
        
        const grid = Array(size).fill().map(() => Array(size).fill(''));
        
        words.forEach((word, index) => {
            if (index % 2 === 0) {
                // Place horizontally
                const row = Math.floor(index / 2) * 2 + 2;
                const col = 2;
                for (let i = 0; i < word.length && col + i < size; i++) {
                    grid[row][col + i] = word[i];
                }
            } else {
                // Place vertically
                const row = 2;
                const col = Math.floor(index / 2) * 2 + 2;
                for (let i = 0; i < word.length && row + i < size; i++) {
                    grid[row + i][col] = word[i];
                }
            }
        });
        
        return grid;
    }

    // New Sliding Puzzle
    generateSlidingPuzzle() {
        const size = this.difficulty === 'easy' ? 3 :
                    this.difficulty === 'medium' ? 4 :
                    this.difficulty === 'hard' ? 5 : 6;
        
        this.slidingPuzzleBoard = [];
        for (let i = 1; i < size * size; i++) {
            this.slidingPuzzleBoard.push(i);
        }
        this.slidingPuzzleBoard.push(0); // Empty space
        
        this.shuffleSlidingPuzzle();
    }

    shuffleSlidingPuzzle() {
        const moves = this.difficulty === 'easy' ? 30 :
                     this.difficulty === 'medium' ? 50 :
                     this.difficulty === 'hard' ? 80 : 120;
        
        for (let i = 0; i < moves; i++) {
            const emptyIndex = this.slidingPuzzleBoard.indexOf(0);
            const possibleMoves = this.getSlidingPossibleMoves(emptyIndex);
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveSlidingPuzzle(randomMove);
        }
    }

    getSlidingPossibleMoves(emptyIndex) {
        const size = Math.sqrt(this.slidingPuzzleBoard.length);
        const row = Math.floor(emptyIndex / size);
        const col = emptyIndex % size;
        const moves = [];
        
        if (row > 0) moves.push(emptyIndex - size);
        if (row < size - 1) moves.push(emptyIndex + size);
        if (col > 0) moves.push(emptyIndex - 1);
        if (col < size - 1) moves.push(emptyIndex + 1);
        
        return moves;
    }

    moveSlidingPuzzle(index) {
        const emptyIndex = this.slidingPuzzleBoard.indexOf(0);
        if (this.getSlidingPossibleMoves(emptyIndex).includes(index)) {
            [this.slidingPuzzleBoard[emptyIndex], this.slidingPuzzleBoard[index]] = 
            [this.slidingPuzzleBoard[index], this.slidingPuzzleBoard[emptyIndex]];
        }
    }

    renderPuzzle() {
        const display = document.getElementById('puzzle-display');
        if (!display) return;

        display.innerHTML = `
            <div class="puzzle-container">
                <div class="puzzle-header">
                    <h3>${this.getPuzzleTitle()}</h3>
                    <div class="puzzle-controls">
                        <button class="control-btn new-puzzle-btn">New Puzzle</button>
                        <button class="control-btn solve-btn">Solve</button>
                        <button class="control-btn hint-btn" ${this.hints <= 0 ? 'disabled' : ''}>Hint (${this.hints})</button>
                        <button class="control-btn reset-btn">Reset</button>
                    </div>
                </div>
                <div class="puzzle-board">
                    ${this.renderCurrentPuzzle()}
                </div>
                <div class="puzzle-info">
                    <div id="puzzle-stats"></div>
                    <div class="difficulty-controls">
                        <button class="difficulty-btn ${this.difficulty === 'easy' ? 'active' : ''}" data-difficulty="easy">Easy</button>
                        <button class="difficulty-btn ${this.difficulty === 'medium' ? 'active' : ''}" data-difficulty="medium">Medium</button>
                        <button class="difficulty-btn ${this.difficulty === 'hard' ? 'active' : ''}" data-difficulty="hard">Hard</button>
                        <button class="difficulty-btn ${this.difficulty === 'expert' ? 'active' : ''}" data-difficulty="expert">Expert</button>
                    </div>
                </div>
            </div>
        `;

        this.updateStats();
        this.setupPuzzleEventListeners();
    }

    getPuzzleTitle() {
        const titles = {
            'sudoku': 'Sudoku Puzzle',
            '8puzzle': '8-Puzzle',
            'crossword': 'Crossword Puzzle',
            'sliding': 'Sliding Puzzle'
        };
        return titles[this.currentPuzzle] || 'Puzzle';
    }

    renderCurrentPuzzle() {
        switch (this.currentPuzzle) {
            case 'sudoku':
                return this.renderSudoku();
            case '8puzzle':
                return this.renderEightPuzzle();
            case 'crossword':
                return this.renderCrossword();
            case 'sliding':
                return this.renderSlidingPuzzle();
            default:
                return '<p>Select a puzzle type</p>';
        }
    }

    renderSudoku() {
        let html = '<div class="sudoku-board">';
        for (let i = 0; i < 9; i++) {
            html += '<div class="sudoku-row">';
            for (let j = 0; j < 9; j++) {
                const value = this.sudokuBoard[i][j];
                const isOriginal = value !== 0;
                const cellClass = isOriginal ? 'sudoku-cell original' : 'sudoku-cell editable';
                const boxClass = this.getSudokuBoxClass(i, j);
                html += `<div class="${cellClass} ${boxClass}" data-row="${i}" data-col="${j}">`;
                if (value === 0) {
                    html += '<input type="number" min="1" max="9" class="sudoku-input" placeholder="">';
                } else {
                    html += `<span>${value}</span>`;
                }
                html += '</div>';
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    getSudokuBoxClass(row, col) {
        const boxRow = Math.floor(row / 3);
        const boxCol = Math.floor(col / 3);
        return `box-${boxRow}-${boxCol}`;
    }

    renderEightPuzzle() {
        let html = '<div class="eight-puzzle-board">';
        for (let i = 0; i < 9; i++) {
            const value = this.eightPuzzleBoard[i];
            const cellClass = value === 0 ? 'puzzle-cell empty' : 'puzzle-cell';
            html += `<div class="${cellClass}" data-index="${i}">`;
            html += value === 0 ? '<span class="empty-symbol">●</span>' : value;
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    renderCrossword() {
        const size = this.crosswordBoard.length;
        let html = '<div class="crossword-board">';
        for (let i = 0; i < size; i++) {
            html += '<div class="crossword-row">';
            for (let j = 0; j < size; j++) {
                const value = this.crosswordBoard[i][j];
                const cellClass = value === '' ? 'crossword-cell empty' : 'crossword-cell filled';
                html += `<div class="${cellClass}" data-row="${i}" data-col="${j}">`;
                html += value === '' ? '' : value;
                html += '</div>';
            }
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    renderSlidingPuzzle() {
        const size = Math.sqrt(this.slidingPuzzleBoard.length);
        let html = `<div class="sliding-puzzle-board" style="grid-template-columns: repeat(${size}, 1fr);">`;
        for (let i = 0; i < this.slidingPuzzleBoard.length; i++) {
            const value = this.slidingPuzzleBoard[i];
            const cellClass = value === 0 ? 'sliding-cell empty' : 'sliding-cell';
            html += `<div class="${cellClass}" data-index="${i}">`;
            html += value === 0 ? '<span class="empty-symbol">●</span>' : value;
            html += '</div>';
        }
        html += '</div>';
        return html;
    }

    setupPuzzleEventListeners() {
        // Sudoku input handling
        document.querySelectorAll('.sudoku-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= 9) {
                    const row = parseInt(e.target.parentElement.dataset.row);
                    const col = parseInt(e.target.parentElement.dataset.col);
                    this.sudokuBoard[row][col] = value;
                    this.checkSudokuCompletion();
                }
            });
        });

        // 8-Puzzle click handling
        document.querySelectorAll('.eight-puzzle-board .puzzle-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.moveEightPuzzle(index);
                this.renderPuzzle();
                this.checkEightPuzzleCompletion();
            });
        });

        // Sliding puzzle click handling
        document.querySelectorAll('.sliding-puzzle-board .sliding-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.moveSlidingPuzzle(index);
                this.renderPuzzle();
                this.checkSlidingPuzzleCompletion();
            });
        });
    }

    checkSudokuCompletion() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.sudokuBoard[i][j] === 0) return;
            }
        }
        
        // Check if solution is correct
        if (this.isSudokuValid()) {
            this.puzzleCompleted();
        }
    }

    isSudokuValid() {
        // Check rows
        for (let row = 0; row < 9; row++) {
            const seen = new Set();
            for (let col = 0; col < 9; col++) {
                if (seen.has(this.sudokuBoard[row][col])) return false;
                seen.add(this.sudokuBoard[row][col]);
            }
        }
        
        // Check columns
        for (let col = 0; col < 9; col++) {
            const seen = new Set();
            for (let row = 0; row < 9; row++) {
                if (seen.has(this.sudokuBoard[row][col])) return false;
                seen.add(this.sudokuBoard[row][col]);
            }
        }
        
        // Check boxes
        for (let boxRow = 0; boxRow < 3; boxRow++) {
            for (let boxCol = 0; boxCol < 3; boxCol++) {
                const seen = new Set();
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const value = this.sudokuBoard[boxRow * 3 + i][boxCol * 3 + j];
                        if (seen.has(value)) return false;
                        seen.add(value);
                    }
                }
            }
        }
        
        return true;
    }

    checkEightPuzzleCompletion() {
        const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        if (JSON.stringify(this.eightPuzzleBoard) === JSON.stringify(goal)) {
            this.puzzleCompleted();
        }
    }

    checkSlidingPuzzleCompletion() {
        const size = this.slidingPuzzleBoard.length;
        for (let i = 0; i < size - 1; i++) {
            if (this.slidingPuzzleBoard[i] !== i + 1) return;
        }
        if (this.slidingPuzzleBoard[size - 1] === 0) {
            this.puzzleCompleted();
        }
    }

    puzzleCompleted() {
        this.stopTimer();
        const timeBonus = Math.max(0, 300 - this.timer); // Bonus for fast completion
        const difficultyBonus = {
            'easy': 100,
            'medium': 200,
            'hard': 300,
            'expert': 500
        }[this.difficulty] || 200;
        
        this.score += timeBonus + difficultyBonus;
        this.savePuzzleState();
        
        this.showMessage(`🎉 Puzzle Completed! +${timeBonus + difficultyBonus} points`, 'success');
        setTimeout(() => {
            this.newPuzzle();
        }, 2000);
    }

    solve() {
        if (this.isSolving) return;
        
        this.isSolving = true;
        this.showMessage('Solving puzzle...', 'info');
        
        setTimeout(() => {
            switch (this.currentPuzzle) {
                case 'sudoku':
                    this.solveSudokuPuzzle();
                    break;
                case '8puzzle':
                    this.solveEightPuzzle();
                    break;
                case 'crossword':
                    this.solveCrosswordPuzzle();
                    break;
                case 'sliding':
                    this.solveSlidingPuzzle();
                    break;
            }
            this.isSolving = false;
        }, 100);
    }

    solveSudokuPuzzle() {
        this.sudokuBoard = this.solution.map(row => [...row]);
        this.renderPuzzle();
        this.showMessage('Sudoku solved!', 'success');
    }

    solveEightPuzzle() {
        const solution = this.aStarEightPuzzle();
        if (solution) {
            this.solveSteps = solution;
            this.currentStep = 0;
            this.playSolution(solution);
        } else {
            this.showMessage('No solution found!', 'error');
        }
    }

    aStarEightPuzzle() {
        const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];
        const openSet = [{
            state: [...this.eightPuzzleBoard],
            g: 0,
            h: this.heuristic(this.eightPuzzleBoard, goal),
            parent: null,
            move: null
        }];
        const closedSet = new Set();
        
        while (openSet.length > 0) {
            openSet.sort((a, b) => (a.g + a.h) - (b.g + b.h));
            const current = openSet.shift();
            
            const stateKey = current.state.join(',');
            if (closedSet.has(stateKey)) continue;
            closedSet.add(stateKey);
            
            if (JSON.stringify(current.state) === JSON.stringify(goal)) {
                // Reconstruct path
                const path = [];
                let node = current;
                while (node.parent) {
                    path.unshift(node.move);
                    node = node.parent;
                }
                return path;
            }
            
            const emptyIndex = current.state.indexOf(0);
            const possibleMoves = this.getPossibleMoves(emptyIndex);
            
            for (const moveIndex of possibleMoves) {
                const newState = [...current.state];
                [newState[emptyIndex], newState[moveIndex]] = [newState[moveIndex], newState[emptyIndex]];
                
                const newStateKey = newState.join(',');
                if (closedSet.has(newStateKey)) continue;
                
                openSet.push({
                    state: newState,
                    g: current.g + 1,
                    h: this.heuristic(newState, goal),
                    parent: current,
                    move: moveIndex
                });
            }
        }
        
        return null;
    }

    heuristic(state, goal) {
        let distance = 0;
        for (let i = 0; i < state.length; i++) {
            if (state[i] !== 0) {
                const goalIndex = goal.indexOf(state[i]);
                const currentRow = Math.floor(i / 3);
                const currentCol = i % 3;
                const goalRow = Math.floor(goalIndex / 3);
                const goalCol = goalIndex % 3;
                distance += Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
            }
        }
        return distance;
    }

    playSolution(steps) {
        if (this.currentStep >= steps.length) {
            this.showMessage('Solution complete!', 'success');
            return;
        }
        
        const moveIndex = steps[this.currentStep];
        this.moveEightPuzzle(moveIndex);
        this.renderPuzzle();
        this.currentStep++;
        
        setTimeout(() => {
            this.playSolution(steps);
        }, 500);
    }

    solveCrosswordPuzzle() {
        // Crossword is already solved when generated
        this.showMessage('Crossword solved!', 'success');
    }

    solveSlidingPuzzle() {
        // For sliding puzzle, we'll use a simple approach
        this.slidingPuzzleBoard = [];
        const size = Math.sqrt(this.slidingPuzzleBoard.length);
        for (let i = 1; i < size * size; i++) {
            this.slidingPuzzleBoard.push(i);
        }
        this.slidingPuzzleBoard.push(0);
        this.renderPuzzle();
        this.showMessage('Sliding puzzle solved!', 'success');
    }

    useHint() {
        if (this.hints <= 0) {
            this.showMessage('No hints remaining!', 'error');
            return;
        }
        
        this.hints--;
        this.savePuzzleState();
        
        switch (this.currentPuzzle) {
            case 'sudoku':
                this.giveSudokuHint();
                break;
            case '8puzzle':
                this.giveEightPuzzleHint();
                break;
            case 'sliding':
                this.giveSlidingPuzzleHint();
                break;
        }
        
        this.updateUI();
    }

    giveSudokuHint() {
        // Find a random empty cell and fill it
        const emptyCells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.sudokuBoard[i][j] === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.sudokuBoard[row][col] = this.solution[row][col];
            this.renderPuzzle();
            this.showMessage('Hint applied!', 'info');
        }
    }

    giveEightPuzzleHint() {
        const solution = this.aStarEightPuzzle();
        if (solution && solution.length > 0) {
            const nextMove = solution[0];
            this.moveEightPuzzle(nextMove);
            this.renderPuzzle();
            this.showMessage('Hint: Next move applied!', 'info');
        }
    }

    giveSlidingPuzzleHint() {
        const solution = this.aStarSlidingPuzzle();
        if (solution && solution.length > 0) {
            const nextMove = solution[0];
            this.moveSlidingPuzzle(nextMove);
            this.renderPuzzle();
            this.showMessage('Hint: Next move applied!', 'info');
        }
    }

    aStarSlidingPuzzle() {
        // Similar to 8-puzzle but for sliding puzzle
        const size = this.slidingPuzzleBoard.length;
        const goal = [];
        for (let i = 1; i < size; i++) {
            goal.push(i);
        }
        goal.push(0);
        
        // Implementation similar to 8-puzzle
        return null; // Simplified for now
    }

    reset() {
        this.newPuzzle();
        this.showMessage('Puzzle reset!', 'info');
    }

    showNextStep() {
        if (this.solveSteps.length > 0 && this.currentStep < this.solveSteps.length) {
            const moveIndex = this.solveSteps[this.currentStep];
            this.moveEightPuzzle(moveIndex);
            this.renderPuzzle();
            this.currentStep++;
        }
    }

    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `puzzle-message ${type}`;
        messageElement.textContent = message;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        }, 3000);
    }

    destroy() {
        this.stopTimer();
        // Clean up any event listeners or intervals
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.puzzleSolver = new PuzzleSolver();
    window.puzzleSolver.init();
}); 