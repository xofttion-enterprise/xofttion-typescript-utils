/* eslint-disable @typescript-eslint/no-use-before-define */
import { IsDefined } from './control-operator';

export abstract class Optional<T> {
  protected constructor() {}

  public abstract isPresent(): boolean;

  public abstract get(): T;

  public static build<T>(value?: T | null): Optional<T> {
    return IsDefined(value) ? this.of(value as T) : this.empty();
  }

  public static of<T>(value: T): Optional<T> {
    if (IsDefined(value)) {
      return new PresentOptional<T>(value);
    }

    throw new Error('The passed value was null or undefined.');
  }

  public static empty<T>(): Optional<T> {
    return new EmptyOptional();
  }
}

class PresentOptional<T> extends Optional<T> {
  constructor(private value: T) {
    super();
  }

  public isPresent(): boolean {
    return true;
  }

  public get(): T {
    return this.value;
  }
}

class EmptyOptional<T> extends Optional<T> {
  public isPresent(): boolean {
    return false;
  }

  public get(): T {
    throw new Error('The optional is not present.');
  }
}
