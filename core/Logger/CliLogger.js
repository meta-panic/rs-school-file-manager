import { EOL } from "node:os";

import AbstractLogger from "./AbstractLogger.js";


export default class CliLogger extends AbstractLogger {
  #getStream() {
    return this._outputStream;
  }

  /**
   * @param {string} [message=""] - The message to write to the output stream
   * @param {"red"|"green"|"yellow"|"blue"|"pink"} [color] - Optional color name to apply
   * @returns {void}
   */
  writeLine(message = "", color) {
    if (!this.#getStream().writable) {
      console.warn("Attempted to write but readline instance is not available.");
      return;
    }

    const formattedMessage = !!color && !!colorize[color]
      ? this.#colorizeMessage(this.#addEOL(message), color)
      : this.#addEOL(message);
    this.#getStream().write(formattedMessage);
  }

  /**
   * Ensures message ends with the OS-specific EOL sequence
   * @private
   * @param {string} message - Input message to process
   * @returns {string} Message with guaranteed EOL at end
   */
  #addEOL(message) {
    return message.endsWith(EOL) ? message : message + EOL;
  }

  /**
   * Applies ANSI color codes to the message
   * @private
   * @param {string} message - Plain text message
   * @param {"red"|"green"|"yellow"|"blue"|"pink"} color - Color name to apply
   * @returns {string} Colorized message with reset code
   */
  #colorizeMessage(message, color) {
    return colorize[color](message);
  }
}

const colorize = {
  red:    (text) => `\x1b[31m${text}\x1b[0m`,
  green:  (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue:   (text) => `\x1b[34m${text}\x1b[0m`,
  pink:   (text) => `\x1b[35m${text}\x1b[0m`
};

