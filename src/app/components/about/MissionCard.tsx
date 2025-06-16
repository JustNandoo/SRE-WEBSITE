import React from "react"
import Image from "next/image"

interface MissionProps{
  imgPath: string,
  heading: string,
  text: string,
  // children: React.ReactNode,
}

interface MissionWrapper{
  children: React.ReactNode,
}

export const MissionCard: React.FC<MissionProps> = ({imgPath, heading, text}) => {
  return(
    <div className="hover:-translate-y-2 hover:shadow-xl duration-300 w-full h-56 rounded-lg bg-white p-5 overflow-hidden mb-5 flex">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={"/img/icons/about/" + imgPath}
          alt={imgPath}
          height={100}
          width={60}
          className="w-32 h-32"
        />
      </div>
      <div className="flex-[2] flex items-center">
        <div>
          <h3 className="text-[#134576] text-3xl font-semibold mb-2">
            {heading}
          </h3>
          <p className="text-[#134576] font-semibold">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export const MissionCardWrapper: React.FC<MissionWrapper> = ({children}) => {
  return(
    <section className="columns-1 lg:columns-2 max-w-7xl gap-5">
      {children}
    </section>
  )
}