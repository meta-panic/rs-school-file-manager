import * as COMMANDS from "./commands/listCommands.js";


export function runCommand({ input: line, context: ctx, logger }) {
  let command, keys, args;
  try {
    const parsed = parseCommand(line);
    command = parsed.command;
    keys = parsed.keys;
    args = parsed.args;
  }
  catch (error) {
    COMMANDS.help(logger);
    return;
  }

  try {
    switch(command) {
      case ".exit": {  
        process.exit(0);
      }
      case "up": {
        COMMANDS.up(ctx);
        break;
      }
      default: {
        COMMANDS.help(logger)
      }
    }
  } catch(error) {
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

