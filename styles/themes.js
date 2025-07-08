// src/styles/themes.js

export const themes = {
    // Light Themes
    light: {
        name: 'White',
        type: 'light',
        colors: {
            primary: '#6B46C1',
            background: '#FFFFFF',
            card: '#F8F9FA',
            text: '#000000',
            textSecondary: '#6B7280',
            border: '#E5E7EB',
            surface: '#FFFFFF',
            placeholder: '#9CA3AF',
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
        },
    },

    purple: {
        name: 'Purple',
        type: 'light',
        colors: {
            primary: '#7C3AED',
            background: '#F3F4F6',
            card: '#EDE9FE',
            text: '#1F2937',
            textSecondary: '#6B7280',
            border: '#C4B5FD',
            surface: '#FFFFFF',
            placeholder: '#6B7280',
            success: '#10B981',
            error: '#DC2626',
            warning: '#F59E0B',
        },
    },

    blue: {
        name: 'Blue',
        type: 'light',
        colors: {
            primary: '#2563EB',
            background: '#F8FAFC',
            card: '#DBEAFE',
            text: '#1E293B',
            textSecondary: '#64748B',
            border: '#93C5FD',
            surface: '#FFFFFF',
            placeholder: '#64748B',
            success: '#059669',
            error: '#DC2626',
            warning: '#D97706',
        },
    },

    // Dark Themes
    black: {
        name: 'Black',
        type: 'dark',
        colors: {
            primary: '#8B5CF6',
            background: '#000000',
            card: '#1F1F1F',
            text: '#FFFFFF',
            textSecondary: '#A3A3A3',
            border: '#404040',
            surface: '#1F1F1F',
            placeholder: '#9CA3AF',
            success: '#10B981',
            error: '#FF453A',
            warning: '#FF9500',
        },
    },

    darkPurple: {
        name: 'Dark Purple',
        type: 'dark',
        colors: {
            primary: '#A855F7',
            background: '#1E1B4B',
            card: '#312E81',
            text: '#F1F5F9',
            textSecondary: '#CBD5E1',
            border: '#6366F1',
            surface: '#312E81',
            placeholder: '#94A3B8',
            success: '#22C55E',
            error: '#F87171',
            warning: '#FBBF24',
        },
    },

    green: {
        name: 'Green',
        type: 'dark',
        colors: {
            primary: '#059669',
            background: '#0F172A',
            card: '#1E293B',
            text: '#F8FAFC',
            textSecondary: '#94A3B8',
            border: '#334155',
            surface: '#1E293B',
            placeholder: '#64748B',
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
        },
    },
};

// Default theme
export const defaultTheme = themes.purple;

// Helper function to get theme by name
export const getTheme = (themeName) => {
    return themes[themeName] || defaultTheme;
};