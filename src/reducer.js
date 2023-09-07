const SECS_PER_QUESTION = 30;

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'SET_ERROR':
      return {
        ...state,
        status: 'error',
      };
    case 'START_QUIZ':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'SUBMIT_ANSWER':
      const answer = action.payload;
      const isCorrect = answer === state.questions[state.currentQuestionIndex].correctOption;

      return {
        ...state,
        answer: action.payload,
        score: isCorrect
          ? state.score + state.questions[state.currentQuestionIndex].points
          : state.score,
      };
    case 'NEXT_QUESTION':
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      const highscore = state.score > state.highscore ? state.score : state.highscore;

      return {
        ...state,
        answer: null,
        currentQuestionIndex: nextQuestionIndex,
        highscore,
        status: nextQuestionIndex === state.questions.length ? 'finished' : 'active',
      };
    case 'RESTART_QUIZ':
      return {
        ...state,
        currentQuestionIndex: 0,
        score: 0,
        answer: null,
        status: 'ready',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'TICK':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      return state;
  }
}
