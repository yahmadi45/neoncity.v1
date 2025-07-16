// Text Analyzer for NeoCityOS
class TextAnalyzer {
    constructor() {
        this.currentText = '';
        this.analysisResults = {};
    }

    init() {
        this.loadSavedText();
    }

    analyze() {
        const textInput = document.getElementById('text-input');
        if (!textInput) return;

        this.currentText = textInput.value.trim();
        if (!this.currentText) {
            this.showMessage('Please enter some text to analyze');
            return;
        }

        this.performAnalysis();
        this.updateDisplay();
        this.saveText();
    }

    performAnalysis() {
        this.analysisResults = {
            // Basic statistics
            characters: this.currentText.length,
            charactersNoSpaces: this.currentText.replace(/\s/g, '').length,
            words: this.countWords(),
            sentences: this.countSentences(),
            paragraphs: this.countParagraphs(),
            lines: this.countLines(),
            
            // Word analysis
            uniqueWords: this.getUniqueWords().length,
            averageWordLength: this.getAverageWordLength(),
            longestWord: this.getLongestWord(),
            shortestWord: this.getShortestWord(),
            
            // Character analysis
            letterFrequency: this.getLetterFrequency(),
            digitCount: this.countDigits(),
            punctuationCount: this.countPunctuation(),
            
            // Reading metrics
            readingTime: this.calculateReadingTime(),
            speakingTime: this.calculateSpeakingTime(),
            
            // Text complexity
            fleschScore: this.calculateFleschScore(),
            complexity: this.assessComplexity()
        };
    }

    countWords() {
        return this.currentText.split(/\s+/).filter(word => word.length > 0).length;
    }

    countSentences() {
        return this.currentText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    }

    countParagraphs() {
        return this.currentText.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
    }

    countLines() {
        return this.currentText.split('\n').length;
    }

    getUniqueWords() {
        const words = this.currentText.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 0);
        return [...new Set(words)];
    }

    getAverageWordLength() {
        const words = this.currentText.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) return 0;
        
        const totalLength = words.reduce((sum, word) => sum + word.length, 0);
        return (totalLength / words.length).toFixed(2);
    }

    getLongestWord() {
        const words = this.currentText.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) return '';
        
        return words.reduce((longest, current) => 
            current.length > longest.length ? current : longest
        );
    }

    getShortestWord() {
        const words = this.currentText.split(/\s+/).filter(word => word.length > 0);
        if (words.length === 0) return '';
        
        return words.reduce((shortest, current) => 
            current.length < shortest.length ? current : shortest
        );
    }

    getLetterFrequency() {
        const frequency = {};
        const letters = this.currentText.toLowerCase().replace(/[^a-z]/g, '');
        
        for (let char of letters) {
            frequency[char] = (frequency[char] || 0) + 1;
        }
        
        // Sort by frequency
        return Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});
    }

    countDigits() {
        return (this.currentText.match(/\d/g) || []).length;
    }

    countPunctuation() {
        return (this.currentText.match(/[^\w\s]/g) || []).length;
    }

    calculateReadingTime() {
        const wordsPerMinute = 200;
        const words = this.countWords();
        const minutes = words / wordsPerMinute;
        
        if (minutes < 1) {
            return `${Math.round(minutes * 60)} seconds`;
        } else {
            return `${Math.round(minutes)} minutes ${Math.round((minutes % 1) * 60)} seconds`;
        }
    }

    calculateSpeakingTime() {
        const wordsPerMinute = 150;
        const words = this.countWords();
        const minutes = words / wordsPerMinute;
        
        if (minutes < 1) {
            return `${Math.round(minutes * 60)} seconds`;
        } else {
            return `${Math.round(minutes)} minutes ${Math.round((minutes % 1) * 60)} seconds`;
        }
    }

    calculateFleschScore() {
        const words = this.countWords();
        const sentences = this.countSentences();
        const syllables = this.countSyllables();
        
        if (words === 0 || sentences === 0) return 0;
        
        const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        return Math.max(0, Math.min(100, score));
    }

    countSyllables() {
        const words = this.currentText.toLowerCase().split(/\s+/);
        let syllableCount = 0;
        
        for (let word of words) {
            word = word.replace(/[^\w]/g, '');
            if (word.length <= 3) {
                syllableCount += 1;
            } else {
                const matches = word.match(/[aeiouy]+/g);
                syllableCount += matches ? matches.length : 1;
            }
        }
        
        return syllableCount;
    }

    assessComplexity() {
        const fleschScore = this.analysisResults.fleschScore;
        
        if (fleschScore >= 90) return 'Very Easy';
        if (fleschScore >= 80) return 'Easy';
        if (fleschScore >= 70) return 'Fairly Easy';
        if (fleschScore >= 60) return 'Standard';
        if (fleschScore >= 50) return 'Fairly Difficult';
        if (fleschScore >= 30) return 'Difficult';
        return 'Very Difficult';
    }

    findPalindromes() {
        const words = this.currentText.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 0);
        
        const palindromes = words.filter(word => {
            const reversed = word.split('').reverse().join('');
            return word === reversed && word.length > 1;
        });
        
        this.showResults('Palindromes Found', palindromes);
    }

    findAnagrams() {
        const words = this.currentText.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 0);
        
        const anagramGroups = {};
        
        for (let word of words) {
            const sorted = word.split('').sort().join('');
            if (!anagramGroups[sorted]) {
                anagramGroups[sorted] = [];
            }
            if (!anagramGroups[sorted].includes(word)) {
                anagramGroups[sorted].push(word);
            }
        }
        
        const anagrams = Object.values(anagramGroups)
            .filter(group => group.length > 1)
            .map(group => group.join(' ↔ '));
        
        this.showResults('Anagrams Found', anagrams);
    }

    wordFrequency() {
        const words = this.currentText.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length > 0);
        
        const frequency = {};
        for (let word of words) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
        
        const sortedWords = Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([word, count]) => `${word}: ${count} times`);
        
        this.showResults('Most Common Words', sortedWords);
    }

    updateDisplay() {
        const statsDiv = document.getElementById('text-stats');
        if (!statsDiv) return;

        const results = this.analysisResults;
        statsDiv.innerHTML = `
        <div class="stats-section">
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">📊</span> Basic Statistics</div>
            <div class="stats-row"><span>Characters:</span><span class="stats-value">${results.characters}</span></div>
            <div class="stats-row"><span>Characters (no spaces):</span><span class="stats-value">${results.charactersNoSpaces}</span></div>
            <div class="stats-row"><span>Words:</span><span class="stats-value">${results.words}</span></div>
            <div class="stats-row"><span>Sentences:</span><span class="stats-value">${results.sentences}</span></div>
            <div class="stats-row"><span>Paragraphs:</span><span class="stats-value">${results.paragraphs}</span></div>
            <div class="stats-row"><span>Lines:</span><span class="stats-value">${results.lines}</span></div>
          </div>
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">📝</span> Word Analysis</div>
            <div class="stats-row"><span>Unique words:</span><span class="stats-value">${results.uniqueWords}</span></div>
            <div class="stats-row"><span>Average word length:</span><span class="stats-value">${results.averageWordLength}</span></div>
            <div class="stats-row"><span>Longest word:</span><span class="stats-value highlight-word">"${results.longestWord}" (${results.longestWord.length} chars)</span></div>
            <div class="stats-row"><span>Shortest word:</span><span class="stats-value highlight-word">"${results.shortestWord}" (${results.shortestWord.length} chars)</span></div>
          </div>
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">🔤</span> Character Analysis</div>
            <div class="stats-row"><span>Digits:</span><span class="stats-value">${results.digitCount}</span></div>
            <div class="stats-row"><span>Punctuation marks:</span><span class="stats-value">${results.punctuationCount}</span></div>
          </div>
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">⏱️</span> Reading Metrics</div>
            <div class="stats-row"><span>Reading time:</span><span class="stats-value">${results.readingTime}</span></div>
            <div class="stats-row"><span>Speaking time:</span><span class="stats-value">${results.speakingTime}</span></div>
          </div>
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">📈</span> Complexity</div>
            <div class="stats-row"><span>Flesch Reading Ease:</span><span class="stats-value">${results.fleschScore ? results.fleschScore.toFixed(1) : '-'}</span></div>
            <div class="stats-row"><span>Complexity level:</span><span class="stats-value">${results.complexity}</span></div>
          </div>
          <div class="stats-group">
            <div class="stats-header"><span class="stats-icon">🔤</span> Letter Frequency (Top 10)</div>
            ${this.generateLetterFrequencyDisplay()}
          </div>
        </div>
        `;
    }

    generateLetterFrequencyDisplay() {
        const frequency = this.analysisResults.letterFrequency;
        const top10 = Object.entries(frequency).slice(0, 10);
        if (top10.length === 0) return '<div class="stats-row">No letters found</div>';
        const max = Math.max(...top10.map(([, count]) => count));
        return `<div class="letter-frequency-bar">${top10.map(([letter, count]) => {
            const width = max > 0 ? (count / max) * 100 : 0;
            return `<div class="letter-bar" style="width:${width}%"><span>${letter.toUpperCase()}</span> <span>${count}</span></div>`;
        }).join('')}</div>`;
    }

    showResults(title, results) {
        if (results.length === 0) {
            this.showMessage(`No ${title.toLowerCase()} found`);
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'text-analyzer-modal';
        
        const content = document.createElement('div');
        content.className = 'text-analyzer-modal-content';
        content.innerHTML = `
            <h3>${title}</h3>
            ${results.map(result => `<div class="text-analyzer-modal-result">${result}</div>`).join('')}
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'text-analyzer-modal-btn';
        
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        content.appendChild(closeBtn);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'text-analyzer-message';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    saveText() {
        localStorage.setItem('textAnalyzerText', this.currentText);
    }

    loadSavedText() {
        const savedText = localStorage.getItem('textAnalyzerText');
        if (savedText) {
            const textInput = document.getElementById('text-input');
            if (textInput) {
                textInput.value = savedText;
                this.currentText = savedText;
            }
        }
    }

    clearText() {
        const textInput = document.getElementById('text-input');
        if (textInput) {
            textInput.value = '';
            this.currentText = '';
            this.analysisResults = {};
            this.updateDisplay();
            localStorage.removeItem('textAnalyzerText');
        }
    }

    exportAnalysis() {
        const data = {
            text: this.currentText,
            analysis: this.analysisResults,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text-analysis.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Global instance
window.textAnalyzer = new TextAnalyzer();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.textAnalyzer) {
        window.textAnalyzer.init();
    }
}); 