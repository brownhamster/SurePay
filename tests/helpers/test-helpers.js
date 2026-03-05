/**
 * Test helper functions
 * Reusable across different test frameworks (Jest, Playwright, etc.)
 */

const ApiClient = require('../../src/api/ApiClient');
const UserRepository = require('../../src/repositories/UserRepository');
const PostRepository = require('../../src/repositories/PostRepository');
const CommentRepository = require('../../src/repositories/CommentRepository');
const BlogWorkflow = require('../../src/services/BlogWorkflow');
const testConfig = require('../config/test-config');

/**
 * Initialize API client with test configuration
 */
function createApiClient(baseURL = testConfig.api.baseURL) {
  return new ApiClient(baseURL);
}

/**
 * Initialize all repositories with given API client
 */
function createRepositories(apiClient) {
  return {
    user: new UserRepository(apiClient),
    post: new PostRepository(apiClient),
    comment: new CommentRepository(apiClient)
  };
}

/**
 * Initialize workflow with all dependencies
 */
function createWorkflow(apiClient) {
  const repos = createRepositories(apiClient);
  return new BlogWorkflow(repos.user, repos.post, repos.comment);
}

/**
 * Initialize all test dependencies at once
 */
function initializeTestEnvironment(baseURL = testConfig.api.baseURL) {
  const apiClient = createApiClient(baseURL);
  const repositories = createRepositories(apiClient);
  const workflow = createWorkflow(apiClient);

  return {
    apiClient,
    repositories,
    workflow,
    userRepository: repositories.user,
    postRepository: repositories.post,
    commentRepository: repositories.comment
  };
}

module.exports = {
  createApiClient,
  createRepositories,
  createWorkflow,
  initializeTestEnvironment
};
