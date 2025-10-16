import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");
  const [otp, setOtp] = useState(true);
  // const [pass, setPass] = useState("");
  const [passcode, setPasscode] = useState(true);
  // const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const otpRefs = useRef([]);
  const passcodeRefs = useRef([]); // separate ref for passcode

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedId");
    if (savedId) {
      setId(savedId);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = () => {
    if (id.trim() !== "" ) {  //&& pass.trim() !== ""
      if (rememberMe) {
        localStorage.setItem("rememberedId", id);
      } else {
        localStorage.removeItem("rememberedId");
      }

      setTimeout(() => {
        setHide(false);
        setOtp(false);
      }, 1000);
    }
  };

  const handlePasscode = () => {
    setTimeout(() => {
      setPasscode(false);
      setHide(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="flex bg-white shadow-xl rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={`${hide ? "login.jpg" : "otp.avif"}`}
            alt="Login Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 px-8 py-6">
          <h1 className="text-2xl font-bold text-center mb-4 pt-5 text-indigo-500">
            Sign In
          </h1>
          <form action="/" onSubmit={(e) => e.preventDefault()}>
            {/* Login Section */}
            <div className={`mb-1 ${hide ? "block" : "hidden"}`}>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter user ID"
                  required
                />
              </div>

              {/* <div className="mb-2 relative">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="shadow-sm rounded-md w-full px-3 py-1 pr-10 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="absolute right-3 top-8 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div> */}

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link
                  to="/login/forgetpass"
                  className="text-sm text-indigo-500 hover:underline"
                >
                  Forgot Passcode?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-1.5 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Get OTP
              </button>
              <button
                type="submit"
                className="w-full flex justify-center py-1.5 px-4 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handlePasscode}
              >
                Use Passcode
              </button>
            </div>

            {/* OTP Section */}
            <div className={`mb-2 ${otp ? "hidden" : "block"}`}>
              <label className="text-sm font-medium text-gray-700 mb-1 mt-2">
                OTP
              </label>
              <div className="flex justify-center gap-4 mt-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    ref={(el) => (otpRefs.current[i] = el)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length === 1 && i < 3) {
                        otpRefs.current[i + 1].focus();
                      } else if (value.length === 1 && i === 3) {
                        otpRefs.current[i].blur();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !e.target.value && i > 0) {
                        otpRefs.current[i - 1].focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-xl shadow-sm rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="-"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-1.5 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            {/* Passcode Section */}
            <div className={`mb-2 ${passcode ? "hidden" : "block"}`}>
              <label className="text-sm font-medium text-gray-700 mb-1 mt-2">
                Enter Passcode
              </label>
              <div className="flex justify-center gap-4 mt-2">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="password"
                    maxLength={1}
                    ref={(el) => (passcodeRefs.current[i] = el)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length === 1 && i < 3) {
                        passcodeRefs.current[i + 1].focus();
                      } else if (value.length === 1 && i === 3) {
                        passcodeRefs.current[i].blur();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !e.target.value && i > 0) {
                        passcodeRefs.current[i - 1].focus();
                      }
                    }}
                    className="w-12 h-12 text-center text-xl shadow-sm rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="-"
                  />
                ))}
              </div>
              <Link to='/admin-dashboard'>
              <button
                type="submit"
                className="w-full flex justify-center py-1.5 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
