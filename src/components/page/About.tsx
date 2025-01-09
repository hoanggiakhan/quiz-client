import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-4 text-white">Chào mừng đến với QuizOnline</h1>
          <p className="lead text-white">
            Kiểm tra kiến thức và thử thách bản thân với các bài kiểm tra tương tác của chúng tôi.
          </p>
          <a className="btn btn-primary btn-lg mt-3 animate-btn">
           <Link to='/subjects' className = 'text-light'> Bắt đầu bài kiểm tra </Link>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Tại sao chọn QuizOnline?</h2>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="feature-card p-4 h-100">
                <i className="bi bi-lightning-charge-fill display-4 text-primary"></i>
                <h3 className="mt-3">Nhanh chóng và Tương tác</h3>
                <p>
                  Trải nghiệm các bài kiểm tra mượt mà, thời gian thực, tối ưu hóa cho mọi thiết bị.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-card p-4 h-100">
                <i className="bi bi-globe display-4 text-success"></i>
                <h3 className="mt-3">Thách thức Toàn cầu</h3>
                <p>
                  Cạnh tranh với bạn bè và người dùng trên toàn thế giới để leo lên bảng xếp hạng.
                </p>
              </div>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-card p-4 h-100">
                <i className="bi bi-trophy-fill display-4 text-warning"></i>
                <h3 className="mt-3">Thành tích</h3>
                <p>
                  Mở khóa huy hiệu và phần thưởng khi hoàn thành các bài kiểm tra và thử thách.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Section */}
      <section className="responsive-section py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Thiết kế phù hợp với mọi thiết bị</h2>
              <p>
                Cho dù bạn đang sử dụng điện thoại, máy tính bảng hay máy tính, QuizOnline luôn mang lại trải nghiệm tối ưu.
              </p>
              <ul className="list-unstyled">
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Thân thiện với thiết bị di động
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Hỗ trợ đa trình duyệt
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary"></i> Tải trang nhanh chóng
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="./../../../public/quiz2.png"
                alt="Responsive Design"
                className="img-fluid rounded animate-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section text-center py-5">
        <div className="container">
          <h2>Sẵn sàng thử thách bản thân?</h2>
          <p className="mb-4">
            Tham gia cùng hàng triệu người dùng và nâng cao kiến thức của bạn với các bài kiểm tra thú vị và tương tác.
          </p>
          <a href="/register" className="btn btn-success btn-lg animate-btn">
            Bắt đầu ngay
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
