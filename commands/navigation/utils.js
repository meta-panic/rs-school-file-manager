import path from 'path';

export function isAFolderDeeperThenB({ aFolder, bFolder }) {
  const relativePath = path.relative(bFolder, aFolder);

  const isDeeper = relativePath
    && !relativePath.startsWith('..')
    && !path.isAbsolute(relativePath);

  return isDeeper;
}