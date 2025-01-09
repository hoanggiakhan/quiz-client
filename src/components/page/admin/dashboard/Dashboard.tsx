import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Import các thành phần Bootstrap
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from 'react-bootstrap';
import UserStats from './UserStats';
import QuizStats from './QuizStats';
import RecentActivity from './RecentActivity';

const AdminDashboard: React.FC = () => {
  // State quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState('overview');

  // Xử lý sự kiện thay đổi tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Quizonline Admin</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/admin/users">
              Người dùng
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/quizzes">
              Bài kiểm tra
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/settings">
              Cài đặt
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row>
          {/* Thanh điều hướng tab */}
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item
                  active={activeTab === 'overview'}
                  onClick={() => handleTabChange('overview')}
                >
                  Tổng quan
                </ListGroup.Item>
                <ListGroup.Item
                  active={activeTab === 'users'}
                  onClick={() => handleTabChange('users')}
                >
                  Người dùng
                </ListGroup.Item>
                <ListGroup.Item
                  active={activeTab === 'quizzes'}
                  onClick={() => handleTabChange('quizzes')}
                >
                  Bài kiểm tra
                </ListGroup.Item>
                <ListGroup.Item
                  active={activeTab === 'activity'}
                  onClick={() => handleTabChange('activity')}
                >
                  Hoạt động gần đây
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Nội dung tab */}
          <Col md={9}>
            {activeTab === 'overview' && (
              <div className="overview-container">
                <Row>
                  <Col md={6}>
                    <UserStats totalUsers={1000} activeUsers={500} />
                  </Col>
                  <Col md={6}>
                    <QuizStats totalQuizzes={500} completedQuizzes={200} />
                  </Col>
                </Row>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-container">
                {/* Hiển thị danh sách người dùng */}
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div className="quizzes-container">
                {/* Hiển thị danh sách bài kiểm tra */}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="activity-container">
              <RecentActivity
                activities={[
                  { timestamp: '2023-03-20 10:00:00', description: 'Người dùng John Doe đã đăng ký tài khoản.' },
                  { timestamp: '2023-03-19 15:30:00', description: 'Bài kiểm tra Quiz 1 đã được tạo.' },
                  // ... thêm các hoạt động khác
                ]}
              />
            </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;