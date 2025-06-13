import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload); 

export const updateContactById = async (id, payload, options = {}) => {
  const data = await ContactCollection.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if(!data || !data.value) return null;

  const isNew = data?.lastErrorObject?.upserted;

  return {
    isNew,
    data: data?.value
  };
};

export const deleteContactById = id => ContactCollection.findByIdAndDelete(id);
