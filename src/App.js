import './App.css';
import { Route, Routes } from 'react-router-dom';
import Intro from './Pages/Intro';
import TeamPicker from './Pages/TeamPicker';
import WelcomeTeam from './Pages/WelcomeTeam';
import QuizP1 from './Pages/QuizP1';
import QuizP2 from './Pages/QuizP2';
import QuizP3 from './Pages/QuizP3';
import QuizP4 from './Pages/QuizP4';
import QuizP1End from './Pages/QuizP1End';
import ShareScore from './Pages/ShareScore';
import { ScoreProvider } from './Context/ScoreProvider';
import QuizP3End from './Pages/QuizP3End';
import QuizP2End from './Pages/QuizP2End';
import ScoreAnimationComponent from './Components/ScoreAnimationComponent';

function App() {
    return (
        <ScoreProvider>
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Intro />} />
                        <Route path="/teampicker" element={<TeamPicker />} />
                        <Route path="/welcome-team" element={<WelcomeTeam />} />

                        <Route path="/quiz1" element={<QuizP1 />} />
                        <Route path="/quiz1end" element={<QuizP1End />} />

                        <Route path="/quiz2" element={<QuizP2 />} />
                        <Route path="/quiz2end" element={<QuizP2End />} />

                        <Route path="/quiz3" element={<QuizP3 />} />
                        <Route path="/quiz3end" element={<QuizP3End />} />

                        <Route path="/quiz4" element={<QuizP4 />} />
                        <Route path="/share-score" element={<ShareScore />} />
                    </Routes>
                </div>
            </div>
            <ScoreAnimationComponent />
        </ScoreProvider>
    );
}

export default App;
