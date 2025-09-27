import React from "react";

export default function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3" style={{width:"35%"}}>
        <div className="card-body">
          <div className="input-group">
            <i className="bi bi-person input-group-text"></i>
            <input className="form-control" type="text" />
          </div>
          <div className="input-group mt-4">
            <i className="bi bi-lock input-group-text"></i>
            <input className="form-control" type="password" />
          </div>
          <div className="form-check mt-4">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Remember me</label>
          </div>

          <button className="btn btn-primary mt-4 w-100">Login</button>
        </div>
      </div>
    </div>
  );
}
