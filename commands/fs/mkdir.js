import { mkdir as fsMkdir } from "fs/promises";

import { ERRORS } from "../../consts.js";
import { doFileOrFolderExist } from "../utils.js";


export async function mkdir({ args }) {
  if (args.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `mkdir expects only 1 argument, got ${args.length}`}
    );
  }

  const folderName = args[0];
  if(await doFileOrFolderExist(folderName)) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `a folder or file with the name '${folderName}' already exists`}
    );
  }

  await fsMkdir(folderName);
}

