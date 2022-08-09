const falsyValues = ['false', 'undefined', '0', 0];

export function IsDefined(object: any): boolean {
  return typeof object !== 'undefined' && object !== null;
}

export function IsUndefined(object: any): boolean {
  return !IsDefined(object);
}

export function ParseBoolean(value: any): boolean {
  if (IsUndefined(value)) {
    return false;
  }

  if (value === false) {
    return false;
  }

  if (falsyValues.includes(value)) {
    return false;
  }

  return true;
}
