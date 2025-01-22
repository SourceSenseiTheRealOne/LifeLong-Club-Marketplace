import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"

const HomeNewsletter = () => {
  return (
    <section className="">
      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Left Box */}
        <div className="flex-1 border border-red-500 p-4 py-8">
          <h3 className="text-red-500 text-4xl max-w-xl text-left text-balance font-thin mb-4">
            THE FIRST RULE OF LIFELONGCLUB IS: YOU DO NOT TALK ABOUT
            LIFELONGCLUB.
            <br />
            THE SECOND RULE IS...
          </h3>
          <Button className="border border-red-500 outline-none bg-red-500 text-white hover:bg-red-600">OUR STORY</Button>
        </div>

        {/* Right Box */}
        <div className="flex-1 border-t border-red-500 p-4 py-8">
          <h3 className="text-red-500 text-4xl font-thin mb-4">
            SUBSCRIBE TO
            <br />
            OUR NEWSLETTER
          </h3>
          <div className="flex flex-row gap-4">
                {/* <div>
                  <p className="text-red-500 uppercase text-lg">
                    AI EXPLORER.......
                  </p>
                </div> */}
                <div className="flex flex-col gap-4 mb-8">
                  <div>
                    <p className="text-red-500 uppercase text-lg">
                      Email
                    </p>
                  </div>
                  <div className="bg-red-500 px-0.5 py-0.5 w-[560px]"></div>
                </div>
              </div>
          <Button className="border border-red-500 outline-none bg-red-500 text-white hover:bg-red-600">
            SUBSCRIBE
          </Button>
          
        </div>
      </div>
    </section>
  )
}

export default HomeNewsletter
