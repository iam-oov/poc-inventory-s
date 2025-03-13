const TEXTS = {
  ERROR: {
    PRODUCT_NAME_ALREADY_EXISTS: 'Product with name <{name}> already exists',
    PRODUCT_NOT_FOUND: 'Product with ID <{id}> not found',
  },
};

const formatMessage = (
  message: string,
  params: { [key: string]: string | number },
): string => message.replace(/{(\w+)}/g, (_, key) => params[key] as string);

export { TEXTS, formatMessage };
