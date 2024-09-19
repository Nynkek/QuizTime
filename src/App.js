import './App.css';
import { Route, Routes } from 'react-router-dom';
import Intro from './Pages/Intro';
import TeamPicker from './Pages/TeamPicker';
import WelcomeTeam from './Pages/WelcomeTeam';
import Quiz from './Pages/Quiz';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/teampicker' element={<TeamPicker />} />
          <Route path='/welcome-team' element={<WelcomeTeam />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
