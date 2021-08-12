import { Avatar, Button, Flex, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../actions/post';
import { useHistory } from 'react-router-dom';
function CommentForm({ addComment, postId, auth: { user } }) {
  const [text, setText] = useState('');
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  }

  return (
    <div>
      <Flex width='900px' pb='30px' ml='35%' justifyContent='center'>
        <Avatar mt={10} src={user && user.avatar} />
        <form onSubmit={handleSubmit}>
          <Textarea
            value={text}
            mt={10}
            ml='20px'
            mb={5}
            required
            width='750px'
            resize='none'
            borderRadius='5px'
            placeholder='Type something'
            onChange={(e) => setText(e.target.value)}
          ></Textarea>
          <Flex>
            <Button
              ml='20px'
              id='add code'
              onClick={() => {
                document.getElementById('add code').style.display = 'none';
                document.getElementById('add code button').style.display = 'flex';
              }}
              style={{ background: '#38B2AC' }}
              color='white'
            >
              Add Code
            </Button>
          </Flex>
          <Flex display='none' id='add code button'>
            <Button
              style={{ background: '#38B2AC' }}
              color='white'
              ml={5}
              onClick={() => history.push({ pathname: '/editor', state: { postId } })}
            >
              Open Editor
            </Button>
            <Button
              style={{ background: '#38B2AC' }}
              color='white'
              ml={5}
              onClick={() => {
                document.getElementById('add code').style.display = 'flex';
                document.getElementById('add code button').style.display = 'none';
              }}
            >
              X
            </Button>
          </Flex>
          <Button
            type='submit'
            mt='-70px'
            ml='700px'
            style={{ background: '#38B2AC' }}
            color='white'
          >
            Post
          </Button>
        </form>
      </Flex>
    </div>
  );
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(CommentForm);
