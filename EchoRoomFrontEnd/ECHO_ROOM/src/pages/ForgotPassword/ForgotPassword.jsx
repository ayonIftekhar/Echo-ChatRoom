import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../../assets/assets";
import { sendResetEmail } from "../../BackendAPI/BackendApi";

function ForgotPassword(){

    const [email , setEmail] = useState('');

    const title = import.meta.env.VITE_COMPANY_TITLE;

    async function submitHandler(e){
        e.preventDefault();
        try{
            const response = await sendResetEmail(email);
            if(response.status === 200){
                toast.success("Password Reset Link sent to " + email);
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

                    <div className="row mb-4">
                      <div className="mb-2">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        Send Reset Link
                      </button>
                    </div>

                    <p
                      className="mb-2 pb-lg-2 text-center mt-2"
                      style={{ color: "#393f81" }}
                    >
                      Go back to{" "}
                      <Link to="/login" style={{ color: "#393f81" }}>
                        Login
                      </Link>
                    </p>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default ForgotPassword;