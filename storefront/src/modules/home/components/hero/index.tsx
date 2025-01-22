// import { Github } from "@medusajs/icons"
// import { Button, Heading } from "@medusajs/ui"

// const Hero = () => {
//   return (
//     <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
//         <span>
//           <Heading
//             level="h1"
//             className="text-3xl leading-10 text-ui-fg-base font-normal"
//           >
//             Well done! You have successfully deployed your Medusa 2.0 store on Railway!
//           </Heading>
//           <Heading
//             level="h2"
//             className="text-3xl leading-10 text-ui-fg-subtle font-normal"
//           >
//             Need help customizing your store?
//           </Heading>
//         </span>
//         <a
//           href="https://funkyton.com/medusajs-2-0-is-finally-here/"
//           target="_blank"
//         >
//           <h1 style={{ textDecoration: "underline" }}>
//             Visit the tutorial
//           </h1>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Hero

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { Text, clx, useToggleState } from "@medusajs/ui"

const SideMenuItems = {
  "lifeLong +": "/",
  // Home: "/",
  Drops: "/store",
  // Search: "/search",
  // Account: "/account",
  // Cart: "/cart",
  "About Us": "/about-us"
}

const Hero = async () => {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative">
        <div className="container mx-auto py-6 px-4">
          <nav className="flex justify-between mb-16">
            <Link href="/" className="text-red-500 text-3xl font-bold">
              <Image
                src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1735581003/lifeLongHero_ztc5jm.png"
                width={400}
                height={350}
                alt=""
              />
            </Link>
            <div className="flex flex-col gap-12">
              <div className="flex flex-row justify-between gap-48 items-center">
                <div className="flex gap-8">
                 
                   
                    <ul className="flex flex-row justify-between gap-16 ">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <Link
                              href={href}
                              className="text-red-500 uppercase text-lg"
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
        
                  {/* <Link href="/drops" className="text-red-500 uppercase">
                    DROPS
                  </Link>
                  <Link href="/about" className="text-red-500 uppercase">
                    ABOUT US
                  </Link> */}
                </div>

                <div className="flex flex-row gap-8 items-center">
                  <div>
                    <p className="text-red-500">12:58</p>
                  </div>
                  <div>
                    <button className="text-white rounded-xl text-sm bg-red-500 uppercase px-2.5 py-1.5">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-row">
                <Image
                  src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1735582500/welcomeToClub_udmhsu.png"
                  height={60}
                  width={135}
                  alt=""
                />
              </div>

              <div className="flex flex-row">
                <div className="w-[720px]">
                  <h1 className="text-red-500 text-5xl font-normal">
                    THE ULTIMATE CURATION OF DURABLE AND DETAIL-ORIENTED
                    CONSUMER PRODUCTS FOR THE MOST DEMANDING INDIVIDUALS
                  </h1>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div>
                  <p className="text-red-500 uppercase text-lg">
                    AI EXPLORER.......
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-red-500 uppercase text-lg">
                      SHOP THEM ALL
                    </p>
                  </div>
                  <div className="bg-red-500 px-0.5 py-0.5 w-[560px]"></div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Banner */}
        <div className="border py-6 w-full bg-white">
          <p className="text-red-500 text-center">
            10% DISCOUNT ON NEWSLETTER SUBSCRIPTION
          </p>
        </div>
      </header>
    </div>
  )
}

export default Hero
