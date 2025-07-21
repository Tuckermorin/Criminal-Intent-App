// src/utils/crimeValidation.js
export const validateCrimeTitle = (title) => {
    if (!title || typeof title !== 'string') {
        return { isValid: false, error: 'Title is required' };
    }
    
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
        return { isValid: false, error: 'Title cannot be empty' };
    }
    
    if (trimmedTitle.length > 100) {
        return { isValid: false, error: 'Title must be 100 characters or less' };
    }
    
    return { isValid: true, error: null };
};

export const validateCrime = (crime) => {
    if (!crime || typeof crime !== 'object') {
        return { isValid: false, errors: ['Invalid crime data'] };
    }
    
    const errors = [];
    
    // Validate title
    const titleValidation = validateCrimeTitle(crime.title);
    if (!titleValidation.isValid) {
        errors.push(titleValidation.error);
    }
    
    // Validate details length
    if (crime.details && crime.details.length > 1000) {
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
    
    return {
        isValid: errors.length === 0,
        errors
    };
};

export const sanitizeCrimeData = (rawData) => {
    if (!rawData || typeof rawData !== 'object') {
        return null;
    }
    
    return {
        title: typeof rawData.title === 'string' ? rawData.title.trim() : '',
        details: typeof rawData.details === 'string' ? rawData.details.trim() : '',
        solved: Boolean(rawData.solved),
        date: rawData.date || new Date().toISOString(),
        photoUri: rawData.photoUri || null,
        id: rawData.id,
        createdAt: rawData.createdAt
    };
};

export const canSaveCrime = (crime) => {
    const validation = validateCrime(crime);
    return validation.isValid;
};

export const getCrimeValidationMessage = (crime) => {
    const validation = validateCrime(crime);
    
    if (validation.isValid) {
        return null;
    }
    
    // Return user-friendly messages for common issues
    if (validation.errors.includes('Title is required') || 
        validation.errors.includes('Title cannot be empty')) {
        return 'Please enter a title for the crime';
    }
    
    if (validation.errors.includes('Date is required') || 
        validation.errors.includes('Date must be a valid date')) {
        return 'Please select a valid date';
    }
    
    // Return the first error for other cases
    return validation.errors[0];
};