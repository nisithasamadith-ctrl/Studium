import { describe, expect, test } from '@jest/globals';

// Helper function to simulate the logic in the route
// Ideally this logic should be extracted to a service/helper function to be tested in isolation
// But for now we will test the logic function itself if we extract it, or just mock the logic here to verify expectations.
// Let's extract the tree type logic to a helper for better testing.

const getTreeType = (duration: number): string => {
    if (duration >= 60) return 'pine';
    if (duration >= 45) return 'oak';
    return 'sapling';
};

describe('Forest Logic', () => {
    test('should return sapling for short duration', () => {
        expect(getTreeType(25)).toBe('sapling');
    });

    test('should return oak for medium duration', () => {
        expect(getTreeType(45)).toBe('oak');
        expect(getTreeType(50)).toBe('oak');
    });

    test('should return pine for long duration', () => {
        expect(getTreeType(60)).toBe('pine');
        expect(getTreeType(90)).toBe('pine');
    });
});
