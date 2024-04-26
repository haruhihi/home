export const SessionSecret = process.env.SESSION_SECRET;
export const SessionEncodedKey = new TextEncoder().encode(SessionSecret);
