import { createHash } from "node:crypto";
import { createReadStream } from 'fs';

import { ERRORS } from "../../consts.js";


export async function hash({ args, logger }) {
  return new Promise((resolve, reject) => {
    if (args.length != 1) {
      throw new Error(ERRORS.INVALID_INPUT,
        { cause: `hash expects only 1 arg, got ${keys.length}`}
      );
    }

    const readable = createReadStream(args[0], { encoding: "utf8" });

    const hash = createHash("sha256");

    readable.on("data", (chunk) => {
        hash.update(chunk);
    });

    readable.on("end", () => {
        const hexHash = hash.digest("hex");
        logger.printLine(hexHash);
        resolve();
    });

    readable.on("error", (error) => {
      reject(error);
    });
  });
}

