import { Avatar, Box, Flex, Icon, Text, Textarea } from '@chakra-ui/react';
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import React, { useState } from 'react';
//import Message from './Message';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLike, removeLike } from '../../actions/post';

function Post({
  addLike,
  removeLike,
  auth,
  post: { _id, text, user, name, code, avatar, likes, comments, date }
}) {
  const [show, setShow] = useState(false);

  const currentLike = () => (
    likes.map(like => like.user === auth.user._id ? 'teal' : '')
  );

  return (
    <div class='post'>
      <Box
        mb="10px"
        w="900px"
        pl="20px"
        pt="20px"
        pb="30px"
        ml="35%"
        mt="10%"
        boxShadow='lg'
        borderRadius="lg"
      >
        <Flex display='flex' alignItems='center'>
          <Avatar src={avatar}></Avatar>
          <Text ml={5}>{name}</Text>
        </Flex>
        <Text ml='70px' mt={5}>
          {text}
        </Text>
        <Textarea width='750px' height='420px' readOnly resize='none' mt={5} ml='70px'>
          {code}
        </Textarea>
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
              <Icon as={FaRegThumbsUp} w={5}
                h={5} id='like' cursor='pointer' color={currentLike} onClick={(e) => addLike(_id)} />
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
              <Icon
                as={FaRegComment}
                ml={5}
                w={5}
                h={5}
                cursor='pointer'
                // onClick={(e) => {
                //   e.preventDefault();
                //   setShow(!show);
                //   const showMessage = { show };
                //   fetch(`http://localhost:8000/post/${values.id}`, {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(showMessage)
                //   }).then(() => {
                //     console.log('Data Added');
                //   });
                // }}
              />
            </Box>
          </Box>
          <Text fontSize={14}>{formatDate(date)}</Text>
        </Flex>

        {/* {show && <Message value={_id} />}
          {comments.map((cmt) => {
            if (!show) {
              return;
            }
            return (
              <div key={cmt.id}>
                <div
                  className='comments-preview'
                  style={{ marginBottom: '30px', marginTop: '10px' }}
                >
                  <Flex display='flex' ml='70px'>
                    <Avatar src='https://i.ibb.co/Xyh9k50/1.jpg'></Avatar>
                    <Text ml={5}>
                      Yashraj More<Text fontSize='12px'>8:00pm</Text>
                    </Text>
                  </Flex>
                  <Text ml='135px'>{cmt.message}</Text>
                  <Flex display='flex' ml='135px' mt={3}>
                    <Icon as={FaRegThumbsUp} cursor='pointer'></Icon>
                    <Icon as={FaRegThumbsDown} cursor='pointer' ml={5}></Icon>
                  </Flex>
                </div>
              </div>
            );
          })} */}
      </Box>
    </div>
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
