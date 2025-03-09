const TEXTS = {
  ERROR: {
    STORE_NAME_ALREADY_EXISTS: 'Store with name <{name}> already exists',
    STORE_NOT_FOUND: 'Store with ID <{id}> not found',
  },
};

const formatMessage = (
  message: string,
  params: { [key: string]: string | number },
): string => message.replace(/{(\w+)}/g, (_, key) => params[key] as string);

export { TEXTS, formatMessage };
