import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import AddContact from './AddContact/AddContact';
import ContactsList from './ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import { AppStyled, Container, Head, ContactsStyled } from './App.styled';

const App = () => {
  const isFirstRender = useRef(true);
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  useEffect(() => {
    if (localStorage.getItem('localStorageContacts')) {
      const localStorageContacts = JSON.parse(
        localStorage.getItem('localStorageContacts')
      );
      setContacts(localStorageContacts);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    localStorage.setItem('localStorageContacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number }) => {
    if (contacts.find(obj => obj.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const NewContact = { name: name, id: nanoid(), number: number };
    setContacts(prevState => [...prevState, NewContact]);
  };

  const onDeleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onFilterContacts = () => {
    const arrayContacts = contacts;
    if (filter !== '') {
      return arrayContacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return arrayContacts;
  };
  return (
    <AppStyled>
      <Container>
        <Head>Phonebook</Head>
        <AddContact onAddContact={onAddContact} />
        <ContactsStyled>Contacts:</ContactsStyled>
        <ContactsFilter value={filter} onChangeFilter={onChangeFilter} />
        <ContactsList
          contacts={onFilterContacts()}
          onDelete={onDeleteContact}
        />
      </Container>
    </AppStyled>
  );
};

export default App;
