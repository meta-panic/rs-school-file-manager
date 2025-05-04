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
  printLine(message = "", color) {
    if (!this.#getStream().writable) {
      console.warn("Attempted to write but readline instance is not available.");
      return;
    }

    const formattedMessage = !!color && !!colorize[color]
      ? this.#colorizeMessage(message, color)
      : message;

    this.#getStream().write(formattedMessage);
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

  /**
   * Logs errors with standard formatting and stack traces
   * @param {Error|string} error - Error instance or message
   * @param {Object} [options]
   * @param {boolean} [options.withStack=false] - Show full stack trace
   */
  printError(error, { withStack = false, withCause = true } = {}) {
    let message = this.#colorizeMessage(`ERROR: ${error.message}`, "red");

    if (withCause && error.cause) {
      message += this.#colorizeMessage(`\nCause: ${error.cause}` , "red");
    }

    if (withStack && error.stack) {
      message += `\nStack trace:\n${error.stack}`
    }

    this.#getStream().write(message);
  }

  /**
   * Print table
   * @param {Object[]} data - Array of objects to display
   * @param {Object} [options]
   * @param {string[]} [options.columns] - Ordered list of columns to display
   * @param {Object<string, string>} [options.colors] - Color per column header
   * @param {number} [options.minPadding=2] - Minimum space between columns
   */
  printTable(data, { columns, colors = {}, minPadding = 2 } = {}) {
    if (!data.length) return;

    const cols = columns || Object.keys(data[0]);
    
    const widths = cols.reduce((acc, col) => {
      acc[col] = Math.max(
        col.length,
        ...data.map(row => String(row[col] || "").length)
      );
      return acc;
    }, {});

    // Print headers
    const header = cols.map(col => {
      const text = col.padEnd(widths[col] + minPadding);
      return colors[col] ? this.#colorizeMessage(text, colors[col]) : text;
    }).join("");
    this.printLine(header);

    // Print rows
    data.forEach(row => {
      const line = cols.map(col => {
        const value = String(row[col] || "").padEnd(widths[col] + minPadding);
        return colors[col] ? this.#colorizeMessage(value, colors[col]) : value;
      }).join("");
      this.printLine(line);
    });
  }
}

const colorize = {
  red:    (text) => `\x1b[31m${text}\x1b[0m`,
  green:  (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue:   (text) => `\x1b[34m${text}\x1b[0m`,
  pink:   (text) => `\x1b[35m${text}\x1b[0m`,
};

