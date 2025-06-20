import { sortList } from '../constants/index.js';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = ContactCollection.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  if (typeof filters.isFavourite === 'boolean') {
    query.where('isFavourite').equals(filters.isFavourite);
  }
  if (filters.contactType) {
    query.where('contactType').equals(filters.contactType);
  }

  console.log(filters.isFavourite);

  const items = await query;
  const totalItems = await ContactCollection.countDocuments();

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data: items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContactById = async (id, payload, options = {}) => {
  const data = await ContactCollection.findByIdAndUpdate(id, payload, options);

  return data;
};

export const deleteContactById = (id) =>
  ContactCollection.findByIdAndDelete(id);
