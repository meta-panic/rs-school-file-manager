import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { resolve, basename, parse } from "path";

import { ERRORS } from "../../consts.js";

const EXT = "br";

export async function archives({ args, logger, flag }) {
  if (args.length != 2) {
    throw new Error(ERRORS.INVALID_INPUT,
      { cause: `operation expects 2 arguments, got ${args.length}`}
    );
  }

  const filePath = resolve(process.cwd(), args[0]);
  const dirPath = resolve(process.cwd(), args[1]);
  const baseName = basename(filePath);
  const fileName = parse(baseName).name;

  const needCompress = flag === "compress";
  
  const newFileName = needCompress ? `${baseName}.${EXT}` : fileName;
  const readable = createReadStream(args[0]);
  const brotli = needCompress ? createBrotliCompress() : createBrotliDecompress();
  const writable = createWriteStream(resolve(dirPath, newFileName), { flags: "wx" });


  writable.on("finish", () => {
    logger.printLine(`file ${args[0]} successfully ${flag}ed to ${args[1]}`)
  });

  await pipeline(readable, brotli, writable);
}

