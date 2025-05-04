import os from "os";

export default class Context {
  #userName;
  #homeDirectory;
  constructor() {
    this.#homeDirectory = os.homedir();
    process.chdir(os.homedir());
  }

  setUser(userName) {
    if (this.#userName) {
      return;
    }
    this.#userName = userName;
  }

  getUserName() {
    return this.#userName;
  }

  getHomeDirectory() {
    return this.#homeDirectory;
  }
}

