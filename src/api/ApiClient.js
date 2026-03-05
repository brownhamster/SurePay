const axios = require('axios');

/**
 * HTTP API Client wrapper
 * Provides a simple interface for making HTTP requests with automatic error handling
 * Uses axios internally with a 10-second timeout
 */
class ApiClient {
  /**
   * Initialize the API client
   * @param {string} baseURL - The base URL for all API requests
   */
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  /**
   * Make a GET request to the API
   * @param {string} endpoint - The API endpoint path
   * @param {object} params - Query parameters (optional)
   * @returns {Promise} The response data
   * @throws {Error} If the request fails
   */
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`GET ${endpoint} failed: ${error.message}`);
    }
  }

  /**
   * Make a POST request to the API
   * @param {string} endpoint - The API endpoint path
   * @param {object} data - The data to send in the request body
   * @returns {Promise} The response data
   * @throws {Error} If the request fails
   */
  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST ${endpoint} failed: ${error.message}`);
    }
  }
}

module.exports = ApiClient;
