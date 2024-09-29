const CODE_REGEX = new RegExp('<code>(.*?)<\\/code>', 'g');

export const stripCodeTag = (str: string) => (str || '').replace(CODE_REGEX, '$1');

export function toDate(date?: Date, month: 'long' | 'short' = 'long') {
  return date?.toLocaleDateString("en-GB", {
    day: "2-digit",
    month,
    year: "numeric",
  }) || '';
}
