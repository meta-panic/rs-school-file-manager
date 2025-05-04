import path from "node:path";
import { createReadStream } from "fs";

import { ERRORS } from "../../consts.js";


export async function cat({ args, logger }) {
  return new Promise((resolve, reject) => {
    if (args.length != 1) {
      throw new Error(ERRORS.INVALID_INPUT,
        { cause: `cat expects only 1 argument, got ${args.length}`}
      );
    }

    const filePath = path.resolve(args[0]);
    const readable = createReadStream(filePath, { encoding: "utf8" });

    readable.on("data", (chunk) => {
      logger.printLine(chunk);
    });

    readable.on("error", (error) => {
      reject(error);
    });

    readable.on("end", () => {
      resolve();
    });
  });
}

