import { Box, Heading, Text, Image } from '@chakra-ui/react';
import Navbar from './Navbar';

function Landing() {
  return (
    <div className='home'>
      <Navbar />
      <Box mt={['25%', '10', '40', '17%']} ml={['0', '0', '2', '10', '20']}>
        <Heading
          fontFamily='Ubuntu'
          fontWeight='bold'
          textAlign={['center', 'center', 'left', 'left']}
          fontSize={['30px', '30px', '35px', '55px']}
          mb={5}
        >
          Where Every<br></br>Programmer Gets His<br></br>Problems Solved
        </Heading>
        <Text
          fontFamily='Ubuntu'
          color='#38B2AC'
          fontWeight='bold'
          textAlign={['center', 'center', 'left', 'left']}
          fontSize={['18px', '18px', '18px', '24px']}
        >
          "Share your code, Connect with others instantly"
        </Text>
      </Box>
      <Image
        src='https://i.ibb.co/d66fXp9/Programmer.gif'
        width={['null', 'null', '360px', '400px', '500px']}
        ml={['null', 'null', '410px', '600px', '940px']}
        mt={['null', 'null', '-60', '-80', '-360']}
      ></Image>
    </div>
  );
}

export default Landing;
