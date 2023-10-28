import { LoaderWrapper } from './Loader.styled';
import { BallTriangle } from 'react-loader-spinner';

export function Loader() {
  return (
    <LoaderWrapper>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="blue"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
        marginLeft="auto"
      />
    </LoaderWrapper>
  );
}
