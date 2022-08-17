export const MONTHS_NAME = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

export const MONTHS_NAME_MIN = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic'
];

export const MONTHS_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const DAYS_NAME = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const DAYS_NAME_MIN = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

type FnFormatDate = (date: Date) => string;

interface DateFormat {
  [key: string]: FnFormatDate;
}

const formatters: DateFormat = {
  dd: (date: Date): string => {
    return completFormat(date.getDate(), 2);
  },
  dw: (date: Date): string => {
    return DAYS_NAME[date.getDay()];
  },
  dx: (date: Date): string => {
    return DAYS_NAME_MIN[date.getDay()];
  },
  mm: (date: Date): string => {
    return completFormat(date.getMonth() + 1, 2);
  },
  mn: (date: Date): string => {
    return MONTHS_NAME[date.getDay()];
  },
  mx: (date: Date): string => {
    return MONTHS_NAME_MIN[date.getDay()];
  },
  aa: (date: Date): string => {
    return completFormat(date.getFullYear(), 4);
  },
  hh: (date: Date): string => {
    return completFormat(date.getHours(), 2);
  },
  ii: (date: Date): string => {
    return completFormat(date.getMinutes(), 2);
  },
  ss: (date: Date): string => {
    return completFormat(date.getSeconds(), 2);
  },
  hz: (date: Date): string => {
    return completFormat(getHourFormat(date), 2);
  },
  zz: (date: Date): string => {
    return date.getHours() > 11 ? 'PM' : 'AM';
  }
};

export function getDateWeight(date: Date): number {
  return date.getFullYear() * 365 + (date.getMonth() + 1) * 30 + date.getDate();
}

export function getDaysMonth(year: number, month: number): number {
  return month === 1 && isLeapYear(year) ? 29 : MONTHS_DAYS[month];
}

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getDateFormat(date: Date, pattern: string): string {
  let format = pattern;

  Object.keys(formatters).forEach((key) => {
    if (format.includes(key)) {
      format = format.replace(key, formatters[key](date));
    }
  });

  return format;
}

function completFormat(value: number, size: number): string {
  return value.toString().padStart(size, '0');
}

function getHourFormat(date: Date): number {
  const hour = date.getHours();

  return hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
}
