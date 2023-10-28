import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './Button/Button';
import { fetch } from './Api/Api';
import { StyledApp } from './App.styled';
import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: null,
    query: null,
    search: null,
    pictures: null,
    loading: false,
  };

  notifyNoResultFound = error =>
    toast.error(`${error}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  componentDidUpdate = async (_, prevState) => {
    const { page, search } = this.state;
    if (page !== prevState.page || search !== prevState.search) {
      try {
        this.setState({ loading: true });
        const { data } = await fetch(search, page);

        if (data.total === 0) {
          throw new Error('No results found');
        }

        this.setState(prevState =>
          prevState.pictures
            ? {
                query: data.totalHits,
                pictures: [...prevState.pictures, ...data.hits],
              }
            : { query: data.totalHits, pictures: [...data.hits] }
        );
      } catch (error) {
        this.setState({ pictures: null, page: null, query: null });
        this.notifyNoResultFound(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  onSubmit = data => {
    this.setState({ search: data.search, page: 1 });
  };

  onLoadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, pictures, query, page } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        {!loading && <ImageGallery pictures={pictures}></ImageGallery>}
        {loading && <Loader />}

        {page < query / 12 && !loading && (
          <LoadMoreBtn onLoadMoreHandler={this.onLoadMoreHandler} />
        )}
        <ToastContainer />
      </StyledApp>
    );
  }
}
