import OrganizationSelector from './components/OrganizationSelector';
import RoleSwitcher from './components/RoleSwitcher';
import TaskList from './components/TaskList';
import NxWelcome from './nx-welcome';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" exact component={OrganizationSelector} />
        <Route path="/dashboard" component={Dashboard} /> */}
      </Routes>
    </Router>
  );
}

export default App;
