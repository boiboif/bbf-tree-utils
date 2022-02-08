/* eslint-disable @typescript-eslint/no-explicit-any */
export type MapTreeResult<U, K extends string> = (U &
  Record<K, MapTreeResult<U, K> | undefined> &
  Record<string, any>)[];

/**
 *
 * @param tree 要处理的树结构
 * @param handler 处理函数
 * @param fieldName 子树的字段名
 * @param newFieldName 修改子树的字段名
 * @returns
 */
export const mapTree = <T, U, K extends string = 'children', KK extends string = K>(
  tree: T[] | undefined,
  handler: (arg: T) => U,
  fieldName?: K,
  newFieldName?: KK
): MapTreeResult<U, KK> => {
  if (!(tree instanceof Array)) return [];
  fieldName = fieldName ?? ('children' as K);
  newFieldName = newFieldName ?? ('children' as KK);

  const result = tree.reduce((acc: any, cur: any) => {
    const handleItem = handler(cur);
    if (!cur[fieldName]) {
      return acc.concat({
        ...handleItem,
        [newFieldName as string]: undefined,
      });
    } else {
      const children = mapTree(cur[fieldName], handler, fieldName, newFieldName);
      return acc.concat({
        ...handleItem,
        [newFieldName as string]: children,
      });
    }
  }, []);

  return result;
};
