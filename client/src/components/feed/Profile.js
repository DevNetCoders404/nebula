import React, { useEffect } from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';

function Profile({ getCurrentProfile, profile: { profile }, auth: {user} }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      <Box
        position='fixed'
        left={20}
        top='155px'
        boxShadow='md'
        borderRadius='lg'
        pt={['40px', '10px', '15px', '10px', '40']}
        pb={['5', '5', '25px', '35px', '10']}
        width={['280px', '280px', '300px', '300px', '20%']}
        id='profile-box'
      >
        <Image
          src={user && user.avatar}
          borderRadius={400}
          width={['150px', '150px', '150px', '160px', '50%']}
          ml='auto'
          mr='auto'
          mt={['null', 'null', 'null', 'null', '-150px']}
          align='center'
          id='profile-image'
        ></Image>
        <Box id='profile-text'>
          <Text
            fontFamily='ubuntu'
            fontWeight='bold'
            fontSize={['16', '8', '19', '20', '20']}
            mt={['7', '2', '5', '5', '5']}
            align='center'
          >
            {user && user.name}
          </Text>
          <Text
            align='center'
            fontFamily='ubuntu'
            color='GrayText'
            fontSize={['15', '15', '17', '18', '18']}
            mt={['3', '1', '3', '1', '3']}
            mb={['3', '1', '3', '1', '3']}
          >
            {profile && profile.status ? profile.status : '---'}
          </Text>
          <Text
            align='center'
            fontFamily='ubuntu'
            color='GrayText'
            fontSize={['15', '15', '17', '18', '18']}
          >
            {profile && profile.address ? profile.address : '---'}
          </Text>
        </Box>
      </Box>
    </div>
  );
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
