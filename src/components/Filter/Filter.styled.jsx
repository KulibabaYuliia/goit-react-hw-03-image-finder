import styled from '@emotion/styled';

export const FilterWrap = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;

  label {
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-bottom: 10px;
    align-items: start;
  }

  input {
    border: 1px solid #b2b2b2;
    border-radius: 4px;
    padding: 3px;
  }

  input:focus {
    border-color: transparent;
  }
`;
