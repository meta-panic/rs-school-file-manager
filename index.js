import * as readline from 'node:readline/promises';
import process, { stdin as input, stdout as output } from 'node:process';
import { EOL } from 'node:os';

import { runCommand } from "./parseCommand.js";
import getAppArgs from "./utils/ArgsParser.js";
import AppContext from "./core/Context.js";


class App {
  #context;
  #readline;

  constructor(ctx) {
    this.#context = ctx;
  }

	init() {
    const args = getAppArgs(process.argv, "username");
    this.#context.setUser(args || "anonimus user");
    this.#readline = readline.createInterface({ input, output });

    return this;
	}

  run() {
    this.#sayHello();
    this.#readline.on("line", (input) => {
      this.#printCurrentDir();
      runCommand(input, this.#context);
      this.#printCurrentDir();
    });

    process.on("exit", () => {
      this.#readline.close();
      this.#sayGoodBye();
      process.exit(0);
    });
  }

  #sayHello() {
    if(!this.#readline) {
      return;
    }

    this.#readline.output.write(`Welcome to the File Manager, ${this.#context.getUserName()}!${EOL}`);
  }

  #printCurrentDir() {
    this.#readline.output.write(`You are currently in ${process.cwd()}\n`);
  }

  #sayGoodBye() {
    if(!this.#readline) {
      return;
    }
    
    this.#readline.output.write(`Thank you for using File Manager, ${this.#context.getUserName()}, goodbye!\n`);
  }
}

const ctx = new AppContext();
const app = new App(ctx);

app
  .init()
  .run();

