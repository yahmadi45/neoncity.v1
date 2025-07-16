// Memory Card Game for NeoCityOS
class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = [];
        this.score = 0;
        this.moves = 0;
        this.timer = 0;
        this.gameTimer = null;
        this.difficulty = 'easy';
        this.isGameActive = false;
        this.symbols = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮'];
    }

    init() {
        this.loadGameState();
        this.setDifficulty('easy');
        this.newGame();
    }

    setDifficulty(level, event) {
        this.difficulty = level;
        this.stopTimer();
        this.newGame();
        
        // Update active button
        const buttons = document.querySelectorAll('.difficulty-selector button');
        buttons.forEach(btn => btn.classList.remove('active'));
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }

    newGame() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = [];
        this.score = 0;
        this.moves = 0;
        this.timer = 0;
        this.isGameActive = true;
        
        this.createCards();
        this.shuffleCards();
        this.renderCards();
        this.updateDisplay();
        this.startTimer();
    }

    createCards() {
        let cardCount;
        let symbolsNeeded;
        
        switch (this.difficulty) {
            case 'easy':
                cardCount = 16; // 4x4
                symbolsNeeded = 8;
                break;
            case 'medium':
                cardCount = 36; // 6x6
                symbolsNeeded = 18;
                break;
            case 'hard':
                cardCount = 64; // 8x8
                symbolsNeeded = 32;
                break;
            default:
                cardCount = 16;
                symbolsNeeded = 8;
        }

        // Create pairs of cards
        const selectedSymbols = this.symbols.slice(0, symbolsNeeded);
        this.cards = [];
        
        for (let i = 0; i < cardCount; i++) {
            const symbolIndex = Math.floor(i / 2);
            this.cards.push({
                id: i,
                symbol: selectedSymbols[symbolIndex],
                isFlipped: false,
                isMatched: false
            });
        }
    }

    shuffleCards() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    renderCards() {
        const grid = document.getElementById('memory-grid');
        if (!grid) return;

        grid.className = `memory-grid ${this.difficulty}`;
        grid.innerHTML = '';

        this.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.id = card.id;
            
            if (card.isFlipped || card.isMatched) {
                cardElement.textContent = card.symbol;
                cardElement.classList.add('flipped');
            }
            
            if (card.isMatched) {
                cardElement.classList.add('matched');
            }
            
            cardElement.addEventListener('click', () => this.flipCard(card.id));
            grid.appendChild(cardElement);
        });
    }

    flipCard(cardId) {
        if (!this.isGameActive) return;
        
        const card = this.cards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return;

        // Flip the card
        card.isFlipped = true;
        this.flippedCards.push(card);
        
        // Update display
        this.renderCards();
        
        // Check if we have two flipped cards
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.checkMatch();
        }
        
        this.updateDisplay();
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.symbol === card2.symbol) {
            // Match found
            card1.isMatched = true;
            card2.isMatched = true;
            this.matchedPairs.push(card1, card2);
            this.score += 10;
            
            // Check if game is complete
            if (this.matchedPairs.length === this.cards.length) {
                this.gameComplete();
            }
        } else {
            // No match, flip cards back after delay
            setTimeout(() => {
                card1.isFlipped = false;
                card2.isFlipped = false;
                this.renderCards();
            }, 1000);
        }
        
        this.flippedCards = [];
    }

    gameComplete() {
        this.isGameActive = false;
        this.stopTimer();
        
        // Calculate final score
        const timeBonus = Math.max(0, 100 - this.timer);
        const moveBonus = Math.max(0, 50 - this.moves);
        this.score += timeBonus + moveBonus;
        
        // Show completion message
        this.showCompletionMessage();
        
        // Save best score
        this.saveBestScore();
    }

    showCompletionMessage() {
        const message = `
            🎉 Congratulations! 🎉
            
            Game completed in ${this.formatTime(this.timer)}
            Moves: ${this.moves}
            Score: ${this.score}
            
            Time Bonus: +${Math.max(0, 100 - this.timer)}
            Move Bonus: +${Math.max(0, 50 - this.moves)}
        `;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'memory-modal';
        
        const content = document.createElement('div');
        content.className = 'memory-modal-content';
        content.innerHTML = message.replace(/\n/g, '<br>');
        
        const newGameBtn = document.createElement('button');
        newGameBtn.textContent = 'New Game';
        newGameBtn.className = 'memory-modal-btn';
        
        newGameBtn.onclick = () => {
            document.body.removeChild(modal);
            this.newGame();
        };
        
        content.appendChild(newGameBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timer++;
            this.updateDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    updateDisplay() {
        // Update timer
        const timeElement = document.getElementById('memory-time');
        if (timeElement) {
            timeElement.textContent = this.formatTime(this.timer);
        }
        
        // Update moves
        const movesElement = document.getElementById('memory-moves');
        if (movesElement) {
            movesElement.textContent = this.moves;
        }
        
        // Update score
        const scoreElement = document.getElementById('memory-score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    saveBestScore() {
        const bestScores = JSON.parse(localStorage.getItem('memoryGameBestScores') || '{}');
        const currentScore = {
            score: this.score,
            time: this.timer,
            moves: this.moves,
            difficulty: this.difficulty,
            date: new Date().toISOString()
        };
        
        if (!bestScores[this.difficulty] || this.score > bestScores[this.difficulty].score) {
            bestScores[this.difficulty] = currentScore;
            localStorage.setItem('memoryGameBestScores', JSON.stringify(bestScores));
        }
    }

    loadGameState() {
        const savedState = localStorage.getItem('memoryGameState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.difficulty = state.difficulty || 'easy';
        }
    }

    saveGameState() {
        const state = {
            difficulty: this.difficulty
        };
        localStorage.setItem('memoryGameState', JSON.stringify(state));
    }

    getBestScore(difficulty) {
        const bestScores = JSON.parse(localStorage.getItem('memoryGameBestScores') || '{}');
        return bestScores[difficulty] || null;
    }

    showBestScores() {
        const difficulties = ['easy', 'medium', 'hard'];
        let message = '<h3>Best Scores</h3>';
        
        difficulties.forEach(diff => {
            const best = this.getBestScore(diff);
            if (best) {
                message += `
                    <div class="memory-best-score">
                        <strong>${diff.toUpperCase()}:</strong><br>
                        Score: ${best.score}<br>
                        Time: ${this.formatTime(best.time)}<br>
                        Moves: ${best.moves}<br>
                        Date: ${new Date(best.date).toLocaleDateString()}
                    </div>
                `;
            }
        });
        
        // Create modal to show best scores
        const modal = document.createElement('div');
        modal.className = 'memory-modal';
        
        const content = document.createElement('div');
        content.className = 'memory-modal-content';
        content.innerHTML = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'memory-modal-btn';
        
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }
}

// Global instance
window.memoryGame = new MemoryGame();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.memoryGame) {
        window.memoryGame.init();
    }
}); 