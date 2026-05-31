import { Link } from "react-router-dom"
import AuthSidebar from "../../Components/AuthSidebar"
import type React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SignUp = () => {
    const Navigate = useNavigate();
    const [emailMsg, setemailMsg] = useState('')
    const [passMsg, setpassMsg] = useState('')
    const [nameMsg, setnameMsg] = useState('')
    const [cnfrmpassMsg, setcnfrmpassMsg] = useState('')
    const [message, setMessage] = useState('')
    const [msgCol, setmsgCol] = useState('');
    const [email, setemail] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [cnfrmPassword, setcnfrmPass] = useState('')

    const Validate = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setMessage("");
    setmsgCol("");
    setcnfrmpassMsg("");
    setemailMsg("");
    setnameMsg("");
    setpassMsg("");

    if (
        !username ||
        !email ||
        !password ||
        !cnfrmPassword
    ) {
        setMessage("All fields required!");
        setmsgCol("danger");
        return;
    }

    const namecheck = /^[A-Za-z\s]+$/;

    if (!namecheck.test(username)) {
        setnameMsg("Enter a valid username!");
        return;
    }

    const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailcheck.test(email)) {
        setemailMsg("Must be a valid email!");
        return;
    }

    if (password.length < 8) {
        setpassMsg("Password must have atleast 8 characters!");
        return;
    }

    if (password !== cnfrmPassword) {
        setcnfrmpassMsg("Both passwords must match!");
        return;
    }

    try {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage(data.message);
            setmsgCol("success");

            setTimeout(() => {
                Navigate("/verify-email");
            }, 1000);
        } else {
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
    <div className="grid grid-cols-1 md:grid-cols-2 bg-light">
        <div className="grid grid-rows-[60px_1fr]">
            <div className="flex">
                <img src="logo-tag.png" alt="LogoTag" className="ms-6! mt-3!"/>
            </div>
            <div>
                <form onSubmit={Validate} method="post" className="bg-white mt-5! mx-10! md:mx-6! lg:mx-20! rounded-md p-5! leading-10 shadow-2xl">
                    <div className={msgCol}>{message}</div>
                    <h1 className="font-bold text-4xl">Create Account</h1>
                    <p className="font-medium text-gray-600">Get started with your free account</p>
                    <label htmlFor="username" className="font-bold block">Full Name</label>
                    <input name="username"  value={username} onChange={(e)=>{setusername(e.target.value)}} placeholder="Enter Full Name" className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{nameMsg}</div>
                    <label htmlFor="mail" className="font-bold block">Email </label>
                    <input name="mail"  value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder="example@gmail.com" className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{emailMsg}</div>
                    <label htmlFor="password"  className="font-bold block">Password </label>
                    <input type="password" name="password"  value={password} onChange={(e)=>{setpassword(e.target.value)}} className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{passMsg}</div>
                    <label htmlFor="password"  className="font-bold block">Confirm Password </label>
                    <input type="password" name="cnfrm_password"  value={cnfrmPassword} onChange={(e)=>{setcnfrmPass(e.target.value)}} className="border-2 border-gray-400 rounded-md w-full"/>
                    <div className="danger">{cnfrmpassMsg}</div>
                    <span><input type="checkbox" required/> Accept Terms & Conditions</span>
                    <button type="submit" className="btn block mt-2! w-full leading-8">Create Account</button>
                    <p className="text-center text-gray-600 font-medium">or continue with</p>
                    <div className="grid grid-cols-2 gap-10 leading-7">
                        <Link to="#" className="sec-btn text-center"> <FontAwesomeIcon icon={["fab", 'google']} /> Google</Link>
                        <Link to="#" className="sec-btn text-center"> <FontAwesomeIcon icon={['fab', 'apple']} /> Apple</Link>
                    </div>
                    <p className="text-center">Already have an account? <Link to="/signin" className="font-bold text-orange-500 hover:text-cyan-400">Login</Link></p>
                </form>
            </div>
        </div>
        <div className="hidden md:flex">
            <AuthSidebar />
        </div>
    </div>
  )
}

export default SignUp