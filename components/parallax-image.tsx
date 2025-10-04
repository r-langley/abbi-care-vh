"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  parallaxSpeed?: number
}

export function ParallaxImage({ src, alt, width, height, className = "", parallaxSpeed = 0.5 }: ParallaxImageProps) {
  const [offsetY, setOffsetY] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return

      const rect = imageRef.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

      // Only apply parallax when element is in viewport
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        setOffsetY(scrollProgress * 100 * parallaxSpeed)

        if (!isInView && scrollProgress >= 0.3) {
          setIsInView(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [parallaxSpeed, isInView])

  return (
    <div ref={imageRef} className="relative overflow-hidden">
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image src={src || "/placeholder.svg"} alt={alt} width={width} height={height} className={className} />
      </div>

      {isInView && (
        <div
          className="absolute left-0 right-0 h-0.5 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
            boxShadow: "0 0 20px 4px rgba(255,255,255,0.6)",
            animation: "scan 1.8s ease-in-out",
          }}
        />
      )}

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
