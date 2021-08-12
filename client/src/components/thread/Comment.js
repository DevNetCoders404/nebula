import { Avatar, Box, Code, Flex, Icon, Text } from '@chakra-ui/react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const Comment = ({ postId, comment: { _id, text, code, name, avatar, user, date } }) => {
  return (
    <Box mb='30px' mt='10px' ml='35%' w='900px'>
      <Flex display='flex' ml={10} alignItems='center'>
        <Avatar src={avatar}></Avatar>
        <Text ml={5}>{name}</Text>
      </Flex>
      <Text ml='109px'>{text}</Text>
      {code && (
        <Code
          children={code}
          whiteSpace='pre'
          w='750px'
          maxH='420px'
          overflow='auto'
          p={5}
          mt={5}
          ml='109px'
          backgroundColor='#f6f6f6'
          borderRadius='md'
        />
      )}
      <Flex display='flex' ml='110px' mt={3}>
        <Icon as={FaRegThumbsUp} cursor='pointer'></Icon>
        <Icon as={FaRegThumbsDown} cursor='pointer' ml={5}></Icon>
        <Text fontSize='12px' ml='auto' mr={10}>
          {formatDate(date)}
        </Text>
      </Flex>
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default Comment;
