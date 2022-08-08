import { Either } from '../src/either';

describe('Either', () => {
  it('should return a value by the right path', () => {
    const result = Either.right(5);

    result.fold({
      right: (value) => {
        expect(value).toBe(5);
      }
    });
  });

  it('should return a value by the left path', () => {
    const result = Either.left('Daniel');

    result.fold({
      left: (value) => {
        expect(value).toBe('Daniel');
      }
    });
  });

  it('should return a value by the promise right path', async () => {
    const result = Either.right(5);

    const value = await result.promise({
      right: (value) => {
        expect(value).toBe(5);

        return true;
      }
    });

    expect(value.isPresent()).toBe(true);
    expect(value.get()).toBe(true);
  });

  it('should return a value by the promise left path', async () => {
    const result = Either.left('Daniel');

    const value = await result.fold({
      left: (value) => {
        expect(value).toBe('Daniel');

        return false;
      }
    });

    expect(value.isPresent()).toBe(true);
    expect(value.get()).toBe(false);
  });
});
