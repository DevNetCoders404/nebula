import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import { Box } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Feed from './components/feed/Feed';
import Editor from './components/feed/Editor';
import PostThread from './components/thread/PostThread';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing}></Route>
        <Box as='section'>
          <Alert />
          <Switch>
            <Route exact path='/sign-up' component={Signup}></Route>
            <Route exact path='/log-in' component={Login}></Route>
            <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path='/feed' component={Feed}></PrivateRoute>
            <PrivateRoute exact path='/editor' component={Editor}></PrivateRoute>
            <PrivateRoute exact path='/post/:id' component={PostThread}></PrivateRoute>
          </Switch>
        </Box>
      </Router>
    </Provider>
  );
}

export default App;
