import css from './ContactList.module.css';

export const Contactlist = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} id={id} className={css.contactList__item}>
          {name}: {number}
          <button
            type="button"
            className={css.contactList__button}
            onClick={onDeleteContact}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};