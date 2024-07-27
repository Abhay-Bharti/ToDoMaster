import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/utils";
import axiosInstance from "../../utils/axiosInstance";
import logo from "../../assets/note.svg"
import "../../App.css"

export default function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");

    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter password");
            return;
        }

        setError("");

        // SignUp API call

        try {
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }


        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occured. Please try again.")
            }
        }
    };



    return (
        <>
            <Navbar />
            <div className="flex items-center">
                <div className=" left h-full w-6/12 " >

                    <img src={logo} alt="man" className="man-logo mb-6" />
                    <h1 className=" font-bold font-[400] text-[30px] ml-[182px]">Welcome to ToDo Master</h1>
                    <p className="text-[20px] text-[#808080] font-[100] ml-[182px] ">Stay organized and boost your productivity with ToDo Master.<br />Create, manage, and track your tasks easily.<br />Experience the simplest way to stay on top of your daily goals.</p>
                </div>
                <div className="outer">
                    <div className="rectangle">
                        <div className="triangle"></div>
                    </div>
                </div>
                <div className="flex items-center justify-center login-box">
                    <div className="w-96 border rounded bg-white px-7 py-10">
                        <form onSubmit={handleSignUp}>
                            <h4 className="text-2xl mb-7">SignUp</h4>

                            <input type="text" placeholder="Name" className="input-box"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />

                            <input type="text" placeholder="Email" className="input-box"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                            <button type="submit" className="btn-primary">
                                Create Account
                            </button>

                            <p className="text-sm text-center mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-primary underline">Login</Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
};