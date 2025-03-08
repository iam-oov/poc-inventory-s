import 'dotenv/config';
import * as joi from 'joi';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const { NODE_ENV = DEVELOPMENT } = process.env;

interface IEnvVars {
  DB_DATABASE: string;
  DB_DIALECT: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USERNAME: string;
  PORT: number;
  NODE_ENV: string;
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
  })
  .unknown(true);

// validate environment variables
const { error, value } = envVarsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(
    `[ENV: ${NODE_ENV}] Config validation error: ${error.message}`,
  );
}

const envVars: IEnvVars = value;

export const envs = {
  port: envVars.PORT,
  nodeEnv: envVars.NODE_ENV,
  db: {
    dialect: envVars.DB_DIALECT,
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
  },
};
