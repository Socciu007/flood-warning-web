const prefix = "tumi";

class StorageService {
  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // localStorage
  set(key, value) {
    this.localStorage.setItem(this.generateKey(key), value);
  }

  get(key) {
    return this.localStorage.getItem(this.generateKey(key));
  }

  remove(key) {
    this.localStorage.removeItem(this.generateKey(key));
  }

  setObject(key, value) {
    this.localStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getObject(key) {
    return JSON.parse(this.localStorage.getItem(this.generateKey(key)));
  }

  // sessionStorage
  setSession(key, value) {
    this.sessionStorage.setItem(this.generateKey(key), value);
  }

  getSession(key) {
    return this.sessionStorage.getItem(this.generateKey(key));
  }

  removeSession(key) {
    sessionStorage.removeItem(key);
  }

  setSessionObject(key, value) {
    this.sessionStorage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  getSessionObject(key) {
    return JSON.parse(this.sessionStorage.getItem(this.generateKey(key)));
  }

  generateKey(key) {
    return `${prefix}_${key}`;
  }
}

export default new StorageService();
