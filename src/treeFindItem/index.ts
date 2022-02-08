/**
 *
 * @param tree
 * @param key
 * @param value
 * @param childKey
 */
export const treeFindItem = <T>(
  tree: T[],
  handler: (v: T) => boolean,
  childKey = 'children'
): T | null => {
  if (!(tree instanceof Array)) return null;
  let result: T | null = null;

  const walker = (array: T[]) => {
    if (result) return;
    array.forEach(item => {
      if (handler(item)) {
        result = item;
      }
      if (item[childKey]) {
        walker(item[childKey]);
      }
    });
  };
  walker(tree);

  return result;
};
