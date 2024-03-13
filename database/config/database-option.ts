import { isNil } from 'lodash';

export const getConfigValue = <T1, T2 = string>(
  config: T1,
  prop: keyof T1,
  defaultValue?: T2,
): T2 | undefined => {
  const value = config[prop] as unknown as T2;
  if (!isNil(value)) {
    return value;
  }
  return defaultValue;
};

export const databaseOptions = (env: NodeJS.ProcessEnv) => ({
  host: getConfigValue(env, 'DB_HOST'),
  port: Number(env.DB_PORT) || 5432,
  username: getConfigValue(env, 'DB_USERNAME', ''),
  password: getConfigValue(env, 'DB_PASSWORD', ''),
  database: getConfigValue(env, 'DB_DATABASE', ''),
});
