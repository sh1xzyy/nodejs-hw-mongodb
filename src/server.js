import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getContactById, getContacts } from './services/contacts.js';

const PORT = getEnvVar('PORT');

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();
    console.log('My Data', data);

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
      res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    });
  });

  app.use((err, req, res, next) => {
    res.status(404).json({
      message: 'Not found',
      error: err.message,
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
