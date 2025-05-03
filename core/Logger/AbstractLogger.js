export default class AbstractLogger {
  _outputStream;
  /**
   * @param {import("stream").Writable} outputStream
   */
  constructor(outputStream) {
    this._outputStream = outputStream;
  }

  /**
   * Writes a message; must be overridden by subclasses.
   * @param {string} message
   * @param {string} [color]
   */
  writeLine(message = "", color) {
    throw new Error("Method 'writeLine' must be implemented.");
  }
}

