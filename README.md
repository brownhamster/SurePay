# Blog API Test Automation Framework

A robust test automation framework for the JSONPlaceholder Blog API, specifically designed to validate user comment email formats and ensure data integrity.

## Overview

This framework tests the following workflow:

1. Search for a user by username (e.g., "Delphine")
2. Retrieve all posts created by that user
3. Fetch comments for each post
4. Validate that email addresses in comments follow proper format
5. Verify data relationships and integrity

## Tech Stack

- **Language:** JavaScript (ES6+)
- **Testing Framework:** Jest 29.7.0
- **HTTP Client:** Axios 1.6.0
- **Platform:** Node.js 14.0.0+
- **OS:** Cross-platform (Windows, macOS, Linux)

## Project Structure

```
SurePay/
├── src/
│   ├── api/
│   │   └── ApiClient.js                 # HTTP client wrapper
│   ├── repositories/
│   │   ├── UserRepository.js           # User data access
│   │   ├── PostRepository.js           # Post data access
│   │   └── CommentRepository.js        # Comment data access
│   ├── services/
│   │   └── BlogWorkflow.js             # Workflow orchestration
│   └── validators/
│       └── EmailValidator.js           # Email format validation
├── tests/
│   └── blog-workflow.test.js           # Test suite (19 tests)
├── package.json                         # Project dependencies
├── jest.config.js                       # Jest configuration
├── README.md                            # This file
└── TEST_REPORT.md                       # Detailed test report
```

## Installation

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Setup Steps

```bash
# Clone or navigate to the project directory
cd SurePay

# Install dependencies
npm install
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Watch Mode (re-run on file changes)

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Expected Output

```
PASS tests/blog-workflow.test.js
  Blog Workflow - User Comments Email Validation
    Happy Path - Complete Workflow
      ✓ should find user "Delphine" by username
      ✓ should fetch posts for user "Delphine"
      ✓ should fetch comments for all posts of user "Delphine"
      ✓ should validate email format in comments for user "Delphine" posts
      ✓ all emails in comments should have valid format
    Error Scenarios - Non-existent User
      ✓ should throw error when searching for non-existent user
      ✓ should throw error when user does not exist in workflow
    ...

Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
```

## Test Coverage

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 81.96%   |
| Branches   | 75%      |
| Functions  | 77.77%   |
| Lines      | 81.66%   |

**Critical modules at 100% coverage:**

- BlogWorkflow.js (100%)
- EmailValidator.js (100%)

## Test Scenarios

### Happy Path (5 tests)

- ✅ User lookup by username
- ✅ Post retrieval for user
- ✅ Comment retrieval for posts
- ✅ Email validation workflow
- ✅ Email format verification

### Error Handling (4 tests)

- ✅ Non-existent user handling
- ✅ Invalid user ID handling
- ✅ Empty result sets
- ✅ Network errors

### Validation & Data Integrity (7 tests)

- ✅ Email format validation (valid & invalid patterns)
- ✅ API response schema validation
- ✅ Data relationship verification
- ✅ Null/undefined handling

### Edge Cases (3 tests)

- ✅ Subdomains in emails
- ✅ Plus addressing in emails
- ✅ Multiple TLDs (.com, .org, .co.uk, etc.)

## Architecture & Design Patterns

### Repository Pattern

Abstracts data access logic, making the code testable and maintainable:

```javascript
const user = await userRepository.getUserByUsername('Delphine');
```

### Dependency Injection

Dependencies are passed through constructors:

```javascript
const workflow = new BlogWorkflow(
  userRepository,
  postRepository,
  commentRepository
);
```

### Single Responsibility Principle

- ApiClient: HTTP communication
- Repositories: Data retrieval
- EmailValidator: Validation logic
- BlogWorkflow: Orchestration

## API Endpoint Usage

The framework tests against JSONPlaceholder endpoints:

- `GET /users?username={username}` - Find user by username
- `GET /posts?userId={userId}` - Get posts for a user
- `GET /comments?postId={postId}` - Get comments for a post

## Email Validation Rules

Valid formats:

- `test@example.com`
- `user.name@domain.co.uk`
- `support+tag@service.com`
- `info@company.org`

Invalid formats:

- Missing local or domain part
- Spaces in email
- Missing TLD
- Non-string or empty values

## Key Features

✅ **Comprehensive Coverage** - 19 tests covering happy path, errors, and edge cases
✅ **Clean Architecture** - Repository pattern, dependency injection, SRP
✅ **Error Handling** - Robust error messages and timeout handling
✅ **Data Validation** - Schema and relationship verification
✅ **Cross-Platform** - Works on Windows, macOS, Linux
✅ **No External Config** - Works out of the box
✅ **Maintainable** - Clear code structure and test organization
✅ **Extensible** - Easy to add new tests and features

## Usage Example

```javascript
const ApiClient = require('./src/api/ApiClient');
const UserRepository = require('./src/repositories/UserRepository');
const PostRepository = require('./src/repositories/PostRepository');
const CommentRepository = require('./src/repositories/CommentRepository');
const BlogWorkflow = require('./src/services/BlogWorkflow');

async function main() {
  // Initialize
  const apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
  const userRepo = new UserRepository(apiClient);
  const postRepo = new PostRepository(apiClient);
  const commentRepo = new CommentRepository(apiClient);

  // Create workflow
  const workflow = new BlogWorkflow(userRepo, postRepo, commentRepo);

  // Execute
  const results = await workflow.validateUserCommentsEmails('Delphine');
  console.log(results);
}

main().catch(console.error);
```

## Troubleshooting

### Tests Timeout

If tests are timing out:

1. Check your internet connection
2. Verify JSONPlaceholder API is accessible
3. Increase Jest timeout in `jest.config.js`

### Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found

Ensure you're in the correct directory:

```bash
cd SurePay
npm install
npm test
```

## Test Results

**Status:** ✅ PASSING

- Total Tests: 19
- Passed: 19 ✅
- Failed: 0 ✅
- Coverage: 81.96%
- Execution Time: ~8 seconds
- **Defects Found:** 0

## Performance Metrics

| Test Group          | Duration | Tests |
| ------------------- | -------- | ----- |
| Happy Path          | ~2.4s    | 5     |
| Error Scenarios     | ~0.5s    | 4     |
| Email Validator     | ~0.003s  | 3     |
| API Client          | ~0.45s   | 2     |
| Response Validation | ~0.27s   | 3     |
| Data Integrity      | ~1.6s    | 2     |

## Requirements Met

✅ **Test Automation Framework Skeleton** - Complete, modular structure
✅ **API Validation** - Email format validation for comments
✅ **Multiple Scenarios** - Happy path, error cases, edge cases
✅ **Design Patterns** - Repository, dependency injection, SRP
✅ **Best Practices** - SOLID, DRY, KISS, OOP principles
✅ **Clean Code** - Organized, maintainable, well-documented
✅ **Cross-Platform** - No dependencies on OS-specific features
✅ **Documentation** - README and detailed test report
✅ **Zero Configuration** - Run immediately after `npm install`

## Future Enhancements

- Mock API responses for unit testing
- Test data builders
- Performance benchmarking
- Integration test suite
- Test retry mechanisms
- Custom Jest reporters

## Support

For detailed test report, see [TEST_REPORT.md](./TEST_REPORT.md)

## License

MIT
