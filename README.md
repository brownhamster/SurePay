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
- **Linter:** ESLint 8.54.0
- **Formatter:** Prettier 3.1.0
- **CI/CD:** Circle CI
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
│   ├── api-workflow.test.js            # Test suite (12 tests)
│   ├── config/
│   │   └── test-config.js              # Test configuration
│   ├── fixtures/
│   │   └── test-data.js                # Test data and fixtures
│   └── helpers/
│       └── test-helpers.js             # Test utilities
├── .circleci/
│   └── config.yml                       # Circle CI configuration
├── .eslintrc.json                       # ESLint configuration
├── .prettierrc                          # Prettier configuration
├── .prettierignore                      # Prettier ignore rules
├── package.json                         # Project dependencies
├── jest.config.js                       # Jest configuration
└── README.md                            # This file
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

## Running Tests & Quality Checks

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

## Code Quality

### Linting

```bash
# Check for code style issues
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Code Formatting

```bash
# Auto-format all code
npm run format

# Check if code matches formatting rules
npm run format:check
```

### CI/CD Pipeline

The project uses Circle CI to automatically:

1. Lint code (`npm run lint`)
2. Check formatting (`npm run format:check`)
3. Run tests (`npm test`)

All checks must pass before code is considered valid.

### Expected Output

```
PASS tests/api-workflow.test.js
  API Workflow - User Comments Email Validation
    Flow 1: Search for user "Delphine"
      ✓ should find user by username "Delphine"
      ✓ should throw error when user does not exist
      ✓ should throw error for invalid username input
    Flow 2: Fetch posts by user
      ✓ should fetch all posts for user "Delphine"
      ✓ should throw error when user has no posts
      ✓ should throw error for invalid user ID
    Flow 3: Fetch comments for each post
      ✓ should fetch comments for posts
      ✓ should throw error when post has no comments
      ✓ should throw error for invalid post ID
    Flow 4: Validate email format in comments
      ✓ should validate that all comment emails are in proper format
      ✓ should throw error for invalid username in workflow
      ✓ should throw error for null username in workflow

Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
```

## Test Coverage

All 12 tests focus on the 4 required workflows:

1. **Flow 1: Search for User** (3 tests)
   - Happy path: Find user by username
   - Error handling: Non-existent user
   - Error handling: Invalid username

2. **Flow 2: Fetch Posts** (3 tests)
   - Happy path: Get posts for user
   - Error handling: User with no posts
   - Error handling: Invalid user ID

3. **Flow 3: Fetch Comments** (3 tests)
   - Happy path: Get comments for posts
   - Error handling: Post with no comments
   - Error handling: Invalid post ID

4. **Flow 4: Validate Emails** (3 tests)
   - Happy path: Validate email formats
   - Error handling: Invalid username
   - Error handling: Null username

## Test Scenarios

All tests are organized into 4 main flows with 3 tests each (1 happy path + 2 error scenarios):

### Flow-Based Testing Approach

Each flow has:

- **1 Happy Path Test** - Validates the successful workflow
- **2 Error Scenario Tests** - Tests error handling and edge cases

This ensures complete coverage of both success and failure paths for each workflow component.

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

✅ **Focused Testing** - 12 tests covering 4 required workflows
✅ **Clean Architecture** - Repository pattern, dependency injection, SRP
✅ **Error Handling** - Robust error messages and input validation
✅ **Code Quality** - ESLint and Prettier ensure consistent style
✅ **CI/CD Pipeline** - Circle CI automates testing, linting, and formatting
✅ **Cross-Platform** - Works on Windows, macOS, Linux
✅ **No External Config** - Works out of the box with `npm install`
✅ **Maintainable** - Clear code structure and test organization
✅ **Extensible** - Easy to add new tests and features
✅ **SOLID Principles** - Well-designed, modular architecture

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

- Total Tests: 12
- Passed: 12 ✅
- Failed: 0 ✅
- Execution Time: ~2-5 seconds
- **Defects Found:** 0
- **Code Quality:** ✅ ESLint & Prettier Pass

## Performance Metrics

| Metric           | Value |
| ---------------- | ----- |
| Total Execution  | 2-5s  |
| Tests/second     | 2.4   |
| Average per test | 0.3s  |
| Code Style Check | ✅    |
| Formatting Check | ✅    |

## Requirements Met

✅ **Test Automation Framework Skeleton** - Complete, modular structure with 5 core modules
✅ **API Validation** - Email format validation for comments across 4 workflows
✅ **Multiple Scenarios** - Happy path + error cases for each workflow
✅ **Design Patterns** - Repository, dependency injection, service layer
✅ **Best Practices** - SOLID, DRY, KISS, OOP principles applied
✅ **Code Quality** - ESLint & Prettier ensure consistent style
✅ **CI/CD** - Circle CI automates testing, linting, and formatting
✅ **Cross-Platform** - No dependencies on OS-specific features
✅ **Documentation** - README, ARCHITECTURE.md, and PROJECT_SUMMARY.md
✅ **Zero Configuration** - Run immediately after `npm install`

## Future Enhancements

- Playwright E2E tests (framework-agnostic design supports this)
- Mock API responses for isolated unit tests
- Test data builders and factories
- Performance benchmarking
- Test retry mechanisms for flaky tests
- Custom Jest reporters
- Visual regression testing

## Future Capabilities

The framework is built with a **framework-agnostic architecture** that allows seamless extension to Playwright or other testing tools without inflating the current test suite. The core business logic in `src/` (repositories, services, validators) is completely independent of Jest and can be reused with any testing framework. When Playwright E2E tests are added in the future, they will leverage the same test helpers, fixtures, and business logic without duplicating code or adding complexity to the existing Jest tests.

## AI Usage Disclosure

This project was developed with assistance from Claude AI. AI support was used for:
- Reviewing and improving test logic and coverage
- Enhancing code structure and design patterns
- Improving documentation clarity and completeness
- Adding and fixing ESLint and Prettier configurations
- Generating JSDoc comments for better code documentation

The core architecture, workflows, and test scenarios were guided by project requirements. All code has been reviewed and verified manually to ensure quality and correctness.

## Documentation

- **ARCHITECTURE.md** - Design decisions, patterns, and structure
- **PROJECT_SUMMARY.md** - Complete project overview and metrics
- **README.md** - This file

