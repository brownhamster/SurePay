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
    if (!email || typeof email !== 'string') {
      return false;
    }

    // Regex matches format: local@domain.tld where no spaces/@ in local/domain/tld
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Ensure exactly one @ symbol (catches double @ and other edge cases)
    const parts = email.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const [localPart, domain] = parts;

    // Reject dots at local part boundaries (invalid per spec)
    if (
      !localPart ||
      localPart.length === 0 ||
      localPart.startsWith('.') ||
      localPart.endsWith('.')
    ) {
      return false;
    }

    if (!domain || domain.length === 0) {
      return false;
    }

    // Reject dots and hyphens at domain boundaries
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return false;
    }
    if (domain.startsWith('-') || domain.endsWith('-')) {
      return false;
    }

    // Domain must have TLD (at least one dot and each part >= 2 chars for TLD)
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }

    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return false;
    }

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
