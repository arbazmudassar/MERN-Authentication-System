import { Link, useNavigate } from 'react-router-dom'
import svg from '../../assets/private-mail.svg'
import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailvalue, setEmailValue] = useState(false);
  const Navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState("");
  const [msgCol, setMsgCol] = useState("");
  const [resetPassStatus, setresetPassStatus] = useState(false);
  const [password, setPassword] = useState('')
  
  async function Handler(e: React.SubmitEvent){
    e.preventDefault();
    const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValue(false)
    if (!emailcheck.test(email)) {
        setMessage("Enter a valid email!");
        setMsgCol("danger");
        return;
    }
    try {
      const res = await fetch("/api/auth/forgot-password",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email})
      })
      const data = await res.json();
      if(res.ok){
        setMessage(data.message)
        setMsgCol("success")
        setEmailValue(true)
      }else{
        setMessage(data.message)
        setMsgCol("danger")
      }
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong!");
      setMsgCol("danger");
    }
    
  }
  async function OTPHandler(e: React.SubmitEvent){
    e.preventDefault();
    setresetPassStatus(false)
    try {
      const res = await fetch("/api/auth/verify-forgot-password-otp",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email,otp})
      })
      const data = await res.json();
      if(res.ok){
        setMessage(data.message)
        setMsgCol("success")
        setTimeout(() => {
          setresetPassStatus(true)
        }, 1000);
      }else{
        setMessage(data.message)
        setMsgCol("danger")
      }
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong!");
      setMsgCol("danger");
    }
  }

  async function ResetPassHandler(e:React.SubmitEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/reset-password",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({email,otp, password})
      })
      const data = await res.json();
      if(res.ok){
        setMessage(data.message)
        setMsgCol("success")
        setTimeout(() => {
          Navigate("/signin")
        }, 1000);
      }else{
        setMessage(data.message)
        setMsgCol("danger")
      }
    } catch (error) {
      console.log(error)
      setMessage("Something went wrong!");
      setMsgCol("danger");
    }
  }

  if(resetPassStatus===true){
    return <>
      <div className="text-center h-screen grid grid-rows-2 bg-light pt-8!">
      <div>
        <img src={svg} alt="Mail_SVG" className='h-full w-full animate-pulse slow'/>
      </div>
      <div className='pt-8!'>
        <h3 className="font-bold text-3xl">New Password.</h3>
        <form onSubmit={(e)=>{ResetPassHandler(e)}}>
          <input name="password" placeholder="Enter new password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="border-2 rounded-md border-gray-500"/>
          <button className="btn my-5! ms-5! hover:cursor-pointer">Submit</button><br />
          <div className={`font-bold ${msgCol}`}>
            {message}
          </div>
        </form>
        <div className="flex gap-5! justify-center">
          <Link to="/signin" className="font-bold text-orange-400 hover:cursor-pointer">Back To Login</Link>
        </div>
      </div>
    </div>
    </>
  }
  
  if(emailvalue===true){
    return (
    <div className="text-center h-screen grid grid-rows-2 bg-light pt-8!">
      <div>
        <img src={svg} alt="Mail_SVG" className='h-full w-full animate-pulse slow'/>
      </div>
      <div className='pt-8!'>
        <h3 className="font-bold text-3xl">Reset OTP Sent</h3>
        <p className="text-gray-600">We have sent a password reset OTP to <br /> {email}</p>
        <p className="text-gray-600">Please check your inbox & Enter your OTP to reset your password.</p>
        <form onSubmit={(e)=>{OTPHandler(e)}}>
          <input type="text" name="OTP" placeholder="Enter OTP here" value={otp} onChange={(e)=>{setOtp(e.target.value)}} className="border-2 rounded-md border-gray-500" maxLength={6}/>
          <button className="btn my-5! ms-5! hover:cursor-pointer">Submit</button><br />
          <div className={`font-bold ${msgCol}`}>
            {message}
          </div>
        </form>
        <div className="flex gap-5! justify-center">
          <Link to="#" className="font-bold text-orange-400 hover:cursor-pointer">Resend OTP</Link>
          <Link to="/signin" className="font-bold text-orange-400 hover:cursor-pointer">Back To Login</Link>
        </div>
      </div>
    </div>
  )
  }

  return <>
    <div className="text-center h-screen grid grid-rows-2 bg-light pt-8!">
      <div>
        <img src={svg} alt="Mail_SVG" className='h-full w-full animate-pulse slow'/>
      </div>
      <div className='pt-8!'>
        <h3 className="font-bold text-3xl">Enter Email to Forgot Password.</h3>
        <form onSubmit={(e)=>{Handler(e)}}>
          <input name="email" placeholder="Enter email here" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="border-2 rounded-md border-gray-500"/>
          <button className="btn my-5! ms-5! hover:cursor-pointer">Submit</button><br />
          <div className={`font-bold ${msgCol}`}>
            {message}
          </div>
        </form>
        <div className="flex gap-5! justify-center">
          <Link to="/signin" className="font-bold text-orange-400 hover:cursor-pointer">Back To Login</Link>
        </div>
      </div>
    </div>
  </>
}

export default ForgotPassword