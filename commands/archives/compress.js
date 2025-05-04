import { createBrotliCompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

import { ERRORS } from "../../consts.js";


export async function compress({ args, logger }) {
  if (args.length != 2) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `compress expects 2 arguments, got ${args.length}`}
    );
  }

  const readable = createReadStream(args[0]);
  const gzip = createBrotliCompress();
  const writable = createWriteStream(args[1]);


  writable.on("finish", () => {
    logger.printLine(`file ${args[0]} successfully compressed to ${args[1]}`)
  });

  await pipeline(readable, gzip, writable);
}

