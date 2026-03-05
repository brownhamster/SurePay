const testHelpers = require('./helpers/test-helpers');
const testConfig = require('./config/test-config');

const API_BASE_URL = testConfig.api.baseURL;

describe('Blog Workflow - User Comments Email Validation', () => {
  let userRepository;
  let postRepository;
  let commentRepository;
  let workflow;

  beforeAll(() => {
    const testEnv = testHelpers.initializeTestEnvironment(API_BASE_URL);
    userRepository = testEnv.userRepository;
    postRepository = testEnv.postRepository;
    commentRepository = testEnv.commentRepository;
    workflow = testEnv.workflow;
  });

  describe('Flow 1: Search for user "Delphine"', () => {
    test('should find user by username "Delphine"', async () => {
      const user = await userRepository.getUserByUsername('Delphine');

      expect(user).toBeDefined();
      expect(user.username).toBe('Delphine');
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.name).toBeDefined();
    });

    test('should throw error when user does not exist', async () => {
      await expect(
        userRepository.getUserByUsername('NonExistentUser')
      ).rejects.toThrow('not found');
    });

    test('should throw error for invalid username input', async () => {
      await expect(userRepository.getUserByUsername(null)).rejects.toThrow();
    });
  });

  describe('Flow 2: Fetch posts by user', () => {
    test('should fetch all posts for user "Delphine"', async () => {
      const user = await userRepository.getUserByUsername('Delphine');
      const posts = await postRepository.getPostsByUserId(user.id);

      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      posts.forEach((post) => {
        expect(post.id).toBeDefined();
        expect(post.userId).toBe(user.id);
        expect(post.title).toBeDefined();
        expect(post.body).toBeDefined();
      });
    });

    test('should throw error when user has no posts', async () => {
      await expect(postRepository.getPostsByUserId(99999)).rejects.toThrow(
        'No posts found'
      );
    });

    test('should throw error for invalid user ID', async () => {
      await expect(postRepository.getPostsByUserId(null)).rejects.toThrow();
    });
  });

  describe('Flow 3: Fetch comments for each post', () => {
    test('should fetch comments for posts', async () => {
      const user = await userRepository.getUserByUsername('Delphine');
      const posts = await postRepository.getPostsByUserId(user.id);

      for (const post of posts) {
        const comments = await commentRepository.getCommentsByPostId(post.id);
        expect(comments).toBeDefined();
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBeGreaterThan(0);
        comments.forEach((comment) => {
          expect(comment.id).toBeDefined();
          expect(comment.postId).toBe(post.id);
          expect(comment.email).toBeDefined();
          expect(comment.name).toBeDefined();
          expect(comment.body).toBeDefined();
        });
      }
    });

    test('should throw error when post has no comments', async () => {
      await expect(
        commentRepository.getCommentsByPostId(99999)
      ).rejects.toThrow('No comments found');
    });

    test('should throw error for invalid post ID', async () => {
      await expect(
        commentRepository.getCommentsByPostId(null)
      ).rejects.toThrow();
    });
  });

  describe('Flow 4: Validate email format in comments', () => {
    test('should validate that all comment emails are in proper format', async () => {
      const result = await workflow.validateUserCommentsEmails('Delphine');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.username).toBe('Delphine');
      expect(result.posts).toBeDefined();
      expect(Array.isArray(result.posts)).toBe(true);
      expect(result.posts.length).toBeGreaterThan(0);

      result.posts.forEach((post) => {
        expect(post.postId).toBeDefined();
        expect(post.postTitle).toBeDefined();
        expect(post.commentCount).toBeGreaterThan(0);
        expect(post.emails).toBeDefined();
        expect(post.emails.total).toBe(post.commentCount);
        expect(Array.isArray(post.emails.valid)).toBe(true);
        expect(Array.isArray(post.emails.invalid)).toBe(true);
        // All emails should be valid for this API
        expect(post.emails.invalid.length).toBe(0);
        expect(post.emails.valid.length).toBe(post.emails.total);
      });
    });

    test('should throw error for invalid username in workflow', async () => {
      await expect(
        workflow.validateUserCommentsEmails('NonExistentUser')
      ).rejects.toThrow();
    });

    test('should throw error for null username in workflow', async () => {
      await expect(workflow.validateUserCommentsEmails(null)).rejects.toThrow();
    });
  });
});
