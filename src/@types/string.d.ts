export {};

declare global {
  interface String {
    empty: boolean;

    first(): string;

    last(): string;

    like(pattern: string, force?: boolean): boolean;
  }
}
