import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
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
    isOpenModal: false,
    modalData: null,
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

  fetchPictures = async (searchName, currentPage) => {
    try {
      this.setState({ loading: true });
      const { data } = await fetch(searchName, currentPage);

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
      this.setState({ pictures: null, query: null });
      this.notifyNoResultFound(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, search } = this.state;
    if (page !== prevState.page || search !== prevState.search) {
      this.fetchPictures(search, page);
    }
  };

  onSubmit = data => {
    this.setState({ search: data.search, page: 1, pictures: null });
  };

  onLoadMoreHandler = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = someDataToModal => {
    this.setState({
      isOpenModal: true,
      modalData: someDataToModal,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { loading, pictures, query, page } = this.state;

    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>

        <ImageGallery
          pictures={pictures}
          openModal={this.openModal}
        ></ImageGallery>

        {loading && <Loader />}

        {page < query / 12 && !loading && (
          <LoadMoreBtn onLoadMoreHandler={this.onLoadMoreHandler} />
        )}

        <ToastContainer />
        {this.state.isOpenModal && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </StyledApp>
    );
  }
}
