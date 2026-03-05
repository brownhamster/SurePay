/**
 * Comment Repository
 * Handles all comment-related data access operations
 * Abstracts API calls and provides a clean interface for retrieving comment data
 */
class CommentRepository {
  /**
   * Initialize the repository with an API client
   * @param {ApiClient} apiClient - The HTTP API client instance
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get all comments for a specific post
   * @param {number} postId - The ID of the post
   * @returns {Promise<Array>} Array of comment objects for the post
   * @throws {Error} If postId is invalid or no comments found
   */
  async getCommentsByPostId(postId) {
    // Validate input: must be a positive number
    if (
      postId === null ||
      postId === undefined ||
      typeof postId !== 'number' ||
      postId <= 0
    ) {
      throw new Error('Invalid post ID: must be a positive number');
    }

    // Query the API for comments by post ID
    const comments = await this.apiClient.get('/comments', { postId });

    // Check if comments were found
    if (!comments || comments.length === 0) {
      throw new Error(`No comments found for post ID "${postId}"`);
    }

    return comments;
  }

  /**
   * Get all comments from all posts
   * @returns {Promise<Array>} Array of all comment objects
   */
  async getAllComments() {
    return await this.apiClient.get('/comments');
  }
}

module.exports = CommentRepository;
