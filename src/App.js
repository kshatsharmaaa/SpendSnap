
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Auth } from "./pages/auth/index"
import { Dashboard } from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={ <Auth /> } />
          <Route path="/dashboard" exact element={ <Dashboard /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
