// Advanced Dice Game for NeoCityOS
class AdvancedDiceGame {
    constructor() {
        this.currentDiceType = 6;
        this.rollHistory = [];
        this.statistics = {
            totalRolls: 0,
            averageRoll: 0,
            highestRoll: 0,
            lowestRoll: 0,
            frequency: {}
        };
        this.achievements = {
            firstRoll: false,
            tenRolls: false,
            perfectRoll: false,
            luckyStreak: false
        };
    }

    init() {
        this.loadStatistics();
        this.updateDisplay();
    }

    roll() {
        const diceType = parseInt(document.getElementById('dice-type').value);
        this.currentDiceType = diceType;
        
        const result = Math.floor(Math.random() * diceType) + 1;
        this.rollHistory.push({
            type: diceType,
            result: result,
            timestamp: new Date()
        });

        this.updateStatistics();
        this.updateDisplay();
        this.checkAchievements();
        this.saveStatistics();

        // Animation effect
        this.animateRoll(result);
    }

    animateRoll(result) {
        const display = document.getElementById('dice-display');
        if (!display) return;

        // Animate the roll
        let counter = 0;
        const interval = setInterval(() => {
            const randomValue = Math.floor(Math.random() * this.currentDiceType) + 1;
            display.textContent = `Rolling... ${randomValue}`;
            counter++;

            if (counter > 10) {
                clearInterval(interval);
                display.textContent = `You rolled: ${result}`;
                
                // Add success animation
                display.className = 'advanced-dice-display result';
            }
        }, 100);
    }

    updateStatistics() {
        this.statistics.totalRolls = this.rollHistory.length;
        
        if (this.rollHistory.length > 0) {
            const results = this.rollHistory.map(roll => roll.result);
            this.statistics.averageRoll = (results.reduce((a, b) => a + b, 0) / results.length).toFixed(2);
            this.statistics.highestRoll = Math.max(...results);
            this.statistics.lowestRoll = Math.min(...results);

            // Update frequency
            this.statistics.frequency = {};
            results.forEach(result => {
                this.statistics.frequency[result] = (this.statistics.frequency[result] || 0) + 1;
            });
        }
    }

    updateDisplay() {
        const statsDiv = document.getElementById('dice-stats');
        if (!statsDiv) return;

        statsDiv.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">Total Rolls:</span>
                <span class="stat-value">${this.statistics.totalRolls}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Average Roll:</span>
                <span class="stat-value">${this.statistics.averageRoll}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Highest Roll:</span>
                <span class="stat-value">${this.statistics.highestRoll}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Lowest Roll:</span>
                <span class="stat-value">${this.statistics.lowestRoll}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Current Dice:</span>
                <span class="stat-value">D${this.currentDiceType}</span>
            </div>
            <div class="frequency-chart">
                <h4>Roll Frequency</h4>
                ${this.generateFrequencyChart()}
            </div>
            <div class="achievements">
                <h4>Achievements</h4>
                ${this.generateAchievementsList()}
            </div>
        `;
    }

    generateFrequencyChart() {
        if (Object.keys(this.statistics.frequency).length === 0) {
            return '<p>No rolls yet</p>';
        }

        const maxFreq = Math.max(...Object.values(this.statistics.frequency));
        let chartHTML = '<div class="chart-container">';
        
        for (let i = 1; i <= this.currentDiceType; i++) {
            const freq = this.statistics.frequency[i] || 0;
            const height = maxFreq > 0 ? (freq / maxFreq) * 100 : 0;
            
            chartHTML += `
                <div class="chart-bar">
                    <div class="bar" style="height: ${height}%"></div>
                    <span class="bar-label">${i}</span>
                    <span class="bar-value">${freq}</span>
                </div>
            `;
        }
        
        chartHTML += '</div>';
        return chartHTML;
    }

    generateAchievementsList() {
        const achievements = [
            { id: 'firstRoll', name: 'First Roll', description: 'Roll the dice for the first time' },
            { id: 'tenRolls', name: 'Dice Master', description: 'Roll 10 times' },
            { id: 'perfectRoll', name: 'Perfect Roll', description: 'Roll the maximum value' },
            { id: 'luckyStreak', name: 'Lucky Streak', description: 'Roll the same number 3 times in a row' }
        ];

        let achievementsHTML = '<div class="achievements-list">';
        achievements.forEach(achievement => {
            const unlocked = this.achievements[achievement.id];
            achievementsHTML += `
                <div class="achievement ${unlocked ? 'unlocked' : 'locked'}">
                    <span class="achievement-icon">${unlocked ? '🏆' : '🔒'}</span>
                    <div class="achievement-info">
                        <span class="achievement-name">${achievement.name}</span>
                        <span class="achievement-desc">${achievement.description}</span>
                    </div>
                </div>
            `;
        });
        achievementsHTML += '</div>';
        return achievementsHTML;
    }

    checkAchievements() {
        // First Roll
        if (this.rollHistory.length === 1) {
            this.achievements.firstRoll = true;
        }

        // Ten Rolls
        if (this.rollHistory.length >= 10) {
            this.achievements.tenRolls = true;
        }

        // Perfect Roll
        const lastRoll = this.rollHistory[this.rollHistory.length - 1];
        if (lastRoll.result === lastRoll.type) {
            this.achievements.perfectRoll = true;
        }

        // Lucky Streak
        if (this.rollHistory.length >= 3) {
            const lastThree = this.rollHistory.slice(-3);
            if (lastThree.every(roll => roll.result === lastThree[0].result)) {
                this.achievements.luckyStreak = true;
            }
        }
    }

    saveStatistics() {
        const data = {
            rollHistory: this.rollHistory,
            statistics: this.statistics,
            achievements: this.achievements
        };
        localStorage.setItem('advancedDiceStats', JSON.stringify(data));
    }

    loadStatistics() {
        const saved = localStorage.getItem('advancedDiceStats');
        if (saved) {
            const data = JSON.parse(saved);
            this.rollHistory = data.rollHistory || [];
            this.statistics = data.statistics || this.statistics;
            this.achievements = data.achievements || this.achievements;
        }
    }

    reset() {
        this.rollHistory = [];
        this.statistics = {
            totalRolls: 0,
            averageRoll: 0,
            highestRoll: 0,
            lowestRoll: 0,
            frequency: {}
        };
        this.achievements = {
            firstRoll: false,
            tenRolls: false,
            perfectRoll: false,
            luckyStreak: false
        };
        this.updateDisplay();
        this.saveStatistics();
    }

    exportData() {
        const data = {
            rollHistory: this.rollHistory,
            statistics: this.statistics,
            achievements: this.achievements,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dice-statistics.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.rollHistory = data.rollHistory || [];
                this.statistics = data.statistics || this.statistics;
                this.achievements = data.achievements || this.achievements;
                this.updateDisplay();
                this.saveStatistics();
            } catch (error) {
                console.error('Error importing data:', error);
            }
        };
        reader.readAsText(file);
    }
}

// Global instance
window.advancedDiceGame = new AdvancedDiceGame();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.advancedDiceGame) {
        window.advancedDiceGame.init();
    }
}); 