import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const averageScoresBySubject = [
  { subject: 'Toán', averageScore: 85 },
  { subject: 'Vật Lý', averageScore: 78 },
  { subject: 'Hóa Học', averageScore: 82 },
  { subject: 'Sinh Học', averageScore: 75 },
  { subject: 'Tiếng Anh', averageScore: 88 },
];

const quizList = Array.from({ length: 120 }, (_, index) => ({
  id: index + 1,
  subject: `Bài kiểm tra số ${index + 1}`,
  score: Math.floor(Math.random() * 101),
}));

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastQuiz = currentPage * itemsPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - itemsPerPage;
  const currentQuizzes = quizList.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const totalPages = Math.ceil(quizList.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid className="dashboard-container py-4">
      <Row className="g-4">
        <Col md={4} sm={12}>
          <Card className="dashboard-card shadow">
            <Card.Header className="text-center gradient-bg text-white">Thống Kê Tổng Quan</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6 className="text-muted">Tổng Số Quiz</h6>
                <h4 className="text-gradient">{quizList.length}</h4>
              </div>
              <div>
                <h6 className="text-muted">Môn Học Nhiều Quiz Nhất</h6>
                <p className="text-dark">Toán, Vật Lý</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} sm={12}>
          <Card className="dashboard-card shadow">
            <Card.Header className="text-center gradient-bg text-white">Điểm Trung Bình Theo Môn Học</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={averageScoresBySubject}>
                  <XAxis dataKey="subject" stroke="#6c757d" />
                  <YAxis stroke="#6c757d" />
                  <Tooltip cursor={{ fill: '#f8f9fa' }} />
                  <Bar dataKey="averageScore" fill="url(#gradientFill)" barSize={30} />
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#007bff" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#00c6ff" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="dashboard-card shadow">
            <Card.Header className="text-center gradient-bg text-white">Danh Sách Quiz Đã Làm</Card.Header>
            <Card.Body>
              <Row className="g-4">
                {currentQuizzes.map((quiz) => (
                  <Col md={6} lg={4} key={quiz.id}>
                    <Card className="quiz-item shadow border-light">
                      <Card.Body>
                        <h6 className="text-gradient">{quiz.subject}</h6>
                        <p className="text-secondary mb-2">Điểm: {quiz.score}/100</p>
                        <Button variant="outline-primary" size="sm">
                          <Link to={`/quiz-detail/${quiz.id}`} className="text-decoration-none">
                            Xem Chi Tiết
                          </Link>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Pagination className="mt-4 justify-content-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
