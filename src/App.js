import "./App.css";
import { Route, Routes } from "react-router-dom";
import Intro from "./Pages/Intro";
import TeamPicker from "./Pages/TeamPicker";
import WelcomeTeam from "./Pages/WelcomeTeam";
import QuizP1 from "./Pages/QuizP1";
import QuizP2 from "./Pages/QuizP2";
import QuizP3 from "./Pages/QuizP3";
import QuizP4 from "./Pages/QuizP4";
import QuizEnvelop from "./Pages/QuizEnvelop";
import ShareScore from "./Pages/ShareScore";
import { ScoreProvider } from "./Context/ScoreProvider";
import ScoreAnimationComponent from "./Components/ScoreAnimationComponent";

const fieldMode = false;

function App() {
  return (
    <ScoreProvider>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/teampicker" element={<TeamPicker />} />
            <Route
              path="/welcome-team"
              element={
                <WelcomeTeam nextPage={fieldMode ? "/startQuiz" : "/quiz1"} />
              }
            />

            <Route
              path="/startQuiz"
              element={<QuizEnvelop index={0} next="/quiz1" />}
            />

            <Route
              path="/quiz1"
              element={<QuizP1 nextPage={fieldMode ? "/quiz1end" : "/quiz2"} />}
            />
            <Route
              path="/quiz1end"
              element={<QuizEnvelop index={1} next="/quiz2" />}
            />

            <Route
              path="/quiz2"
              element={<QuizP2 nextPage={fieldMode ? "/quiz2end" : "/quiz3"} />}
            />
            <Route
              path="/quiz2end"
              element={<QuizEnvelop index={2} next="/quiz3" />}
            />

            <Route
              path="/quiz3"
              element={<QuizP3 nextPage={fieldMode ? "/quiz3end" : "/quiz4"} />}
            />
            <Route
              path="/quiz3end"
              element={<QuizEnvelop index={3} next="/quiz4" />}
            />

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
