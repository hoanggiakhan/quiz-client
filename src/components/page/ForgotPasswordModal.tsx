import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

interface ForgotPasswordModalProps {
  show: boolean;
  handleClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  show,
  handleClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi yêu cầu đặt lại mật khẩu
      await axios.post("http://localhost:8080/user/forgot-password", { email });

      toast.success(
        "Vui lòng kiểm tra email của bạn để nhận mật khẩu mới!",
        { position: "top-center" }
      );

      // Đóng modal sau khi gửi yêu cầu
      handleClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Quên mật khẩu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="mt-3 w-100"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPasswordModal;
