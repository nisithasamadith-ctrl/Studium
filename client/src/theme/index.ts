import { TextStyle } from 'react-native';

export interface Theme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        surface: string;
        text: string;
        textLight: string;
        error: string;
        white: string;
        black: string;
    };
    spacing: {
        s: number;
        m: number;
        l: number;
        xl: number;
    };
    borderRadius: {
        s: number;
        m: number;
        l: number;
        xl: number;
        round: number;
    };
    typography: {
        h1: TextStyle;
        h2: TextStyle;
        body: TextStyle;
        caption: TextStyle;
    };
    shadows: {
        small: object;
        medium: object;
        large: object;
    };
}

export const lightTheme: Theme = {
    colors: {
        primary: '#4CAF50',
        secondary: '#9CCC65',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#222222',
        textLight: '#757575',
        error: '#D32F2F',
        white: '#FFFFFF',
        black: '#000000',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 4,
        m: 8,
        l: 16,
        xl: 24,
        round: 999,
    },
    typography: {
        h1: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#222222',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#222222',
        },
        body: {
            fontSize: 16,
            color: '#222222',
        },
        caption: {
            fontSize: 12,
            color: '#757575',
        },
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
        },
    },
};

export const darkTheme: Theme = {
    colors: {
        primary: '#66BB6A',
        secondary: '#AED581',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#FFFFFF',
        textLight: '#B0B0B0',
        error: '#EF5350',
        white: '#FFFFFF',
        black: '#000000',
    },
    spacing: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },
    borderRadius: {
        s: 4,
        m: 8,
        l: 16,
        xl: 24,
        round: 999,
    },
    typography: {
        h1: {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        body: {
            fontSize: 16,
            color: '#FFFFFF',
        },
        caption: {
            fontSize: 12,
            color: '#B0B0B0',
        },
    },
    shadows: {
        small: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.4,
            shadowRadius: 6,
            elevation: 4,
        },
        large: {
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 8,
        },
    },
};

// Default export for backward compatibility
export const theme = lightTheme;
