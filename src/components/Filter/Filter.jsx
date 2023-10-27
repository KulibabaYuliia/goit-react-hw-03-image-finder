import { FilterWrap } from './Filter.styled';

export const Filter = ({ fliterValue, onChangeFilterHandler }) => {
  return (
    <FilterWrap>
      <label>
        Find contact by name
        <input
          type="text"
          value={fliterValue}
          onChange={onChangeFilterHandler}
        />
      </label>
    </FilterWrap>
  );
};
