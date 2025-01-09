import  { useState, useEffect } from "react";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProfileUser, changePassword } from "../../../api/UserAPI";
import { UserModel } from "../../../model/UserModel";
import { getIdUserByToken } from "../../../utils/JwtService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newFullName, setNewFullName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState<boolean>(false);
  const userId = getIdUserByToken();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userId) {
          const userProfile = await getProfileUser(userId);
          setUser(userProfile);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleChangePassword = async () => {
    try {
      if (userId) {
        await changePassword(userId, oldPassword, newPassword);
        toast.success("Mật khẩu đã được thay đổi thành công!");
        setOldPassword("");
        setNewPassword("");
        setShowChangePasswordModal(false);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Đã xảy ra lỗi khi thay đổi mật khẩu.");
    }
  };

  const handleUpdateInfo = () => {
    if (userId && newFullName && newEmail) {
      // Call your API to update user info here
      // For example, update user info using a hypothetical update API:
      // await updateUserInfo(userId, newFullName, newEmail);
      toast.success("Thông tin đã được cập nhật!");
      setShowUpdateInfoModal(false);
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleUpdateAvatar = () => {
    alert("Chức năng thay đổi avatar đang được phát triển!");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="card profile-card shadow-lg">
        <div className="card-header text-center bg-primary text-white">
          <h3>Thông Tin Cá Nhân</h3>
        </div>
        <div className="card-body">
          <div className="text-center mb-4">
            <img
              src={user.avatarUrl || "./../../../../public/user.jpg"}
              alt="Avatar"
              className="rounded-circle profile-avatar"
            />
            <button
              className="btn btn-outline-primary btn-sm mt-3"
              onClick={handleUpdateAvatar}
            >
              Thay Đổi Avatar
            </button>
          </div>
          <div className="profile-info">
            <div className="mb-3">
              <strong>Họ và Tên:</strong> {user.fullName}
            </div>
            <div className="mb-3">
              <strong>Tên người dùng:</strong> {user.username}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {user.email}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-warning w-45"
              onClick={() => setShowUpdateInfoModal(true)}
            >
              Thay Đổi Thông Tin
            </button>
            <button
              className="btn btn-danger w-45"
              onClick={() => setShowChangePasswordModal(true)}
            >
              Thay Đổi Mật Khẩu
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Thay đổi mật khẩu */}
      <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thay Đổi Mật Khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChangePasswordModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal: Cập nhật thông tin */}
      <Modal show={showUpdateInfoModal} onHide={() => setShowUpdateInfoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thay Đổi Thông Tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Họ và tên"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateInfoModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateInfo}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
