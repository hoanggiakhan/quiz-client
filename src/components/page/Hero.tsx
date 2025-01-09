import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero: React.FC = () => {
  return (
    <div className="hero-section text-white text-center bg-primary py-5">
      <Container>
        <Row>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1>Welcome to QuizOnline</h1>
            <p className="mt-3">
              Enhance your knowledge and challenge yourself with our wide range of quizzes. Perfect for all ages!
            </p>
            <Button variant="light" className="mt-4" size="lg">
              Get Started
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="./../../../public/quiz1.png"
              alt="Quiz Illustration"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
