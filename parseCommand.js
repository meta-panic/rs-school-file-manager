import * as COMMANDS from "./commands/listCommands.js";

export function runCommand(command, ctx) {
  console.log("command - ", command);
  console.log("ctx - ", ctx.getUserName());


  try {
    switch(command) {
      case ".exit": {
        console.log("sayGoodBye")
  
        process.exit(0);
      }
      case "up": {
        COMMANDS.up(ctx);
        break;
      }
    }
  } catch(error) {
    console.log(error)
  }
}

function parseCommand(command) {
  
}