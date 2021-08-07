import { Avatar, Button, Flex, Textarea, Text, Icon } from '@chakra-ui/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

function Message({ value, comment }) {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  function handleSubmit() {
    setShow(!show);
  }
  return (
    <div>
      <Flex width='60%' pb='30px' display='flex' ml='150px' justifyContent='center'>
        <Avatar ml='5px' mt={10} src='https://i.ibb.co/qBmhLK4/12.jpg' />
        <form action='#'>
          <Textarea
            mt={10}
            ml='20px'
            mb={5}
            required
            width='750px'
            resize='none'
            borderRadius='5px'
            placeholder='Type Message'
            onChange={(e) => setMessage(e.target.value)}
          ></Textarea>
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
          <Flex display='none' ml='20px' id='add code button'>
            <Button style={{ background: '#38B2AC' }} color='white'>
              Upload File
            </Button>
            <Button style={{ background: '#38B2AC' }} color='white' ml={5}>
              Open Editor
            </Button>
          </Flex>
          <Button
            mt='-70px'
            ml='700px'
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();

              const comments = { message };
              fetch(`http://localhost:8000/post/${value}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(comments)
              }).then(() => {
                console.log('Data Added');
              });
            }}
            style={{ background: '#38B2AC' }}
            color='white'
          >
            Share
          </Button>
        </form>
      </Flex>
      {console.log(comment)}
    </div>
  );
}

export default Message;
