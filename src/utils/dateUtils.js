// src/utils/dateUtils.js

/**
 * Formats a date string for display in the crime list
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDateForList = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
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
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffDays < 0) {
      return `in ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffHours < 0) {
      return `in ${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 0) {
      return `in ${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) > 1 ? 's' : ''}`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error getting relative time:', error);
    return '';
  }
};