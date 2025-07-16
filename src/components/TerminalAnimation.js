// ===== TERMINAL ANIMATION - Post-login terminal animation =====
// Audio functions are now handled by audioManager.js

// Terminal Animation - Version Neo with Typewriter Effect
function showTerminal() {
    const terminal = document.getElementById("terminal");
    terminal.style.display = "block";
    terminal.style.opacity = "0";
    terminal.style.animation = "fadeIn 0.8s forwards";
    
    const lines = [
        { text: "> Initializing NeoCityOS v1...." },
        { text: "> Scanning user credentials..." },
        { text: "> Access GRANTED - Welcome back, Neo!" },
        { text: "> Loading desktop environment..." },
        { text: "> System ready. Welcome to NeoCity!" }
    ];
    
    let i = 0;
    const terminalOutput = document.getElementById("terminal-output");
    terminalOutput.innerHTML = ""; // Clear previous content
    
    const interval = setInterval(() => {
        if (i < lines.length) {
            const line = lines[i];
            const lineDiv = document.createElement('div');
            lineDiv.className = 'terminal-line';
            lineDiv.innerHTML = `<span class="text"></span>`;
            terminalOutput.appendChild(lineDiv);
            
            // Typewriter effect
            const textSpan = lineDiv.querySelector('.text');
            let charIndex = 0;
            
            const typeInterval = setInterval(() => {
                if (charIndex < line.text.length) {
                    textSpan.textContent += line.text[charIndex];
                    
                    // Play VERY LOUD keyboard sound for each character
                    if (typeof createElectronicBeepSound === 'function') {
                        createElectronicBeepSound();
                    }
                    
                    charIndex++;
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                } else {
                    clearInterval(typeInterval);
                    // Add cursor after typing is complete
                    textSpan.innerHTML += '<span class="cursor">█</span>';
                }
            }, 50); // Speed of typing
            
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                // Hide terminal with animation
                terminal.style.animation = "fadeOut 0.8s forwards";
                
                setTimeout(() => {
                    // Simple and direct solution
                    console.log('=== START TRANSITION TO DESKTOP ===');
                    
                    // 1. Completely hide the terminal
                    const terminal = document.getElementById("terminal");
                    if (terminal) {
                        terminal.style.display = "none";
                        terminal.style.animation = "";
                        console.log('✓ Terminal hidden');
                    }
                    
                    // 2. Hide the login section
                    const loginSection = document.getElementById("login-section");
                    if (loginSection) {
                        loginSection.style.display = "none";
                        console.log('✓ Login section hidden');
                    }
                    
                    // 3. Show the desktop
                    const desktop = document.getElementById("desktop-section");
                    if (desktop) {
                        desktop.style.display = "block";
                        desktop.style.opacity = "1";
                        desktop.style.transition = "opacity 0.5s ease";
                        desktop.classList.add('simple'); // Style simple
                        console.log('✓ Desktop shown');
                    }
                    
                    // 4. Show the taskbar
                    const taskbar = document.getElementById("taskbar");
                    if (taskbar) {
                        taskbar.style.display = "flex";
                        taskbar.style.opacity = "1";
                        taskbar.style.transition = "opacity 0.5s ease";
                        taskbar.classList.add('simple'); // Style simple
                        console.log('✓ Taskbar shown');
                    }
                    
                    // 5. Create desktop icons with correct functions
                    const desktopIcons = document.getElementById("desktop-icons");
                    if (desktopIcons) {
                        desktopIcons.classList.add('simple'); // Style simple
                        const icons = [
                            { name: "Files", icon: "assets/icons/files.png", location: "filemanager" },
                            { name: "Terminal", icon: "assets/icons/terminal.png", location: "terminal" },
                            { name: "Browser", icon: "assets/icons/browser.png", location: "browser" },
                            { name: "Dice Game", icon: "assets/icons/dice.png", location: "dicegame" },
                            { name: "Store", icon: "assets/icons/store.png", location: "store" },

                        ];
                        
                        desktopIcons.innerHTML = icons.map(app => `
                            <div class="icon simple" onclick="openApp('${app.location}', '${app.name}')">
                                <img src="${app.icon}" alt="${app.name}" onerror="this.style.background='linear-gradient(45deg, #9d00ff, #00f7ff)'; this.style.border='2px solid #00f7ff';">
                                <p>${app.name}</p>
                            </div>
                        `).join('');
                        console.log('✓ Desktop icons created with correct functions');
                    }
                    
                    // 6. Initialize desktop
                    if (typeof renderDesktopIcons === 'function') {
                        renderDesktopIcons();
                    }
                    
                    // 7. Initialize applications if needed
                    if (typeof initializeApp === 'function') {
                        initializeApp();
                    }
                    
                    console.log('=== TRANSITION TO DESKTOP COMPLETE ===');
                }, 800);
            }, 4000); // More time to see the typewriter effect
        }
    }, 800); // Spacing between lines
}

// Fallback function to show the desktop
function forceShowDesktop() {
    console.log('Force show desktop called');
    
    // Hide the terminal
    const terminal = document.getElementById("terminal");
    if (terminal) {
        terminal.style.display = "none";
    }
    
    // Show the desktop
    const desktop = document.getElementById("desktop-section");
    if (desktop) {
        desktop.style.display = "block";
        desktop.style.opacity = "1";
        desktop.classList.add('simple'); // Style simple
    }
    
    // Show the taskbar
    const taskbar = document.getElementById("taskbar");
    if (taskbar) {
        taskbar.style.display = "flex";
        taskbar.classList.add('simple'); // Style simple
    }
    
    // Create desktop icons if they don't exist
    const desktopIcons = document.getElementById("desktop-icons");
    if (desktopIcons && desktopIcons.children.length === 0) {
        desktopIcons.classList.add('simple'); // Style simple
        const icons = [
            { name: "Files", icon: "assets/icons/files.png", location: "filemanager" },
            { name: "Terminal", icon: "assets/icons/terminal.png", location: "terminal" },
            { name: "Browser", icon: "assets/icons/browser.png", location: "browser" },
            { name: "Dice Game", icon: "assets/icons/dice.png", location: "dicegame" },
            { name: "Store", icon: "assets/icons/store.png", location: "store" },

        ];
        
        desktopIcons.innerHTML = icons.map(app => `
            <div class="icon simple" onclick="openApp('${app.location}', '${app.name}')">
                <img src="${app.icon}" alt="${app.name}" onerror="this.style.background='linear-gradient(45deg, #9d00ff, #00f7ff)'; this.style.border='2px solid #00f7ff';">
                <p>${app.name}</p>
            </div>
        `).join('');
    }
    
    // Initialize desktop if function exists
    if (typeof renderDesktopIcons === 'function') {
        renderDesktopIcons();
    }
    
    console.log('Forced desktop shown');
}


