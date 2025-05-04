import * as fs from 'node:fs/promises'

import { ERRORS } from "../../consts.js";

export async function rm({ args }) {
  if (args.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `rm expects only 1 argument1, got ${args.length}`}
    );
  }

  const [ filePath ] = args;

  await fs.rm(filePath); 
}

