/**
 * Mongoose lean() documents still contain ObjectId and Date instances, which
 * cannot cross the React Server Component boundary. This converts a document
 * (or array of them) into plain JSON-safe values.
 */
export function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
