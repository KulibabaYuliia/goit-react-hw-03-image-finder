import {
  StyledHeader,
  StyledSearchForm,
  StyledFormButton,
  StyledFormInput,
} from './Searchbar.styled';
import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

let userSchema = yup.object().shape({
  search: yup.string(),
});

export class Searchbar extends Component {
  notifyEmtySearch = () =>
    toast.warn(`Search shouldn't be empty`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  submitHandler = (values, action) => {
    if (values.search.trim() === '') {
      this.notifyEmtySearch();
      return;
    }

    this.props.onSubmit(values);
    action.resetForm();
  };

  render() {
    return (
      <StyledHeader>
        <Formik
          initialValues={{ search: '' }}
          validationSchema={userSchema}
          onSubmit={this.submitHandler}
        >
          <StyledSearchForm>
            <StyledFormButton type="submit">
              <span>Search</span>
            </StyledFormButton>

            <StyledFormInput
              name="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage name="search" component="div" />
          </StyledSearchForm>
        </Formik>
      </StyledHeader>
    );
  }
}
