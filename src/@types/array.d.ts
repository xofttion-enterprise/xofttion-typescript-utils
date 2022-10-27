export {};

declare global {
  interface Array<T> {
    empty: boolean;

    exists(el: T): boolean;

    first(): T | null;

    last(): T | null;

    remove(index: number | T): T[];
  }
}
