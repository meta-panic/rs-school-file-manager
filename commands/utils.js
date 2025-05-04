import path from "path";
import * as fs from 'node:fs/promises'

/**
 * Determines if folder A is a subdirectory of folder B
 * @param {Object} params
 * @param {string} params.aFolder - Absolute path to first folder (must start with filesystem root)
 * @param {string} params.bFolder - Absolute path to second folder (must start with filesystem root)
 * @returns {boolean} True if:
 * - aFolder is deeper than bFolder
 * 
 * @example
 * isAFolderDeeperThenB({
 *   aFolder: '/usr/local/bin',
 *   bFolder: '/usr' 
 * }); // returns true
 * 
 * @example
 * isAFolderDeeperThenB({
 *   aFolder: '/etc',
 *   bFolder: '/var/log' 
 * }); // returns false
 */
export function isAFolderDeeperThenB({ aFolder, bFolder }) {
  const relativePath = path.relative(bFolder, aFolder);

  const isDeeper = relativePath
    && !relativePath.startsWith("..")
    && !path.isAbsolute(relativePath);

  return isDeeper;
}

/**
 * Checks if two absolute paths resolve to the same filesystem location
 * @param {Object} params
 * @param {string} params.pathA - Absolute path to first folder
 * @param {string} params.pathB - Absolute path to second folder
 * @returns {boolean} True if paths are identical after resolution
 * 
 * @example
 * arePathsEqual({
 *   pathA: '/usr/local/../bin',
 *   pathB: '/usr/bin'
 * }); // returns true
 */
export function arePathsEqual({ pathA, pathB }) {
  return path.resolve(pathA) === path.resolve(pathB);
}

/**
 * Checks if a file or folder exists at the specified path.
 * 
 * @async
 * @function doFileOrFolderExist
 * @param {string} path - The absolute path to the file or folder to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the file or folder exists, 
 *                             and false if it does not.
 * @throws {Error} Throws an error if there is an issue accessing the path (other than it not existing).
 * 
 * @example
 * doFileOrFolderExist('/path/to/file/or/folder')
 *   .then(exists => {
 *     console.log(exists); // true if exists, false if not
 *   })
 *   .catch(error => {
 *     console.error('Error checking existence:', error);
 *   });
 */
export async function doFileOrFolderExist(path) {
  try {
      await fs.access(path, fs.constants.F_OK);
      return true;
  } catch (err) {
      if (err.code === 'ENOENT') {
          return false;
      }
      throw err;
  }
}
