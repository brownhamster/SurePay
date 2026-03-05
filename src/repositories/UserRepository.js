class UserRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getUserByUsername(username) {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw new Error('Invalid username: must be a non-empty string');
    }

    const users = await this.apiClient.get('/users', { username });

    if (!users || users.length === 0) {
      throw new Error(`User with username "${username}" not found`);
    }

    return users[0];
  }

  async getAllUsers() {
    return await this.apiClient.get('/users');
  }
}

module.exports = UserRepository;
