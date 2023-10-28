import { StyledLoadMoreBtn } from './Button.styled';

export const LoadMoreBtn = ({ onLoadMoreHandler }) => {
  return (
    <StyledLoadMoreBtn onClick={onLoadMoreHandler}>LoadMore</StyledLoadMoreBtn>
  );
};
