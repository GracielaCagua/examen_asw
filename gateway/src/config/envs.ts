import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
}

// Definimos directamente un objeto con los valores que queremos validar
const configToValidate = {
  PORT: 3004,
  NATS_SERVERS: ['nats://localhost:4222', 'nats://otro-servidor:4222'],
};

const envsSchema = joi.object({
  PORT: joi.number().required(),
  NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);

const { error, value } = envsSchema.validate(configToValidate);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: 3005,
  databaseUrl:  'mysql://root:root@localhost:3306/base1',
  natsServers: 'nats://localhost:4222',
};
