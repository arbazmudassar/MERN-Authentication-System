import { Link, useNavigate } from "react-router-dom";
import svg from "../../assets/mail-sent.svg";
import { useEffect, useState, useRef } from "react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const otpSentRef = useRef(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msgCol, setMsgCol] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setEmail(data.user.email);
        } else {
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
        navigate("/signin");
      }
    };

    getMe();
  }, [navigate]);

  const sendOTP = async () => {

   const res = await fetch(
      "/api/auth/otp-send",
      {
         method: "GET"
      }
   );

   const data = await res.json();

   setMessage(data.message);
};

  useEffect(() => {
  if (!email) return;
  if (otpSentRef.current) return;

  otpSentRef.current = true;
  sendOTP();
}, [email]);

  async function Handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      email,
      otp,
    };

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setMsgCol("success");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        setMessage(data.message);
        setMsgCol("danger");
      }
    } catch (err) {
      console.error(err);

      setMessage("Something went wrong.");
      setMsgCol("danger");
    }
  }

  return (
    <div className="text-center grid grid-rows-2 h-screen bg-light">
      <div>
        <img
          src={svg}
          alt="mail-sent-SVG"
          className="w-full h-full pt-5! animate-pulse slow scale-75 sm:scale-100"
        />
      </div>

      <div className="pt-8!">
        <h1 className="font-bold text-4xl">
          Verify Your Email
        </h1>

        <p className="text-gray-600">
          We have sent a verification OTP to
          <br />
          {email}
        </p>

        <p className="text-gray-600 text-wrap px-4!">
          Please check your inbox and enter the OTP to verify your account.
        </p>

        <form onSubmit={Handler}>
          <input
            type="text"
            name="OTP"
            placeholder="Enter OTP here"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border-2 rounded-md border-gray-500"
            maxLength={6}
            required
          />

          <button className="btn my-5! ms-5! hover:cursor-pointer">
            Submit
          </button>

          <div className={`font-bold ${msgCol}`}>
            {message}
          </div>
        </form>

        <Link
          to="#"
          onClick={sendOTP}
          className="font-bold text-orange-400 hover:cursor-pointer"
        >
          Resend Email
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;