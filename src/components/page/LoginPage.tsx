import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPasswordModal from "./ForgotPasswordModal";
import {jwtDecode} from "jwt-decode"; // Import chuẩn từ thư viện jwt-decode

interface JwtPayload {
  role: string;
  exp: number;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await axios.post("http://localhost:8080/api/login", {
      username,
      password,
    });

    const { token } = response.data;

    if (!token) {
      throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }

    // Lưu token vào localStorage
    localStorage.setItem("jwtToken", token);
    const decodedToken = jwtDecode<JwtPayload>(token);

    // Cập nhật trạng thái đăng nhập và vai trò
    setIsAuthenticated(true);
    setRole(decodedToken.role);

    // Điều hướng dựa trên vai trò
    if (decodedToken.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }

    toast.success("Bạn đã đăng nhập thành công!");
  } catch (err: any) {
    if (err.response && err.response.data) {
      setError(err.response.data.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } else {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng kiểm tra kết nối.");
    }
    toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
  }
};

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#fff",
      }}
    >
      <ToastContainer />
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          className="text-center p-4"
          style={{
            background: "#fff",
            color: "#2575fc",
          }}
        >
          <h3>Chào Mừng Trở Lại!</h3>
          <p className="mb-0">Đăng nhập để tiếp tục vào QuizOnline</p>
        </div>

        <div className="card-body bg-light p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nhập tên đăng nhập của bạn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#2575fc",
                borderColor: "#2575fc",
              }}
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="mb-1">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-primary">
                Đăng ký
              </Link>
            </p>
            <p>
              <button
                className="btn btn-link text-secondary p-0"
                style={{ textDecoration: "none" }}
                onClick={() => setShowForgotPasswordModal(true)}
              >
                Quên mật khẩu?
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modal Quên Mật Khẩu */}
      <ForgotPasswordModal
        show={showForgotPasswordModal}
        handleClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
};

export default Login;
