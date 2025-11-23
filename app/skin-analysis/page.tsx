"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DevicePhoneMobileIcon, XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

export default function SkinAnalysisPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [cameraActive, setCameraActive] = useState(false)
  const [processing, setProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleStartAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      setCameraActive(true)
    } catch (error) {
      console.error("Camera permission denied:", error)
      alert("Camera access is required for skin analysis")
    }
  }

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(video, 0, 0)

      // Stop camera stream
      const stream = video.srcObject as MediaStream
      stream?.getTracks().forEach((track) => track.stop())

      // Simulate processing
      setProcessing(true)

      // Store mock scan results in localStorage
      const mockResults = {
        userName: "User",
        wrinkles: 25,
        radiance: 67,
        imperfections: 55,
        timestamp: Date.now(),
      }
      localStorage.setItem("skinScanResults", JSON.stringify(mockResults))

      // todo: integrate with login if needed
      // login()

      // Redirect to shop after processing
      setTimeout(() => {
        router.push("/shop?category=creams")
      }, 2000)
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-sm bg-white/75 p-5 flex items-end justify-between py-5">
        <div className="flex items-center justify-between w-full">
          <div className="w-[32px]" />
          <div className="flex items-center justify-center">
            <Image src="/images/logo.png" alt="ABBI" width={80} height={25} className="w-auto h-5" />
          </div>
          <Link href="/" className="w-[32px] flex justify-end">
            <XMarkIcon className="size-6 text-[#1e1e1e]" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-5 py-5">
        {/* Image Preview / Camera */}
        <div className="w-full max-w-[354px] rounded-[40px] overflow-hidden mb-6 h-fit relative">
          {cameraActive ? (
            <video ref={videoRef} className="w-full h-80 object-cover" autoPlay playsInline muted />
          ) : (
            <div className="w-full bg-[#f5f6f5] flex items-center justify-center h-80">
              <div className="text-[#586158] text-sm">{processing ? "Processing..." : "Preview Image"}</div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <button
          onClick={cameraActive ? handleCapture : handleStartAnalysis}
          disabled={processing}
          className="bg-[#586158] text-white w-full max-w-[353px] rounded-lg px-4 py-3 flex items-center justify-center gap-2 mb-5 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {!cameraActive && <DevicePhoneMobileIcon className="size-[22px]" />}
          <span className="font-medium text-base">
            {processing ? "Processing..." : cameraActive ? "Capture" : "Start my analysis"}
          </span>
        </button>

        {!cameraActive && (
          <>
            {/* Steps */}
            <div className="w-full max-w-[353px] grid grid-cols-3 gap-[5px] mb-5">
              {/* Step 1 */}
              <div className="rounded-[10px] p-[10px] flex flex-col gap-2.5 border border-border">
                <p className="font-medium text-[40px] leading-[1.15] text-[#586158] tracking-[-0.8px]">1</p>
                <div className="flex flex-col gap-[5px] text-[#586158] leading-[1.15]">
                  <p className="font-semibold text-[16px] tracking-[-0.32px]">Lighting</p>
                  <p className="font-medium text-[12px] opacity-75">Stand somewhere with strong balanced lighting</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-[10px] p-[10px] flex flex-col gap-2.5 border border-border">
                <p className="font-medium text-[40px] leading-[1.15] text-[#586158] tracking-[-0.8px]">2</p>
                <div className="flex flex-col gap-[5px] text-[#586158] leading-[1.15]">
                  <p className="font-semibold text-[16px] tracking-[-0.32px]">Framing</p>
                  <p className="font-medium text-[12px] tracking-[-0.24px] opacity-75">
                    Remove glasses and ensure your face is clear
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-[10px] p-[10px] flex flex-col gap-2.5 border border-border">
                <p className="font-medium text-[40px] leading-[1.15] text-[#586158] tracking-[-0.8px]">3</p>
                <div className="flex flex-col gap-[5px] text-[#586158] leading-[1.15]">
                  <p className="font-semibold text-[16px] tracking-[-0.32px]">Distance</p>
                  <p className="font-medium text-[12px] tracking-[-0.24px] opacity-75">
                    Get close and steady for optimal results
                  </p>
                </div>
              </div>
            </div>

            {/* How it works link */}
            <div className="flex items-center gap-[5px]">
              <p className="font-medium text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35]">How it works</p>
              <ChevronRightIcon className="size-4 text-[#586158]" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
