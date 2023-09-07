import QuestionOptions from './QuestionOptions';

export default function Question({ currentQuestion, dispatch, answer }) {
  const { question, options, correctOption } = currentQuestion;

  return (
    <article className="question">
      <h4 className="question-text">{question}</h4>
      <QuestionOptions
        options={options}
        correctOption={correctOption}
        dispatch={dispatch}
        answer={answer}
      />
    </article>
  );
}
