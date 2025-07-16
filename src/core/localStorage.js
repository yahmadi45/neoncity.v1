/**
 * Local Storage Management for NeoCityOS
 * 
 * This module provides user data persistence and management functionality
 * using the browser's localStorage API. It handles user authentication,
 * registration, and data storage for the NeoCityOS system.
 * 
 * Key Features:
 * - User credential verification
 * - New user registration and data initialization
 * - User data persistence across browser sessions
 * - User statistics tracking (XP, gold, inventory)
 * 
 * Data Structure:
 * Users are stored as a JSON object with the following structure:
 * {
 *   "username": {
 *     "password": "hashed_password",
 *     "xp": 0,
 *     "gold": 0,
 *     "inventory": []
 *   }
 * }
 * 
 * Security Considerations:
 * - Passwords are stored in plain text (for demo purposes)
 * - In production, passwords should be hashed using bcrypt or similar
 * - localStorage is not secure for sensitive data
 * - Consider using sessionStorage for temporary data
 * 
 * @author NeoCityOS Development Team
 * @version 1.0.0
 */

/**
 * Verify User Credentials Function
 * 
 * Authenticates a user by checking if the provided username and password
 * match the stored credentials in localStorage.
 * 
 * Algorithm:
 * 1. Retrieve users object from localStorage
 * 2. Check if username exists in users object
 * 3. Compare provided password with stored password
 * 4. Return user object if credentials match, null otherwise
 * 
 * Time Complexity: O(1) - constant time lookup
 * Space Complexity: O(1) - no additional space required
 * 
 * @param {string} username - The username to verify
 * @param {string} password - The password to verify
 * @returns {Object|null} - User object if credentials are valid, null otherwise
 */
function verifyUserCredentials(username, password) {
  // Retrieve users object from localStorage, default to empty object if not found
  const users = JSON.parse(localStorage.getItem("neo_users")) || {};
  
  // Get user object for the provided username
  const user = users[username];
  
  // Return user object if username exists and password matches, null otherwise
  return user && user.password === password ? user : null;
}

/**
 * Create New User Function
 * 
 * Creates a new user account and initializes default user data.
 * This function is called during the auto-registration process.
 * 
 * Algorithm:
 * 1. Retrieve existing users object from localStorage
 * 2. Create new user object with default values
 * 3. Add new user to users object
 * 4. Save updated users object back to localStorage
 * 5. Return the newly created user object
 * 
 * Time Complexity: O(1) - constant time insertion
 * Space Complexity: O(1) - constant additional space
 * 
 * User Data Structure:
 * - password: User's password (should be hashed in production)
 * - xp: Experience points (starts at 0)
 * - gold: Virtual currency (starts at 0)
 * - inventory: Array of user's items (starts empty)
 * 
 * @param {string} username - The username for the new account
 * @param {string} password - The password for the new account
 * @returns {Object} - The newly created user object
 */
function createNewUser(username, password) {
  // Retrieve existing users object from localStorage
  const users = JSON.parse(localStorage.getItem("neo_users")) || {};
  
  // Create new user object with default values
  users[username] = {
    password,           // Store password (should be hashed in production)
    xp: 0,             // Initialize experience points to 0
    gold: 0,           // Initialize gold currency to 0
    inventory: []      // Initialize empty inventory array
  };
  
  // Save updated users object back to localStorage
  localStorage.setItem("neo_users", JSON.stringify(users));
  
  // Return the newly created user object
  return users[username];
}

/**
 * Get All Users Function
 * 
 * Retrieves all user data from localStorage. This function can be useful
 * for administrative purposes, debugging, or data analysis.
 * 
 * Algorithm:
 * 1. Retrieve users object from localStorage
 * 2. Return users object or empty object if not found
 * 
 * Time Complexity: O(1) - constant time retrieval
 * Space Complexity: O(n) - where n is the number of users
 * 
 * Use Cases:
 * - Administrative user management
 * - Data backup and export
 * - System statistics and analytics
 * - Debugging user-related issues
 * 
 * Security Note:
 * - This function returns all user data including passwords
 * - Should be restricted in production environments
 * - Consider implementing role-based access control
 * 
 * @returns {Object} - Object containing all user data
 */
function getAllUsers() {
  // Retrieve and return users object from localStorage, default to empty object
  return JSON.parse(localStorage.getItem("neo_users")) || {};
}