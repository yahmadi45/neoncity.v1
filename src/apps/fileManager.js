// NeoCityOS File Manager
class FileManager {
    constructor() {
        this.currentPath = '/';
        this.selectedItems = [];
        this.clipboard = null;
        this.clipboardAction = null; // 'cut' or 'copy'
    }

    // Initialize the File Manager
    init() {
        this.loadFileSystem();
        this.renderFileList();
        this.setupEventListeners();
    }

    // Load the file system from localStorage
    loadFileSystem() {
        const username = currentUser || 'guest';
        const userKey = `neo_files_${username}`;
        let fileSystem = JSON.parse(localStorage.getItem(userKey));
        
        if (!fileSystem) {
            // Create a default file system
            fileSystem = {
                '/': {
                    type: 'folder',
                    name: 'root',
                    children: {
                        'Documents': {
                            type: 'folder',
                            name: 'Documents',
                            children: {
                                'welcome.txt': {
                                    type: 'file',
                                    name: 'welcome.txt',
                                    content: 'Welcome to NeoCityOS!',
                                    size: 25,
                                    modified: new Date().toISOString()
                                }
                            }
                        },
                        'Downloads': {
                            type: 'folder',
                            name: 'Downloads',
                            children: {}
                        },
                        'Pictures': {
                            type: 'folder',
                            name: 'Pictures',
                            children: {}
                        }
                    }
                }
            };
            this.saveFileSystem(fileSystem);
        }
        
        this.fileSystem = fileSystem;
    }

    // Save the file system
    saveFileSystem(fileSystem = this.fileSystem) {
        const username = currentUser || 'guest';
        const userKey = `neo_files_${username}`;
        localStorage.setItem(userKey, JSON.stringify(fileSystem));
    }

    // Get the contents of the current folder
    getCurrentFolder() {
        const pathParts = this.currentPath.split('/').filter(p => p);
        let current = this.fileSystem['/'];
        
        for (const part of pathParts) {
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        
        return current;
    }

    // Render the file list
    renderFileList() {
        const fileListContainer = document.getElementById('file-list');
        if (!fileListContainer) return;

        const currentFolder = this.getCurrentFolder();
        if (!currentFolder) {
            fileListContainer.innerHTML = '<p>Folder not found</p>';
            return;
        }

        // Update the displayed path
        this.updatePathDisplay();

        let html = '';
        
        // "Back" button if not at root
        if (this.currentPath !== '/') {
            html += `
                <div class="file-item folder" onclick="fileManager.navigateUp()">
                    <div class="file-icon">📁</div>
                    <div class="file-info">
                        <div class="file-name">..</div>
                        <div class="file-details">Parent folder</div>
                    </div>
                </div>
            `;
        }

        // Show folders first
        if (currentFolder.children) {
            Object.entries(currentFolder.children)
                .filter(([name, item]) => item.type === 'folder')
                .sort(([a], [b]) => a.localeCompare(b))
                .forEach(([name, item]) => {
                    const childCount = item.children ? Object.keys(item.children).length : 0;
                    html += `
                        <div class="file-item folder" 
                             onclick="fileManager.selectItem('${name}')"
                             ondblclick="fileManager.openFolder('${name}')"
                             oncontextmenu="fileManager.showContextMenu(event, '${name}', 'folder')">
                            <div class="file-icon">📁</div>
                            <div class="file-info">
                                <div class="file-name">${name}</div>
                                <div class="file-details">${childCount} items</div>
                            </div>
                        </div>
                    `;
                });

            // Then show files
            Object.entries(currentFolder.children)
                .filter(([name, item]) => item.type === 'file')
                .sort(([a], [b]) => a.localeCompare(b))
                .forEach(([name, item]) => {
                    const size = this.formatFileSize(item.size || 0);
                    const modified = new Date(item.modified || Date.now()).toLocaleDateString();
                    const extension = name.split('.').pop().toLowerCase();
                    const icon = this.getFileIcon(extension);
                    
                    html += `
                        <div class="file-item file" 
                             onclick="fileManager.selectItem('${name}')"
                             ondblclick="fileManager.openFile('${name}')"
                             oncontextmenu="fileManager.showContextMenu(event, '${name}', 'file')">
                            <div class="file-icon">${icon}</div>
                            <div class="file-info">
                                <div class="file-name">${name}</div>
                                <div class="file-details">${size} • ${modified}</div>
                            </div>
                        </div>
                    `;
                });
        }

        if (html === '') {
            html = '<div class="empty-folder">This folder is empty</div>';
        }

        fileListContainer.innerHTML = html;
    }

    // Update the path display
    updatePathDisplay() {
        const pathDisplay = document.getElementById('current-path');
        if (pathDisplay) {
            pathDisplay.textContent = this.currentPath === '/' ? 'Root' : this.currentPath;
        }
    }

    // Get the icon based on extension
    getFileIcon(extension) {
        const icons = {
            'txt': '📄',
            'doc': '📄',
            'docx': '📄',
            'pdf': '📕',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'png': '🖼️',
            'gif': '🖼️',
            'mp3': '🎵',
            'mp4': '🎬',
            'zip': '📦',
            'js': '⚙️',
            'html': '🌐',
            'css': '🎨'
        };
        return icons[extension] || '📄';
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Navigate to parent folder
    navigateUp() {
        if (this.currentPath === '/') return;
        
        const pathParts = this.currentPath.split('/').filter(p => p);
        pathParts.pop();
        this.currentPath = pathParts.length > 0 ? '/' + pathParts.join('/') : '/';
        this.renderFileList();
    }

    // Open a folder
    openFolder(folderName) {
        this.currentPath = this.currentPath === '/' ? 
            '/' + folderName : 
            this.currentPath + '/' + folderName;
        this.renderFileList();
    }

    // Open a file
    openFile(fileName) {
        const currentFolder = this.getCurrentFolder();
        const file = currentFolder.children[fileName];
        
        if (file && file.type === 'file') {
            this.showFileViewer(fileName, file);
        }
    }

    // Show the file viewer
    showFileViewer(fileName, file) {
        const modal = document.createElement('div');
        modal.className = 'file-viewer-modal';
        modal.innerHTML = `
            <div class="file-viewer">
                <div class="file-viewer-header">
                    <h3>${fileName}</h3>
                    <button onclick="this.closest('.file-viewer-modal').remove()">×</button>
                </div>
                <div class="file-viewer-content">
                    <pre>${file.content || 'Content not available'}</pre>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Select an item
    selectItem(itemName) {
        // Deselect all items
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Select the clicked item
        event.currentTarget.classList.add('selected');
        this.selectedItems = [itemName];
    }

    // Helper: Show custom neon prompt modal
    showNeonPrompt(message, defaultValue = '', callback) {
        // Remove any existing modal
        const existing = document.querySelector('.neon-prompt-modal');
        if (existing) existing.remove();

        // Modal structure
        const modal = document.createElement('div');
        modal.className = 'neon-prompt-modal';
        modal.innerHTML = `
          <div class="neon-prompt-box">
            <div class="neon-prompt-header">${message}</div>
            <input class="neon-prompt-input" type="text" value="${defaultValue.replace(/"/g, '&quot;')}" autofocus />
            <div class="neon-prompt-actions">
              <button class="neon-prompt-ok">OK</button>
              <button class="neon-prompt-cancel">Cancel</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        const input = modal.querySelector('.neon-prompt-input');
        input.focus();
        // OK handler
        modal.querySelector('.neon-prompt-ok').onclick = () => {
          const value = input.value.trim();
          modal.remove();
          callback(value);
        };
        // Cancel handler
        modal.querySelector('.neon-prompt-cancel').onclick = () => {
          modal.remove();
          callback(null);
        };
        // Enter/Escape keys
        input.onkeydown = (e) => {
          if (e.key === 'Enter') {
            modal.querySelector('.neon-prompt-ok').click();
          } else if (e.key === 'Escape') {
            modal.querySelector('.neon-prompt-cancel').click();
          }
        };
    }

    // Create a new folder
    createNewFolder() {
        this.showNeonPrompt('Name of new folder:', '', (folderName) => {
            if (!folderName) return;
            const currentFolder = this.getCurrentFolder();
            if (currentFolder.children[folderName]) {
                alert('An item with this name already exists!');
                return;
            }
            currentFolder.children[folderName] = {
                type: 'folder',
                name: folderName,
                children: {}
            };
            this.saveFileSystem();
            this.renderFileList();
            playSound('click');
        });
    }

    // Create a new file
    createNewFile() {
        this.showNeonPrompt('Name of new file:', '', (fileName) => {
            if (!fileName) return;
            const currentFolder = this.getCurrentFolder();
            if (currentFolder.children[fileName]) {
                alert('An item with this name already exists!');
                return;
            }
            this.showNeonPrompt('Content of the file (optional):', '', (content) => {
                currentFolder.children[fileName] = {
                    type: 'file',
                    name: fileName,
                    content: content || '',
                    size: (content || '').length,
                    modified: new Date().toISOString()
                };
                this.saveFileSystem();
                this.renderFileList();
                playSound('click');
            });
        });
    }

    // Delete selected items
    deleteSelected() {
        if (this.selectedItems.length === 0) {
            alert('No item selected');
            return;
        }

        const confirmDelete = confirm(`Delete ${this.selectedItems.length} item(s) ?`);
        if (!confirmDelete) return;

        const currentFolder = this.getCurrentFolder();
        this.selectedItems.forEach(itemName => {
            delete currentFolder.children[itemName];
        });

        this.selectedItems = [];
        this.saveFileSystem();
        this.renderFileList();
        playSound('click');
    }

    // Rename an item
    renameItem(itemName) {
        const newName = prompt('New name:', itemName);
        if (!newName || newName.trim() === '' || newName === itemName) return;
        const currentFolder = this.getCurrentFolder();
        if (currentFolder.children[newName]) {
            alert('An item with this name already exists!');
            return;
        }
        const item = currentFolder.children[itemName];
        item.name = newName;
        currentFolder.children[newName] = item;
        delete currentFolder.children[itemName];
        this.saveFileSystem();
        this.renderFileList();
        playSound('click');
    }

    // Copy an item
    copyItem(itemName) {
        const currentFolder = this.getCurrentFolder();
        this.clipboard = JSON.parse(JSON.stringify(currentFolder.children[itemName]));
        this.clipboardAction = 'copy';
        console.log('Item copied:', itemName);
    }

    // Cut an item
    cutItem(itemName) {
        const currentFolder = this.getCurrentFolder();
        this.clipboard = JSON.parse(JSON.stringify(currentFolder.children[itemName]));
        this.clipboardAction = 'cut';
        this.clipboardSource = { folder: currentFolder, name: itemName };
        console.log('Item cut:', itemName);
    }

    // Paste an item
    pasteItem() {
        if (!this.clipboard) {
            alert('No item in clipboard');
            return;
        }

        const currentFolder = this.getCurrentFolder();
        let newName = this.clipboard.name;
        let counter = 1;

        // Find a unique name if necessary
        while (currentFolder.children[newName]) {
            const extension = this.clipboard.name.includes('.') ? 
                '.' + this.clipboard.name.split('.').pop() : '';
            const baseName = this.clipboard.name.replace(extension, '');
            newName = `${baseName}_copy${counter}${extension}`;
            counter++;
        }

        // Add the item
        this.clipboard.name = newName;
        currentFolder.children[newName] = JSON.parse(JSON.stringify(this.clipboard));

        // If it was a "cut", delete the original
        if (this.clipboardAction === 'cut' && this.clipboardSource) {
            delete this.clipboardSource.folder.children[this.clipboardSource.name];
            this.clipboardSource = null;
        }

        this.saveFileSystem();
        this.renderFileList();
        playSound('click');
    }

    // Show context menu
    showContextMenu(event, itemName, itemType) {
        event.preventDefault();
        
        // Remove existing menu
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.left = event.pageX + 'px';
        menu.style.top = event.pageY + 'px';

        const menuItems = [
            { label: 'Open', action: () => itemType === 'folder' ? this.openFolder(itemName) : this.openFile(itemName) },
            { label: 'Rename', action: () => this.renameItem(itemName) },
            { label: 'Copy', action: () => this.copyItem(itemName) },
            { label: 'Cut', action: () => this.cutItem(itemName) },
            { label: 'Delete', action: () => { this.selectedItems = [itemName]; this.deleteSelected(); } }
        ];

        menu.innerHTML = menuItems.map(item => 
            `<div class="context-menu-item" onclick="fileManager.executeContextAction('${item.action}')">${item.label}</div>`
        ).join('');

        document.body.appendChild(menu);

        // Close menu by clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 10);
    }

    // Configure event listeners
    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.app-window#filemanager')) return;

            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'c':
                        e.preventDefault();
                        if (this.selectedItems.length > 0) {
                            this.copyItem(this.selectedItems[0]);
                        }
                        break;
                    case 'x':
                        e.preventDefault();
                        if (this.selectedItems.length > 0) {
                            this.cutItem(this.selectedItems[0]);
                        }
                        break;
                    case 'v':
                        e.preventDefault();
                        this.pasteItem();
                        break;
                }
            } else if (e.key === 'Delete') {
                e.preventDefault();
                this.deleteSelected();
            }
        });
    }
}

// Global instance of the File Manager
const fileManager = new FileManager();