import { MemoryRouter as Router } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
