import { isDefined, isUndefined, parseBoolean } from '../src/control-operator';

describe('ControlOperator', () => {
  it('should correctly evaluate the values with IsDefined', () => {
    expect(isDefined('Daniel')).toBe(true);
    expect(isDefined(10)).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  it('should correctly evaluate the values with IsUndefined', () => {
    expect(isUndefined('Daniel')).toBe(false);
    expect(isUndefined(10)).toBe(false);
    expect(isUndefined(null)).toBe(true);
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should correctly convert the value to boolean', () => {
    expect(parseBoolean('false')).toBe(false);
    expect(parseBoolean('0')).toBe(false);
    expect(parseBoolean('undefined')).toBe(false);
    expect(parseBoolean(0)).toBe(false);
    expect(parseBoolean(null)).toBe(false);
    expect(parseBoolean(undefined)).toBe(false);
    expect(parseBoolean(false)).toBe(false);
    
    expect(parseBoolean('Daniel')).toBe(true);
    expect(parseBoolean(20)).toBe(true);
    expect(parseBoolean(true)).toBe(true);
  });
});
