import React, { useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { getProfileById } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SkillsList({ getProfileById, profile: { other_user }, user }) {
  useEffect(() => {
    getProfileById(user);
  }, [getProfileById, user]);

  return (
    <div>
      {other_user &&
        other_user.skills.map((taglist1, index) => (
          <div key={index}>
            <Text marginTop='5px' fontSize='17px' fontWeight={600} style={{ color: 'white' }}>
              {other_user.skills[index]}
            </Text>
          </div>
        ))}
    </div>
  );
}

SkillsList.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(SkillsList);
