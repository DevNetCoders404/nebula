import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Stack,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Heading,
  Image
} from '@chakra-ui/react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='log-in'>
      <Flex
        height='100vh'
        alignItems='center'
        justifyContent={['center', 'center', 'flex-end', 'flex-end', 'flex-end']}
        mr={['none', 'none', '30px', '30px', '300px']}
      >
        <Flex
          direction='column'
          height={['100vh', '100vh', '70vh', '70vh', '60vh']}
          width={['100%', '100%', '350px', '350px', '350px']}
          rounded={6}
          p={12}
          background='gray.100'
        >
          <Heading mb={6} mt={['20', '20', '5', '5']}>
            Log In
          </Heading>
          <form method='POST'>
            <Stack margin='auto' spacing={5} marginTop={5}>
              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input variant='filled' isRequired type='email' id='email'></Input>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    variant='filled'
                    isRequired
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                    id='password'
                  ></Input>
                  <InputRightElement width='2.5rem'>
                    {/*<Button height = '1.75rem' size ='sm' onClick = {() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</Button>*/}
                    {showPassword ? (
                      <ViewOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                        cursor='pointer'
                      />
                    ) : (
                      <ViewIcon onClick={() => setShowPassword(!showPassword)} cursor='pointer' />
                    )}
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <Button type='submit' color='white' style={{ backgroundColor: '#38B2AC' }}>
                  Log In
                </Button>
              </FormControl>
            </Stack>
          </form>
        </Flex>
      </Flex>

      <Image
        src='https://i.ibb.co/RNcy0CW/Login.gif'
        position='absolute'
        top={40}
        left={['null', 'null', '5', '20', '40']}
        width={['null', 'null', '360px', '400px', '500px']}
        display={['none', 'none', 'block', 'block', 'block']}
      ></Image>
    </div>
  );
}

export default Login;
