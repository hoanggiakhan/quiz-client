import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'react-bootstrap';

interface QuizStatsProps {
  totalQuizzes: number;
  completedQuizzes: number;
}

const QuizStats: React.FC<QuizStatsProps> = ({ totalQuizzes, completedQuizzes }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Thống kê bài kiểm tra</CardTitle>
        <CardText>
          <div>
            <strong>Tổng số bài kiểm tra:</strong> {totalQuizzes}
          </div>
          <div>
            <strong>Bài kiểm tra đã hoàn thành:</strong> {completedQuizzes}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default QuizStats;