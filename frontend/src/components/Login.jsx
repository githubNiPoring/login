import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/v1/login", {
        username,
        password,
      });
      console.log(response.data);
      // Call login function from context
      login(username);
      navigate("/home", { state: { username } }); // Pass username in state

      // Clear input fields after successful login
      setUsername("");
      setPassword("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
        setUsername("");
        setPassword("");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
        setUsername("");
        setPassword("");
      } else {
        setError("Error: " + err.message);
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="row w-100 justify-content-center align-items-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
              <div className="card shadow-lg">
                <div className="card-body">
                  <div className="container">
                    <div className="card-title m-0">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-airplane-engines-fill text-warning head-icon m-1 pe-2"></i>
                        <h2 className="m-0">
                          Pea<span className="text-warning">Shooter</span>
                        </h2>
                      </div>
                      <form onSubmit={handleLogin} id="login-form">
                        {error && <p className="text-danger">{error}</p>}{" "}
                        <p className="text-secondary">
                          Please enter credential to use our service
                        </p>
                        <hr />
                        <div className="form-gorup mb-2">
                          <label htmlFor="username" className="mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            id="username"
                            className="form-control mb-2"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-gorup mb-2">
                          <label htmlFor="password" className="mb-2">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="form-control mb-2"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-warning mt-1 w-100"
                        >
                          Login<i className="bi bi-door-open-fill ps-1"></i>
                        </button>
                        <div className="d-flex flex-column align-items-center">
                          <p className="mt-5 mb-0 text-secondary account-text">
                            Don&apos;t have an account?
                          </p>
                          <a
                            href="/register"
                            className="text-warning account-text mt-0"
                          >
                            Create an account
                          </a>
                        </div>
                        <div className="mt-4 mb-2 text-center text-secondary">
                          Copyright &copy; 2024. All rights reserved.
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
