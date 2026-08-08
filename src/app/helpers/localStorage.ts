export type StorageKeys = {
  token: string;
  user: string;
  signRedirectUrl: string;
  signToken: string;
};

export const setStorage = (
  name: keyof StorageKeys,
  value: string | number | string[] | number[] | object | object[]
) => {
  if (typeof value === "object") {
    localStorage.setItem(name, JSON.stringify(value));
  } else {
    localStorage.setItem(name, String(value));
  }
};

export const getStorage = (name: keyof StorageKeys) => {
  return localStorage.getItem(name);
};

export const removeStorageItem = (name: keyof StorageKeys) => {
  localStorage.removeItem(name);
};
