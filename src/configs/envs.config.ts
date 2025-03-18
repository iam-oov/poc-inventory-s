import 'dotenv/config';
import * as joi from 'joi';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

const { NODE_ENV = DEVELOPMENT } = process.env;

interface IEnvVars {
  DB_DATABASE: string;
  DB_DIALECT: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_URL: string;
  PORT: number;
  NODE_ENV: string;
  IS_DEV: boolean;
}

// valid values for dialect and environment
const dialectValues: BaseDataSourceOptions['type'][] = [
  'mysql',
  'postgres',
  'sqlite',
  'mariadb',
  'mssql',
  'oracle',
];

const environmentValues = [DEVELOPMENT, PRODUCTION];

const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().valid(...environmentValues),
    DB_DIALECT: joi
      .string()
      .valid(...dialectValues)
      .required(),
    PORT: joi.number().required(),
    IS_DEV: joi.boolean(),
    DB_HOST: joi.when('NODE_ENV', {
      is: DEVELOPMENT,
      then: joi.string().required(),
      otherwise: joi.string().optional(),
    }),
    DB_PORT: joi.when('NODE_ENV', {
      is: DEVELOPMENT,
      then: joi.number().required(),
      otherwise: joi.number().optional(),
    }),
    DB_USERNAME: joi.when('NODE_ENV', {
      is: DEVELOPMENT,
      then: joi.string().required(),
      otherwise: joi.string().optional(),
    }),
    DB_PASSWORD: joi.when('NODE_ENV', {
      is: DEVELOPMENT,
      then: joi.string().required(),
      otherwise: joi.string().optional(),
    }),
    DB_DATABASE: joi.when('NODE_ENV', {
      is: DEVELOPMENT,
      then: joi.string().required(),
      otherwise: joi.string().optional(),
    }),
    DB_URL: joi.when('NODE_ENV', {
      is: PRODUCTION,
      then: joi.string().required(),
      otherwise: joi.string().optional(),
    }),
  })
  .unknown(true);

// validate environment variables
const { error, value } = envVarsSchema.validate({
  ...process.env,
  IS_DEV: NODE_ENV === DEVELOPMENT,
});

if (error) {
  throw new Error(
    `[ENV: ${NODE_ENV}] Config validation error: ${error.message},`,
  );
}

const envVars: IEnvVars = value;

export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  isDev: envVars.IS_DEV,
  db: {
    dialect: envVars.DB_DIALECT,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    url: envVars.DB_URL,
  },
};
