import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, useToast } from '@chakra-ui/react';

const Alert = ({ alerts }) => {
  const toast = useToast();

  return (
    <Box>
      {alerts.map((alert) => (
        <Box key={alert.id}>
          {toast({
            id: '',
            title: alert.msg,
            status: alert.alertType,
            duration: 2000,
            isClosable: true
          })}
        </Box>
      ))}
    </Box>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
