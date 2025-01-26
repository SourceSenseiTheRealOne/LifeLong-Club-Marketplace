"use client"

import React, { Suspense, useState, useEffect } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import ShowWarningModal from "@modules/common/components/warning-modal"
import ShowInvitationCodeModal from "@modules/common/components/invitation-code-modal"
import "../../../styles/globals.css"

import PaginatedProducts from "./paginated-products"
import Image from "next/image"
import { useRouter } from "next/navigation"

const timeZones = [
  { label: "Paris", timeZone: "Europe/Paris" },
  { label: "Japan", timeZone: "Asia/Tokyo" },
  { label: "Lisbon", timeZone: "Europe/Lisbon" },
  { label: "New York", timeZone: "America/New_York" },
  { label: "Sydney", timeZone: "Australia/Sydney" },
]

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

  const [selectedRegion, setSelectedRegion] = useState("Paris")
  const [currentTime, setCurrentTime] = useState("")

  const router = useRouter() // Initialize the router

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

  const handleOpenInvitationCodeModal = async () => {
    if (loading) return // Prevent duplicate submissions

    setLoading(true) // Set loading to true while the API request is in progress

    try {
      const response = await fetch("/api/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: invitationCode }),
      })

      const data = await response.json()

      if (response.ok) {
        // If the code is valid, log "correct"
        console.log("Correct code!")

        // Navigate to the store page
        router.push("/store")
      } else {
        // If the code is invalid, show the modal with the error
        console.log("Invalid code!")
        setIsInvitationCodeModalOpen(true)
      }
    } catch (error) {
      console.error("Error verifying code:", error)
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  useEffect(() => {
    const updateTime = () => {
      const timeZone = timeZones.find(
        (zone) => zone.label === selectedRegion
      )?.timeZone
      if (timeZone) {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        setCurrentTime(formatter.format(now))
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000) // Update every second
    return () => clearInterval(interval)
  }, [selectedRegion])

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
            {Array(10)
              .fill(
                <>
                  <span className="mr-4 tracking-wider">COMING SOON</span>
                  <span className="mr-4 tracking-wider">•</span>
                  <span className="mr-4 tracking-wider">WAITLIST</span>
                  <span className="mr-4 tracking-wider">•</span>
                </>
              )
              .map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
              ))}
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
            <div className="space-y-2">
              <div className="my-2 flex justify-end">
                <div className="text-xl text-red-600">
                  <div className="group relative ">
                    <div className="flex items-center justify-between space-x-5 bg-white px-4">
                      <div className="flex flex-row gap-2 items-center">
                        <a className="menu-hover my-2 py-2 text-xl text-red-600 font-base lg:mx-4">
                          {selectedRegion}
                        </a>
                        {/* <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </span> */}
                      </div>
                      <div>{currentTime}</div>
                    </div>

                    {/* Dropdown */}
                    <div className="invisible absolute z-50 mr-2 flex  flex-col text-center bg-white py-1 px-4 text-red-600 shadow-xl group-hover:visible">
                      {timeZones.map((zone) => (
                        <a
                          key={zone.label}
                          className="my-2 block  py-1 font-base text-red-600 md:mx-2"
                          onClick={() => setSelectedRegion(zone.label)}
                        >
                          {zone.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-fit rounded-full mb-6 hover:animate-bounce-up cursor-pointer">
                <Image
                  src="https://res.cloudinary.com/dzxalfzwh/image/upload/v1737497333/Group_217_wnnnc6.png"
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
              <h1 className="text-left text-4xl font-sans md:text-5xl w-[700px] text-red-600">
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
                        className="w-10 h-16 text-center border border-red-600 rounded-xl bg-transparent text-red-600 focus:outline-none"
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
              <div className="relative flex flex-col items-start justify-center px-4 py-4 gap-4 mt-3">
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
          <div className="fixed bottom-0 w-full overflow-hidden py-1">
            <div className="animate-marquee whitespace-nowrap text-xs text-red-600 tracking-wide">
              {Array(10)
                .fill(
                  <>
                    <span className="mr-4 tracking-wider">COMING SOON</span>{" "}
                    {/* Add margin between elements */}
                    <span className="mr-4 tracking-wider">•</span>
                    <span className="mr-4 tracking-wider">WAITLIST</span>
                    <span className="mr-4 tracking-wider">•</span>
                  </>
                )
                .map((item, index) => (
                  <React.Fragment key={index}>{item}</React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default WaitlistTemplate
