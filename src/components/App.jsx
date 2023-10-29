import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Contactlist } from './ContactList/ContactList';
import { SearchFilter } from './SearchFilter/SearchFilter';

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  addContact = newContact => {
    const { contacts } = this.state;
    const { name, number } = newContact;
    const isExist = this.isInPhonebook(name);
    if (isExist) {
      alert(`${newContact.name} Is already in contacts.`);
      return;
    }
    const contact = {
      name: name,
      id: nanoid(),
      number: number,
    };
    this.setState({ contacts: [...contacts, contact] });
  };

  deleteContact = e => {
    const { contacts } = this.state;
    const id = e.target.closest('li').id;
    const contactsAfterDelete = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: contactsAfterDelete });
  };

  searchContact = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  isInPhonebook = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { filter } = this.state;
    return (
      <div className="container">
        <h1 className="phonebookTitle">Phonebook</h1>
        <ContactForm onAddContact={this.addContact}></ContactForm>
        <h2 className="contactsTitle">Contacts</h2>
        {this.state.contacts.length !== 0 && (
          <Contactlist
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          ></Contactlist>
        )}
        {this.state.contacts.length > 1 && (
          <SearchFilter
            filter={filter}
            onHandleChange={this.searchContact}
          ></SearchFilter>
        )}
      </div>
    );
  }
}
