jest.mock('react-native', () => ({
    Dimensions: {
        get: jest.fn(),
    },
}));

import { Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from './scalingUtils';

describe('scalingUtils', () => {
    const mockDimensions = Dimensions as jest.Mocked<typeof Dimensions>;

    beforeEach(() => {
        jest.clearAllMocks();
        // Set default dimensions
        mockDimensions.get.mockReturnValue({ width: 350, height: 680, scale: 1, fontScale: 1 });
    });

    describe('scale', () => {
        it('should return the same size when width equals guidelineBaseWidth (350)', () => {
            mockDimensions.get.mockReturnValue({ width: 350, height: 680, scale: 1, fontScale: 1 });
            expect(scale(100)).toBe(100);
            expect(scale(50)).toBe(50);
        });

        it('should scale up for larger screens', () => {
            mockDimensions.get.mockReturnValue({ width: 700, height: 680, scale: 1, fontScale: 1 });
            expect(scale(100)).toBe(200);
            expect(scale(50)).toBe(100);
        });

        it('should scale down for smaller screens', () => {
            mockDimensions.get.mockReturnValue({ width: 175, height: 680, scale: 1, fontScale: 1 });
            expect(scale(100)).toBe(50);
        });

        it('should handle zero size', () => {
            mockDimensions.get.mockReturnValue({ width: 400, height: 680, scale: 1, fontScale: 1 });
            expect(scale(0)).toBe(0);
        });

        it('should calculate correctly for iPhone-like dimensions', () => {
            mockDimensions.get.mockReturnValue({ width: 375, height: 812, scale: 1, fontScale: 1 });
            expect(scale(100)).toBeCloseTo(107.14, 2);
        });
    });

    describe('verticalScale', () => {
        it('should return the same size when height equals guidelineBaseHeight (680)', () => {
            mockDimensions.get.mockReturnValue({ width: 350, height: 680, scale: 1, fontScale: 1 });
            expect(verticalScale(100)).toBe(100);
        });

        it('should scale up for taller screens', () => {
            mockDimensions.get.mockReturnValue({ width: 350, height: 1360, scale: 1, fontScale: 1 });
            expect(verticalScale(100)).toBe(200);
        });

        it('should scale down for shorter screens', () => {
            mockDimensions.get.mockReturnValue({ width: 350, height: 340, scale: 1, fontScale: 1 });
            expect(verticalScale(100)).toBe(50);
        });
    });

    describe('moderateScale', () => {
        it('should return original size at baseline dimensions', () => {
            mockDimensions.get.mockReturnValue({ width: 350, height: 680, scale: 1, fontScale: 1 });
            expect(moderateScale(100)).toBe(100);
        });

        it('should apply moderate scaling with default factor (0.5)', () => {
            mockDimensions.get.mockReturnValue({ width: 700, height: 680, scale: 1, fontScale: 1 });
            expect(moderateScale(100)).toBe(150);
        });

        it('should not scale when factor is 0', () => {
            mockDimensions.get.mockReturnValue({ width: 700, height: 680, scale: 1, fontScale: 1 });
            expect(moderateScale(100, 0)).toBe(100);
        });

        it('should fully scale when factor is 1', () => {
            mockDimensions.get.mockReturnValue({ width: 700, height: 680, scale: 1, fontScale: 1 });
            expect(moderateScale(100, 1)).toBe(200);
        });
    });
});