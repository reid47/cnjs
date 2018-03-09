import { renderedCache } from '../core/rule-cache';

const rehydrate = classNames => {
  if (!classNames) return;

  for (let i = 0; i < classNames.length; i++) {
    renderedCache[classNames[i]] = true;
  }
};

export { rehydrate };
