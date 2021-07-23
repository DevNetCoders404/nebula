import { Redirect, Route } from 'react-router-dom';
import Loader from '../layout/Loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loading ? <Loader /> : isAuthenticated ? <Component {...props} /> : <Redirect to='/log-in' />
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
