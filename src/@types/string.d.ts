export {};

declare global {
  interface String {
    empty: boolean;

    first(): string;

    last(): string;
  }
}
