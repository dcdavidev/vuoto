/**
 * A typeguarded version of `instanceof Error` for NodeJS.
 */
export function instanceOfNodeError(
  value: unknown,
  errorType: new (...args: unknown[]) => Error
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
