import React from "react";

const NotFound = () => {
  return (
    <div className="wrapper">
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <h1 className="text-danger">404 - Not Found</h1>
        <p className="text-secondary">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
