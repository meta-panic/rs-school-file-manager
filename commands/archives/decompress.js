import { createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

import { ERRORS } from "../../consts.js";


export async function decompress({ args, logger }) {
  if (args.length != 2) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `decompress expects 2 argument2, got ${args.length}`}
    );
  }

  const readable = createReadStream(args[0]);
  const gzip = createBrotliDecompress();
  const writable = createWriteStream(args[1]);

  
  writable.on("finish", () => {
    logger.printLine(`archive ${args[0]} successfully uncompressed to ${args[1]}`)
  });

  await pipeline(readable, gzip, writable);
}

