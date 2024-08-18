import fs from "fs/promises";
import path from "path";

// Define the path to the contacts.json file
const contactsPath = path.join("db", "contacts.json");

console.log(contactsPath);

// Function to list all contacts
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts file:", error);
  }
}

// Function to get a contact by ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error getting contact by ID:", error);
  }
}

// Function to remove a contact by ID
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    console.error("Error removing contact:", error);
  }
}

// Function to add a new contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(), // Simple ID generation using timestamp
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding new contact:", error);
  }
}

// Export the functions for use in other modules
export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
