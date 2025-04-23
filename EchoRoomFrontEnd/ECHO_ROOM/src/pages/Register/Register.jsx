import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../../assets/assets";
import { register } from "../../BackendAPI/BackendApi";

function Register() {

  const title = import.meta.env.VITE_COMPANY_TITLE;

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function submitHandler(e){
    e.preventDefault();

    if(userData.password != userData.confirm_password){
      toast.error("Passowrds Did not match!");
      return ;
    }

    const creds = {
      name : userData.name,
      email: userData.email,
      phone : userData.phone,
      password : userData.password,
    }

    try{
      const response = await register(creds);
      if(response.status === 200){
        toast.success("Registration Successful!")
        navigate("/login");
      }
    }catch(e){
      toast.error(e.response.data);
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card shadow" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={submitHandler}>
                  {/* Logo + Name */}
                  <div className="text-center mb-5">
                    <img
                      src={assets.logo}
                      height={48}
                      width={48}
                      className="me-2"
                      alt="logo"
                    />
                    <h3 className="fw-bold mb-0" style={{ color: "blue" }}>
                      {title}
                    </h3>
                  </div>

                  {/* Full Name (Full Row) */}
                  <div className="form-outline mb-4">
                    <label
                      htmlFor="name"
                      className="form-label"
                      style={{ color: "blue" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-md"
                      placeholder="John Doe"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email & Phone Side by Side */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label
                        htmlFor="email"
                        className="form-label"
                        style={{ color: "blue" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-md"
                        placeholder="john@example.com"
                        value={userData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="phone"
                        className="form-label"
                        style={{ color: "blue" }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control form-control-md"
                        placeholder="+880 123 456 789"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password Side by Side */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <label
                        htmlFor="password"
                        className="form-label"
                        style={{ color: "blue" }}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-control-md"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="*****"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="confirm_password"
                        className="form-label"
                        style={{ color: "blue" }}
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className="form-control form-control-md"
                        value={userData.confirm_password}
                        onChange={handleChange}
                        placeholder="******"
                        required
                      />
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className="pt-1 mb-3 d-flex justify-content-center">
                    <button
                      className="btn btn-primary btn-lg w-50"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  {/* Link to Login */}
                  <div className="text-center">
                    <p className="mb-0" style={{ color: "blue" }}>
                      Already have an account?{" "}
                      <Link to="/login">Login here</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
