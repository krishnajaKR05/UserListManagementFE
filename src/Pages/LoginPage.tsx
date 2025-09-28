import React, { useState } from "react";
import { UserDetails, Errors, validateFields } from "../Utils/commonfunction";
import { REQRES_API_KEY } from "../Utils/consts";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState<UserDetails>({
    loginEmail: "eve.holt@reqres.in",
    loginPassword: "cityslicka",
  });
  const [errors, setErrors] = useState<Errors>({
    loginEmailError: false,
    passwordError: false,
    loginError: false,
  });

  const loginUser = async () => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "x-api-key": REQRES_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.loginEmail,
          password: userDetails.loginPassword,
        }),
      });

      const data = await response.json();
      console.log("resp", response.status);
      console.log("data", data);
      if (response.status != 200) {
        setErrors((prev) => ({ ...prev, loginError: true }));
      } else {
        navigate(`/userMatrix/user/${data.token}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
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
              name="loginEmail"
              onChange={(e) => validateFields(e, setUserDetails, setErrors)}
            />
          </div>
          {errors.loginEmailError ? (
            <label className="text-danger">
              <em>enter valid email "abc.abc@reqres.in"</em>
            </label>
          ) : (
            <></>
          )}
          <div className="input-group mt-4">
            <i className="bi bi-lock input-group-text"></i>
            <input
              className="form-control"
              name="loginPassword"
              type="password"
              onChange={(e) => validateFields(e, setUserDetails, setErrors)}
            />
          </div>
          {errors.passwordError ? (
            <label className="text-danger">
              <em>
                enter valid password,must be 10 charaters, allowed lowercase
                alone
              </em>
            </label>
          ) : (
            <></>
          )}
          <div className="form-check mt-4">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">Remember me</label>
          </div>

          <button
            className="btn btn-primary mt-4 w-100"
            disabled={errors.loginEmailError || errors.passwordError}
            onClick={() => loginUser()}
          >
            Login
          </button>
          {errors.loginError ? (
            <label className="text-danger">
              <em>error user not found</em>
            </label>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
