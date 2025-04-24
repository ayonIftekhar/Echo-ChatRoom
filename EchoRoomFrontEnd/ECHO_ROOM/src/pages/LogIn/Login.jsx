import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "../../assets/assets";
import { login } from "../../BackendAPI/BackendApi";
import { UserRoomContext } from "../../Context/RoomContext";


function Login(){

    const api = import.meta.env.VITE_API_BASE_URL; 
    const title = import.meta.env.VITE_COMPANY_TITLE;

    const {setUser} = useContext(UserRoomContext);

    const [userData , setUserData ] = useState({
      email : '',
      password : '',
    });

    const navigate = useNavigate();

    function changeEmail(e){
      setUserData({
        ...userData, email : e.target.value
      })
    }

    function changePassword(e){
      setUserData({
        ...userData , password : e.target.value
      })
    }

    async function submitHandler(e){
      e.preventDefault();
      //console.log("here");
      try{
        const response = await login(userData);
        //console.log("hi");
        if(response.status == 200){
          setUser(response.data);
          toast.success("logged in successfully!");
          navigate("/");
        }
      }
      catch(e){
        toast.success("Please log in first");
      }
    }


    return (
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={assets.login}
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        height: "600px",
                        width: "500px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center mb-4 pb-1">
                          <img
                            src={assets.logo}
                            height={48}
                            width={48}
                            className="me-2"
                          ></img>
                          <span
                            className="h3 fw-bold mb-0"
                            style={{ color: "blue" }}
                          >
                            {title}
                          </span>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                            style={{ color: "blue" }}
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            placeholder="john@example.com"
                            className="form-control form-control-lg"
                            value={userData.email}
                            onChange={changeEmail}
                            required
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                            style={{ color: "blue" }}
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={userData.password}
                            onChange={changePassword}
                          />
                        </div>

                        <div className="pt-1 mb-3 d-flex justify-content-center">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-lg w-50"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>

                        <div className="medium  text-center">
                          <Link to="/forgot-password" style={{ color: "#393f81" }}>
                            Forgot password?
                          </Link>
                        </div>
                        <p
                          className="mb-2 pb-lg-2 text-center mt-2"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                      </form>
                      <a
                        href={`${api}/oauth2/authorization/google`}
                        className="btn btn-outline-danger w-10 d-flex align-items-center justify-content-center"
                        style={{ gap: "10px" }}
                      >
                        <i className="bi bi-google"></i> Login with Google
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Login;