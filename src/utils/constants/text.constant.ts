const TEXTS = {
  API: {
    GET_ALL_PRODUCTS: {
      SUMMARY: 'Retrieve all products',
      DESCRIPTION:
        'Fetches all products from the system with optional pagination.',
      DATA_DESCRIPTION: 'The list of products retrieved.',
      SUCCESS: 'Returns all products',
      DTO_VALIDATION_ERROR: 'DTO validation error',
    },
    CREATE_PRODUCT: {
      SUMMARY: 'Create a product',
      DESCRIPTION: 'Creates a new product in the system.',
      SUCCESS: 'Returns the productId created',
      DATA_DESCRIPTION: 'The product created.',
      DTO_VALIDATION_ERROR: 'DTO validation error',
    },
  },
  ERROR: {
    PRODUCT_NAME_ALREADY_EXISTS: 'Product with name <{name}> already exists',
    PRODUCT_NOT_FOUND_ID: 'Product with ID <{id}> not found',
    PRODUCT_NOT_FOUND_NAME: 'Product with name <{name}> not found',
    NO_INVETORY_FOUND_BY_STORE_ID:
      'No inventory found for store ID <{storeId}>',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    INVALID_MOVEMENT_TYPE: 'Invalid movement type',
    THE_FIELD_IS_REQUIRED: 'The field <{field}> is required',
    SOURCE_AND_DESTINATION_STORE_IDS_MUST_BE_DIFFERENT:
      'Source and destination store IDs must be different',
    SOURCE_STORE_DOES_NOT_HAVE_ENOUGH_QUANTITY_OF_PRODUCT:
      'Source store does not have enough quantity of product',
  },
};

const formatMessage = (
  message: string,
  params: { [key: string]: string | number },
): string => message.replace(/{(\w+)}/g, (_, key) => params[key] as string);

export { TEXTS, formatMessage };
