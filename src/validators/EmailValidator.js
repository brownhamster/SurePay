/**
 * Email Validator
 * Validates email addresses using regex pattern matching and structural validation
 * Checks for:
 * - Proper format (local@domain.tld)
 * - Valid characters in local part and domain
 * - Proper TLD (at least 2 characters)
 * - No invalid characters or patterns
 */
class EmailValidator {
  /**
   * Validate a single email address
   * @param {string} email - The email address to validate
   * @returns {boolean} True if the email is valid, false otherwise
   */
  static isValidEmail(email) {
    // Check if email exists and is a string
    if (!email || typeof email !== 'string') {
      return false;
    }

    // Email validation regex:
    // - Local part: alphanumeric and special chars, can have dots
    // - @ separator required
    // - Domain: alphanumeric, hyphens, must have at least one dot
    // - TLD: at least 2 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate @ symbol appears exactly once
    const parts = email.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const [localPart, domain] = parts;

    // Local part validation: must not be empty or start/end with dot
    if (
      !localPart ||
      localPart.length === 0 ||
      localPart.startsWith('.') ||
      localPart.endsWith('.')
    ) {
      return false;
    }

    // Domain validation: must not be empty or have invalid characters
    if (!domain || domain.length === 0) {
      return false;
    }
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return false;
    }
    if (domain.startsWith('-') || domain.endsWith('-')) {
      return false;
    }

    // Domain must have at least one dot for proper TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }

    // TLD must be at least 2 characters
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return false;
    }

    // Final regex validation
    return emailRegex.test(email);
  }

  /**
   * Validate a list of email addresses
   * @param {string[]} emails - Array of email addresses to validate
   * @returns {object} Object with valid and invalid email arrays
   */
  static validateEmailList(emails) {
    const results = {
      valid: [],
      invalid: [],
    };

    emails.forEach((email) => {
      if (this.isValidEmail(email)) {
        results.valid.push(email);
      } else {
        results.invalid.push(email);
      }
    });

    return results;
  }
}

module.exports = EmailValidator;
