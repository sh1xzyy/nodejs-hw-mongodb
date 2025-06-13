import createHttpError from "http-errors";
import { addContact, deleteContactById, getContactById, getContacts, updateContactById } from "../services/contacts.js";

export const getContactsController = async(req, res) => {
     const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
};

export const getContactByIdController = async(req, res) => {
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
        message: "Successfully created a contact",
        data,
    });
};

export  const patchContactByIdController = async(req, res) => {
    const {contactId} = req.params;
    const data = await updateContactById(contactId, req.body);

    if(!data) throw createHttpError(404, "Contact not found");

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact",
        data,
    });
};

export  const deleteContactByIdController = async(req, res) => {
    const {contactId} = req.params;
    const data = await deleteContactById(contactId);

    if(!data) throw createHttpError(404, "Contact not found");

    res.status(204).json({});
};