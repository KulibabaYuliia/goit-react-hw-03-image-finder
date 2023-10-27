import { ContactsListWrap } from './ContactsList.styled';
import { Contact } from '../Contact/Contact';

export const ContactsList = ({ handleDeleteContact, contacts }) => {
  return (
    <ContactsListWrap>
      {contacts.map(contact => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            handleDeleteContact={handleDeleteContact}
          />
        );
      })}
    </ContactsListWrap>
  );
};
