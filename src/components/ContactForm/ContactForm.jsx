import { FormWrap, StyledField } from './ContactForm.styled';
import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

const phoneRegExp = /[0-9]{3}-[0-9]{2}-[0-9]{2}/;
const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

let userSchema = yup.object().shape({
  name: yup
    .string('Name is not valid')
    .matches(nameRegExp, 'Name is not valid')
    .required(),
  number: yup
    .string('Phone number is not valid')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
});

export class ContactForm extends Component {
  submitHandler = (values, action) => {
    console.log(values);
    this.props.handleAddContact(values);
    action.resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={userSchema}
        onSubmit={this.submitHandler}
      >
        <FormWrap>
          <label>
            Name
            <StyledField type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </label>
          <label>
            Number
            <StyledField type="tel" name="number" placeholder="123-45-67" />
            <ErrorMessage name="number" component="div" />
          </label>
          <button type="submit">Add contact</button>
        </FormWrap>
      </Formik>
    );
  }
}
