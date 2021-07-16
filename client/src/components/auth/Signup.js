import { useState } from 'react';
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
import { ViewIcon, ViewOffIcon, Icon } from '@chakra-ui/icons';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = password === '' || email === '' || name === '';
  return (
    <div className='sign-up'>
      <Flex
        height='100vh'
        alignItems='center'
        justifyContent={['center', 'center', 'flex-end', 'flex-end', 'flex-end']}
        mr={['none', 'none', '30px', '30px', '300px']}
      >
        <Flex
          direction='column'
          height={['100vh', '100vh', '98vh', '98vh', '90vh']}
          width={['100%', '100%', '350px', '350px', '350px']}
          rounded={6}
          p={12}
          background='gray.100'
        >
          <Heading mb={6}>Sign Up</Heading>
          <form>
            <Stack margin='auto' spacing={5} marginTop={5}>
              <FormControl>
                <FormLabel htmlFor='name'>Full Name</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='text'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <Button
                  disabled={isInvalid}
                  type='submit'
                  color='white'
                  style={{ backgroundColor: '#38B2AC' }}
                >
                  Create New Account
                </Button>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={13} color='gray.500' mb={6}>
                  Already have an account : <Link to='/log-in'>Log in</Link>
                </FormLabel>
              </FormControl>
            </Stack>
          </form>

          <Heading fontSize={15} textAlign='center' mb={6}>
            or
          </Heading>
          <FormControl>
            <FormLabel fontSize={13} color='gray.500'>
              Sign Up with :{' '}
              <Icon cursor='pointer' fontSize={18} ml={5} color='teal.400' as={FaGoogle}></Icon>
            </FormLabel>
          </FormControl>
        </Flex>
      </Flex>

      <Image
        src='https://i.ibb.co/f0kdNx4/Mobile-login-2.gif'
        position='absolute'
        top={40}
        left={['null', 'null', '5', '20', '40']}
        width={['null', 'null', '360px', '400px', '500px']}
        display={['none', 'none', 'block', 'block', 'block']}
      ></Image>
    </div>
  );
}

export default Signup;
