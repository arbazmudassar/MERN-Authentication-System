import { Link } from "react-router-dom"
import errorGif from '../assets/404-error.svg'

const ErrorPage = () => {
  return (
    <div className="h-screen grid grid-rows-[60px_1fr]">
      <div className="flex">
        <img src="logo-tag.png" alt="LogoTag" className="ms-6! mt-3!"/>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-center text-wrap content-center justify-items-center">
        <h1 className="font-extrabold text-7xl md:text-9xl danger">500!</h1>
        <h1 className="font-extrabold text-2xl md:text-4xl warning">Something Went Wrong</h1>
        <p className="text-gray-700 font-bold py-2! w-xs">We are having some trouble on our end. <br />Please try again later.</p>
        <div className="grid grid-cols-2 gap-4 my-10!">
            <Link to={"/"} className="text-black btn">Go to Dashboard</Link>
            <Link to={"/"} className="text-black sec-btn">Reload Page</Link>
        </div>
        </div>
        <div className="hidden md:flex">
          <img src={errorGif} alt="NotFound" className="animate-bounce max-h-[80vh] slow scale-75 hover:scale-90 hover:opacity-80 transition-all duration-500 ease-in-out"/>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage