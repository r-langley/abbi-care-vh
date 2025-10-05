"use client"

import Image from "next/image"
import Link from "next/link"
import { DevicePhoneMobileIcon, XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

export default function SkinAnalysisPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-sm bg-white/75 p-5 flex items-end justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="w-[32px]" />
          <div className="flex items-center justify-center">
            <Image src="/images/logo.png" alt="ABBI" width={80} height={25} className="h-[25px] w-auto" />
          </div>
          <Link href="/" className="w-[32px] flex justify-end">
            <XMarkIcon className="size-6 text-[#1e1e1e]" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-5 pt-6">
        {/* Image Preview */}
        <div className="w-full max-w-[354px] h-[354px] rounded-[40px] overflow-hidden mb-6">
          <div className="w-full h-full bg-[#f5f6f5] flex items-center justify-center">
            <div className="text-[#586158] text-sm">Preview Image</div>
          </div>
        </div>

        {/* Start Button */}
        <button className="bg-[#586158] text-white w-full max-w-[353px] rounded-lg px-4 py-3 flex items-center justify-center gap-2 mb-5 hover:opacity-90 transition-opacity">
          <DevicePhoneMobileIcon className="size-[22px]" />
          <span className="font-semibold text-[20px]">Start my analysis</span>
        </button>

        {/* Steps */}
        <div className="w-full max-w-[353px] grid grid-cols-3 gap-[5px] mb-5">
          {/* Step 1 */}
          <div className="bg-[#f5f6f5] rounded-[10px] p-[10px] flex flex-col gap-6">
            <p className="font-medium text-[40px] leading-[1.15] text-[#586158] tracking-[-0.8px]">1</p>
            <div className="flex flex-col gap-[5px] text-[#586158] leading-[1.15]">
              <p className="font-semibold text-[16px] tracking-[-0.32px]">Lighting</p>
              <p className="font-medium text-[12px] opacity-75">
                Stand somewhere with strong balanced lighting
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f5f6f5] rounded-[10px] p-[10px] flex flex-col gap-6">
            <p className="font-medium text-[40px] leading-[1.15] text-[#586158] tracking-[-0.8px]">2</p>
            <div className="flex flex-col gap-[5px] text-[#586158] leading-[1.15]">
              <p className="font-semibold text-[16px] tracking-[-0.32px]">Framing</p>
              <p className="font-medium text-[12px] tracking-[-0.24px] opacity-75">
                Remove glasses and ensure your face is clear
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f5f6f5] rounded-[10px] p-[10px] flex flex-col gap-6">
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
          <p className="font-medium text-[16px] tracking-[-0.32px] text-[#586158] leading-[1.35]">
            How it works
          </p>
          <ChevronRightIcon className="size-4 text-[#586158]" />
        </div>
      </div>
    </div>
  )
}
