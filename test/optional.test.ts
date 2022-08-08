import { Optional } from '../src/optional';

describe('Optional', () => {
  it('should optional value be defined', () => {
    const valueString = 'Daniel Andres Castillo Pedroza';
    const valueNumber = 10;

    const optionalString = Optional.of(valueString);
    const optionalNumber = Optional.of(valueNumber);

    expect(optionalString.isPresent()).toBeTruthy();
    expect(optionalNumber.isPresent()).toBeTruthy();

    expect(optionalString.get()).toBe(valueString);
    expect(optionalNumber.get()).toBe(valueNumber);
  });

  it('should the optional value be undefined', () => {
    const optionalUndefined = Optional.empty<string>();

    expect(optionalUndefined.isPresent()).toBe(false);
  });

  it('should the optional value be verify', () => {
    const valueString = 'Daniel Andres Castillo Pedroza';

    const optionalString = Optional.build(valueString);
    const optionalNull = Optional.build(null);
    const optionalUndefined = Optional.build();

    expect(optionalString.isPresent()).toBe(true);
    expect(optionalNull.isPresent()).toBe(false);
    expect(optionalUndefined.isPresent()).toBe(false);

    expect(optionalString.get()).toBe(valueString);
  });
});
