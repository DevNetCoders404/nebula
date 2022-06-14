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
  Image,
  Box
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Link as ReachLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function Signup({ register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const { name, username, email1, password } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    let email = email1.toLowerCase();
    e.preventDefault();
    register({ name, username, email, password });
  };

  const [showPassword, setShowPassword] = useState(false);

  const isInvalid = password === '' || email1 === '' || name === '';

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='sign-up'>
      <Box p='4'>
        <Heading size='2xl' fontFamily='Ubuntu' ml={['1', '1', '0.1', '8', '14']}>
          <Link
            as={ReachLink}
            to='/'
            _focus={{ outline: '0' }}
            textDecoration='none'
            _hover={{ textDecoration: 'none' }}
          >
            Nebu<span style={{ color: '#38B2AC' }}>la</span>
          </Link>
        </Heading>
      </Box>
      <Flex
        height='100%'
        /*marginTop='10%'*/
        marginTop={{
          md: '15%',
          lg: '1%',
          xl: '2%',
          '2xl': '1%',
          '3xl': '400px'
        }}
        alignItems='center'
        justifyContent={['center', 'center', 'flex-end', 'flex-end', 'flex-end']}
        mr={['none', 'none', '30px', '30px', '200px']}
      >
        <Flex
          direction='column'
          height={['100%', '100%', '100%', '100%', '100%']}
          width={{ md: '400px', lg: '400px', xl: '400px', '2xl': '400px', '3xl': '400px' }}
          rounded={6}
          paddingTop={8}
          paddingBottom={3}
          paddingLeft={12}
          paddingRight={12}
          background='gray.100'
        >
          <Heading
            mb={6}
            marginTop={{
              md: '-3%',
              lg: '-3%',
              xl: '-3%',
              '2xl': '-3%',
              '3xl': '400px'
            }}
          >
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack margin='auto' spacing={5} marginTop={5}>
              <FormControl>
                <FormLabel htmlFor='name'>Full Name</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleChange}
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='text'
                  name='username'
                  value={username}
                  onChange={handleChange}
                ></Input>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='email'
                  name='email'
                  value={email1}
                  onChange={handleChange}
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
                    name='password'
                    value={password}
                    onChange={handleChange}
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
                  Already have an account? <Link to='/log-in'>Log in</Link>
                </FormLabel>
              </FormControl>
            </Stack>
          </form>
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

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Signup);
