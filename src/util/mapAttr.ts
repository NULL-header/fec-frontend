export const mapAttr = function <
  Item,
  Key extends keyof Item,
  Value extends Item[Key],
  CallBack extends (arg: Value, key: Key) => any
>(obj: Item, func: CallBack) {
  const newObj = {} as Record<Key, ReturnType<CallBack>>;
  Object.entries(obj).map(([key, value]) => {
    newObj[key as Key] = func(value as Value, key as Key);
  });
  return newObj;
};
