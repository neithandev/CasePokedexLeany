import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PokemonModal } from './components/PokemonModal';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <PokemonModal />
      </Router>
    </div>
  );
}

export default App;