"use client"

import { Suspense, useState } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ShowWarningModal from "@modules/common/components/warning-modal"
import ShowInvitationCodeModal from "@modules/common/components/invitation-code-modal"
import "../../../styles/globals.css"

import PaginatedProducts from "./paginated-products"
import Image from "next/image"

const WaitlistTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: string
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const [invitationCode, setInvitationCode] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInvitationCodeModalOpen, setIsInvitationCodeModalOpen] =
    useState(false)

  const handleSendEmailToClient = async () => {
    if (!email) {
      console.log("Email is required")
      return
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "LifeLong Club - Subscription Confirmation",
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error("Failed to send email:", error)
        return
      }

      const data = await response.json()
      console.log("Email sent successfully:", data)

      setIsModalOpen(true)
    } catch (err) {
      console.error("Error sending email:", err)
    }
  }

  const handleOpenInvitationCodeModal = () => {
    // Call the function to open the invitation code modal
    setIsInvitationCodeModalOpen(true)
  }

  return (
    <>
      <main className="overflow-y-hidden">
        <ShowWarningModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <ShowInvitationCodeModal
          open={isInvitationCodeModalOpen}
          onClose={() => setIsInvitationCodeModalOpen(false)}
        />

        <div className="w-full overflow-hidden py-1">
          <div className="animate-marquee whitespace-nowrap text-red-600 text-xs">
            {Array(10).fill("COMING SOON • WAITLIST • ").join("")}
          </div>
        </div>
        <div className="parent h-screen w-full overflow-y-hidden pb-12 ">
          {/* Div 1 */}
          <div className="div1">
            <div className="relative py-16 flex h-full items-center justify-center px-12">
              <Image
                src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1735581003/lifeLongHero_ztc5jm.png"
                alt="Life Long Club"
                className="object-contain object-left"
                height={700}
                width={500}
              />
            </div>
          </div>

          {/* Div 2 */}
          <div className="div2 px-16 pb-6">
            <div className="">
              <div className="my-4 flex justify-end">
                <div className="text-xl text-red-600">PARIS 12:59</div>
              </div>
              <div className="w-fit rounded-full mb-6 hover:animate-bounce-up cursor-pointer">
                <Image
                  src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1737497333/Group_217_wnnnc6.png"
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
              <h1 className=" text-left text-4xl font-sans md:text-5xl w-[700px] text-red-600">
                THE ULTIMATE CURATION OF DURABLE AND TECH-ORIENTED CONSUMER
                PRODUCTS FOR THE MOST DEMANDING INDIVIDUALS.
              </h1>
            </div>
          </div>

          {/* Div 3 */}
          <div className="div3">
            <div
              className="relative grid gap-8 "
              style={{ gridTemplateColumns: "2fr 5fr" }}
            >
              {/* Left Column */}
              <div className="relative flex flex-col items-start justify-start border-r border-red-600 px-16 py-5">
                <p className="text-base font-semibold uppercase mt-3 mb-4 text-red-600 ">
                  INVITATION CODE
                </p>
                <div className="flex flex-row gap-2 mt-2 text-red-600">
                  {Array(6)
                    .fill("")
                    .map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-10 h-12 text-center border border-red-600 rounded-xl bg-transparent text-red-600 focus:outline-none"
                        value={invitationCode[index] || ""}
                        onChange={(e) => {
                          const newCode = [...invitationCode]
                          newCode[index] = e.target.value.toUpperCase()
                          setInvitationCode(newCode.join(""))
                        }}
                      />
                    ))}
                </div>
                <button
                  className="mt-8 w-12 rounded-xl border border-current bg-red-600 text-base text-white py-1"
                  onClick={handleOpenInvitationCodeModal} // Open the modal on click
                >
                  OK
                </button>

                {/* Middle Separator */}
                <div className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-600 bg-white text-sm font-bold text-red-600">
                    OR
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative flex flex-col items-start justify-center px-4 py-4 gap-3 mt-3">
                <p className="text-base uppercase text-left self-start ml-4 font-semibold text-red-600">
                  JOIN THE WAITLIST
                </p>
                <div className="flex justify-start ml-4 w-full mt-6">
                  <input
                    type="email"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder:text-red-600 text-red-600 w-[400px] border-0 border-b-2 border-red-500 bg-transparent focus:outline-none "
                  />
                </div>
                <button
                  className="mt-8 ml-4 rounded-xl border border-current bg-red-600 px-6 py-1 text-white self-start"
                  onClick={() => handleSendEmailToClient()}
                  disabled={loading}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>

          {/* Div 4 */}
          <div className="div4 flex items-center justify-center text-xl font-bold"></div>

          {/* Bottom Banner */}
          <div className="fixed bottom-0 w-full overflow-hidden  py-1 ">
            <div className="animate-marquee whitespace-nowrap text-xs text-red-600">
              {Array(10).fill("COMING SOON • WAITLIST • ").join("")}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default WaitlistTemplate
