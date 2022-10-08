export {};

declare global {
  interface Date {
    isEquals(date: Date): boolean;

    isLeapYear(): boolean;
  }
}
