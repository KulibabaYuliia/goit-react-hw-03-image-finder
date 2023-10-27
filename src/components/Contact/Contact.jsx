import { ContactWrap } from './Contact.styled';

export const Contact = ({ contact, handleDeleteContact }) => {
  return (
    <ContactWrap>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button onClick={() => handleDeleteContact(contact.id)}>delete</button>
    </ContactWrap>
  );
};
