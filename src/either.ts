import { IsDefined } from './control-operator';
import { Optional } from './optional';

type Left<L> = {
  left: L;
  right?: never;
};

type Right<R> = {
  left?: never;
  right: R;
};

type UnwrapEitherValue = <L, R>(value: EitherValue<L, R>) => NonNullable<L | R>;

type EitherValue<L, R> = NonNullable<Left<L> | Right<R>>;

interface EitherResolver<L, R, V> {
  left?: (_: L) => V | undefined;
  right?: (_: R) => V | undefined;
}

const UnwrapEither: UnwrapEitherValue = <L, R>(value: EitherValue<L, R>) => {
  const { left, right } = value;

  if (IsDefined(right) && IsDefined(left)) {
    throw new Error('Received both left and right values at runtime');
  }

  if (IsDefined(left)) {
    return left as NonNullable<L>;
  }

  if (IsDefined(right)) {
    return right as NonNullable<R>;
  }

  throw new Error('Received no left or right values at runtime when opening Either');
};

const IsLeft = <L, R>(value: EitherValue<L, R>): value is Left<L> => {
  return IsDefined(value.left);
};

const IsRight = <L, R>(value: EitherValue<L, R>): value is Right<R> => {
  return IsDefined(value.right);
};

const MakeLeft = <L>(value: L): Left<L> => ({ left: value });

const MakeRight = <R>(value: R): Right<R> => ({ right: value });

export class Either<L, R> {
  private constructor(private value: EitherValue<L, R>) {}

  public fold<V>(resolver: EitherResolver<L, R, V>): Optional<V> {
    return Optional.build(this._unwrap(resolver));
  }

  public promise<V>(resolver: EitherResolver<L, R, V>): Promise<Optional<V>> {
    return Promise.resolve(this.fold(resolver));
  }

  private _unwrap<V>(resolver: EitherResolver<L, R, V>): V | undefined {
    if (IsRight(this.value) && resolver.right) {
      return resolver.right(UnwrapEither(this.value));
    }

    if (IsLeft(this.value) && resolver.left) {
      return resolver.left(UnwrapEither(this.value));
    }

    return undefined;
  }

  public static left<L>(value: L): Either<L, unknown> {
    return new Either(MakeLeft<L>(value));
  }

  public static right<R>(value: R): Either<unknown, R> {
    return new Either(MakeRight<R>(value));
  }
}
