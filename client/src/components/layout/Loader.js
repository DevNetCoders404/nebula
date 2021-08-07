import { Center } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';

const Loader = () => {
  return (
    <Center h='100vh'>
      <Spinner
        thickness={['4px', '8px']}
        speed='0.65s'
        emptyColor='gray.200'
        color='teal.500'
        size='xl'
        w={['4rem', '6rem']}
        h={['4rem', '6rem']}
      />
    </Center>
  );
};

export default Loader;
