import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionModel } from "../../../model/QuestionModel";
import { getQuestionsByQuizId } from "../../../api/QuestionAPI";
import { checkAnswers } from "./AnswerOptions";
import { quizSubmit } from "../../../api/QuizAPI";
import { getIdUserByToken } from "../../../utils/JwtService";

interface QuizPageProps {
  quizId: string;
  quizDuration: string;
}

export const QuestionList = ({ quizId, quizDuration }: QuizPageProps) => {
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();
  const userId = getIdUserByToken() || '';
  const parseDuration = (duration: string): number => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const [timeLeft, setTimeLeft] = useState(parseDuration(quizDuration));

  useEffect(() => {
    fetchQuestions();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionsData = await getQuestionsByQuizId(quizId);
      setQuestions(questionsData);
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return; // Đã bắt đầu gửi, không làm gì nữa
    setIsSubmitting(true); // Đánh dấu đã bắt đầu nộp bài
  
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const evaluation = checkAnswers({ questions, userAnswers: answers });
  
    const results = {
      timeTaken,
      totalQuestions: questions.length,
      correctAnswers: evaluation.totalCorrect,
      incorrectAnswers: questions.length - evaluation.totalCorrect,
      score: evaluation.score,
      userAnswers: answers,
      questions,
      quizId,
    };
  
    try {
      // Lưu kết quả lên server
      await quizSubmit(userId, quizId, {
        timeTaken : results.timeTaken,
        totalQuestions : results.totalQuestions,
        correctAnswers : results.correctAnswers,
        incorrectAnswers : results.incorrectAnswers,
        score : results.score,
        userAnswers : JSON.stringify(results.userAnswers),
        questions: [],
      });
  
      // Điều hướng tới trang kết quả cùng với dữ liệu kết quả
      navigate("/quiz-results", { state: results });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Đã xảy ra lỗi khi nộp bài kiểm tra!");
      setIsSubmitting(false); // Cho phép thử lại
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div>
      <div className="mb-4">
        <h2>Thời gian làm bài: {formatTime(timeLeft)}</h2>
      </div>
      <div className="mb-4">
        <h4>
          Câu hỏi {currentQuestionIndex + 1} / {questions.length}
        </h4>
      </div>

      {currentQuestion ? (
        <div>
          <h4>Câu {currentQuestionIndex + 1}. {currentQuestion.content}</h4>
          <div>
            {currentQuestion.choices.map((choice) => (
              <div key={choice} className="form-check">
                <input
                  type="radio"
                  id={`${currentQuestion.questionId}-${choice}`}
                  name={currentQuestion.questionId}
                  value={choice}
                  checked={answers[currentQuestion.questionId] === choice}
                  onChange={() => handleAnswerChange(currentQuestion.questionId, choice)}
                  className="form-check-input"
                />
                <label htmlFor={`${currentQuestion.questionId}-${choice}`} className="form-check-label">
                  {choice}
                </label>
              </div>
            ))}
          </div>

          <div className="text-center mt-4 d-flex justify-content-center gap-3">
            <button
              className="btn btn-secondary"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Câu hỏi trước
            </button>
            <button
              className="btn btn-secondary"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
             Tiếp theo
            </button>
            <button
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
            >
             Nộp bài
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading questions...</p>
      )}
    </div>
  );
};