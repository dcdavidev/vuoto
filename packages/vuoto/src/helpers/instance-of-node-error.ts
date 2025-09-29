/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 */
export function instanceOfNodeError(
  value: unknown,
  errorType: new (...args: []) => Error
): value is NodeJS.ErrnoException {
  return value instanceof errorType;
}
