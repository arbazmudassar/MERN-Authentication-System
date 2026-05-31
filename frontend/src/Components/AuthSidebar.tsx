import SVG from "../assets/AuthSidebar.svg"

const AuthSidebar = () => {
  return (
    <div className='h-full w-full flex scale-85 animate-bounce slow'>
        <img src={SVG} alt="SideBar Img"/>
    </div>
  )
}

export default AuthSidebar