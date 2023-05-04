import { bool, cleanEnv, str } from 'envalid';
import { envVars } from './environment';

export const env = cleanEnv(envVars, {
  ENVIRONMENT: str({
    choices: ['development', 'test', 'test-aws', 'production']
  }),
  USE_IN_MEMORY_REPOSITORIES: bool()
});

export const isTest = env.ENVIRONMENT === 'test';
export const isProd = env.ENVIRONMENT === 'production';
export const isDev = env.ENVIRONMENT === 'development';
