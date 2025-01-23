"use client"

import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import { ExpoScaleEase } from "gsap/EasePack"

import { Flip } from "gsap/Flip"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { useEffect } from "react"

gsap.registerPlugin(useGSAP, Flip, MotionPathPlugin, ExpoScaleEase)

// export const metadata: Metadata = {
//   metadataBase: new URL(getBaseURL()),
// }

export default function RootLayout(props: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if it's a touch device
      const isTouchDevice = "ontouchstart" in window

      // Function for Mouse Move Scale Change (Jelly Effect)
      function getScale(diffX: number, diffY: number) {
        const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
        return Math.min(distance / 100, 0.25)
      }

      // Function For Mouse Movement Angle in Degrees (Jelly Effect)
      function getAngle(diffX: number, diffY: number) {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI
      }

      // Variables
      const elasticCursor = document.getElementById("jelly-cursor")
      const pos = { x: 0, y: 0 }
      const vel = { x: 0, y: 0 }
      let targetPos = { x: 0, y: 0 }
      let isHoveringClickable = false

      // Use gsap.quickSetter for optimized property setting
      const setX = gsap.quickSetter(elasticCursor, "x", "px")
      const setY = gsap.quickSetter(elasticCursor, "y", "px")
      const setRotation = gsap.quickSetter(elasticCursor, "rotate", "deg")
      const setScaleX = gsap.quickSetter(elasticCursor, "scaleX")
      const setScaleY = gsap.quickSetter(elasticCursor, "scaleY")

      // Update position and rotation (without affecting the scale)
      function update() {
        const scale = getScale(vel.x, vel.y)

        // Apply jelly-like effect (position only)
        setX(pos.x)
        setY(pos.y)

        // If not hovering, apply the jelly scale effect
        if (!isHoveringClickable) {
          const clampedScaleX = Math.min(1 + scale, 1.25) // Clamp max scale
          const clampedScaleY = Math.max(1 - scale, 0.75) // Clamp min scale
          setScaleX(clampedScaleX)
          setScaleY(clampedScaleY)
        }
      }

      // Animation loop
      function animate() {
        const speed = 0.35

        // Update cursor's position based on targetPos
        pos.x += (targetPos.x - pos.x) * speed
        pos.y += (targetPos.y - pos.y) * speed
        vel.x = targetPos.x - pos.x
        vel.y = targetPos.y - pos.y

        update()
        requestAnimationFrame(animate)
      }

      // Handle mouse move event
      window.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e

        targetPos.x = clientX
        targetPos.y = clientY

        // Always update position, regardless of hover state
        update()
      })

      // Start the animation loop
      animate()
    }
  }, [])

  return (
    <html lang="en" data-mode="light">
      <body>
        <div id="jelly-cursor"></div>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
