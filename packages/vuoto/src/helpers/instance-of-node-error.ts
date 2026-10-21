/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 * @param value The value to check.
 * @param errorType The error constructor to check against (default: Error).
 *
 * @returns True if the value is an instance of the given error type and has NodeJS-specific error properties.
 *
 * @example
 *
 * ```ts
 * try {
 *   // ...
 * } catch (error) {
 *   if (instanceOfNodeError(error)) {
 *     console.error(error.code);
 *   }
 * }
 * ```
 */
export function instanceOfNodeError(
  value: unknown,
  errorType: ErrorConstructor = Error
): value is NodeJS.ErrnoException {
  if (!(value instanceof errorType)) {
    return false;
  }

  const candidate = value as NodeJS.ErrnoException;

  return (
    typeof candidate.code === 'string' ||
    typeof candidate.code === 'number' ||
    typeof candidate.errno === 'number'
  );
}
