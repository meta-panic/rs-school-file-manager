import { Writable } from "node:stream";
import { EOL } from "node:os";


export default class AbstractLogger {
  /** 
   * @protected
   * @type {import("stream").Writable} 
   */
  _outputStream;

  /**
   * Creates a base logger instance
   * @param {import("stream").Writable} outputStream - Write stream for log output
   * @abstract
   */
  constructor(outputStream) {
    if (new.target === AbstractLogger) {
      throw new Error("Cannot instantiate AbstractLogger directly");
    }

    const output = new Writable({
      write(chunk, _, callback) {
        let str = Buffer.isBuffer(chunk) ? chunk.toString() : chunk;

        if (!str.endsWith(EOL)) {
          str += EOL;
        }

        outputStream.write(str);
        callback();
      }
    });

    this._outputStream = output;
  }

  /**
   * Writes a message to the output stream with optional formatting
   * @abstract
   * @param {string} [message=""] - The message to log
   * @param {string} [color] - Optional color name for terminal formatting
   * @throws {Error} Must be implemented by concrete subclasses
   */
  printLine(message = "", color) {
    throw new Error("Method 'writeLine' must be implemented.");
  }

  
  /**
   * Logs errors with standard formatting and stack traces
   * @param {Error|string} error - Error instance or message
   * @param {Object} [options]
   * @param {boolean} [options.withStack=false] - Show full stack trace
   */
  printError(error, { withStack = false } = {}) {
    throw new Error("Method 'writeLine' must be implemented.");
  }

}


