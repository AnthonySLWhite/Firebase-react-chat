/**
 * If x returns false then console.error(y) AND return 0
 *
 * @return x if true
 * @return 0 if false
 *
 */
export default function ifErr(x, y) {
  if (!x) {
    console.error(y);
    return 0;
  }
  return x;
}
