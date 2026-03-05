# API Test Framework - Project Architecture

## Overview

SurePay is a test automation framework for blog APIs with email validation. The project is designed to be **framework-agnostic** and **lean**, allowing easy migration to different testing tools (Jest → Playwright) without code duplication.

## Project Structure

```
SurePay/
├── src/                          # Core business logic (framework-independent)
│   ├── api/
│   │   └── ApiClient.js         # HTTP client wrapper (uses axios)
│   ├── repositories/
│   │   ├── UserRepository.js    # User data access layer
│   │   ├── PostRepository.js    # Post data access layer
│   │   └── CommentRepository.js # Comment data access layer
│   ├── services/
│   │   └── BlogWorkflow.js      # Business logic orchestration
│   └── validators/
│       └── EmailValidator.js    # Email validation logic
│
├── tests/
│   ├── api-workflow.test.js     # Jest test suite
│   │
│   ├── config/
│   │   └── test-config.js       # Test configuration (API URL, timeouts, etc.)
│   │
│   ├── fixtures/
│   │   └── test-data.js         # Test data and fixtures (reusable)
│   │
│   └── helpers/
│       └── test-helpers.js      # Test utilities and initialization (reusable)
│
├── .circleci/
│   └── config.yml               # Circle CI pipeline configuration
│
├── .eslintrc.json               # ESLint rules for code quality
├── .prettierrc                  # Prettier code formatting config
├── .prettierignore              # Files to ignore formatting
├── jest.config.js               # Jest configuration
├── package.json                 # Dependencies and scripts
└── .gitignore                   # Git ignore rules
```

## Key Design Decisions

### 1. **Separation of Concerns**

- **`src/`** - Pure business logic, zero testing framework dependencies
- **`tests/`** - Testing code split into configuration, fixtures, and helpers

### 2. **Framework Agnostic**

- Core repositories and services work with any testing framework
- Test helpers initialize dependencies without coupling to Jest
- No Jest-specific code in business logic

### 3. **Lean Architecture**

- No unnecessary abstractions
- Minimal folder structure
- Single responsibility per class
- Reusable test data and helpers

## Test Coverage

### API Tests (Jest) - 12 Tests Across 4 Flows

**Flow 1: Search for User "Delphine"** (3 tests)

- Happy path: Find user by username
- Error: User does not exist
- Error: Invalid username input

**Flow 2: Fetch Posts by User** (3 tests)

- Happy path: Get all posts for user
- Error: User has no posts
- Error: Invalid user ID

**Flow 3: Fetch Comments for Each Post** (3 tests)

- Happy path: Get comments for posts
- Error: Post has no comments
- Error: Invalid post ID

**Flow 4: Validate Email Format in Comments** (3 tests)

- Happy path: Validate all emails in comments
- Error: Invalid username in workflow
- Error: Null username in workflow

**Total: 12 focused tests**

## Adding New Tests

### For Jest (API Tests)

1. Add test data to `tests/fixtures/test-data.js`
2. Use test helpers from `tests/helpers/test-helpers.js`
3. Add test to `tests/api-workflow.test.js`

## Configuration

### Test Config (`tests/config/test-config.js`)

- API base URL
- Timeout settings
- Common test data keys

### Test Fixtures (`tests/fixtures/test-data.js`)

- Valid/invalid email examples
- Valid/invalid usernames
- Test IDs
- Edge case values

### Test Helpers (`tests/helpers/test-helpers.js`)

- `initializeTestEnvironment()` - Setup all dependencies
- `createApiClient()` - Create HTTP client
- `createRepositories()` - Create data access layer
- `createWorkflow()` - Create business logic

## Code Quality & CI/CD

### ESLint

- Enforces consistent code style
- Checks for common errors
- Rules: 2-space indents, single quotes, strict equality, proper curly braces
- Run: `npm run lint` or `npm run lint:fix` for auto-fixes

### Prettier

- Auto-formats code for consistency
- Enforces formatting rules project-wide
- Run: `npm run format` or `npm run format:check` to verify

### Circle CI Pipeline

Automated checks on every push:

1. **Lint** - `npm run lint`
2. **Format** - `npm run format:check`
3. **Test** - `npm test`

All checks must pass before code is considered valid.

## Benefits

✅ **DRY** - No code duplication between Jest and Playwright
✅ **Lean** - Minimal folder structure, focused files
✅ **Reusable** - Same test data and helpers for all frameworks
✅ **Maintainable** - Clear separation of concerns
✅ **Scalable** - Easy to add more test frameworks later
✅ **Framework-agnostic** - Core logic works with any test tool
✅ **Code Quality** - ESLint and Prettier ensure consistency
✅ **CI/CD** - Automated validation on every push
