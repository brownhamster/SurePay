/**
 * Centralized test configuration
 * Can be used by both Jest and Playwright tests
 */

const config = {
  api: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000
  },
  testData: {
    users: {
      valid: 'Delphine',
      invalid: 'NonExistentUserXYZ123'
    }
  }
};

module.exports = config;
