import { isLeapYear } from '../date';

Date.prototype.isEquals = function (date: Date): boolean {
  return this.getTime() === date.getTime();
};

Date.prototype.isLeapYear = function (): boolean {
  return isLeapYear(this.getFullYear());
};

export {};
