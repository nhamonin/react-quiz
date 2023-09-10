import { useQuizContext } from '../contexts/QuizContext';

export default function StartScreen() {
  const { questionsLength, dispatch } = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() =>
          dispatch({
            type: 'START_QUIZ',
          })
        }
      >
        Let's Start
      </button>
    </div>
  );
}
