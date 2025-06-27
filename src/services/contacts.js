import { sortList } from '../constants/constants.js';
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

  if (filters.userId) {
    query.where('userId').equals(filters.userId);
  }
  if (typeof filters.isFavourite === 'boolean') {
    query.where('isFavourite').equals(filters.isFavourite);
  }
  if (filters.contactType) {
    query.where('contactType').equals(filters.contactType);
  }

  const items = await query;

  const countQuery = ContactCollection.find();

  if (typeof filters.isFavourite === 'boolean') {
    countQuery.where('isFavourite').equals(filters.isFavourite);
  }
  if (filters.contactType) {
    countQuery.where('contactType').equals(filters.contactType);
  }

  const totalItems = await countQuery.countDocuments();

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data: items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContact = (query) => ContactCollection.findOne(query);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (query, payload, options = {}) => {
  const data = await ContactCollection.findOneAndUpdate(
    query,
    payload,
    options,
  );

  return data;
};

export const deleteContact = (query) =>
  ContactCollection.findOneAndDelete(query);
