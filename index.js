import process from "node:process";

import getAppArgs from "./utils/ArgsParser.js";
import AppContext from "./core/Context.js";
import CliHandler from "./core/CliHandler.js";
import CliLogger from "./core/Logger/CliLogger.js";
import { runCommand } from "./CommandRunner.js";


class App {
  #context;
  #cliHandler;
  #logger;

  /**
   * @param {Object} dependencies 
   * @param {AppContext} dependencies.ctx - Application context/store
   * @param {CliHandler} dependencies.cliHandler - CLI input handler
   * @param {CliLogger} dependencies.logger - Configured logger instance
   */
  constructor({ ctx, cliHandler, logger }) {
    this.#context = ctx;
    this.#cliHandler = cliHandler;
    this.#logger = logger;
  }

	/**
   * @returns {App} Returns self for chaining
   */
	init() {
    const args = getAppArgs(process.argv, "username");
    this.#context.setUser(args || "anonimus user");

    return this;
	}

  /**
   * @returns {void}
   */
  run() {
    this.#sayHello();
    this.#printCurrentDir();
    this.#cliHandler.prompt();

    this.#cliHandler.on("line", async (input) => {
      await runCommand({input, logger: this.#logger });
      this.#printCurrentDir();
      this.#cliHandler.prompt();
    });

    process.on("exit", () => {
      this.#sayGoodBye();
    });

    process.on("SIGINT", () => {
      process.exit(0);
    });
  }

  /**
   * Displays welcome message with current user
   * @private
   */
  #sayHello() {
    this.#logger
      .printLine(`Welcome to the File Manager, ${this.#context.getUserName()}!`, "green");
  }

  /**
   * Prints current working directory to CLI
   * @private
   */
  #printCurrentDir() {
    this.#logger.printLine(`You are currently in ${process.cwd()}`, "pink");
  }

  /**
   * Displays farewell message on application exit
   * @private
   */
  #sayGoodBye() {
    this.#logger
      .printLine(`Thank you for using File Manager, ${this.#context.getUserName()}, goodbye!`, "green");
  }
}


const ctx = new AppContext();
const logger = new CliLogger(process.stdout);
const cliHandler = new CliHandler();
const app = new App({
  ctx, cliHandler, logger
});

app
  .init()
  .run();

