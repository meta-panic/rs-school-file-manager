import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { EventEmitter } from "node:events";


export default class CliHandler extends EventEmitter {
  #readlineInstance;

  constructor() {
    super();
    this.#readlineInstance = readline.createInterface({ input, output });

    this.#readlineInstance.on("line", (line) => {
      this.emit("line", line.trim());
    });

    this.#readlineInstance.on("close", () => {
      this.#readlineInstance.close();
    });

    this.#readlineInstance.setPrompt("> ");
  }

  prompt() {
    this.#readlineInstance.prompt(true);
  }

  close() {
    this.emit("close");
  }
}

