import * as fs from "node:fs/promises";

import { ERRORS } from "../../consts.js";
import { doFileOrFolderExist } from "../utils.js";

export async function add({ args }) {
  if (args.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `add expects only 1 argument, got ${args.length}`}
    );
  }

  const filePath = args[0];
  if(await doFileOrFolderExist(filePath)) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `file with the name '${filePath}' already exists`}
    );
  }

  await fs.writeFile(filePath, "");
}

