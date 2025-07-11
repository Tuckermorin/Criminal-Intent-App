// __tests__/validationUtils.test.js - Enhanced Pure Logic Tests for Validation Functions
import {
    canSaveCrime,
    getCrimeValidationMessage,
    sanitizeCrimeData,
    validateCrime,
    validateCrimeTitle
} from '../src/utils/crimeValidation';

describe('Crime Validation Utils - Pure Logic', () => {
  describe('validateCrimeTitle', () => {
    it('validates a valid title', () => {
      const result = validateCrimeTitle('Valid Crime Title');
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('rejects empty or null title', () => {
      expect(validateCrimeTitle('').isValid).toBe(false);
      expect(validateCrimeTitle(null).isValid).toBe(false);
      expect(validateCrimeTitle(undefined).isValid).toBe(false);
    });

    it('rejects title with only whitespace', () => {
      const result = validateCrimeTitle('   ');
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Title cannot be empty');
    });

    it('rejects title that is too long', () => {
      const longTitle = 'a'.repeat(101);
      const result = validateCrimeTitle(longTitle);
      
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Title must be 100 characters or less');
    });

    it('accepts title at maximum length', () => {
      const maxLengthTitle = 'a'.repeat(100);
      const result = validateCrimeTitle(maxLengthTitle);
      
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    it('handles different string edge cases', () => {
      // Tab and newline characters
      expect(validateCrimeTitle('\t\n\r').isValid).toBe(false);
      
      // Mixed whitespace
      expect(validateCrimeTitle('  \t  \n  ').isValid).toBe(false);
      
      // Title with leading/trailing spaces but valid content
      expect(validateCrimeTitle('  Valid Title  ').isValid).toBe(true);
    });
  });

  describe('validateCrime', () => {
    const validCrime = {
      id: '123',
      title: 'Test Crime',
      details: 'This is a test crime',
      date: '2024-01-15T10:30:00.000Z',
      solved: false,
      photoUri: null
    };

    it('validates a complete valid crime object', () => {
      const result = validateCrime(validCrime);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects null or undefined crime', () => {
      expect(validateCrime(null).isValid).toBe(false);
      expect(validateCrime(undefined).isValid).toBe(false);
      expect(validateCrime('not an object').isValid).toBe(false);
    });

    it('rejects crime without required title', () => {
      const crimeWithoutTitle = { ...validCrime };
      delete crimeWithoutTitle.title;
      
      const result = validateCrime(crimeWithoutTitle);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title is required');
    });

    it('rejects crime with empty title', () => {
      const crimeWithEmptyTitle = { ...validCrime, title: '   ' };
      
      const result = validateCrime(crimeWithEmptyTitle);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title cannot be empty');
    });

    it('rejects crime with title too long', () => {
      const longTitle = 'a'.repeat(101);
      const crimeWithLongTitle = { ...validCrime, title: longTitle };
      
      const result = validateCrime(crimeWithLongTitle);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Title must be 100 characters or less');
    });

    it('rejects crime with details too long', () => {
      const longDetails = 'a'.repeat(1001);
      const crimeWithLongDetails = { ...validCrime, details: longDetails };
      
      const result = validateCrime(crimeWithLongDetails);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Details must be 1000 characters or less');
    });

    it('rejects crime without date', () => {
      const crimeWithoutDate = { ...validCrime };
      delete crimeWithoutDate.date;
      
      const result = validateCrime(crimeWithoutDate);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Date is required');
    });

    it('rejects crime with invalid date', () => {
      const crimeWithInvalidDate = { ...validCrime, date: 'invalid-date' };
      
      const result = validateCrime(crimeWithInvalidDate);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Date must be a valid date');
    });

    it('accepts crime with undefined details (optional field)', () => {
      const crimeWithoutDetails = { ...validCrime };
      delete crimeWithoutDetails.details;
      
      const result = validateCrime(crimeWithoutDetails);
      
      expect(result.isValid).toBe(true);
    });

    it('validates different date formats', () => {
      // Valid ISO date
      expect(validateCrime({ ...validCrime, date: '2024-01-15T10:30:00.000Z' }).isValid).toBe(true);
      
      // Valid date string
      expect(validateCrime({ ...validCrime, date: 'January 15, 2024' }).isValid).toBe(true);
      
      // Invalid date strings
      expect(validateCrime({ ...validCrime, date: 'not-a-date' }).isValid).toBe(false);
      expect(validateCrime({ ...validCrime, date: '32/13/2024' }).isValid).toBe(false);
    });

    it('validates solved field types', () => {
      // Valid boolean values
      expect(validateCrime({ ...validCrime, solved: true }).isValid).toBe(true);
      expect(validateCrime({ ...validCrime, solved: false }).isValid).toBe(true);
      
      // Invalid solved values
      expect(validateCrime({ ...validCrime, solved: 'true' }).isValid).toBe(false);
      expect(validateCrime({ ...validCrime, solved: 1 }).isValid).toBe(false);
      expect(validateCrime({ ...validCrime, solved: 0 }).isValid).toBe(false);
    });
  });

  describe('sanitizeCrimeData', () => {
    it('sanitizes valid crime data correctly', () => {
      const rawData = {
        title: '  Crime Title  ',
        details: '  Crime details  ',
        solved: 'true',
        date: '2024-01-15T10:30:00.000Z',
        photoUri: 'file://photo.jpg'
      };

      const result = sanitizeCrimeData(rawData);
      
      expect(result.title).toBe('Crime Title');
      expect(result.details).toBe('Crime details');
      expect(result.solved).toBe(true);
      expect(result.date).toBe('2024-01-15T10:30:00.000Z');
      expect(result.photoUri).toBe('file://photo.jpg');
    });

    it('handles missing optional fields with defaults', () => {
      const rawData = {
        title: 'Crime Title'
      };

      const result = sanitizeCrimeData(rawData);
      
      expect(result.title).toBe('Crime Title');
      expect(result.details).toBe('');
      expect(result.solved).toBe(false);
      expect(result.date).toBeDefined();
      expect(result.photoUri).toBeNull();
    });

    it('returns null for invalid input', () => {
      expect(sanitizeCrimeData(null)).toBeNull();
      expect(sanitizeCrimeData(undefined)).toBeNull();
      expect(sanitizeCrimeData('not an object')).toBeNull();
    });

    it('converts non-string title to empty string', () => {
      const rawData = { title: 123 };
      const result = sanitizeCrimeData(rawData);
      
      expect(result.title).toBe('');
    });

    it('converts truthy values to boolean for solved field', () => {
      expect(sanitizeCrimeData({ solved: 'yes' }).solved).toBe(true);
      expect(sanitizeCrimeData({ solved: 1 }).solved).toBe(true);
      expect(sanitizeCrimeData({ solved: 0 }).solved).toBe(false);
      expect(sanitizeCrimeData({ solved: '' }).solved).toBe(false);
      expect(sanitizeCrimeData({ solved: null }).solved).toBe(false);
      expect(sanitizeCrimeData({ solved: undefined }).solved).toBe(false);
    });

    it('assigns current date if no date provided', () => {
      const rawData = { title: 'Test' };
      const result = sanitizeCrimeData(rawData);
      
      const resultDate = new Date(result.date);
      const now = new Date();
      const timeDiff = Math.abs(now.getTime() - resultDate.getTime());
      
      // Should be within 1 second of current time
      expect(timeDiff).toBeLessThan(1000);
    });

    it('preserves existing valid data', () => {
      const existingData = {
        id: 'existing-id',
        title: 'Existing Title',
        createdAt: '2024-01-01T00:00:00.000Z',
        customField: 'custom value'
      };

      const result = sanitizeCrimeData(existingData);
      
      expect(result.id).toBe('existing-id');
      expect(result.createdAt).toBe('2024-01-01T00:00:00.000Z');
      expect(result.customField).toBe('custom value');
    });
  });

  describe('canSaveCrime', () => {
    it('returns true for valid crime', () => {
      const validCrime = {
        title: 'Valid Crime',
        date: '2024-01-15T10:30:00.000Z',
        solved: false
      };
      
      expect(canSaveCrime(validCrime)).toBe(true);
    });

    it('returns false for invalid crime', () => {
      const invalidCrime = {
        title: '',
        date: 'invalid-date'
      };
      
      expect(canSaveCrime(invalidCrime)).toBe(false);
    });

    it('returns false for null crime', () => {
      expect(canSaveCrime(null)).toBe(false);
    });

    it('returns false for crimes with multiple errors', () => {
      const invalidCrime = {
        title: '', // Empty title
        date: 'bad-date', // Invalid date
        solved: 'not-boolean' // Wrong type
      };
      
      expect(canSaveCrime(invalidCrime)).toBe(false);
    });
  });

  describe('getCrimeValidationMessage', () => {
    it('returns null for valid crime', () => {
      const validCrime = {
        title: 'Valid Crime',
        date: '2024-01-15T10:30:00.000Z',
        solved: false
      };
      
      expect(getCrimeValidationMessage(validCrime)).toBeNull();
    });

    it('prioritizes title message for missing title', () => {
      const crimeWithoutTitle = {
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithoutTitle);
      expect(message).toBe('Please enter a title for the crime');
    });

    it('prioritizes title message for empty title', () => {
      const crimeWithEmptyTitle = {
        title: '   ',
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithEmptyTitle);
      expect(message).toBe('Please enter a title for the crime');
    });

    it('returns date message for invalid date when title is valid', () => {
      const crimeWithInvalidDate = {
        title: 'Valid Title',
        date: 'invalid-date'
      };
      
      const message = getCrimeValidationMessage(crimeWithInvalidDate);
      expect(message).toBe('Please select a valid date');
    });

    it('returns date message for missing date when title is valid', () => {
      const crimeWithoutDate = {
        title: 'Valid Title'
      };
      
      const message = getCrimeValidationMessage(crimeWithoutDate);
      expect(message).toBe('Please select a valid date');
    });

    it('returns specific error for other validation issues', () => {
      const crimeWithLongTitle = {
        title: 'a'.repeat(101),
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithLongTitle);
      expect(message).toBe('Title must be 100 characters or less');
    });

    it('handles complex validation scenarios', () => {
      // Crime with long details but valid title and date
      const crimeWithLongDetails = {
        title: 'Valid Title',
        details: 'a'.repeat(1001),
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithLongDetails);
      expect(message).toBe('Details must be 1000 characters or less');
    });
  });

  describe('Edge cases and error handling', () => {
    it('handles extremely large inputs gracefully', () => {
      const hugeCrime = {
        title: 'a'.repeat(10000),
        details: 'b'.repeat(50000),
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const result = validateCrime(hugeCrime);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('handles special characters in strings', () => {
      const crimeWithSpecialChars = {
        title: 'Crime with émojis 🚔 and symbols @#$%',
        details: 'Details with\nnewlines\tand\ttabs',
        date: '2024-01-15T10:30:00.000Z',
        solved: false
      };
      
      const result = validateCrime(crimeWithSpecialChars);
      expect(result.isValid).toBe(true);
    });

    it('handles circular reference objects safely', () => {
      const circularObj = { title: 'Test' };
      circularObj.self = circularObj;
      
      // Should not throw an error
      expect(() => {
        const result = sanitizeCrimeData(circularObj);
        expect(result).toBeDefined();
      }).not.toThrow();
    });
  });
});