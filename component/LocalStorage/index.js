function isServerSide() {
  return typeof window === "undefined";
}

export function getItem(key) {
  return isServerSide() ? null : JSON.parse(localStorage.getItem(key));
}

export function setItem(key, data) {
  if (!isServerSide()) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function deleteItem(key) {
  if (!isServerSide()) {
    localStorage.removeItem(key);
  }
}

export function clear() {
  if (!isServerSide()) {
    localStorage.clear();
  }
}
