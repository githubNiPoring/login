import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Home() {
  const location = useLocation();
  const { username } = location.state || {};
  console.log("Username from location state:", username); // Debugging log
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="wrapper">
        <div className="d-flex justify-content-space-between align-items-center px-5 py-2">
          <div className="container d-flex align-items-center m-0 p-0">
            <h2 className="mb-0">Welcome Home</h2>
            {username && <h2 className="mb-0 ps-2">{username}</h2>}
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
