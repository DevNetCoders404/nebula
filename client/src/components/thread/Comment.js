import { Avatar, Box, Code, Flex, Icon, Text } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { removeComment } from '../../actions/post';

const Comment = ({
  postId,
  comment: { _id, text, code, name, avatar, user, date },
  auth,
  removeComment
}) => {
  return (
    <Box mb='30px' mt='10px' ml='35%' w='900px'>
      <Flex display='flex' ml={10} alignItems='center'>
        <Avatar src={avatar}></Avatar>
        <Text ml={5}>{name}</Text>
        {!auth.loading && user === auth.user._id && (
          <Icon as={FaTrash} cursor='pointer' ml='auto' mr={10} w={4} h={4} color='red.400' onClick={() => removeComment(postId, _id)}></Icon>
        )}
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
      <Flex display='flex' ml='110px' /*mt={3}*/>
        {/* <Icon as={FaRegThumbsUp} cursor='pointer'></Icon>
        <Icon as={FaRegThumbsDown} cursor='pointer' ml={5}></Icon> */}
        <Text fontSize='12px' ml='auto' mr={10}>
          {formatDate(date)}
        </Text>
      </Flex>
    </Box>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(Comment);
