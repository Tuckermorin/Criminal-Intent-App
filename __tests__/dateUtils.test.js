// __tests__/utils/dateUtils.test.js
import {
    formatDateForDisplay,
    formatDateForList,
    formatTimeForList,
    getRelativeTime,
    isToday
} from '../../src/utils/dateUtils';

describe('dateUtils', () => {
  // Mock console.error to avoid noise in test output
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('formatDateForList', () => {
    it('formats a valid date correctly', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const result = formatDateForList(dateString);
      
      // Result should contain the date parts (exact format may vary by locale)
      expect(result).toContain('Jan');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('returns empty string for null or undefined input', () => {
      expect(formatDateForList(null)).toBe('');
      expect(formatDateForList(undefined)).toBe('');
    });

    it('returns "Invalid Date" for invalid date string', () => {
      expect(formatDateForList('invalid-date')).toBe('Invalid Date');
    });

    it('returns empty string for empty string input', () => {
      expect(formatDateForList('')).toBe('');
    });
  });

  describe('formatTimeForList', () => {
    it('formats time correctly for a valid date', () => {
      const dateString = '2024-01-15T14:30:00.000Z';
      const result = formatTimeForList(dateString);
      
      // Should contain time parts (format may vary by locale/timezone)
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it('returns empty string for null or undefined input', () => {
      expect(formatTimeForList(null)).toBe('');
      expect(formatTimeForList(undefined)).toBe('');
    });

    it('returns "Invalid Time" for invalid date string', () => {
      expect(formatTimeForList('not-a-date')).toBe('Invalid Time');
    });
  });

  describe('formatDateForDisplay', () => {
    it('formats a date in long format', () => {
      const dateString = '2024-01-15T10:30:00.000Z';
      const result = formatDateForDisplay(dateString);
      
      // Should contain full month name and day of week
      expect(result).toContain('January');
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('handles edge cases gracefully', () => {
      expect(formatDateForDisplay('')).toBe('');
      expect(formatDateForDisplay(null)).toBe('');
      expect(formatDateForDisplay('invalid')).toBe('Invalid Date');
    });
  });

  describe('isToday', () => {
    it('returns true for today\'s date', () => {
      const today = new Date().toISOString();
      expect(isToday(today)).toBe(true);
    });

    it('returns false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday.toISOString())).toBe(false);
    });

    it('returns false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow.toISOString())).toBe(false);
    });

    it('returns false for invalid input', () => {
      expect(isToday('')).toBe(false);
      expect(isToday(null)).toBe(false);
      expect(isToday('invalid-date')).toBe(false);
    });
  });

  describe('getRelativeTime', () => {
    beforeEach(() => {
      // Mock current time to a fixed date for consistent testing
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns "Just now" for current time', () => {
      const now = new Date().toISOString();
      expect(getRelativeTime(now)).toBe('Just now');
    });

    it('returns correct format for minutes ago', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      expect(getRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
    });

    it('returns correct format for hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
      expect(getRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    });

    it('returns correct format for days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
      expect(getRelativeTime(threeDaysAgo)).toBe('3 days ago');
    });

    it('handles singular forms correctly', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      expect(getRelativeTime(oneHourAgo)).toBe('1 hour ago');
      
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      expect(getRelativeTime(oneDayAgo)).toBe('1 day ago');
    });

    it('handles future dates correctly', () => {
      const inTwoHours = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
      expect(getRelativeTime(inTwoHours)).toBe('in 2 hours');
    });

    it('returns empty string for invalid input', () => {
      expect(getRelativeTime('')).toBe('');
      expect(getRelativeTime(null)).toBe('');
      expect(getRelativeTime('invalid')).toBe('');
    });
  });
});

// __tests__/utils/crimeValidation.test.js
import {
    canSaveCrime,
    getCrimeValidationMessage,
    sanitizeCrimeData,
    validateCrime,
    validateCrimeTitle
} from '../../src/utils/crimeValidation';

describe('crimeValidation', () => {
  describe('validateCrime', () => {
    const validCrime = {
      id: '123',
      title: 'Test Crime',
      details: 'This is a test crime',
      date: '2024-01-15T10:30:00.000Z',
      solved: false,
      photoUri: null
    };

    it('validates a valid crime object', () => {
      const result = validateCrime(validCrime);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects null or undefined crime', () => {
      expect(validateCrime(null).isValid).toBe(false);
      expect(validateCrime(undefined).isValid).toBe(false);
      expect(validateCrime('not an object').isValid).toBe(false);
    });

    it('rejects crime without title', () => {
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

    it('rejects crime with non-boolean solved status', () => {
      const crimeWithInvalidSolved = { ...validCrime, solved: 'yes' };
      
      const result = validateCrime(crimeWithInvalidSolved);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Solved status must be a boolean');
    });

    it('accepts crime with undefined details (optional field)', () => {
      const crimeWithoutDetails = { ...validCrime };
      delete crimeWithoutDetails.details;
      
      const result = validateCrime(crimeWithoutDetails);
      expect(result.isValid).toBe(true);
    });
  });

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
  });

  describe('sanitizeCrimeData', () => {
    it('sanitizes valid crime data', () => {
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

    it('handles missing optional fields', () => {
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
      expect(sanitizeCrimeData({ solved: 'false' }).solved).toBe(true);
      expect(sanitizeCrimeData({ solved: 0 }).solved).toBe(false);
      expect(sanitizeCrimeData({ solved: '' }).solved).toBe(false);
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

    it('returns title message for missing title', () => {
      const crimeWithoutTitle = {
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithoutTitle);
      expect(message).toBe('Please enter a title for the crime');
    });

    it('returns title message for empty title', () => {
      const crimeWithEmptyTitle = {
        title: '   ',
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithEmptyTitle);
      expect(message).toBe('Please enter a title for the crime');
    });

    it('returns date message for invalid date', () => {
      const crimeWithInvalidDate = {
        title: 'Valid Title',
        date: 'invalid-date'
      };
      
      const message = getCrimeValidationMessage(crimeWithInvalidDate);
      expect(message).toBe('Please select a valid date');
    });

    it('returns date message for missing date', () => {
      const crimeWithoutDate = {
        title: 'Valid Title'
      };
      
      const message = getCrimeValidationMessage(crimeWithoutDate);
      expect(message).toBe('Please select a valid date');
    });

    it('returns first error for other validation issues', () => {
      const crimeWithLongTitle = {
        title: 'a'.repeat(101),
        date: '2024-01-15T10:30:00.000Z'
      };
      
      const message = getCrimeValidationMessage(crimeWithLongTitle);
      expect(message).toBe('Title must be 100 characters or less');
    });

    it('returns generic message if no specific errors found', () => {
      const crimeWithInvalidSolved = {
        title: 'Valid Title',
        date: '2024-01-15T10:30:00.000Z',
        solved: 'invalid-boolean'
      };
      
      const message = getCrimeValidationMessage(crimeWithInvalidSolved);
      expect(message).toBe('Solved status must be a boolean');
    });
  });
});