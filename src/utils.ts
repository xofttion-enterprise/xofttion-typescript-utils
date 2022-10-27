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

export function copyDeep<T extends object>(target: T): T {
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }

  if (target instanceof Array) {
    return (target as any[]).slice() as any;
  }

  if (typeof target === 'object') {
    return JSON.parse(JSON.stringify(target)) as T;
  }

  return target;
}

export function pushElement<T>(array: T[], element: T): T[] {
  return [...array, element];
}

export function removeElement<T>(array: T[], element: T): T[] {
  return array.filter((value) => value !== element);
}

export function changeElement<T>(array: T[], old: T, element: T): T[] {
  return array.map((value) => (value === old ? element : value));
}

type FnEach = <T>(el: T, index: number) => boolean | undefined;
type FnStop = <T>(el: T, index: number) => void;

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

export function forEach<T>(array: T[], callEach: FnEach, callStop?: FnStop): boolean {
  try {
    array.forEach((element, index) => {
      const shouldStop = callEach(element, index);

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
