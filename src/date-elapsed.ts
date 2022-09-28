export const YEAR_MILISECONDS = 31536000000;
export const MONTH_MILISECONDS = 2592000000;
export const WEEK_MILISECONDS = 604800000;
export const DAY_MILISECONDS = 86400000;
export const HOUR_MILISECONDS = 3600000;
export const MINUTE_MILISECONDS = 60000;
export const SECOND_MILISECONDS = 1000;

interface ElapsedTime {
  value: number;
  label: string;
  single: string;
  plural: string;
}

interface PendingTime {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function factoryElapsedTime(
  value: number,
  single: string,
  charPlural = 's',
  plural?: string
): ElapsedTime {
  plural = plural || `${single}${charPlural}`;

  const label = `${single}(${charPlural})`;

  return {
    value,
    label,
    single,
    plural
  };
}

const elapsedsTime: ElapsedTime[] = [
  factoryElapsedTime(YEAR_MILISECONDS, 'año'),
  factoryElapsedTime(MONTH_MILISECONDS, 'mes', 'es'),
  factoryElapsedTime(WEEK_MILISECONDS, 'semana'),
  factoryElapsedTime(DAY_MILISECONDS, 'día', 's', 'dias'),
  factoryElapsedTime(HOUR_MILISECONDS, 'hora'),
  factoryElapsedTime(MINUTE_MILISECONDS, 'minuto'),
  factoryElapsedTime(SECOND_MILISECONDS, 'segundo')
];

export function getFormatForHumans(milliseconds: number): string {
  const prefix = milliseconds > 0 ? 'Falta' : 'Hace';
  const value = Math.abs(milliseconds);

  if (value < 1000) {
    return `${prefix} 1 segundo`;
  }

  let description: unknown = null;
  let index = 0;

  while (description === null && index < elapsedsTime.length) {
    const elapsed = elapsedsTime[index];
    const result = Math.floor(value / elapsed.value);

    if (result >= 1) {
      const label = result === 1 ? elapsed.single : elapsed.plural;

      description = `${prefix} ${result} ${label}`;
    }

    index++;
  }

  return description as string;
}

export function getPendingTime(initial: Date, future = new Date()): PendingTime {
  const difference = future.getTime() - initial.getTime();

  return {
    years: Math.floor(difference / YEAR_MILISECONDS),
    months: Math.floor(difference / MONTH_MILISECONDS),
    weeks: Math.floor(difference / WEEK_MILISECONDS),
    days: Math.floor(difference / DAY_MILISECONDS),
    hours: Math.floor(difference / HOUR_MILISECONDS),
    minutes: Math.floor(difference / MINUTE_MILISECONDS),
    seconds: Math.floor(difference / SECOND_MILISECONDS)
  };
}
