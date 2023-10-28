import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const Picture = ({ pictureEl }) => {
  return (
    <StyledGalleryItem>
      <img src={pictureEl.webformatURL} alt={pictureEl.tags} />
    </StyledGalleryItem>
  );
};
