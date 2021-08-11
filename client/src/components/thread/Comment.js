import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';

const Comment = ({ postId, comment: { _id, text, name, avatar, user, date } }) => {
  return (
    <Box mb='30px' mt='10px' ml='35%' w='900px'>
      <Flex display='flex' ml={10} alignItems='center'>
        <Avatar src={avatar}></Avatar>
        <Text ml={5}>{name}</Text>
        <Text fontSize='12px' ml='auto'>
          {formatDate(date)}
        </Text>
      </Flex>
      <Text ml='109px'>{text}</Text>
      <Flex display='flex' ml='110px' mt={3}>
        <Icon as={FaRegThumbsUp} cursor='pointer'></Icon>
        <Icon as={FaRegThumbsDown} cursor='pointer' ml={5}></Icon>
      </Flex>
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired
};

export default Comment;
