/**
 * User Repository
 * Handles all user-related data access operations
 * Abstracts API calls and provides a clean interface for retrieving user data
 */
class UserRepository {
  /**
   * Initialize the repository with an API client
   * @param {ApiClient} apiClient - The HTTP API client instance
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get a user by their username
   * @param {string} username - The username to search for
   * @returns {Promise<object>} User object with id, name, username, email, etc.
   * @throws {Error} If username is invalid or user not found
   */
  async getUserByUsername(username) {
    // Validate input
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('Invalid username: must be a non-empty string');
    }

    // Query the API for user by username
    const users = await this.apiClient.get('/users', { username });

    // Check if user was found
    if (!users || users.length === 0) {
      throw new Error(`User with username "${username}" not found`);
    }

    return users[0];
  }

  /**
   * Get all users
   * @returns {Promise<Array>} Array of all user objects
   */
  async getAllUsers() {
    return await this.apiClient.get('/users');
  }
}

module.exports = UserRepository;
