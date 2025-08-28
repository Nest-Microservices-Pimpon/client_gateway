import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST_PRODUCTS_SERVICE: string;
  PORT_PRODUCTS_SERVICE: number;
  HOST_ORDERS_SERVICE: string;
  PORT_ORDERS_SERVICE: number;
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST_PRODUCTS_SERVICE: joi.string().required(),
    PORT_PRODUCTS_SERVICE: joi.number().required(),
    HOST_ORDERS_SERVICE: joi.string().required(),
    PORT_ORDERS_SERVICE: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  hostProductsService: envVars.HOST_PRODUCTS_SERVICE,
  portProductsService: envVars.PORT_PRODUCTS_SERVICE,
  hostOrdersService: envVars.HOST_ORDERS_SERVICE,
  portOrdersService: envVars.PORT_ORDERS_SERVICE,
};
