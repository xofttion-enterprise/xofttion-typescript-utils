import { getFormatForHumans } from '../src/date-elapsed';

describe('DateElapsed', () => {
  it('should format all values as successful', () => {
    const resultSecond = getFormatForHumans(-1000);

    expect(resultSecond).toBe('Hace 1 segundo');
  });
});
