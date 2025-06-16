import Image from "next/image"

export default function Hero(){
  return(
    <div className="w-full relative pt-32 bg-[#012e21] ">
      <div className="relative lg:relative bottom-0">
        <h1 className="font-extrabold text-7xl lg:text-[14rem] text-white text-center">About Us</h1>
        <Image
          src="/img/icons/about/face-hero.svg"
          alt="union.svg"
          width={50}
          height={50}
          className="w-full"
          />
      </div>
    </div>
  )
}