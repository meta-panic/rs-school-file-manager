import { isAFolderDeeperThenB } from "./utils.js";

export function up(ctx) {
  ctx.getHomeDirectory();
  
  if (isAFolderDeeperThenB(
    {
      aFolder: process.cwd(),
      bFolder: ctx.getHomeDirectory()
    })) {
    process.chdir("..");
  }
}
