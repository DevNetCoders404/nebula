import { Avatar, Box, Flex, Icon, Text, Textarea } from '@chakra-ui/react';
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike } from '../../actions/post';
import { Link } from 'react-router-dom';

function Post({
  addLike,
  removeLike,
  auth,
  post: { _id, text, user, name, code, avatar, likes, comments, date }
}) {
  const currentLike = () => likes.map((like) => (like.user === auth.user._id ? 'teal' : ''));

  return (
    <Box
      mb='10px'
      w='900px'
      pl='20px'
      pt='20px'
      pb='30px'
      ml='35%'
      mt='10%'
      boxShadow='lg'
      borderRadius='lg'
    >
      <Flex display='flex' alignItems='center'>
        <Avatar src={avatar}></Avatar>
        <Text ml={5}>{name}</Text>
      </Flex>
      <Text ml='70px' mt={5}>
        {text}
      </Text>
      <Textarea value={code} width='750px' height='420px' readOnly resize='none' mt={5} ml='70px' />
      <Flex
        display='flex'
        ml='70px'
        mr={16}
        mt={5}
        alignItems='baseline'
        justifyContent='space-between'
      >
        <Box w='20%' ml={2} d='flex' justifyContent='space-between'>
          <Box d='flex' alignItems='center'>
            <Icon
              as={FaRegThumbsUp}
              w={5}
              h={5}
              id='like'
              cursor='pointer'
              color={currentLike}
              onClick={(e) => addLike(_id)}
            />
            <Box as='span' ml={2}>
              {likes.length}
            </Box>

            <Icon
              as={FaRegThumbsDown}
              id='dislike'
              onClick={(e) => removeLike(_id)}
              ml={5}
              mt={1}
              cursor='pointer'
              w={5}
              h={5}
            />
          </Box>
          <Box d='flex' alignItems='center'>
            <Link to={`/post/${_id}`}>
              <Icon as={FaRegComment} ml={5} w={5} h={5} cursor='pointer' />
              <Box as='span' ml={2}>
                {comments.length}
              </Box>
            </Link>
          </Box>
        </Box>
        <Text fontSize={14}>{formatDate(date)}</Text>
      </Flex>
    </Box>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(Post);
