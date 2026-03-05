/**
 * Post Repository
 * Handles all post-related data access operations
 * Abstracts API calls and provides a clean interface for retrieving post data
 */
class PostRepository {
  /**
   * Initialize the repository with an API client
   * @param {ApiClient} apiClient - The HTTP API client instance
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get all posts created by a specific user
   * @param {number} userId - The ID of the user
   * @returns {Promise<Array>} Array of post objects for the user
   * @throws {Error} If userId is invalid or no posts found
   */
  async getPostsByUserId(userId) {
    if (
      userId === null ||
      userId === undefined ||
      typeof userId !== 'number' ||
      userId <= 0
    ) {
      throw new Error('Invalid user ID: must be a positive number');
    }

    const posts = await this.apiClient.get('/posts', { userId });

    if (!posts || posts.length === 0) {
      throw new Error(`No posts found for user ID "${userId}"`);
    }

    return posts;
  }

  /**
   * Get a single post by ID
   * @param {number} postId - The ID of the post
   * @returns {Promise<object>} Post object with id, userId, title, body
   * @throws {Error} If post not found
   */
  async getPostById(postId) {
    const posts = await this.apiClient.get('/posts', { id: postId });

    if (!posts || posts.length === 0) {
      throw new Error(`Post with ID "${postId}" not found`);
    }

    return posts[0];
  }
}

module.exports = PostRepository;
