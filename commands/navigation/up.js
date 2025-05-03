import { isAFolderDeeperThenB } from "./utils.js";

import { ERRORS } from '../../consts.js';


export function up({ ctx }) {
  try {
    if (isAFolderDeeperThenB({ aFolder: process.cwd(), bFolder: ctx.getHomeDirectory() })) {
      process.chdir("..");
    }
  } catch (error) {
    throw error;
  }
}
