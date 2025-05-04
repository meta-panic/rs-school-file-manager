import { rename as fsRename } from "fs/promises";
import path from "node:path";

import { ERRORS } from "../../consts.js";
import { doFileOrFolderExist } from "../utils.js";


export async function rename({ args }) {
  if (args.length != 2) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `rename expects only 2 arguments, got ${args.length}`}
    );
  }

  const [ oldName, newName ] = args;

  if(await doFileOrFolderExist(newName)) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `a file with the name '${newName}' already exists`}
    );
  }

  if(!(await doFileOrFolderExist(oldName))) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `a file with the name '${oldName}' does not exists`}
    );
  }

  await fsRename(oldName, path.join(path.dirname(oldName), newName));
}

