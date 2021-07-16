import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Landing} exact></Route>
        <Route path='/sign-up' component={Signup}></Route>
        <Route path='/log-in' component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
