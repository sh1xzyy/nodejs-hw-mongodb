import { Router } from "express";
import { addContactController, deleteContactByIdController, getContactByIdController, getContactsController, patchContactByIdController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post('/', ctrlWrapper(addContactController));
contactsRouter.patch('/:contactId', ctrlWrapper(patchContactByIdController));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));