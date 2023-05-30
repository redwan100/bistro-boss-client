import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Context/ContextProvider";
import Swal from "sweetalert2";
import useDynamicTitle from "../../Hooks/useDynamicTitle";

const Login = () => {
  useDynamicTitle('Login')
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const captchaRef = useRef(null);
  const { userSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    // loadCaptchaEnginge(6);
  }, []);
  const handleLogin = (event) => {
    setError("");
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password).then((result) => {
      const user = result.user;
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "User Login Successful",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate(from, { replace: true });
    })
    .catch(err => setError(err.message))
  };

  const handleCaptcha = () => {
    const captchaValue = captchaRef.current.value;

    if (validateCaptcha(captchaValue)) {
      setDisabled(false);
    }
  };

  return (
    <div className="card shadow-2xl  bg-base-100 max-w-xl mx-auto my-11">
      <h1 className="text-5xl font-bold text-center py-4">Login now!</h1>
      <form onSubmit={handleLogin}>
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              name="password"
            />
          </div>

          <div className={`form-control my-5 ${!disabled && "hidden"}`}>
            <LoadCanvasTemplate />
            <input
              type="text"
              placeholder="Type the captcha"
              className="input input-bordered"
              ref={captchaRef}
            />
            <button className="btn btn-xs my-4" onClick={handleCaptcha}>
              Validate
            </button>
          </div>

          <div>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" disabled={disabled}>
              Login
            </button>
          </div>
          {error && <p className="text-error font-medium">{error}</p>}
        </div>
        <p className="p-4 text-center">
          New to here?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
