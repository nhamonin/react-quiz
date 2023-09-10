import { useQuizContext } from '../contexts/QuizContext';

export default function QuestionOptions() {
  const { currentQuestionIndex, questions, answer, dispatch } = useQuizContext();

  const { options, correctOption } = questions[currentQuestionIndex];

  const answered = answer !== null;

  const getButtonClass = (index) => {
    let classes = 'btn btn-option';

    if (index === answer) {
      classes += ' answer';
    }

    if (answered) {
      if (index === correctOption) {
        classes += ' correct';
      } else {
        classes += ' wrong';
      }
    }

    return classes;
  };

  const handleOptionClick = (index) => {
    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: index,
    });
  };

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option}
          className={getButtonClass(index)}
          onClick={() => handleOptionClick(index)}
          disabled={answered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
