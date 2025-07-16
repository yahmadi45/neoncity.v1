// Number Guessing Game for NeoCityOS
class NumberGuesser {
    constructor() {
        this.targetNumber = 0;
        this.minRange = 1;
        this.maxRange = 100;
        this.attempts = 0;
        this.maxAttempts = 10;
        this.gameActive = false;
        this.bestScore = this.loadBestScore();
        this.guessHistory = [];
        this.hints = [];
    }

    init() {
        this.newGame();
        this.updateDisplay();
    }

    // Set maxAttempts to 5 for this game
    newGame() {
        this.minRange = this.minRange || 1;
        this.maxRange = this.maxRange || 100;
        this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
        this.attempts = 0;
        this.maxAttempts = 5; // Always 5 attempts
        this.guessHistory = [];
        this.gameActive = true;
        this.updateMessage(`I'm thinking of a number...`);
        this.updateHint('');
        this.updateDisplay();
        const input = document.getElementById('guess-input');
        if (input) input.value = '';
    }

    makeGuess() {
        if (!this.gameActive) {
            this.newGame();
            return;
        }

        const input = document.getElementById('guess-input');
        if (!input) return;

        const guess = parseInt(input.value);
        if (isNaN(guess) || guess < this.minRange || guess > this.maxRange) {
            this.showMessage('Please enter a valid number between ' + this.minRange + ' and ' + this.maxRange);
            return;
        }

        this.attempts++;
        this.guessHistory.push(guess);

        if (guess === this.targetNumber) {
            this.showEndModal(true);
            return;
        }

        if (this.attempts >= this.maxAttempts) {
            this.showEndModal(false);
            return;
        }

        this.provideFeedback(guess);
        input.value = '';
        this.updateDisplay();
    }

    provideFeedback(guess) {
        let message = '';
        let hint = '';

        if (guess < this.targetNumber) {
            message = `Too low! Try a higher number. (Attempt ${this.attempts}/${this.maxAttempts})`;
            hint = this.generateHint(guess, 'low');
        } else {
            message = `Too high! Try a lower number. (Attempt ${this.attempts}/${this.maxAttempts})`;
            hint = this.generateHint(guess, 'high');
        }

        this.updateMessage(message);
        this.updateHint(hint);
    }

    generateHint(guess, direction) {
        const range = this.maxRange - this.minRange;
        const remainingAttempts = this.maxAttempts - this.attempts;
        
        if (direction === 'low') {
            const newMin = Math.max(this.minRange, guess + 1);
            const possibleRange = this.maxRange - newMin + 1;
            
            if (remainingAttempts === 1) {
                return `The number is between ${newMin} and ${this.maxRange}. You have 1 attempt left!`;
            } else if (possibleRange <= remainingAttempts) {
                return `Try numbers between ${newMin} and ${this.maxRange}. You can try them all!`;
            } else {
                const suggestedGuess = Math.floor((newMin + this.maxRange) / 2);
                return `Try around ${suggestedGuess} (between ${newMin} and ${this.maxRange})`;
            }
        } else {
            const newMax = Math.min(this.maxRange, guess - 1);
            const possibleRange = newMax - this.minRange + 1;
            
            if (remainingAttempts === 1) {
                return `The number is between ${this.minRange} and ${newMax}. You have 1 attempt left!`;
            } else if (possibleRange <= remainingAttempts) {
                return `Try numbers between ${this.minRange} and ${newMax}. You can try them all!`;
            } else {
                const suggestedGuess = Math.floor((this.minRange + newMax) / 2);
                return `Try around ${suggestedGuess} (between ${this.minRange} and ${newMax})`;
            }
        }
    }

    gameWon() {
        this.gameActive = false;
        const score = this.calculateScore();
        
        this.updateMessage(`🎉 Congratulations! You found the number ${this.targetNumber} in ${this.attempts} attempts!`);
        this.updateHint(`Final Score: ${score} points`);
        
        if (score > this.bestScore) {
            this.bestScore = score;
            this.saveBestScore();
            this.updateMessage(`🎉 New Best Score: ${score} points! 🎉`);
        }
        
        this.showGameStats();
    }

    gameLost() {
        this.gameActive = false;
        this.updateMessage(`😔 Game Over! The number was ${this.targetNumber}. Better luck next time!`);
        this.updateHint('Click "New Game" to try again');
    }

    calculateScore() {
        const baseScore = 1000;
        const attemptPenalty = 50;
        const timeBonus = Math.max(0, 100 - this.attempts * 10);
        
        return Math.max(0, baseScore - (this.attempts - 1) * attemptPenalty + timeBonus);
    }

    showGameStats() {
        const stats = {
            targetNumber: this.targetNumber,
            attempts: this.attempts,
            maxAttempts: this.maxAttempts,
            score: this.calculateScore(),
            guessHistory: this.guessHistory,
            efficiency: this.calculateEfficiency()
        };

        const modal = document.createElement('div');
        modal.className = 'number-guesser-modal';
        
        const content = document.createElement('div');
        content.className = 'number-guesser-content';
        
        content.innerHTML = `
            <h3>🎯 Game Statistics</h3>
            <div class="number-guesser-stats">
                <div class="number-guesser-stat-item">
                    <strong>Target Number:</strong> ${stats.targetNumber}
                </div>
                <div class="number-guesser-stat-item">
                    <strong>Attempts:</strong> ${stats.attempts}/${stats.maxAttempts}
                </div>
                <div class="number-guesser-stat-item">
                    <strong>Score:</strong> ${stats.score} points
                </div>
                <div class="number-guesser-stat-item">
                    <strong>Efficiency:</strong> ${stats.efficiency}%
                </div>
                <div class="number-guesser-stat-item">
                    <strong>Guess History:</strong> ${stats.guessHistory.join(' → ')}
                </div>
            </div>
        `;
        
        const newGameBtn = document.createElement('button');
        newGameBtn.textContent = 'New Game';
        newGameBtn.className = 'number-guesser-new-game-btn';
        
        newGameBtn.onclick = () => {
            document.body.removeChild(modal);
            this.newGame();
        };
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'number-guesser-close-btn';
        
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        content.appendChild(newGameBtn);
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    calculateEfficiency() {
        const theoreticalMin = Math.ceil(Math.log2(this.maxRange - this.minRange + 1));
        return Math.round((theoreticalMin / this.attempts) * 100);
    }

    setRange(min, max) {
        this.minRange = min;
        this.maxRange = max;
        this.maxAttempts = Math.ceil(Math.log2(max - min + 1)) + 2;
        this.newGame();
    }

    updateDisplay() {
        // Update range display
        const rangeElement = document.getElementById('number-range');
        if (rangeElement) {
            rangeElement.textContent = `${this.minRange}-${this.maxRange}`;
        }
        
        // Update attempts display
        const attemptsElement = document.getElementById('guess-attempts');
        if (attemptsElement) {
            attemptsElement.textContent = this.attempts;
        }
        
        // Update best score display
        const bestScoreElement = document.getElementById('best-score');
        if (bestScoreElement) {
            bestScoreElement.textContent = this.bestScore > 0 ? this.bestScore : '-';
        }
    }

    updateMessage(message) {
        const messageElement = document.getElementById('game-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }

    updateHint(hint) {
        const hintElement = document.getElementById('hint-display');
        if (hintElement) {
            hintElement.textContent = hint;
            hintElement.classList.remove('hint-flash');
            // Force reflow to restart animation
            void hintElement.offsetWidth;
            hintElement.classList.add('hint-flash');
            setTimeout(() => hintElement.classList.remove('hint-flash'), 1400);
        }
    }

    clearHint() {
        const hintElement = document.getElementById('hint-display');
        if (hintElement) {
            hintElement.textContent = '';
        }
    }

    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'number-guesser-message';
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    loadBestScore() {
        const saved = localStorage.getItem('numberGuesserBestScore');
        return saved ? parseInt(saved) : 0;
    }

    saveBestScore() {
        localStorage.setItem('numberGuesserBestScore', this.bestScore.toString());
    }

    resetBestScore() {
        this.bestScore = 0;
        localStorage.removeItem('numberGuesserBestScore');
        this.updateDisplay();
    }

    // Binary search algorithm demonstration
    demonstrateBinarySearch() {
        if (!this.gameActive) return;
        
        let left = this.minRange;
        let right = this.maxRange;
        let steps = [];
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            steps.push(`Checking ${mid}`);
            
            if (mid === this.targetNumber) {
                steps.push(`Found! The number is ${mid}`);
                break;
            } else if (mid < this.targetNumber) {
                steps.push(`${mid} is too low, searching ${mid + 1} to ${right}`);
                left = mid + 1;
            } else {
                steps.push(`${mid} is too high, searching ${left} to ${mid - 1}`);
                right = mid - 1;
            }
        }
        
        this.showBinarySearchDemo(steps);
    }

    showBinarySearchDemo(steps) {
        const modal = document.createElement('div');
        modal.className = 'binary-search-modal';
        
        const content = document.createElement('div');
        content.className = 'binary-search-content';
        
        content.innerHTML = `
            <h3>🔍 Binary Search Algorithm Demo</h3>
            <div style="text-align: left; margin: 20px 0;">
                ${steps.map((step, index) => 
                    `<div class="binary-search-step">
                        <strong>Step ${index + 1}:</strong> ${step}
                    </div>`
                ).join('')}
            </div>
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'binary-search-close-btn';
        
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    showEndModal(won) {
        this.gameActive = false;
        const modal = document.createElement('div');
        modal.className = 'number-guesser-modal';
        const content = document.createElement('div');
        content.className = 'number-guesser-content';
        content.innerHTML = `
            <h3>${won ? '🎉 You won!' : '😔 You lost'}</h3>
            <div style="margin: 18px 0; font-size: 1.2em;">
                ${won ? `You found the number <strong>${this.targetNumber}</strong> in <strong>${this.attempts}</strong> attempts!` : `The number was <strong>${this.targetNumber}</strong>.`}
            </div>
            <div style="color: #a259ff; font-size: 1em;">The game will restart automatically.</div>
        `;
        modal.appendChild(content);
        document.body.appendChild(modal);
        setTimeout(() => {
            if (document.body.contains(modal)) document.body.removeChild(modal);
            this.newGame();
        }, 2200);
    }
}

// Global instance
window.numberGuesser = new NumberGuesser();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.numberGuesser) {
        window.numberGuesser.init();
    }
});

// Add keyboard event listener for Enter key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const guessInput = document.getElementById('guess-input');
        if (guessInput && document.activeElement === guessInput) {
            window.numberGuesser.makeGuess();
        }
    }
}); 