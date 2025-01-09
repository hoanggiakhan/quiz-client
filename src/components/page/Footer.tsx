import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <p>&copy; {new Date().getFullYear()} QuizOnline. All Rights Reserved.</p>
        <p>
          <a href="mailto:info@quizonline.com" className="text-white">
            info@quizonline.com
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
