import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [approve, setApprove] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError(""); // Clear any previous error messages
    setApprove(""); // Clear any previous approval messages

    try {
      const response = await axios.post("http://localhost:5000/v1/register", {
        username,
        password,
      });
      console.log(response.data);
      setApprove("Registered successfully");

      setUsername("");
      setPassword("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Register failed");
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
    <div className="wrapper">
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="row w-100 justify-content-center align-items-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="container d-flex justify-content-center">
                  <div className="d-flex align-items-center mb-2">
                    <h2 className="m-0">
                      <i className="bi bi-airplane-engines-fill text-warning head-icon m-1 pe-2"></i>
                      Sign<span className="text-warning">Up</span>
                    </h2>
                  </div>
                </div>
                <hr />
                <form onSubmit={handleRegister} method="post">
                  {error && <p className="text-danger">{error}</p>}{" "}
                  {approve && <p className="text-success">{approve}</p>}{" "}
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
                  <button type="submit" className="btn btn-warning mt-1 w-100">
                    SignUp<i className="bi bi-box-arrow-in-up ps-1"></i>
                  </button>
                  <div className="d-flex flex-column align-items-center">
                    <p className="mt-5 mb-0 text-secondary account-text">
                      Have an account?
                    </p>
                    <a href="/login" className="text-warning account-text mt-0">
                      Go to login
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
  );
}
