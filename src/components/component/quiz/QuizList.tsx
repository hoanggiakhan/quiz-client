import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizModel } from "../../../model/QuizModel";
import { getAllQuizzes, getAllQuizzesByUser, startQuiz } from "../../../api/QuizAPI";
import { QuestionList } from "./QuestionList";
import { getIdUserByToken } from "../../../utils/JwtService";
import { useAuth } from "../../../utils/AuthContext";
import styles from "./QuizList.module.css"; // Import CSS module

interface QuizListProps {
  setShowQuizList: (showQuizList: boolean) => void;
  selectedSubject: string | null;
  selectedGrade: number | null;
}

export const QuizList = (props: QuizListProps) => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<QuizModel | null>(null);
  const userId = getIdUserByToken() || "";
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const quizzesData = isAuthenticated ? getAllQuizzesByUser(userId) : getAllQuizzes();
      setQuizzes(await quizzesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartQuiz = async (quiz: QuizModel) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Bạn cần phải đăng nhập để bắt đầu làm bài kiểm tra!");
      navigate("/login");
    } else {
      try {
        await startQuiz(userId, quiz.quizId);
        setCurrentQuiz(quiz);
      } catch (error) {
        console.error("Error starting quiz:", error);
        alert("Đã xảy ra lỗi khi bắt đầu bài kiểm tra!");
      }
    }
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSubject = quiz.nameSubject === props.selectedSubject;
    const matchesGrade = quiz.grade === props.selectedGrade;
    return matchesSubject && matchesGrade;
  });

  if (currentQuiz) {
    return (
      <QuestionList
        quizId={currentQuiz.quizId}
        quizDuration={currentQuiz.duration}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={`text-center ${styles.title}`}>Danh sách bài kiểm tra</h1>

      {filteredQuizzes.length > 0 ? (
        <ul className={`list-group ${styles.quizList}`}>
          {filteredQuizzes.map((quiz) => (
            <li
              key={quiz.quizId}
              className={`list-group-item d-flex align-items-center justify-content-between ${styles.quizItem}`}
            >
              <div>
                <strong>{quiz.title}</strong>
                <p>Ghi chú: {quiz.description}</p>
                <small>Thời gian làm bài: {quiz.duration} phút</small>
                <span
                  className={`badge ${styles.badge} ${
                    quiz.isActive ? styles.activeBadge : styles.inactiveBadge
                  }`}
                >
                  {quiz.status === "COMPLETED"
                    ? "Hoàn thành"
                    : quiz.status === "IN_PROGRESS"
                    ? "Chưa hoàn thành"
                    : "Chưa bắt đầu"}
                </span>
              </div>
              <button
                className={`btn btn-primary ${styles.startButton}`}
                onClick={() => handleStartQuiz(quiz)}
              >
                {quiz.status === "COMPLETED" ? "Làm lại" : "Bắt đầu làm bài"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Không có bài kiểm tra nào</p>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-lg btn-secondary"
          onClick={() => props.setShowQuizList(false)}
        >
          Quay về
        </button>
      </div>
    </div>
  );
};
