import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadsDir } from './saveFileToUploadsDir.js';

const enableCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

export const handlePhotoUpload = async (file) => {
  if (!file) return undefined;

  if (enableCloudinary) {
    return await saveFileToCloudinary(file);
  }
  return saveFileToUploadsDir(file);
};
