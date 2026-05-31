import { Link } from "react-router-dom"
import AuthSidebar from "../../Components/AuthSidebar"
import type React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
    const Navigate = useNavigate();
    const [emailMsg, setemailMsg] = useState('');
    const [passMsg, setpassMsg] = useState('');
    const [messsage, setMessage] = useState('');
    const [msgCol, setmsgCol] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const Validate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const emailValue = (
        form.elements.namedItem("mail") as HTMLInputElement
    ).value.trim();

    const passwordValue = (
        form.elements.namedItem("password") as HTMLInputElement
    ).value;

    setemailMsg("");
    setpassMsg("");
    setMessage("");
    setmsgCol("");

    if (!emailValue || !passwordValue) {
        setMessage("All fields required!");
        setmsgCol("danger");
        return;
    }

    const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailcheck.test(emailValue)) {
        setemailMsg("Enter a valid email!");
        return;
    }

    if (passwordValue.length < 8) {
        setpassMsg("Password must have atleast 8 characters!");
        return;
    }

    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(data.message);
            setmsgCol("success");

            setTimeout(() => {
                Navigate("/dashboard");
            }, 500);
        } else {
            if (data.redirectToVerify) {
                setMessage("Email not verified.    Verify first!")
                setmsgCol('danger');
                setTimeout(() => {
                    Navigate("/verify-email");
                },1000);
                return;
            }

            setMessage(data.message);
            setmsgCol("danger");
        }
    } catch (error) {
        console.log(error);
        setMessage("Something went wrong.");
        setmsgCol("danger");
    }
};
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 bg-light'>
        <div className="grid grid-rows-[60px_1fr]">
            <div className="flex">
                <img src="logo-tag.png" alt="LogoTag" className="ms-6! mt-3!"/>
            </div>
            <div>
                <form onSubmit={(e)=>{Validate(e)}} className="bg-white mt-5! mx-10! md:mx-6! lg:mx-20! rounded-md p-5! leading-10 shadow-2xl">
                    <div className={msgCol}>{messsage}</div>
                    <h1 className="font-bold text-4xl">Welcome Back </h1>
                    <p className="text-gray-600 font-bold">Login to your account</p>
                    <label htmlFor="mail" className="font-bold block">Email Address </label>
                    <input name="mail"  value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="example@gmail.com" className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{emailMsg}</div>
                    <label htmlFor="password"  className="font-bold block">Password </label>
                    <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{passMsg}</div>
                    <div className="flex justify-between">
                        <span><input type="checkbox"/> Remember Me</span>
                        <Link to="/forgot-password" className="text-blue-600 active:text-cyan-400 font-semibold">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="btn block w-full leading-8">Sign In</button>
                    <p className="text-center text-gray-600 font-medium">or continue with</p>
                    <div className="grid grid-cols-2 gap-10 leading-7">
                        <Link to="#" className="sec-btn text-center"> <FontAwesomeIcon icon={["fab", 'google']}/>  Google</Link>
                        <Link to="#" className="sec-btn text-center"> <FontAwesomeIcon icon={["fab", 'apple']} /> Apple</Link>
                    </div>
                    <p className="text-center">Don't have an account? <Link to="/signup" className="font-bold text-orange-500 hover:text-cyan-400">Sign up</Link></p>
                </form>
            </div>
        </div>
        <div className="hidden md:flex">
            <AuthSidebar />
        </div>
    </div>
  )
}

export default SignIn