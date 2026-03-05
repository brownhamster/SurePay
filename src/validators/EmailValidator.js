class EmailValidator {
  static isValidEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }

    // Email validation regex:
    // - Local part: alphanumeric and special chars, can have dots
    // - @ separator required
    // - Domain: alphanumeric, hyphens, must have at least one dot
    // - TLD: at least 2 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Additional validation to ensure proper format
    const parts = email.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const [localPart, domain] = parts;

    // Local part validation
    if (!localPart || localPart.length === 0 || localPart.startsWith('.') || localPart.endsWith('.')) {
      return false;
    }

    // Domain validation
    if (!domain || domain.length === 0) {
      return false;
    }
    if (domain.startsWith('.') || domain.endsWith('.')) {
      return false;
    }
    if (domain.startsWith('-') || domain.endsWith('-')) {
      return false;
    }

    // Must have at least one dot in domain and proper TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }

    // TLD must be at least 2 characters and not be a dot
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return false;
    }

    return emailRegex.test(email);
  }

  static validateEmailList(emails) {
    const results = {
      valid: [],
      invalid: []
    };

    emails.forEach(email => {
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
