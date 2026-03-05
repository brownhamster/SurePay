class PostRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getPostsByUserId(userId) {
    if (userId === null || userId === undefined || typeof userId !== 'number' || userId <= 0) {
      throw new Error('Invalid user ID: must be a positive number');
    }

    const posts = await this.apiClient.get('/posts', { userId });

    if (!posts || posts.length === 0) {
      throw new Error(`No posts found for user ID "${userId}"`);
    }

    return posts;
  }

  async getPostById(postId) {
    const posts = await this.apiClient.get('/posts', { id: postId });

    if (!posts || posts.length === 0) {
      throw new Error(`Post with ID "${postId}" not found`);
    }

    return posts[0];
  }
}

module.exports = PostRepository;
