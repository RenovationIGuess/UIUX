import image from "../../constant/image"


const DefaultNavbar = () => {
  return (
    <nav className="shrink-0 w-full flex items-center justify-between h-[56px] py-2 px-10 bg-white border-b border-solid border-[#f5f6fb]">
      <p className="text-base font-medium">
        Teams / Joined Teams
      </p>
      <div className="flex items-center">
        <p className="text-base font-medium mr-4">Username</p>
        <div className="w-8 h-8">
          <img src={image.poum} alt="user-ava" className="w-full h-full rounded-full" />
        </div>
      </div>
    </nav>
  )
}

export default DefaultNavbar