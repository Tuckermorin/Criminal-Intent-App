// src/utils/dateUtils.js - Updated with improved getRelativeTime

/**
 * Formats a date string for display in the crime list
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDateForList = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Formats a date string for time display in the crime list
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted time string
 */
export const formatTimeForList = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Time';
    }
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid Time';
  }
};

/**
 * Formats a date string for detailed display (full format)
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date for display:', error);
    return 'Invalid Date';
  }
};

/**
 * Checks if a date string represents today
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if the date is today
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }
    const today = new Date();
    
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  } catch (error) {
    console.error('Error checking if date is today:', error);
    return false;
  }
};

/**
 * Gets relative time description (e.g., "2 days ago", "in 3 hours")
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time description
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Calculate different time units
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    // Handle future dates (negative differences)
    if (diffMs < 0) {
      const absDiffMs = Math.abs(diffMs);
      const futureMinutes = Math.floor(absDiffMs / (1000 * 60));
      const futureHours = Math.floor(absDiffMs / (1000 * 60 * 60));
      const futureDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
      
      if (futureDays > 0) {
        return `in ${futureDays} day${futureDays > 1 ? 's' : ''}`;
      } else if (futureHours > 0) {
        return `in ${futureHours} hour${futureHours > 1 ? 's' : ''}`;
      } else if (futureMinutes > 0) {
        return `in ${futureMinutes} minute${futureMinutes > 1 ? 's' : ''}`;
      } else {
        return 'Just now';
      }
    }
    
    // Handle past dates
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};