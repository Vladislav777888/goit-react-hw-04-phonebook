import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Box } from './Box';
import useLocalStorage from '../huks/useLocalStorage';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', defaultContacts);
  const [filter, setFilter] = useState('');

  const addContacts = data => {
    const { contactName: name, contactNumber: number } = data;

    const contact = {
      id: nanoid(),
      name: name,
      number: number.toString(),
    };

    const contactsInclude = contacts.some(el => el.name === name);

    if (contactsInclude) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    if (filter.length === 0) {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Box px={20} pt={10}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} contacts={contacts} />

      {contacts.length !== 0 && (
        <Box mt={20}>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList contacts={visibleContacts} onDelete={deleteContact} />
        </Box>
      )}
    </Box>
  );
}
