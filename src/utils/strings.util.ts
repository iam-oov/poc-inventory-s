export const convertToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');
};
