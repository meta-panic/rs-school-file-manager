export function help(logger) {
  logger.writeLine("Welcome to the File Manager! 👋");
  logger.writeLine("You can use the following commands:");
  logger.writeLine("  up                         Go up one directory level");
  logger.writeLine("  cd <path>                  Change current directory to <path>");
  logger.writeLine("  ls                         List contents of the current directory");
  logger.writeLine("  cat <path>                 Read and print the content of the file at <path>");
  logger.writeLine("  add <filename>             Create an empty file named <filename>");
  logger.writeLine("  rn <path> <newFilename>    Rename file at <path> to <newFilename>");
  logger.writeLine("  cp <path> <destination>    Copy file from <path> to <destination>");
  logger.writeLine("  mv <path> <destination>    Move file from <path> to <destination>");
  logger.writeLine("  rm <path>                  Remove (delete) the file at <path>");
  logger.writeLine("");
  logger.writeLine("  os --EOL                   Get the OS-specific End-Of-Line marker");
  logger.writeLine("  os --cpus                  Get information about CPUs");
  logger.writeLine("  os --homedir               Get home directory path");
  logger.writeLine("  os --username              Get current system user name");
  logger.writeLine("  os --architecture          Get CPU architecture");
  logger.writeLine("");
  logger.writeLine("  hash <path>                Calculate SHA256 hash of the file at <path>");
  logger.writeLine("  compress <path> <dest>     Compress <path> to <dest> using Brotli");
  logger.writeLine("  decompress <path> <dest>   Decompress <path> to <dest> using Brotli");
  logger.writeLine("");
  logger.writeLine("  help                       Show this help message");
  logger.writeLine("  exit                       Exit the application");
}

