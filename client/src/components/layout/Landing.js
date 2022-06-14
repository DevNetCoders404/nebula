import { Box, Heading, Text, Image } from '@chakra-ui/react';
import Navbar from './Navbar';

function Landing() {
  return (
    <div className='home'>
      <Navbar />
      <Box
        /*mt={['25%', '10', '10', '17%']}*/
        marginTop={{ md: '30%', lg: '25%', xl: '17%', '2xl': '17%', '3xl': '17%' }}
        marginLeft={{ md: '3%', lg: '4%', xl: '9%', '2xl': '20', '3xl': '20' }}
      >
        <Heading
          fontFamily='Ubuntu'
          fontWeight='bold'
          textAlign={['center', 'center', 'left', 'left']}
          fontSize={{ md: '35px', lg: '45px', xl: '55px', '2xl': '50px', '3xl': '55px' }}
          mb={5}
        >
          Where Every<br></br>Programmer Gets His<br></br>Problems Solved
        </Heading>
        <Text
          fontFamily='Ubuntu'
          color='#38B2AC'
          fontWeight='bold'
          textAlign={['center', 'center', 'left', 'left']}
          fontSize={{ md: '18px', lg: '22px', xl: '24px', '2xl': '24px', '3xl': '24px' }}
        >
          "Share your code, Connect with others instantly"
        </Text>
      </Box>
      <Image
        src='https://i.ibb.co/d66fXp9/Programmer.gif'
        width={['null', 'null', '360px', '400px', '500px']}
        marginLeft={{ md: '410px', lg: '600px', xl: '840px', '2xl': '960px', '3xl': '940px' }}
        /*mt={['null', 'null', '-60', '-80', '-360']}*/
        marginTop={{ md: '-33%', lg: '-28%', xl: '-25%', '2xl': '-23%', '3xl': '-360' }}
      ></Image>
    </div>
  );
}

export default Landing;
