import React, { useEffect } from 'react';
import { Link, Text } from '@chakra-ui/react';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SocialMediaList({ getProfileById, profile: { other_user }, user }) {
  useEffect(() => {
    getProfileById(user);
  }, [getProfileById, user]);

  return (
    <div>
      {other_user &&
        other_user.socials.map((sociallist1, index) => (
          <div key={index}>
            <Link
              href={other_user.socials[index].link}
              style={{ textDecoration: 'none' }}
              _focus={{ outline: 'none' }}
              isExternal
            >
              <Text marginTop='5px' fontSize='17px' style={{ color: 'white' }}>
                {other_user.socials[index].socialname}
              </Text>
            </Link>
          </div>
        ))}
    </div>
  );
}

SocialMediaList.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(SocialMediaList);
