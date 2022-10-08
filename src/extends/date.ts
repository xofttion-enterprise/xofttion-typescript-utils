Date.prototype.isEquals = function (date: Date): boolean {
  return this.getTime() === date.getTime();
};

export {};
