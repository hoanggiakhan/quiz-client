import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Features: React.FC = () => {
  const features = [
    { title: 'Variety of Topics', description: 'Choose from over 100+ quiz categories.', icon: 'bi bi-book' },
    { title: 'Real-Time Leaderboard', description: 'Compete with friends and track your progress.', icon: 'bi bi-trophy' },
    { title: 'Mobile Friendly', description: 'Enjoy quizzes on any device, anytime.', icon: 'bi bi-phone' },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Why Choose QuizOnline?</h2>
      <Row>
        {features.map((feature, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="h-100 text-center shadow">
              <Card.Body>
                <i className={`${feature.icon} display-4 text-primary`}></i>
                <Card.Title className="mt-3">{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
