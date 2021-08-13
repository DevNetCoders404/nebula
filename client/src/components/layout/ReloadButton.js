import { IconButton } from '@chakra-ui/react';
import { VscRefresh } from 'react-icons/vsc';
import Loader from '../layout/Loader';

const ReloadButton = ({ getMethod, loading, postId }) => {
  return !loading ? (
    <IconButton
      icon={<VscRefresh />}
      id='dislike'
      onClick={() => (postId ? getMethod(postId) : getMethod())}
      position='fixed'
      top='13%'
      left='95%'
      cursor='pointer'
      color='teal'
      size='md'
      fontSize='20px'
      isRound
    />
  ) : (
    <Loader />
  );
};

export default ReloadButton;
