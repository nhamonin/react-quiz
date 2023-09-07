function Progress({ currentQuestionIndex, questionsLength, score, maxScore, answer }) {
  const progressValue = currentQuestionIndex + +(answer !== null);

  return (
    <header className="progress">
      <progress max={questionsLength} value={progressValue} />
      <p>
        Question <strong>{currentQuestionIndex + 1}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
    </header>
  );
}

export default Progress;
