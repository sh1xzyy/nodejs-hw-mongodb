import multer from 'multer';
import { TEMP_DIR } from '../constants/constants.js';
import createHttpError from 'http-errors';
const storage = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${file.originalname}`;
    cb(null, fileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').at(-1);
  if (extension === 'exe') {
    return cb(createHttpError(400, '.exe not allow file format'));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
