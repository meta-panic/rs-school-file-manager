import { createReadStream, createWriteStream }from "node:fs";
import { pipeline } from 'stream/promises';

import { ERRORS } from "../../consts.js";
import { doFileOrFolderExist } from "../utils.js";
import path from "node:path";


export async function copy({ args }) {
  if (args.length != 2) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `copy expects only 2 arguments, got ${args.length}`}
    );
  }

  const [ filePath, newPath ] = args;

  if(!(await doFileOrFolderExist(filePath))) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `a file with the name '${filePath}' does not exists`}
    );
  }

  if(!(await doFileOrFolderExist(newPath))) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `a newPath '${newPath}' does not exists`}
    );
  }
  const dir = path.join(newPath, path.basename(filePath))

  const readable = createReadStream(filePath, { encoding: "utf8" });
  const writable = createWriteStream(dir, { encoding: "utf8" });

  await pipeline(readable, writable);
}

