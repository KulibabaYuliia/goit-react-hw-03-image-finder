import { StyledGallery } from './ImageGallery.styled';
import { Picture } from '../ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ pictures, openModal }) => {
  return (
    <StyledGallery>
      {pictures &&
        pictures.map(picture => {
          return (
            <Picture
              key={nanoid()}
              pictureEl={picture}
              openModal={() => openModal(picture)}
            />
          );
        })}
    </StyledGallery>
  );
};
