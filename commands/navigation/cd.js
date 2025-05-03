import path from 'node:path';
import fs from 'node:fs';

import { isAFolderDeeperThenB, arePathsEqual } from "./utils.js";

export function cd({ ctx, args }) {
  if (args.length != 1) {
    throw new Error("FS error",
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
      throw new Error("FS error during cd", { cause: "you are probably trying to move out of you home directory. It is forbidden." });
    }
  } catch (error) {
    throw error;
  }
}

