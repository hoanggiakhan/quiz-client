import { QuestionModel } from "../../../model/QuestionModel";

type AnswerOptionProps = {
  questions: QuestionModel[];
  userAnswers: { [key: string]: string };
};

export const checkAnswers = ({ questions, userAnswers }: AnswerOptionProps) => {
  const results = questions.map((question) => {
    // Lấy nhãn đáp án từ lựa chọn của người dùng
    const userAnswer = userAnswers[question.questionId]
      ?.split(".")[0] // Lấy ký tự trước dấu '.'
      .trim()
      .toUpperCase(); // Chuyển thành chữ hoa để so sánh nhất quán

    // Đáp án đúng cũng cần chuẩn hóa
    const correctAnswers = question.correctAnswers.map((answer) =>
      answer.trim().toUpperCase()
    );

    const isCorrect = correctAnswers.includes(userAnswer);

    return {
      questionId: question.questionId,
      userAnswer,
      isCorrect,
    };
  });

  const totalCorrect = results.filter((result) => result.isCorrect).length;

  return {
    results,
    totalCorrect,
    totalQuestions: questions.length,
    score: Math.round((totalCorrect / questions.length) * 100),
  };
};
