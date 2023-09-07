function FinishScreen({ score, maxScore, highscore, dispatch }) {
  const percentage = (score / maxScore) * 100;
  let emoji;
  if (percentage === 100) {
    emoji = '🥇';
  } else if (percentage >= 80) {
    emoji = '😀';
  } else if (percentage >= 60) {
    emoji = '😐';
  } else {
    emoji = '😞';
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percentage)} %)
      </p>
      {highscore !== null && <p className="highscore">(Highscore: {highscore} points)</p>}
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'RESTART_QUIZ' })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
