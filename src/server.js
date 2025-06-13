import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { contactsRouter } from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/contacts", contactsRouter)

  app.use(errorHandler);
  app.use(notFoundHandler);

  const PORT = getEnvVar("PORT")

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
