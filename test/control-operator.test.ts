import { IsDefined, IsUndefined } from '../src/control-operator';

describe('ControlOperator', () => {
  it('should correctly evaluate the values with IsDefined', () => {
    expect(IsDefined('Daniel')).toBe(true);
    expect(IsDefined(10)).toBe(true);
    expect(IsDefined(null)).toBe(false);
    expect(IsDefined(undefined)).toBe(false);
  });

  it('should correctly evaluate the values with IsUndefined', () => {
    expect(IsUndefined('Daniel')).toBe(false);
    expect(IsUndefined(10)).toBe(false);
    expect(IsUndefined(null)).toBe(true);
    expect(IsUndefined(undefined)).toBe(true);
  });
});
