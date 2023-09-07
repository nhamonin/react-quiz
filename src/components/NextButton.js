function NextButton({ dispatch, answer, isLastQuestion }) {
  if (answer === null) return null;

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: 'NEXT_QUESTION' })}>
      {isLastQuestion ? 'Finish Test' : 'Next'}
    </button>
  );
}

export default NextButton;
