import React, { Component } from 'react';

import { StyledOverlay, StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <StyledOverlay onClick={this.handleOverayClick}>
        <StyledModal>
          <img
            src={this.props.modalData.largeImageURL}
            alt={this.props.modalData.tags}
          />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
