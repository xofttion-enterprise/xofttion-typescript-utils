export function like(value: string, pattern: string, force = false): boolean {
  if (pattern) {
    let filter = pattern.toLowerCase();
    let test = value.toLowerCase();

    if (force) {
      test = normalize(test);
      filter = normalize(filter);
    }

    return !!test.match(`^.*${filter}.*$`);
  }

  return !!value;
}

export function normalize(value: string): string {
  let result = value;

  result = result.replace('á', 'a');
  result = result.replace('Á', 'A');
  result = result.replace('é', 'e');
  result = result.replace('É', 'E');
  result = result.replace('í', 'i');
  result = result.replace('Í', 'I');
  result = result.replace('ó', 'o');
  result = result.replace('Ó', 'O');
  result = result.replace('ú', 'u');
  result = result.replace('Ú', 'U');

  return result;
}

export function getInitials(value: string, size = 2): string {
  const valueSplit = value.split(' ');

  if (valueSplit.length === 1) {
    return value.slice(0, size);
  }

  const firstValue = valueSplit.first() as string;
  const lastValue = valueSplit.last() as string;

  return `${firstValue.first()}${lastValue.first()}`.toUpperCase();
}
