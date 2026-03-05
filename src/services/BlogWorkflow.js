const EmailValidator = require('../validators/EmailValidator');

class BlogWorkflow {
  constructor(userRepository, postRepository, commentRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  async validateUserCommentsEmails(username) {
    const user = await this.userRepository.getUserByUsername(username);

    const posts = await this.postRepository.getPostsByUserId(user.id);

    const results = {
      user,
      posts: [],
    };

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
