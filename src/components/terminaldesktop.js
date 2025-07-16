// NeoCityOS Terminal System
class NeoTerminal {
    constructor() {
        // Initialization of generated mechanical keyboard sound
        this.soundEnabled = true; // Option to enable/disable sound
        this.audioContext = null;
        this.initAudioContext();
        
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clear(),
            ls: () => this.listFiles(),
            cd: (path) => this.changeDirectory(path),
            pwd: () => this.printWorkingDirectory(),
            whoami: () => this.whoAmI(),
            date: () => this.showDate(),
            echo: (...args) => this.echo(args.join(' ')),
            cat: (file) => this.showFile(file),
            mkdir: (name) => this.makeDirectory(name),
            touch: (name) => this.createFile(name),
            rm: (name) => this.removeFile(name),
            cp: (src, dest) => this.copyFile(src, dest),
            mv: (src, dest) => this.moveFile(src, dest),
            find: (name) => this.findFile(name),
            grep: (pattern, file) => this.grepFile(pattern, file),
            ps: () => this.showProcesses(),
            top: () => this.showTop(),
            kill: (pid) => this.killProcess(pid),
            ping: (host) => this.ping(host),
            curl: (url) => this.curl(url),
            wget: (url) => this.wget(url),
            ssh: (host) => this.ssh(host),
            sudo: (...args) => this.sudo(args),
            history: () => this.showHistory(),
            alias: (name, command) => this.createAlias(name, command),
            export: (variable) => this.exportVariable(variable),
            env: () => this.showEnvironment(),
            which: (command) => this.which(command),
            man: (command) => this.showManual(command),
            info: () => this.showSystemInfo(),
            uptime: () => this.showUptime(),
            df: () => this.showDiskUsage(),
            free: () => this.showMemory(),
            lscpu: () => this.showCPU(),
            uname: () => this.showKernel(),
            mount: () => this.showMounts(),
            lsblk: () => this.showBlockDevices(),
            netstat: () => this.showNetwork(),
            ifconfig: () => this.showInterfaces(),
            route: () => this.showRoutes(),
            iptables: () => this.showFirewall(),
            systemctl: (action, service) => this.systemControl(action, service),
            service: (service, action) => this.serviceControl(service, action),
            crontab: () => this.showCrontab(),
            jobs: () => this.showJobs(),
            nohup: (command) => this.nohup(command),
            screen: () => this.screen(),
            tmux: () => this.tmux(),
            vim: (file) => this.vim(file),
            nano: (file) => this.nano(file),
            less: (file) => this.less(file),
            more: (file) => this.more(file),
            head: (file) => this.head(file),
            tail: (file) => this.tail(file),
            sort: (file) => this.sort(file),
            uniq: (file) => this.uniq(file),
            wc: (file) => this.wordCount(file),
            diff: (file1, file2) => this.diff(file1, file2),
            tar: (...args) => this.tar(args),
            zip: (...args) => this.zip(args),
            unzip: (file) => this.unzip(file),
            gzip: (file) => this.gzip(file),
            gunzip: (file) => this.gunzip(file),
            chmod: (mode, file) => this.chmod(mode, file),
            chown: (owner, file) => this.chown(owner, file),
            chgrp: (group, file) => this.chgrp(group, file),
            ln: (src, dest) => this.link(src, dest),
            stat: (file) => this.stat(file),
            file: (name) => this.fileType(name),
            du: (path) => this.diskUsage(path),
            tree: () => this.tree(),
            locate: (name) => this.locate(name),
            updatedb: () => this.updatedb(),
            cmp: (file1, file2) => this.compare(file1, file2),
            md5sum: (file) => this.md5sum(file),
            sha256sum: (file) => this.sha256sum(file),
            base64: (text) => this.base64(text),
            xxd: (file) => this.hexdump(file),
            strings: (file) => this.strings(file),
            od: (file) => this.octalDump(file),
            hexdump: (file) => this.hexdump(file),
            
            // NeoCityOS special commands
            matrix: () => this.matrix(),
            hack: () => this.hack(),
            scan: () => this.scan(),
            decrypt: (file) => this.decrypt(file),
            encrypt: (file) => this.encrypt(file),
            neural: () => this.neural(),
            quantum: () => this.quantum(),
            hologram: () => this.hologram(),
            cybersec: () => this.cybersec(),
            neonet: () => this.neonet(),
            
            // Commandes de jeu
            dice: () => this.openDiceGame(),
            store: () => this.openStore(),
            stats: () => this.showStats(),
            inventory: () => this.showInventory(),
            achievements: () => this.showAchievements(),
            
            // System commands
            reboot: () => this.reboot(),
            shutdown: () => this.shutdown(),
            logout: () => this.logout(),
            login: () => this.login(),
            passwd: () => this.changePassword(),
            su: (user) => this.switchUser(user),
            
            // Development commands
            git: (...args) => this.git(args),
            npm: (...args) => this.npm(args),
            node: (file) => this.node(file),
            python: (file) => this.python(file),
            gcc: (...args) => this.gcc(args),
            make: () => this.make(),
            cmake: () => this.cmake(),
            docker: (...args) => this.docker(args),
            
            // Commandes de monitoring
            htop: () => this.htop(),
            iotop: () => this.iotop(),
            nethogs: () => this.nethogs(),
            iftop: () => this.iftop(),
            tcpdump: () => this.tcpdump(),
            wireshark: () => this.wireshark(),
            
            // Commandes de texte
            awk: (...args) => this.awk(args),
            sed: (...args) => this.sed(args),
            tr: (...args) => this.tr(args),
            cut: (...args) => this.cut(args),
            paste: (...args) => this.paste(args),
            join: (...args) => this.join(args),
            
            // Commandes de compression
            bzip2: (file) => this.bzip2(file),
            bunzip2: (file) => this.bunzip2(file),
            xz: (file) => this.xz(file),
            unxz: (file) => this.unxz(file),
            
            // Advanced network commands
            nmap: (target) => this.nmap(target),
            nslookup: (domain) => this.nslookup(domain),
            dig: (domain) => this.dig(domain),
            traceroute: (host) => this.traceroute(host),
            mtr: (host) => this.mtr(host),
            nc: (...args) => this.netcat(args),
            telnet: (host, port) => this.telnet(host, port),
            ftp: (host) => this.ftp(host),
            sftp: (host) => this.sftp(host),
            rsync: (...args) => this.rsync(args),
            scp: (...args) => this.scp(args),
            
            // Audio control commands
            sound: (action) => this.controlSound(action),
            volume: (level) => this.setVolume(level)
        };
        
        this.currentPath = '/home/user';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.aliases = {};
        this.environment = {
            USER: 'user',
            HOME: '/home/user',
            PATH: '/usr/local/bin:/usr/bin:/bin',
            SHELL: '/bin/neosh',
            TERM: 'neocity-256color'
        };
        this.processes = [
            { pid: 1, name: 'systemd', cpu: 0.1, mem: 0.5 },
            { pid: 2, name: 'kthreadd', cpu: 0.0, mem: 0.0 },
            { pid: 3, name: 'neocity-desktop', cpu: 2.1, mem: 15.3 },
            { pid: 4, name: 'neocity-terminal', cpu: 1.2, mem: 8.7 }
        ];
        
        this.fileSystem = {
            '/': {
                type: 'directory',
                contents: {
                    'home': {
                        type: 'directory',
                        contents: {
                            'user': {
                                type: 'directory',
                                contents: {
                                    'documents': { type: 'directory', contents: {} },
                                    'downloads': { type: 'directory', contents: {} },
                                    'pictures': { type: 'directory', contents: {} },
                                    'music': { type: 'directory', contents: {} },
                                    'videos': { type: 'directory', contents: {} },
                                    'desktop': { type: 'directory', contents: {} },
                                    '.bashrc': { type: 'file', content: '# NeoCityOS bash configuration' },
                                    '.profile': { type: 'file', content: '# User profile' },
                                    'readme.txt': { type: 'file', content: 'Welcome to NeoCityOS!' }
                                }
                            }
                        }
                    },
                    'usr': {
                        type: 'directory',
                        contents: {
                            'bin': { type: 'directory', contents: {} },
                            'lib': { type: 'directory', contents: {} },
                            'local': { type: 'directory', contents: {} }
                        }
                    },
                    'etc': {
                        type: 'directory',
                        contents: {
                            'passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash' },
                            'hosts': { type: 'file', content: '127.0.0.1 localhost\n::1 localhost' }
                        }
                    },
                    'var': {
                        type: 'directory',
                        contents: {
                            'log': { type: 'directory', contents: {} },
                            'tmp': { type: 'directory', contents: {} }
                        }
                    }
                }
            }
        };
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('AudioContext not supported:', error);
        }
    }

    createKeyboardSound() {
        if (!this.audioContext || !this.soundEnabled) return;
        
        try {
            // Create two oscillators for more richness
            const osc1 = this.audioContext.createOscillator();
            const osc2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            // Configure oscillators with harmonic frequencies
            osc1.frequency.setValueAtTime(800, this.audioContext.currentTime);
            osc1.type = 'sine';
            
            osc2.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            osc2.type = 'triangle';
            
            // Configuration du gain avec enveloppe plus naturelle
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.01);
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.12);
            
            // Connexions
            osc1.connect(gainNode);
            osc2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Start and stop with longer duration
            osc1.start(this.audioContext.currentTime);
            osc2.start(this.audioContext.currentTime);
            osc1.stop(this.audioContext.currentTime + 0.12);
            osc2.stop(this.audioContext.currentTime + 0.12);
        } catch (error) {
            console.log('Error creating keyboard sound:', error);
        }
    }

    initialize() {
        const input = document.getElementById('terminal-input');
        if (input) {
            input.addEventListener('keydown', (e) => this.handleKeyDown(e));
            input.focus();
            
            // Message de bienvenue
            this.output('Welcome to NeoCityOS Terminal v2.1');
            this.output('Type "help" for available commands.');
            this.output('');
        }
    }

    initializeApp() {
        this.initialize();
    }

    handleKeyDown(e) {
        const input = e.target;
        
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                this.executeCommand(command);
                this.commandHistory.push(command);
                this.historyIndex = this.commandHistory.length;
            }
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                input.value = this.commandHistory[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete(input);
        }
    }

    executeCommand(commandLine) {
        // Display executed command
        const outputElement = document.getElementById('terminal-output');
        if (outputElement) {
            const commandDiv = document.createElement('div');
            commandDiv.className = 'terminal-line';
            commandDiv.innerHTML = `<span class="prompt">user@neocity:${this.currentPath}$</span><span>${commandLine}</span>`;
            outputElement.appendChild(commandDiv);
        }
        
        const parts = commandLine.split(' ');
        const command = parts[0];
        const args = parts.slice(1);
        
        // Check aliases
        if (this.aliases[command]) {
            const aliasCommand = this.aliases[command];
            return this.executeCommand(aliasCommand + ' ' + args.join(' '));
        }
        
        if (this.commands[command]) {
            try {
                const result = this.commands[command](...args);
                if (result) {
                    this.output(result);
                }
            } catch (error) {
                this.output(`Error: ${error.message}`);
            }
        } else {
            this.output(`Command not found: ${command}`);
            this.output(`Type "help" for available commands.`);
        }
        
        // Ajouter une ligne vide avec curseur
        if (outputElement) {
            const emptyLine = document.createElement('div');
            emptyLine.className = 'terminal-line';
            emptyLine.innerHTML = `<span class="prompt">user@neocity:${this.currentPath}$</span><span class="cursor">_</span>`;
            outputElement.appendChild(emptyLine);
            outputElement.scrollTop = outputElement.scrollHeight;
        }
    }

    output(text) {
        const outputElement = document.getElementById('terminal-output');
        if (outputElement) {
            // Jouer le son de clavier
            this.playKeyboardSound();
            
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="prompt">user@neocity:${this.currentPath}$</span><span>${text}</span>`;
            outputElement.appendChild(line);
            outputElement.scrollTop = outputElement.scrollHeight;
        }
    }

    clear() {
        const outputElement = document.getElementById('terminal-output');
        if (outputElement) {
            outputElement.innerHTML = '';
        }
    }

    playKeyboardSound() {
        if (!this.soundEnabled) return; // Don't play if sound is disabled
        
        try {
            // Create unique mechanical keyboard sound
            this.createKeyboardSound();
        } catch (error) {
            // Silent audio error handling
            console.log('Audio error:', error);
        }
    }

    showHelp() {
        return `Available commands:

File Operations:
  ls              - List directory contents
  cd <path>       - Change directory
  pwd             - Print working directory
  cat <file>      - Display file contents
  mkdir <name>    - Create directory
  touch <file>    - Create empty file
  rm <file>       - Remove file
  cp <src> <dst>  - Copy file
  mv <src> <dst>  - Move/rename file
  find <name>     - Find files
  tree            - Show directory tree

System Info:
  whoami          - Show current user
  date            - Show current date/time
  uptime          - Show system uptime
  ps              - Show running processes
  top             - Show system monitor
  df              - Show disk usage
  free            - Show memory usage
  uname           - Show system info

Network:
  ping <host>     - Ping a host
  curl <url>      - Download from URL
  nmap <target>   - Network scan
  netstat         - Show network connections

NeoCityOS Special:
  matrix          - Enter the Matrix
  hack            - Hacking simulation
  scan            - System scan
  neural          - Neural network interface
  quantum         - Quantum processor
  cybersec        - Cybersecurity tools

Games & Apps:
  dice            - Open dice game
  store           - Open store
  stats           - Show user stats
  inventory       - Show inventory

Utilities:
  help            - Show this help
  clear           - Clear terminal
  history         - Show command history
  echo <text>     - Print text
  man <command>   - Show manual page

Audio Control:
  sound on        - Enable keyboard sounds
  sound off       - Disable keyboard sounds
  sound status    - Show sound status
  volume <0-1>    - Set volume (0.0 to 1.0)

Type any command followed by arguments to execute it.`;
    }

    // Basic command implementation
    listFiles() {
        const currentDir = this.getDirectoryContents(this.currentPath);
        if (!currentDir) {
            return 'Directory not found';
        }
        
        const items = Object.entries(currentDir.contents || {});
        if (items.length === 0) {
            return 'Directory is empty';
        }
        
        return items.map(([name, item]) => {
            const type = item.type === 'directory' ? 'd' : '-';
            const permissions = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
            const size = item.type === 'directory' ? '4096' : (item.content?.length || '0');
            const date = new Date().toLocaleDateString();
            return `${type}${permissions} 1 user user ${size.padStart(8)} ${date} ${name}`;
        }).join('\n');
    }

    changeDirectory(path) {
        if (!path) {
            this.currentPath = '/home/user';
            return;
        }
        
        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            parts.pop();
            this.currentPath = '/' + parts.join('/');
            if (this.currentPath === '/') this.currentPath = '/';
            return;
        }
        
        if (path === '/') {
            this.currentPath = '/';
            return;
        }
        
        const newPath = path.startsWith('/') ? path : `${this.currentPath}/${path}`;
        const normalizedPath = this.normalizePath(newPath);
        
        if (this.getDirectoryContents(normalizedPath)) {
            this.currentPath = normalizedPath;
        } else {
            return `cd: ${path}: No such file or directory`;
        }
    }

    printWorkingDirectory() {
        return this.currentPath;
    }

    whoAmI() {
        return currentUser || 'user';
    }

    showDate() {
        return new Date().toString();
    }

    echo(text) {
        return text;
    }

    showFile(filename) {
        const filePath = this.resolvePath(filename);
        const file = this.getFile(filePath);
        
        if (!file) {
            return `cat: ${filename}: No such file or directory`;
        }
        
        if (file.type !== 'file') {
            return `cat: ${filename}: Is a directory`;
        }
        
        return file.content || 'File is empty';
    }

    matrix() {
        return `Entering the Matrix...
Loading simulation...
Welcome to the digital realm.
Type 'exit' to return to reality.`;
    }

    hack() {
        return `Initiating hack sequence...
Bypassing security protocols...
Access granted to mainframe.
Hack complete.`;
    }

    scan() {
        return `Scanning system...
Found 127.0.0.1 - localhost
Found 192.168.1.1 - router
Found 8.8.8.8 - Google DNS
Scan complete.`;
    }

    neural() {
        return `Neural network interface activated.
Processing patterns...
Learning algorithms engaged.
Neural pathways optimized.`;
    }

    quantum() {
        return `Quantum processor online.
Superposition state achieved.
Quantum entanglement established.
Processing at quantum speeds.`;
    }

    openDiceGame() {
        if (typeof openApp === 'function') {
            openApp('dicegame', 'Dice Game');
        }
        return 'Opening dice game...';
    }

    openStore() {
        if (typeof openApp === 'function') {
            openApp('store', 'NeoStore');
        }
        return 'Opening store...';
    }

    showStats() {
        const username = currentUser || 'guest';
        const userKey = `neo_users_${username}`;
        const userData = JSON.parse(localStorage.getItem(userKey)) || { xp: 0, gold: 100, level: 1 };
        
        return `User Statistics:
Username: ${username}
Level: ${userData.level}
XP: ${userData.xp}
Gold: ${userData.gold}`;
    }

    showInventory() {
        return `Inventory:
- Cyberdeck v2.1
- Neural interface
- Quantum processor
- Holographic projector
- Stealth cloak`;
    }

    showAchievements() {
        return `Achievements:
- First Login ✓
- Terminal Master ✓
- File Explorer ✓
- Game Player (0/5)
- Hacker (0/10)`;
    }

    showProcesses() {
        return `PID  TTY          TIME CMD
1234 pts/0    00:00:01 bash
1235 pts/0    00:00:00 neocity
1236 pts/0    00:00:00 terminal
1237 pts/0    00:00:00 ps`;
    }

    showTop() {
        return `top - 14:30:15 up 2:15, 1 user, load average: 0.15, 0.12, 0.08
Tasks: 45 total, 1 running, 44 sleeping, 0 stopped, 0 zombie
%Cpu(s): 2.1 us, 1.2 sy, 0.0 ni, 96.7 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
MiB Mem : 8192.0 total, 2048.0 free, 3072.0 used, 3072.0 buff/cache
MiB Swap: 0.0 total, 0.0 free, 0.0 used. 4096.0 avail Mem

PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
1234 user      20   0   12345   1234    567 S   2.1  15.3   0:01.23 neocity-desktop
1235 user      20   0    5678    890    234 S   1.2   8.7   0:00.45 neocity-terminal`;
    }

    showUptime() {
        const uptime = Math.floor(Math.random() * 86400);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        return `up ${hours}:${minutes.toString().padStart(2, '0')}, 1 user, load average: 0.15, 0.12, 0.08`;
    }

    ping(host) {
        return `PING ${host} (127.0.0.1) 56(84) bytes of data.
64 bytes from ${host} (127.0.0.1): icmp_seq=1 time=0.045 ms
64 bytes from ${host} (127.0.0.1): icmp_seq=2 time=0.042 ms
64 bytes from ${host} (127.0.0.1): icmp_seq=3 time=0.044 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 0.042/0.043/0.045/0.001 ms`;
    }

    getDirectoryContents(path) {
        const normalizedPath = this.normalizePath(path);
        let current = this.fileSystem['/'];
        
        if (normalizedPath === '/') {
            return current;
        }
        
        const parts = normalizedPath.split('/').filter(p => p);
        for (const part of parts) {
            if (current.contents && current.contents[part]) {
                current = current.contents[part];
            } else {
                return null;
            }
        }
        
        return current;
    }

    getFile(path) {
        const normalizedPath = this.normalizePath(path);
        let current = this.fileSystem['/'];
        
        if (normalizedPath === '/') {
            return current;
        }
        
        const parts = normalizedPath.split('/').filter(p => p);
        for (const part of parts) {
            if (current.contents && current.contents[part]) {
                current = current.contents[part];
            } else {
                return null;
            }
        }
        
        return current;
    }

    normalizePath(path) {
        if (!path) return '/';
        
        const parts = path.split('/').filter(p => p);
        const normalized = [];
        
        for (const part of parts) {
            if (part === '.') continue;
            if (part === '..') {
                normalized.pop();
            } else {
                normalized.push(part);
            }
        }
        
        return '/' + normalized.join('/');
    }

    autoComplete(input) {
        const currentDir = this.getDirectoryContents(this.currentPath);
        if (!currentDir || !currentDir.contents) return;
        
        const partial = input.value;
        const matches = Object.keys(currentDir.contents).filter(name => 
            name.startsWith(partial)
        );
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            this.output('Possible completions:');
            matches.forEach(match => this.output(`  ${match}`));
        }
    }

    // Placeholder methods for other commands
    makeDirectory(name) { return `mkdir: created directory '${name}'`; }
    createFile(name) { return `touch: created file '${name}'`; }
    removeFile(name) { return `rm: removed '${name}'`; }
    copyFile(src, dest) { return `cp: copied '${src}' to '${dest}'`; }
    moveFile(src, dest) { return `mv: moved '${src}' to '${dest}'`; }
    findFile(name) { return `find: no files found matching '${name}'`; }
    grepFile(pattern, file) { return `grep: no matches found for '${pattern}' in '${file}'`; }
    killProcess(pid) { return `kill: process ${pid} terminated`; }
    curl(url) { return `curl: downloaded from '${url}'`; }
    wget(url) { return `wget: downloaded from '${url}'`; }
    ssh(host) { return `ssh: connected to '${host}'`; }
    sudo(args) { return `sudo: executed '${args.join(' ')}' with elevated privileges`; }
    showHistory() { return this.commandHistory.join('\n'); }
    createAlias(name, command) { this.aliases[name] = command; return `alias: created '${name}'='${command}'`; }
    exportVariable(variable) { return `export: set '${variable}'`; }
    showEnvironment() { return Object.entries(this.environment).map(([k,v]) => `${k}=${v}`).join('\n'); }
    which(command) { return `/usr/bin/${command}`; }
    showManual(command) { return `man: manual page for '${command}' not found`; }
    showSystemInfo() { return `NeoCityOS v2.1\nKernel: 5.15.0-neocity\nArchitecture: x86_64`; }
    showDiskUsage() { return `Filesystem     1K-blocks    Used Available Use% Mounted on\n/dev/sda1      1048576  524288    524288  50% /`; }
    showMemory() { return `              total        used        free      shared  buff/cache   available\nMem:           8192        4096        2048         512        2048        3584\nSwap:             0           0           0`; }
    showCPU() { return `CPU(s): 8\nModel name: Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz`; }
    showKernel() { return `NeoCityOS 5.15.0-neocity #1 SMP Mon Jan 1 00:00:00 UTC 2024 x86_64 GNU/Linux`; }
    showMounts() { return `/dev/sda1 on / type ext4 (rw,relatime)\nproc on /proc type proc (rw,nosuid,nodev,noexec,relatime)`; }
    showBlockDevices() { return `NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda      8:0    0  100G  0 disk\nsda1     8:1    0  100G  0 part /`; }
    showNetwork() { return `Proto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN`; }
    showInterfaces() { return `lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\neth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.100  netmask 255.255.255.0`; }
    showRoutes() { return `Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\ndefault         192.168.1.1     0.0.0.0         UG    100    0        0 eth0`; }
    showFirewall() { return `Chain INPUT (policy ACCEPT)\nnum  target     prot opt source               destination`; }
    systemControl(action, service) { return `systemctl: ${action} ${service}`; }
    serviceControl(service, action) { return `service: ${service} ${action}`; }
    showCrontab() { return `# m h  dom mon dow   command\n0 2 * * * /usr/bin/backup`; }
    showJobs() { return `[1]+  Running                 sleep 100 &`; }
    nohup(command) { return `nohup: ignoring input and appending output to 'nohup.out'`; }
    screen() { return `screen: new screen session created`; }
    tmux() { return `tmux: new session created`; }
    vim(file) { return `vim: editing '${file}'`; }
    nano(file) { return `nano: editing '${file}'`; }
    less(file) { return `less: viewing '${file}'`; }
    more(file) { return `more: viewing '${file}'`; }
    head(file) { return `head: first 10 lines of '${file}'`; }
    tail(file) { return `tail: last 10 lines of '${file}'`; }
    sort(file) { return `sort: sorted '${file}'`; }
    uniq(file) { return `uniq: removed duplicates from '${file}'`; }
    wordCount(file) { return `wc: 10 lines, 50 words, 300 characters in '${file}'`; }
    diff(file1, file2) { return `diff: differences between '${file1}' and '${file2}'`; }
    tar(args) { return `tar: created archive with '${args.join(' ')}'`; }
    zip(args) { return `zip: created archive with '${args.join(' ')}'`; }
    unzip(file) { return `unzip: extracted '${file}'`; }
    gzip(file) { return `gzip: compressed '${file}'`; }
    gunzip(file) { return `gunzip: decompressed '${file}'`; }
    chmod(mode, file) { return `chmod: changed permissions of '${file}' to ${mode}`; }
    chown(owner, file) { return `chown: changed owner of '${file}' to ${owner}`; }
    chgrp(group, file) { return `chgrp: changed group of '${file}' to ${group}`; }
    link(src, dest) { return `ln: created link from '${src}' to '${dest}'`; }
    stat(file) { return `stat: information about '${file}'`; }
    fileType(name) { return `file: '${name}' is a text file`; }
    diskUsage(path) { return `du: disk usage for '${path}'`; }
    tree() { return `tree: directory structure`; }
    locate(name) { return `locate: found '${name}'`; }
    updatedb() { return `updatedb: database updated`; }
    compare(file1, file2) { return `cmp: '${file1}' and '${file2}' are identical`; }
    md5sum(file) { return `md5sum: ${file}  d41d8cd98f00b204e9800998ecf8427e`; }
    sha256sum(file) { return `sha256sum: ${file}  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; }
    base64(text) { return `base64: ${btoa(text)}`; }
    hexdump(file) { return `hexdump: hex dump of '${file}'`; }
    strings(file) { return `strings: printable strings in '${file}'`; }
    octalDump(file) { return `od: octal dump of '${file}'`; }
    decrypt(file) { return `decrypt: decrypted '${file}'`; }
    encrypt(file) { return `encrypt: encrypted '${file}'`; }
    hologram() { return `hologram: holographic projection activated`; }
    cybersec() { return `cybersec: cybersecurity tools loaded`; }
    neonet() { return `neonet: neural network interface online`; }
    reboot() { return `reboot: system rebooting...`; }
    shutdown() { return `shutdown: system shutting down...`; }
    logout() { return `logout: logging out...`; }
    login() { return `login: please enter username and password`; }
    changePassword() { return `passwd: password changed successfully`; }
    switchUser(user) { return `su: switched to user '${user}'`; }
    git(args) { return `git: ${args.join(' ')}`; }
    npm(args) { return `npm: ${args.join(' ')}`; }
    node(file) { return `node: executing '${file}'`; }
    python(file) { return `python: executing '${file}'`; }
    gcc(args) { return `gcc: compiling with '${args.join(' ')}'`; }
    make() { return `make: building project`; }
    cmake() { return `cmake: configuring project`; }
    docker(args) { return `docker: ${args.join(' ')}`; }
    htop() { return `htop: interactive process viewer`; }
    iotop() { return `iotop: I/O monitoring`; }
    nethogs() { return `nethogs: network traffic monitoring`; }
    iftop() { return `iftop: interface traffic monitoring`; }
    tcpdump() { return `tcpdump: packet capture`; }
    wireshark() { return `wireshark: network protocol analyzer`; }
    awk(args) { return `awk: ${args.join(' ')}`; }
    sed(args) { return `sed: ${args.join(' ')}`; }
    tr(args) { return `tr: ${args.join(' ')}`; }
    cut(args) { return `cut: ${args.join(' ')}`; }
    paste(args) { return `paste: ${args.join(' ')}`; }
    join(args) { return `join: ${args.join(' ')}`; }
    bzip2(file) { return `bzip2: compressed '${file}'`; }
    bunzip2(file) { return `bunzip2: decompressed '${file}'`; }
    xz(file) { return `xz: compressed '${file}'`; }
    unxz(file) { return `unxz: decompressed '${file}'`; }
    nmap(target) { return `nmap: scanning '${target}'`; }
    nslookup(domain) { return `nslookup: resolving '${domain}'`; }
    dig(domain) { return `dig: DNS query for '${domain}'`; }
    traceroute(host) { return `traceroute: tracing route to '${host}'`; }
    mtr(host) { return `mtr: network diagnostic to '${host}'`; }
    netcat(args) { return `nc: ${args.join(' ')}`; }
    telnet(host, port) { return `telnet: connecting to '${host}:${port}'`; }
    ftp(host) { return `ftp: connecting to '${host}'`; }
    sftp(host) { return `sftp: connecting to '${host}'`; }
    rsync(args) { return `rsync: ${args.join(' ')}`; }
    scp(args) { return `scp: ${args.join(' ')}`; }
    
    controlSound(action) {
        switch(action) {
            case 'on':
            case 'enable':
                this.soundEnabled = true;
                return 'Sound: ENABLED';
            case 'off':
            case 'disable':
                this.soundEnabled = false;
                return 'Sound: DISABLED';
            case 'status':
                return `Sound: ${this.soundEnabled ? 'ENABLED' : 'DISABLED'}`;
            default:
                return 'Usage: sound [on|off|status]';
        }
    }
    
    setVolume(level) {
        const vol = parseFloat(level);
        if (isNaN(vol) || vol < 0 || vol > 1) {
            return 'Usage: volume [0.0-1.0]';
        }
        this.keyboardSound.volume = vol;
        return `Volume set to ${Math.round(vol * 100)}%`;
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }
        return `${this.currentPath}/${path}`;
    }
}

// Instance globale du terminal
const terminal = new NeoTerminal();