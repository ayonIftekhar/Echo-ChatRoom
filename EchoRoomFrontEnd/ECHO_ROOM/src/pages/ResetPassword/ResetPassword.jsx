import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import assets from "../../assets/assets";
import { resetPassword } from "../../BackendAPI/BackendApi";

function ResetPassword(){

    const {token} = useParams()
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const title = import.meta.env.VITE_COMPANY_TITLE;

    async function submitHandler(e){
        e.preventDefault();
        if(password != confirmPassword){
            toast.error('Passwords did not match!');
            return;
        }
        try{
            const response = await resetPassword(password , token);
            if(response.status === 200){
                navigate("/login");
                toast.success(response.data)
            }
        }catch(e){
            toast.error(e.response.data);
            navigate("/forgot-password")
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
                          htmlFor="password"
                          className="form-label"
                          style={{ color: "blue" }}
                        >
                          Enter New Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-md"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mb-2">
                        <label
                          htmlFor="confirm_password"
                          className="form-label"
                          style={{ color: "blue" }}
                        >
                          Re-type Password
                        </label>
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          className="form-control form-control-md"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Reset Password
                      </button>
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

export default ResetPassword;