import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { login } from "../Store/Slice/authSlice";
import { useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../Utils/validators";
import Loader from "../Components/Loader";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [localErrors, setLocalErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    if (auth.token) {
      navigate(`/userMatrix/user/${auth.token}`);
    }
  }, [auth.token, navigate]);

  const onSubmit = async () => {
    const errs = { email: "", password: "" };
    if (!validateEmail(email)) errs.email = "Invalid email";
    if (!validatePassword(password)) errs.password = "Invalid password";
    setLocalErrors(errs);
    if (errs.email || errs.password) return;

    dispatch(login({ email, password }));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-3" style={{ width: "35%" }}>
        <div className="card-body">
          <div className="input-group">
            <i className="bi bi-person input-group-text"></i>
            <input
              className="form-control"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {localErrors.email && <label className="text-danger"><em>{localErrors.email}</em></label>}

          <div className="input-group mt-4">
            <i className="bi bi-lock input-group-text"></i>
            <input
              className="form-control"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {localErrors.password && <label className="text-danger"><em>{localErrors.password}</em></label>}

          <div className="form-check mt-4">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Remember me</label>
          </div>

          <button
            className="btn btn-primary mt-4 w-100"
            disabled={auth.loading}
            onClick={onSubmit}
          >
            {auth.loading ? <Loader size={18} /> : "Login"}
          </button>

          {auth.error && <label className="text-danger"><em>{auth.error}</em></label>}
        </div>
      </div>
    </div>
  );
}
