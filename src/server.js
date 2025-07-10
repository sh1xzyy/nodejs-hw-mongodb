import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOADS_DIR } from './constants/constants.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static('uploads'));
  app.use(cookieParser());

  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);
  app.use('/uploads', express.static(UPLOADS_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = getEnvVar('PORT');

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
