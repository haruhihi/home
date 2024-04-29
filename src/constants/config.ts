export const SessionSecret = process.env.SESSION_SECRET;
export const DefaultUserName = process.env.DEFAULT_USER_NAME;
export const DefaultUserPassword = process.env.DEFAULT_USER_PASSWORD;

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;

export const SessionEncodedKey = new TextEncoder().encode(SessionSecret);

export const ENV_LOCAL = {
  COS_SECRET_ID: process.env.COS_SECRET_ID,
  COS_SECRET_KEY: process.env.COS_SECRET_KEY,
  NEXT_PUBLIC_COS_BUCKET: process.env.NEXT_PUBLIC_COS_BUCKET,
  NEXT_PUBLIC_COS_REGION: process.env.NEXT_PUBLIC_COS_REGION,
  NEXT_PUBLIC_COS_PREFIX: process.env.NEXT_PUBLIC_COS_PREFIX,
};
