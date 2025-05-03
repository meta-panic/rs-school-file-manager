import * as COMMANDS from "./commands/listCommands.js";
import AbstractLogger from "./core/Logger/AbstractLogger.js";
import { ERRORS } from "./consts.js";


/**
 * Executes CLI commands based on user input
 * @param {Object} params
 * @param {string} params.input - Raw CLI input string to parse and execute
 * @param {AppContext} params.context - Application state container
 * @param {AbstractLogger} params.logger - Configured logger instance
 * @returns {void}
 * 
 */
export function runCommand({ input: line, context: ctx, logger }) {
  let parsed;
  try {
    parsed = parseCommand(line);
  }
  catch (error) {
    COMMANDS.help({ logger });
    return;
  }

  try {
    switch(parsed.command) {
      case ".exit": {  
        process.exit(0);
      }
      case "up": {
        COMMANDS.up({ ctx });
        break;
      }
      case "cd": {
        COMMANDS.cd({ ctx, args: parsed.args });
        break;
      }
      default: {
        COMMANDS.help({ logger });
      }
    }
  } catch(error) {
    if (Object.values(ERRORS).includes(error.message)) {
      logger.printError(error);
    } else {
      logger.printError(new Error(ERRORS.OPERATION_FAILED, { cause: error }))
    }
  }
}


const KEYS_PREFIX = "--";
/**
 * Parses a raw command line string into a structured object.
 * 
 * @param {string} line The raw input line from the user.
 * @returns {{command: string, keys: string[], args: string[]} | null} 
 *          An object with command, keys (starting with "--"), and args,
 *          or null if the input line is empty or whitespace only.
 */
export function parseCommand(line) {
  const trimmedLine = line.trim();
  if (!trimmedLine) {
    return null;
  }

  const parts = trimmedLine.split(/\s+/); 

  const command = parts[0];
  const keys = [];
  const args = [];

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith(KEYS_PREFIX)) {
      keys.push(part);
    } else {
      args.push(part);
    }
  }

  return { command, keys, args };
}

