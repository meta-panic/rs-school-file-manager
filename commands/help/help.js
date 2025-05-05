export function help({ logger }) {
  try {
    logger.printLine("Welcome to the File Manager! 👋");
    logger.printLine("You can use the following commands:");
    logger.printLine("  up                         Go up one directory level");
    logger.printLine("  cd <path>                  Change current directory to <path>");
    logger.printLine("  ls                         List contents of the current directory");
    logger.printLine("  cat <path>                 Read and print the content of the file at <path>");
    logger.printLine("  add <filename>             Create an empty file named <filename>");
    logger.printLine("  rn <path> <newFilename>    Rename file at <path> to <newFilename>");
    logger.printLine("  cp <path> <destination>    Copy file from <path> to <destination>");
    logger.printLine("  mv <path> <destination>    Move file from <path> to <destination>");
    logger.printLine("  mkdir <newDirectoryName>   Create new directory in current working directory");
    logger.printLine("  rm <path>                  Remove (delete) the file at <path>");
    logger.printLine("");
    logger.printLine("  os --EOL                   Get the OS-specific End-Of-Line marker");
    logger.printLine("  os --cpus                  Get information about CPUs");
    logger.printLine("  os --homedir               Get home directory path");
    logger.printLine("  os --username              Get current system user name");
    logger.printLine("  os --architecture          Get CPU architecture");
    logger.printLine("");
    logger.printLine("  hash <path>                Calculate SHA256 hash of the file at <path>");
    logger.printLine("  compress <path> <dest>     Compress <path> to <dest> using Brotli");
    logger.printLine("  decompress <path> <dest>   Decompress <path> to <dest> using Brotli");
    logger.printLine("");
    logger.printLine("  .help                       Show this help message");
    logger.printLine("  .exit                       Exit the application");
  } catch (error) {
    throw new Error(ERRORS.OPERATION_FAILED, { cause: error });
  }
}

