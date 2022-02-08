/**
 * 遍历树
 * @param tree 树
 * @param handler 处理函数
 * @param childField 子节点的key名
 */
export const forEachTree = <T>(tree: T[], handler: (arg: T) => void, childField = 'children') => {
  if (!(tree instanceof Array)) return null;

  const walker = (tree: T[]) => {
    tree.forEach((item: T) => {
      handler(item);
      if (item[childField]) {
        walker(item[childField]);
      }
    });
  };
  walker(tree);
};
