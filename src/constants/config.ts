export const SessionSecret = process.env.SESSION_SECRET;
export const DefaultUserName = process.env.DEFAULT_USER_NAME;
export const DefaultUserPassword = process.env.DEFAULT_USER_PASSWORD;

export const SessionEncodedKey = new TextEncoder().encode(SessionSecret);
