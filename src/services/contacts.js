import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContactById = async (id, payload, options = {}) => {
  const data = await ContactCollection.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  return data;
};

export const deleteContactById = (id) =>
  ContactCollection.findByIdAndDelete(id);
