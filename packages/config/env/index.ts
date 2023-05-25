import { cleanEnv, str, url } from 'envalid';
import { envVars } from './environment';

export const env = cleanEnv(envVars, {
  ENVIRONMENT: str({
    choices: ['development', 'test', 'test-aws', 'production']
  }),
  API_URL: url()
});
