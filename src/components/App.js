import { useEffect, useReducer } from 'react';
import reducer from '../reducer';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answer: null,
  highscore: null,
  status: 'loading', // 'loading' | 'error' | 'ready' | 'active' | 'finished'
  secondsRemaining: null,
};

function App() {
  const [
    { questions, currentQuestionIndex, status, answer, score, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsLength = questions.length;
  const maxScore = questions.reduce(
    (accumulator, currentQuestion) => accumulator + currentQuestion.points,
    0
  );
  const isLastQuestion = currentQuestionIndex === questionsLength - 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:9000/questions');
        const data = await response.json();

        dispatch({
          type: 'SET_QUESTIONS',
          payload: data,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'SET_ERROR',
        });
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              currentQuestionIndex={currentQuestionIndex}
              questionsLength={questionsLength}
              maxScore={maxScore}
              score={score}
              answer={answer}
            />
            <Question
              currentQuestion={questions[currentQuestionIndex]}
              dispatch={dispatch}
              answer={answer}
              score={score}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton dispatch={dispatch} answer={answer} isLastQuestion={isLastQuestion} />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            maxScore={maxScore}
            score={score}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
