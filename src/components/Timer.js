import { useEffect } from 'react';

import { useQuizContext } from '../contexts/QuizContext';

function Timer() {
  const { secondsRemaining, dispatch } = useQuizContext();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: 'TICK',
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
}

export default Timer;
