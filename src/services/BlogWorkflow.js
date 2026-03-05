const EmailValidator = require('../validators/EmailValidator');

/**
 * Blog Workflow Service
 * Orchestrates the complete blog API workflow:
 * 1. Find user by username
 * 2. Get all posts for that user
 * 3. Get comments for each post
 * 4. Validate email addresses in comments
 */
class BlogWorkflow {
  /**
   * Initialize the workflow with required repositories
   * @param {UserRepository} userRepository - Repository for user data access
   * @param {PostRepository} postRepository - Repository for post data access
   * @param {CommentRepository} commentRepository - Repository for comment data access
   */
  constructor(userRepository, postRepository, commentRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  /**
   * Execute the complete workflow to validate user comment emails
   * @param {string} username - The username to search for
   * @returns {Promise<object>} Object containing user data and email validation results for all posts
   * @throws {Error} If user not found or any API call fails
   */
  async validateUserCommentsEmails(username) {
    // Step 1: Find the user by username
    const user = await this.userRepository.getUserByUsername(username);

    // Step 2: Get all posts created by this user
    const posts = await this.postRepository.getPostsByUserId(user.id);

    // Initialize results structure
    const results = {
      user,
      posts: [],
    };

    // Step 3 & 4: For each post, get comments and validate emails
    for (const post of posts) {
      const comments = await this.commentRepository.getCommentsByPostId(
        post.id
      );
      const emails = comments.map((comment) => comment.email);
      const validation = EmailValidator.validateEmailList(emails);

      results.posts.push({
        postId: post.id,
        postTitle: post.title,
        commentCount: comments.length,
        emails: {
          total: emails.length,
          valid: validation.valid,
          invalid: validation.invalid,
        },
      });
    }

    return results;
  }
}

module.exports = BlogWorkflow;
