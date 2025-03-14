const TEXTS = {
  ERROR: {
    PRODUCT_NAME_ALREADY_EXISTS: 'Product with name <{name}> already exists',
    PRODUCT_NOT_FOUND_ID: 'Product with ID <{id}> not found',
    PRODUCT_NOT_FOUND_NAME: 'Product with name <{name}> not found',
    NO_INVETORY_FOUND_BY_STORE_ID:
      'No inventory found for store ID <{storeId}>',
  },
};

const formatMessage = (
  message: string,
  params: { [key: string]: string | number },
): string => message.replace(/{(\w+)}/g, (_, key) => params[key] as string);

export { TEXTS, formatMessage };
