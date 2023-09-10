import { useQuizContext } from '../contexts/QuizContext';
import QuestionOptions from './QuestionOptions';

export default function Question() {
  const { questions, currentQuestionIndex } = useQuizContext();
  const { question } = questions[currentQuestionIndex];

  return (
    <article className="question">
      <h4 className="question-text">{question}</h4>
      <QuestionOptions />
    </article>
  );
}
