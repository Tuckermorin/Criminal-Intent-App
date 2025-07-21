// src/utils/dateUtils.js - FIXED: Actual date utilities
export const formatDateForDisplay = (dateString) => {
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
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

export const formatTimeForDisplay = (dateString) => {
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

export const formatDateTimeForDisplay = (dateString) => {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (error) {
        console.error('Error formatting datetime:', error);
        return 'Invalid Date';
    }
};

export const isValidDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    } catch (error) {
        return false;
    }
};

export const getRelativeTime = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return formatDateForDisplay(dateString);
        }
    } catch (error) {
        console.error('Error calculating relative time:', error);
        return 'Unknown time';
    }
};