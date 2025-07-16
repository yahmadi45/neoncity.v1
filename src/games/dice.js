// NeoCityOS Dice Game
class DiceGame {
    constructor() {
        this.dice1 = 1;
        this.dice2 = 1;
        this.currentBet = 10;
        this.gameHistory = [];
        this.streak = 0;
        this.maxStreak = 0;
        this.totalGames = 0;
        this.totalWinnings = 0;
        this.totalLosses = 0;
        this.isRolling = false;
        this.animationDuration = 1000;
        
        this.initialize();
    }

    initialize() {
        this.updateDisplay();
        this.setupEventListeners();
        this.loadUserStats();
    }

    setupEventListeners() {
        // Events are handled by onclick in HTML
        // Mais on peut ajouter des raccourcis clavier
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isRolling) {
                e.preventDefault();
                this.rollDice();
            }
        });
    }

    loadUserStats() {
        // Use existing localStorage system
        const username = currentUser || 'guest';
        const userKey = `neo_users_${username}`;
        const userData = JSON.parse(localStorage.getItem(userKey)) || { xp: 0, gold: 100, level: 1 };
        this.updateStatsDisplay(userData);
    }

    updateStatsDisplay(userData) {
        const elements = {
            level: document.getElementById('user-level'),
            xp: document.getElementById('user-xp'),
            gold: document.getElementById('user-gold')
        };

        if (elements.level) elements.level.textContent = userData.level || 1;
        if (elements.xp) elements.xp.textContent = userData.xp || 0;
        if (elements.gold) elements.gold.textContent = userData.gold || 100;
    }

    setBet(amount) {
        this.currentBet = Math.max(1, Math.min(50, amount));
        const betInput = document.getElementById('bet-amount');
        if (betInput) {
            betInput.value = this.currentBet;
        }
    }

    rollDice() {
        if (this.isRolling) return;

        // Check user funds
        const username = currentUser || 'guest';
        const userKey = `neo_users_${username}`;
        const userData = JSON.parse(localStorage.getItem(userKey)) || { xp: 0, gold: 100, level: 1 };
        
        if (userData.gold < this.currentBet) {
            this.showNotification("Not enough gold for this bet!", "error");
            return;
        }

        this.isRolling = true;
        this.animateDiceRoll();

        setTimeout(() => {
            this.generateResult();
            this.isRolling = false;
            // Ensure button is reactivated
            const rollBtn = document.getElementById('roll-dice-btn');
            if (rollBtn) rollBtn.disabled = false;
        }, this.animationDuration);
    }

    animateDiceRoll() {
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');
        const rollBtn = document.getElementById('roll-dice-btn');

        if (rollBtn) rollBtn.disabled = true;

        // Dice animation
        if (dice1 && dice2) {
            dice1.style.animation = `diceRoll ${this.animationDuration}ms ease-in-out`;
            dice2.style.animation = `diceRoll ${this.animationDuration}ms ease-in-out`;
            
            // Changer les images pendant l'animation
            const rollInterval = setInterval(() => {
                const random1 = Math.floor(Math.random() * 6) + 1;
                const random2 = Math.floor(Math.random() * 6) + 1;
                dice1.src = `assets/icons/dice-${random1}.png`;
                dice2.src = `assets/icons/dice-${random2}.png`;
            }, 100);

            setTimeout(() => {
                clearInterval(rollInterval);
                // Reactivate button after animation
                if (rollBtn) rollBtn.disabled = false;
            }, this.animationDuration);
        } else {
            // If dice are not found, reactivate button immediately
            if (rollBtn) rollBtn.disabled = false;
        }
    }

    generateResult() {
        // Generate dice results
        this.dice1 = Math.floor(Math.random() * 6) + 1;
        this.dice2 = Math.floor(Math.random() * 6) + 1;
        const total = this.dice1 + this.dice2;

        // Update display
        this.updateDiceDisplay();
        this.updateTotalDisplay(total);

        // Determine result
        const result = this.calculateResult(total);
        this.processResult(result, total);
    }

    updateDiceDisplay() {
        const dice1 = document.getElementById('dice1');
        const dice2 = document.getElementById('dice2');

        if (dice1) dice1.src = `assets/icons/dice-${this.dice1}.png`;
        if (dice2) dice2.src = `assets/icons/dice-${this.dice2}.png`;
    }

    updateTotalDisplay(total) {
        const totalDisplay = document.getElementById('dice-total');
        if (totalDisplay) {
            totalDisplay.textContent = `Total: ${total}`;
        }
    }

    calculateResult(total) {
        // Game rules
        if (total === 7 || total === 11) {
            return { type: 'win', multiplier: 2, message: '🎉 Win! (7 or 11)' };
        } else if (total === 2 || total === 3 || total === 12) {
            return { type: 'lose', multiplier: 0, message: '💀 Lose! (2, 3 or 12)' };
        } else {
            // Point - player must roll the same total to win
            return { type: 'point', multiplier: 1.5, message: `🎯 Point! Roll ${total} to win` };
        }
    }

    processResult(result, total) {
        // Get user data
        const username = currentUser || 'guest';
        const userKey = `neo_users_${username}`;
        const userData = JSON.parse(localStorage.getItem(userKey)) || { xp: 0, gold: 100, level: 1 };

        let goldChange = 0;
        let xpGain = 0;
        let message = '';

        if (result.type === 'win') {
            goldChange = this.currentBet * result.multiplier;
            xpGain = 10;
            this.streak++;
            this.totalWinnings += goldChange;
            message = `🎉 ${result.message} +${goldChange} gold, +${xpGain} XP`;
        } else if (result.type === 'lose') {
            goldChange = -this.currentBet;
            xpGain = 2;
            this.streak = 0;
            this.totalLosses += Math.abs(goldChange);
            message = `💀 ${result.message} -${Math.abs(goldChange)} gold, +${xpGain} XP`;
        } else if (result.type === 'point') {
            xpGain = 5;
            message = `${result.message} +${xpGain} XP`;
        }

        // Update statistics
        this.totalGames++;
        this.maxStreak = Math.max(this.maxStreak, this.streak);

        // Save data
        userData.gold += goldChange;
        userData.xp += xpGain;
        
        // Calculate level based on XP
        userData.level = Math.floor(userData.xp / 100) + 1;
        
        localStorage.setItem(userKey, JSON.stringify(userData));
        this.loadUserStats();

        // Display result
        this.showGameResult(result, total, goldChange, xpGain, message);

        // Check achievements
        this.checkAchievements();
    }

    showGameResult(result, total, goldChange, xpGain, message) {
        const resultDiv = document.getElementById('game-result');
        if (!resultDiv) return;

        const resultClass = result.type === 'win' ? 'win' : result.type === 'lose' ? 'lose' : 'point';
        
        resultDiv.innerHTML = `
            <div class="result-message ${resultClass}">
                <h3>${message}</h3>
                <div class="result-details">
                    <div class="result-item">
                        <span class="result-label">Dice:</span>
                        <span class="result-value">${this.dice1} + ${this.dice2} = ${total}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Bet:</span>
                        <span class="result-value">${this.currentBet} 💰</span>
                    </div>
                    ${goldChange !== 0 ? `
                    <div class="result-item">
                        <span class="result-label">Win/Loss:</span>
                        <span class="result-value ${goldChange > 0 ? 'positive' : 'negative'}">${goldChange > 0 ? '+' : ''}${goldChange} 💰</span>
                    </div>
                    ` : ''}
                    <div class="result-item">
                        <span class="result-label">XP Gained:</span>
                        <span class="result-value positive">+${xpGain} XP</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Streak:</span>
                        <span class="result-value">${this.streak} wins</span>
                    </div>
                </div>
            </div>
        `;

        resultDiv.style.display = 'block';
        resultDiv.className = `game-result ${resultClass}`;

        // Hide result after 5 seconds
        setTimeout(() => {
            resultDiv.style.display = 'none';
        }, 5000);
    }

    checkAchievements() {
        const achievements = [
            {
                id: 'first_win',
                name: 'First Win',
                description: 'Win your first game',
                condition: () => this.totalWinnings > 0
            },
            {
                id: 'winning_streak_5',
                name: 'Winning Streak 5',
                description: 'Win 5 games in a row',
                condition: () => this.maxStreak >= 5
            },
            {
                id: 'winning_streak_10',
                name: 'Winning Streak 10',
                description: 'Win 10 games in a row',
                condition: () => this.maxStreak >= 10
            },
            {
                id: 'games_played_50',
                name: 'Regular Player',
                description: 'Play 50 games',
                condition: () => this.totalGames >= 50
            },
            {
                id: 'games_played_100',
                name: 'Expert Player',
                description: 'Play 100 games',
                condition: () => this.totalGames >= 100
            },
            {
                id: 'total_winnings_1000',
                name: 'Rich',
                description: 'Win a total of 1000 gold',
                condition: () => this.totalWinnings >= 1000
            }
        ];

        achievements.forEach(achievement => {
            if (achievement.condition()) {
                this.showNotification(`🏆 Achievement: ${achievement.name} - ${achievement.description}`, 'info');
            }
        });
    }

    resetGame() {
        this.dice1 = 1;
        this.dice2 = 1;
        this.currentBet = 10;
        this.streak = 0;
        this.totalGames = 0;
        this.totalWinnings = 0;
        this.totalLosses = 0;

        this.updateDisplay();
        this.showNotification('Statistics reset', 'info');
    }

    updateDisplay() {
        this.updateDiceDisplay();
        this.updateTotalDisplay(this.dice1 + this.dice2);
        
        const betInput = document.getElementById('bet-amount');
        if (betInput) {
            betInput.value = this.currentBet;
        }

        const rollBtn = document.getElementById('roll-dice-btn');
        if (rollBtn) {
            // Button is disabled only if game is rolling
            rollBtn.disabled = this.isRolling;
            // If game is not rolling, ensure button is enabled
            if (!this.isRolling) {
                rollBtn.disabled = false;
            }
        }
        
        // Update game statistics
        const totalGamesEl = document.getElementById('total-games');
        const totalWinningsEl = document.getElementById('total-winnings');
        const totalLossesEl = document.getElementById('total-losses');
        const currentStreakEl = document.getElementById('current-streak');
        
        if (totalGamesEl) totalGamesEl.textContent = this.totalGames;
        if (totalWinningsEl) totalWinningsEl.textContent = this.totalWinnings;
        if (totalLossesEl) totalLossesEl.textContent = this.totalLosses;
        if (currentStreakEl) currentStreakEl.textContent = this.streak;
        
        // Update user statistics
        this.loadUserStats();
    }

    showNotification(message, type = 'info') {
        // Create simple notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
        
        // Animations CSS are now in external CSS file
    }

    // Methods for statistics
    getWinRate() {
        if (this.totalGames === 0) return 0;
        return ((this.totalWinnings / (this.totalWinnings + this.totalLosses)) * 100).toFixed(1);
    }

    getAverageBet() {
        if (this.totalGames === 0) return 0;
        return (this.totalWinnings + this.totalLosses) / this.totalGames;
    }

    getGameStats() {
        return {
            totalGames: this.totalGames,
            totalWinnings: this.totalWinnings,
            totalLosses: this.totalLosses,
            winRate: this.getWinRate(),
            maxStreak: this.maxStreak,
            currentStreak: this.streak,
            averageBet: this.getAverageBet()
        };
    }
}



