export const get = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const set = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: string): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(key);
};

export const getKey = (index: number): string | null => {
  if (typeof window === 'undefined') return null;
  return window.localStorage.key(index);
};

export const clear = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.clear();
};