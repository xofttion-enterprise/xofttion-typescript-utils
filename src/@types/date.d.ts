export {};

declare global {
  interface Date {
    isEquals(date = new Date()): boolean;

    isEqualsWeight(date = new Date()): boolean;

    isBefore(date = new Date()): boolean;

    isBeforeOrEquals(date = new Date()): boolean;

    isAfter(date = new Date()): boolean;

    isAfterOrEquals(date: Date): boolean;

    isLeapYear(): boolean;

    getFormat(pattern = 'aa-mm-dd'): string;

    getWeight(): number;

    merge(date = new Date()): Date;

    getDifference(date = new Date()): number;

    getDifferenceForHumans(date = new Date()): string;

    normalizeTimeMin(): Date;

    normalizeTimeMax(): Date;
  }
}
