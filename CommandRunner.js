import * as COMMANDS from "./commands/listCommands.js";
import AbstractLogger from "./core/Logger/AbstractLogger.js";
import { ERRORS } from "./consts.js";


/**
 * Executes CLI commands based on user input
 * @param {Object} params
 * @param {string} params.input - Raw CLI input string to parse and execute
 * @param {AbstractLogger} params.logger - Configured logger instance
 * @returns {Promise<void>}
 * 
 */
export async function runCommand({ input: line, logger }) {
  return new Promise(async (resolve) => {
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
        case ".help": {
          COMMANDS.help({ logger });
          break;
        }
        case "up": {
          COMMANDS.cd({ args: [".."] });
          break;
        }
        case "cd": {
          COMMANDS.cd({ args: parsed.args });
          break;
        }
        case "ls": {
          COMMANDS.ls({ logger });
          break;
        }
        case "cat": {
          await COMMANDS.cat({ logger, args: parsed.args });
          break;
        }
        case "add": {
          await COMMANDS.add({ args: parsed.args });
          break;
        }
        case "mkdir": {
          await COMMANDS.mkdir({ args: parsed.args });
          break;
        }
        case "rn": {
          await COMMANDS.rename({ args: parsed.args });
          break;
        }
        case "cp": {
          await COMMANDS.copy({ args: parsed.args });
          break;
        }
        case "mv": {
          await COMMANDS.mv({ args: parsed.args });
          break;
        }
        case "rm": {
          await COMMANDS.rm({ args: parsed.args });
          break;
        }
        case "os": {
          COMMANDS.osCommand({ keys: parsed.keys, logger });
          break;
        }
        case "hash": {
          await COMMANDS.hash({ args: parsed.args, logger });
          break;
        }
        case "compress": {
          await COMMANDS.archives({ args: parsed.args, logger, flag: "compress" });
          break;
        }
        case "decompress": {
          await COMMANDS.archives({ args: parsed.args, logger, flag: "decompress" });
          break;
        }
        default: {
          throw new Error(ERRORS.INVALID_INPUT, { cause: "the command does not exist" });
        }
      }
    } catch(error) {
      if (Object.values(ERRORS).includes(error?.message)) {
        logger.printError(error);
      } else {
        logger.printError(new Error(ERRORS.OPERATION_FAILED, { cause: error }))
      }
    }
    resolve();
  });
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

  const regex = /"([^"]*)"|[^\s"]+/g;
  const parts = [];
  let match;
  while ((match = regex.exec(trimmedLine)) !== null) {
    parts.push(match[1] !== undefined ? match[1] : match[0]);
  }

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

