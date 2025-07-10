import { TEMP_DIR, UPLOADS_DIR } from './constants/constants.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNotExists(TEMP_DIR);
  await createDirIfNotExists(UPLOADS_DIR);
};
bootstrap();
