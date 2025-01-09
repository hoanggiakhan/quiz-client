import { useLocation, useNavigate } from "react-router-dom";
import { QuestionModel } from "../../../model/QuestionModel";

interface QuizResultsProps {
  state: {
    timeTaken: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
    userAnswers: { [key: string]: string };
    questions: QuestionModel[];
    quizId: string;
  };
}

export const QuizResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state as QuizResultsProps["state"];

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Kết quả bài làm</h1>

      <div className="mb-4">
        <h3>Thời gian làm bài: {formatTime(results.timeTaken)}</h3>
        <h3>Tổng số câu hỏi: {results.totalQuestions}</h3>
        <h3>Số câu đúng: {results.correctAnswers}</h3>
        <h3>Số câu sai: {results.incorrectAnswers}</h3>
        <h3>Điểm số: {results.score}</h3>
      </div>

      <div>
        <h2 className="mb-3">Chi tiết câu hỏi:</h2>
        <ul className="list-group">
          {results.questions.map((question, index) => {
            const userAnswer = results.userAnswers[question.questionId]
              ?.split(".")[0]
              .trim()
              .toUpperCase();
            const correctAnswers = question.correctAnswers.map((answer) =>
              answer.trim().toUpperCase()
            );
            const isCorrect = correctAnswers.includes(userAnswer);
            return (
              <li key={question.questionId} className="list-group-item">
                <h5>{`Câu ${index + 1}: ${question.content}`}</h5>
                <div>
                  <strong>Các lựa chọn:</strong>
                  <ul>
                    {question.choices.map((choice) => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className={isCorrect ? "text-success" : "text-danger"}>
                    <strong>Đáp án của bạn:</strong> {userAnswer || "Không trả lời"}
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Đáp án đúng:</strong> {question.correctAnswers.join(", ")}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Quay lại trang chính
        </button>
      </div>
    </div>
  );
};