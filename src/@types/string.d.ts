export {};

declare global {
  interface String {
    empty: boolean;

    first(): string | null;

    last(): string | null;

    like(pattern: string, force: boolean): boolean;
  }
}
