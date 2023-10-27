import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

import React, { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount = () => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts =
      JSON.parse(stringifiedContacts) ?? this.state.contacts;

    this.setState({ contacts: parsedContacts });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  handleAddContact = contactData => {
    const hasDuplicates = this.state.contacts.some(
      contact =>
        contact.name.toLocaleLowerCase() ===
        contactData.name.toLocaleLowerCase()
    );

    if (hasDuplicates) {
      alert(`${contactData.name} is already in contacts.`);
      return;
    }

    contactData.id = nanoid();
    this.setState(prevState => ({
      contacts: [contactData, ...prevState.contacts].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilterHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div
        style={{
          padding: '20px',
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter
          fliterValue={this.state.filter}
          onChangeFilterHandler={this.onChangeFilterHandler}
        />
        <ContactsList
          contacts={filteredContacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
