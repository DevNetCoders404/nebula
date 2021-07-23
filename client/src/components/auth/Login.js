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
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Login({ login, isAuthenticated }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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
          <form onSubmit={handleSubmit}>
            <Stack margin='auto' spacing={5} marginTop={5}>
              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input
                  variant='filled'
                  isRequired
                  type='email'
                  name='email'
                  value={email}
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
                <Button type='submit' color='white' style={{ backgroundColor: '#38B2AC' }}>
                  Log In
                </Button>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={13} color='gray.500' mb={6}>
                  Don't have an account? <Link to='/sign-up'>Sign up</Link>
                </FormLabel>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
