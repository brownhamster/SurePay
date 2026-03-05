class CommentRepository {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getCommentsByPostId(postId) {
    if (postId === null || postId === undefined || typeof postId !== 'number' || postId <= 0) {
      throw new Error('Invalid post ID: must be a positive number');
    }

    const comments = await this.apiClient.get('/comments', { postId });

    if (!comments || comments.length === 0) {
      throw new Error(`No comments found for post ID "${postId}"`);
    }

    return comments;
  }

  async getAllComments() {
    return await this.apiClient.get('/comments');
  }
}

module.exports = CommentRepository;
