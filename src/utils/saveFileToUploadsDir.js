import { rename } from 'node:fs/promises';
import { join } from 'node:path';
import { UPLOADS_DIR } from '../constants/constants.js';

export const saveFileToUploadsDir = (file) => {
  const { path: oldPath, filename } = file;
  const newPath = join(UPLOADS_DIR, filename);
  rename(oldPath, newPath);
  return filename;
};
