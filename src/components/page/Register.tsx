import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../api/UserAPI";
import { UserModel } from "../../model/UserModel";

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<UserModel>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "",
    avatarUrl : ""
  }); // Khởi tạo với giá trị mặc định
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi gửi yêu cầu

    try {
      await registerUser(formData); // Gửi formData tới API
      toast.success("Đăng ký thành công!");
      navigate("/login"); // Chuyển hướng tới trang đăng nhập
    } catch (error: any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Username hoặc email đã tồn tại.");
      } else {
        setError(error.message || "Đã xảy ra lỗi. Vui lòng kiểm tra kết nối.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Đăng Ký Tài Khoản</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Họ và Tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Tên Đăng Nhập
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nhập email"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.submitButton}>
            Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};
