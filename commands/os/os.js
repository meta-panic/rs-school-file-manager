import os from 'node:os';

import { ERRORS } from "../../consts.js";


export function osCommand({ keys, logger }) {
  if (keys.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `osCommand expects only 1 key, got ${keys.length}`}
    );
  }

  switch(keys[0]) {
    case "--EOL": {  
      const eolSymbol = os.EOL === "\\n" ? "\\n" : "\\r\\n";
      logger.printLine(`End of Line: ${eolSymbol}`);
      break;
    }
    case "--cpus": {
      const cpuInfo = os.cpus().map((cpu, index) => `CPU ${index}: ${JSON.stringify(cpu, null, 2)}`).join('\n');
      logger.printLine(`CPU Information:\n${cpuInfo}`);
      break;
    }
    case "--homedir": {  
      logger.printLine(`Home Directory: ${os.homedir()}`);
      break;
    }
    case "--username": {
      logger.printLine(`Username: ${os.userInfo().username}`);
      break;
    }
    case "--architecture": {
      logger.printLine(`Architecture: ${os.arch()}`);
      break;
    }
    default: {
      throw new Error(ERRORS.INVALID_INPUT, { cause: `the key '${keys[0]}' is unrecognized` });
    }
  }
}

