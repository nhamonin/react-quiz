import { createContext, useContext, useEffect, useReducer } from 'react';
import reducer from '../reducer';

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  answer: null,
  highscore: null,
  status: 'loading', // 'loading' | 'error' | 'ready' | 'active' | 'finished'
  secondsRemaining: null,
};

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        status,
        answer,
        score,
        highscore,
        secondsRemaining,
        questionsLength,
        maxScore,
        isLastQuestion,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error(`useQuiz must be used within a QuizProvider`);
  }

  return context;
}

export { QuizProvider, useQuizContext };
