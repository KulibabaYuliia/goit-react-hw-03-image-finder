import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const Picture = ({ pictureEl, openModal }) => {
  return (
    <StyledGalleryItem onClick={openModal}>
      <img src={pictureEl.webformatURL} alt={pictureEl.tags} />
    </StyledGalleryItem>
  );
};
