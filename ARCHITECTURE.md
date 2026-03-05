# SurePay - Project Architecture

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
│   ├── helpers/
│   │   └── test-helpers.js      # Test utilities and initialization (reusable)
│   │
│   └── setup/                   # (Future) Setup files for different frameworks
│
├── jest.config.js               # Jest configuration
└── package.json                 # Dependencies
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

## How to Extend with Playwright

### Step 1: Create Playwright Tests
```
tests/
├── e2e/
│   └── blog-ui.spec.js  # Playwright tests using same repositories
```

### Step 2: Reuse Core Logic
```javascript
// tests/e2e/blog-ui.spec.js
const testHelpers = require('../helpers/test-helpers');
const testConfig = require('../config/test-config');
const { testUsernames } = require('../fixtures/test-data');

test('UI: User can view blog posts', async ({ page }) => {
  // API setup: reuse same repositories
  const apiClient = testHelpers.createApiClient(testConfig.api.baseURL);
  const workflow = testHelpers.createWorkflow(apiClient);

  // UI testing: navigate and validate
  await page.goto('http://localhost:3000');
  // ... UI assertions
});
```

### Step 3: Install Playwright
```bash
npm install -D @playwright/test
```

### Step 4: Run Both Test Suites
```bash
npm run test:jest      # Jest API tests
npm run test:playwright # Playwright E2E tests
npm run test:all       # Both
```

## Test Coverage

### API Tests (Jest)
- **Happy Path**: Complete workflow validation
- **Error Scenarios**: Invalid inputs, missing data
- **Edge Cases**: Null/undefined, special characters, boundaries
- **Data Integrity**: Relationship validation
- **Consistency**: Repeated calls return same data

**Total: 74 comprehensive tests**

## Adding New Tests

### For Jest (API Tests)
1. Add test data to `tests/fixtures/test-data.js`
2. Use test helpers from `tests/helpers/test-helpers.js`
3. Add test to `tests/api-workflow.test.js`

### For Playwright (UI Tests)
1. Reuse test data from `tests/fixtures/test-data.js`
2. Reuse initialization from `tests/helpers/test-helpers.js`
3. Create new `.spec.js` files in `tests/e2e/`

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

## Benefits

✅ **DRY** - No code duplication between Jest and Playwright
✅ **Lean** - Minimal folder structure, focused files
✅ **Reusable** - Same test data and helpers for all frameworks
✅ **Maintainable** - Clear separation of concerns
✅ **Scalable** - Easy to add more test frameworks later
✅ **Framework-agnostic** - Core logic works with any test tool

## Next Steps for UI Testing

When you're ready to add Playwright:

1. Install `@playwright/test`
2. Create `tests/e2e/` directory
3. Import helpers from `tests/helpers/test-helpers.js`
4. Use test data from `tests/fixtures/test-data.js`
5. Write page object models or use fixtures for UI patterns
6. Keep API test setup separate from UI interactions
