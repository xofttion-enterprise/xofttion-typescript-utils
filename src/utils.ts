const falsyValues = ['false', 'undefined', '0', 0];

export function isDefined(object: any): boolean {
  return typeof object !== 'undefined' && object !== null;
}

export function isUndefined(object: any): boolean {
  return !isDefined(object);
}

export function parseBoolean(value: any): boolean {
  return !(isUndefined(value) || value === false || falsyValues.includes(value));
}

export function hasDefined(object: any, keys: string[]): boolean {
  return forEach(keys, (key) => {
    return isDefined(object[key]);
  });
}

export function forEach<T>(
  array: T[],
  callForEach: (el: T, index: number) => boolean | undefined,
  callStop?: (el: T, index: number) => void
): boolean {
  try {
    array.forEach(function (element, index) {
      const shouldStop = callForEach(element, index);

      if (isDefined(shouldStop) && !shouldStop) {
        throw new ForEachBreakException(element, index);
      }
    });

    return true;
  } catch (error) {
    if (error instanceof ForEachBreakException && callStop) {
      callStop(error.element, error.index);
    }

    return false;
  }
}

class ForEachBreakException<T> extends Error {
  constructor(private _element: T, private _index: number) {
    super('');
  }

  public get element(): T {
    return this._element;
  }

  public get index(): number {
    return this._index;
  }
}
