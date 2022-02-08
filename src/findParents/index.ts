/**
 * 根据key 查找父节点
 * @param array // 树
 * @param code // 当前节点的key
 * @param key // 参数2的键名
 */
export const findParents = <T>(
  array: T[],
  code: string,
  key: string,
  childField = 'children'
): T[] => {
  const stack: T[] = [];
  let going = true;
  const walker = (array: T[], code: string) => {
    array.forEach(item => {
      if (!going) return;
      stack.push(item);
      if (item[key] === code) {
        going = false;
      } else if (item[childField]) {
        walker(item[childField], code);
      } else {
        stack.pop();
      }
    });
    if (going) stack.pop();
  };
  walker(array, code);
  return stack;
};
