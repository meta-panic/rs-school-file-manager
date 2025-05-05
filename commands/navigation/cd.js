import path from "node:path";

import { ERRORS } from "../../consts.js";


export function cd({ args }) {
  if (args.length != 1) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `cd expects only 1 argument, got ${args.length}`}
    );
  }

  process.chdir(args[0]);
}

