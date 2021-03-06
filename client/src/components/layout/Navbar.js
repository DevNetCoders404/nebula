import { useState } from 'react';
import { Flex, Button, IconButton, Link, Box, Spacer, Heading } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  const [display, changeDisplay] = useState('none');

  const authLinks = (
    <Box mt={4} mr={15} display={['block', 'block', 'flex', 'flex']}>
      <Button
        variant='solid'
        background='#38B2AC'
        color='white'
        mr='7'
        padding={6}
        pl={8}
        pr={8}
        rounded={30}
        fontFamily='Ubuntu'
        _hover={{ background: 'teal.500' }}
        _active={{ background: 'teal.500' }}
        onClick={logout}
      >
        Logout
      </Button>
    </Box>
  );

  const guestLinks = (
    <>
      <Box mt={4} mr={15} display={['none', 'none', 'flex', 'flex']}>
        <Link
          as={ReachLink}
          to='/sign-up'
          style={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          <Button
            variant='solid'
            background='#38B2AC'
            color='white'
            mr='7'
            padding={6}
            pl={8}
            pr={8}
            rounded={30}
            fontFamily='Ubuntu'
            _hover={{ background: 'teal.500' }}
            _active={{ background: 'teal.500' }}
          >
            Sign Up
          </Button>
        </Link>
        <Link
          as={ReachLink}
          to='/log-in'
          style={{ textDecoration: 'none' }}
          _focus={{ outline: 'none' }}
        >
          <Button
            variant='unstyled'
            colorScheme='teal'
            mr='4'
            position='relative'
            top={1}
            fontFamily='Ubuntu'
          >
            Log In
          </Button>
        </Link>
      </Box>
      <IconButton
        mt={4}
        ml={10}
        size='lg'
        mr={2}
        icon={<HamburgerIcon />}
        onClick={() => changeDisplay('flex')}
        display={['flex', 'flex', 'none', 'none']}
      />

      <Flex
        w='100vw'
        display={display}
        bgColor='gray.50'
        zIndex={20}
        h='100vh'
        pos='fixed'
        top='0'
        left='0'
        overflowY='auto'
        flexDir='column'
      >
        <Flex justify='flex-end'>
          <IconButton
            mt={2}
            mr={2}
            aria-label='Open Menu'
            size='lg'
            icon={<CloseIcon />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>

        <Flex flexDir='column' align='center'>
          <Link
            as={ReachLink}
            to='/sign-up'
            _focus={{ outline: 'none' }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant='ghost' width='100%' my={5} fontFamily='Ubuntu'>
              Sign Up
            </Button>
          </Link>
          <Link
            as={ReachLink}
            to='/log-in'
            _focus={{ outline: 'none' }}
            style={{ textDecoration: 'none' }}
          >
            <Button variant='ghost' width='100%' my={5} fontFamily='Ubuntu'>
              Log In
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );

  return (
    <Flex boxShadow='md'>
      <Box p='4'>
        <Heading size='2xl' fontFamily='Ubuntu' ml={['1', '1', '0.1', '8', '14']}>
          Nebu<span style={{ color: '#38B2AC' }}>la</span>
        </Heading>
      </Box>
      <Spacer />
      {!loading && isAuthenticated ? authLinks : guestLinks}
    </Flex>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
