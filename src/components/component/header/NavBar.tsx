import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css"; // File CSS tùy chỉnh
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/AuthContext";
import { getAvatarUrl } from "../../../utils/JwtService";

const NavBar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth(); // Lấy thông tin người dùng từ context
  const navigate = useNavigate();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
  const avatarUrl = getAvatarUrl();

  // Ẩn Navbar khi đang trong bài kiểm tra
  const hideNavbar = location.pathname.includes("/quiz");

  const handleLogout = () => {
    if (logout) {
      logout(); // Gọi hàm logout từ context
      navigate("/"); // Chuyển hướng người dùng sau khi logout
    }
  };

  if (hideNavbar) return null; // Không hiển thị Navbar nếu đang trong bài kiểm tra
   
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Brand className="brand-logo">
          <NavLink to="/" className="text-white">
            QuizOnline
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
               <Nav.Link as={NavLink} to="/user/dashboard" className="text-white">
               Tổng quan
             </Nav.Link>
            )}
             {!isAuthenticated && (
               <Nav.Link as={NavLink} to="/" className="text-white">
              Trang chủ
             </Nav.Link>
            )}
               <Nav.Link as={NavLink} to="/learn" className="text-white">
              Học lý thuyết
            </Nav.Link>
            <Nav.Link as={NavLink} to="/subjects" className="text-white">
              Bài kiểm tra
            </Nav.Link>
            <Nav.Link as={NavLink} to="/community" className="text-white">
              Cộng đồng
            </Nav.Link>
            <Nav.Link as={NavLink} to="/rank" className="text-white">
              Bảng xếp hạng
            </Nav.Link>
            <Nav.Link as={NavLink} to="/product" className="text-white">
              Product
            </Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="a"
                  className="nav-link avatar-dropdown"
                  id="avatarDropdown"
                >
                  <img
                    src={avatarUrl || "/user.jpg"} // Hiển thị avatar hoặc ảnh mặc định
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/profile">
                    Thông tin cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="nav-link-button">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="nav-link-button">
                  Đăng ký
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
