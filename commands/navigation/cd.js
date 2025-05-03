import path from 'node:path';

import { isAFolderDeeperThenB, arePathsEqual } from "./utils.js";
import { ERRORS } from '../../consts.js';

export function cd({ ctx, args }) {
  if (args.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `cd expects only 1 argument, got ${args.length}`}
    );
  }

  
  try {
    const targetPath = path.resolve(process.cwd(), args[0]);
    if (isAFolderDeeperThenB({ aFolder: targetPath, bFolder: ctx.getHomeDirectory()})
      || arePathsEqual({ pathA: targetPath, pathB: ctx.getHomeDirectory() }) 
  ) {
      process.chdir(args[0]);
      return;
    } else {
      throw new Error(ERRORS.OPERATION_FAILED, { cause: "you are probably trying to move out of you home directory. It is forbidden." });
    }
  } catch (error) {
    throw error;
  }
}

