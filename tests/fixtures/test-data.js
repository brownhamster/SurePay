/**
 * Test fixtures and test data
 * Reusable across Jest, Playwright, and other test frameworks
 */

const testEmails = {
  valid: [
    'test@example.com',
    'user.name@domain.co.uk',
    'info@company.org',
    'support+tag@service.com',
    'user_name@test.com',
    'user-name@test.com',
    'user123@test.com',
  ],
  invalid: [
    'notanemail',
    '@example.com',
    'user@',
    'user name@example.com',
    'user@example',
    'user@domain',
    '',
    'user@localhost',
    '.@example.com',
    'user@.com',
    'user@@example.com',
  ],
  edge: {
    null: null,
    undefined: undefined,
    number: 12345,
    boolean: true,
    object: {},
    array: ['user@example.com'],
  },
};

const testUsernames = {
  valid: 'Delphine',
  invalid: 'NonExistentUserXYZ123',
  edge: {
    empty: '',
    whitespace: '   ',
    null: null,
    undefined: undefined,
    number: 12345,
    specialChars: 'User@123!#',
    caseSensitive: 'delphine',
  },
};

const testIds = {
  valid: {
    userId: 1,
    postId: 1,
  },
  invalid: {
    null: null,
    undefined: undefined,
    zero: 0,
    negative: -1,
    string: 'invalid',
    largeNumber: 99999,
  },
};

module.exports = {
  testEmails,
  testUsernames,
  testIds,
};
