import createHttpError from 'http-errors';
import {
  addContact,
  deleteContactById,
  getContactById,
  getContacts,
  updateContactById,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Contact.js';
import { parseContactsFilters } from '../utils/filters/parseContactsFilters.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactSortFields);
  const filters = parseContactsFilters(req.query);
  const data = await getContacts({ page, perPage, sortBy, sortOrder, filters });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data,
  });
};

export const patchContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContactById(contactId, req.body);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact',
    data,
  });
};

export const deleteContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await deleteContactById(contactId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(204).json({});
};
