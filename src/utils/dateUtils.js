// src/utils/crimeValidation.js

/**
 * Validates a crime object
 * @param {Object} crime - Crime object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateCrime = (crime) => {
  const errors = [];

  // Check if crime object exists
  if (!crime || typeof crime !== 'object') {
    return {
      isValid: false,
      errors: ['Crime data is required']
    };
  }

  // Validate title
  if (!crime.title || typeof crime.title !== 'string') {
    errors.push('Title is required');
  } else if (crime.title.trim().length === 0) {
    errors.push('Title cannot be empty');
  } else if (crime.title.length > 100) {
    errors.push('Title must be 100 characters or less');
  }

  // Validate details (optional but if provided, should have constraints)
  if (crime.details && typeof crime.details === 'string' && crime.details.length > 1000) {
    errors.push('Details must be 1000 characters or less');
  }

  // Validate date
  if (!crime.date) {
    errors.push('Date is required');
  } else {
    const date = new Date(crime.date);
    if (isNaN(date.getTime())) {
      errors.push('Date must be a valid date');
    }
  }

  // Validate solved status
  if (crime.solved !== undefined && typeof crime.solved !== 'boolean') {
    errors.push('Solved status must be a boolean');
  }

  // Validate photo URI (if provided)
  if (crime.photoUri && typeof crime.photoUri !== 'string') {
    errors.push('Photo URI must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validates if a title is valid for a crime
 * @param {string} title - Title to validate
 * @returns {Object} Validation result
 */
export const validateCrimeTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return {
      isValid: false,
      error: 'Title is required'
    };
  }

  const trimmedTitle = title.trim();
  
  if (trimmedTitle.length === 0) {
    return {
      isValid: false,
      error: 'Title cannot be empty'
    };
  }

  if (trimmedTitle.length > 100) {
    return {
      isValid: false,
      error: 'Title must be 100 characters or less'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Sanitizes crime input data
 * @param {Object} crimeData - Raw crime data
 * @returns {Object} Sanitized crime data
 */
export const sanitizeCrimeData = (crimeData) => {
  if (!crimeData || typeof crimeData !== 'object') {
    return null;
  }

  return {
    ...crimeData,
    title: typeof crimeData.title === 'string' ? crimeData.title.trim() : '',
    details: typeof crimeData.details === 'string' ? crimeData.details.trim() : '',
    solved: Boolean(crimeData.solved),
    date: crimeData.date || new Date().toISOString(),
    photoUri: typeof crimeData.photoUri === 'string' ? crimeData.photoUri : null
  };
};

/**
 * Checks if a crime has the minimum required data to be saved
 * @param {Object} crime - Crime object to check
 * @returns {boolean} True if crime can be saved
 */
export const canSaveCrime = (crime) => {
  const validation = validateCrime(crime);
  return validation.isValid;
};

/**
 * Gets a user-friendly validation message for display
 * @param {Object} crime - Crime object to validate
 * @returns {string|null} User-friendly error message or null if valid
 */
export const getCrimeValidationMessage = (crime) => {
  const validation = validateCrime(crime);
  
  if (validation.isValid) {
    return null;
  }

  // Return the most important error first
  if (validation.errors.includes('Title is required') || 
      validation.errors.includes('Title cannot be empty')) {
    return 'Please enter a title for the crime';
  }

  if (validation.errors.includes('Date is required') || 
      validation.errors.includes('Date must be a valid date')) {
    return 'Please select a valid date';
  }

  // Return the first error if no priority errors found
  return validation.errors[0] || 'Please check your input';
};