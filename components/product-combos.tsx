"use client"

import { PlusIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

export function ProductCombos() {
  return (
    <div className="bg-[#f5f6f5] flex flex-col gap-[20px] p-[20px] bg-muted rounded-none">
      <div className="flex flex-col gap-[23px]">
        <div className="flex flex-col gap-[10px] text-[#586158] leading-[1.35]">
          <h2 className="text-foreground font-medium tracking-tight text-2xl">Make it a Combo & Save!</h2>
          <p className="text-[16px] tracking-[-0.32px] text-foreground font-normal">
            Complete your routine. Add a Cleanser and Serum to your Cream and save!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[10px]">
          {/* Duo Pack */}
          <div className="bg-white rounded-[10px] border-2 overflow-hidden h-full border-0 border-none">
            <div className="flex flex-col h-full">
              {/* Image */}
              <div className="relative h-[160px] overflow-hidden">
                <Image
                  src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                  alt="Duo Pack"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col justify-between gap-[10px] flex-1 bg-secondary">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal text-foreground">Duo Pack</p>
                    <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15] text-foreground">
                      Aloe Vera Cleanser
                    </p>
                  </div>
                  <p
                    className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                    style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="line-through opacity-60">$24.00</span> <span className="font-semibold text-accent">$19.00</span>
                  </p>
                </div>

                <button className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center hover:opacity-90 transition-opacity bg-accent">
                  <PlusIcon className="size-[20px] text-[#f5f6f5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Trio Pack */}
          <div className="bg-white rounded-[10px] border-2 overflow-hidden h-full border-0 border-none">
            <div className="flex flex-col h-full">
              {/* Image */}
              <div className="relative h-[160px] overflow-hidden">
                <Image
                  src="/minimalist-cosmetic-pump-bottle-product-photograph.jpg"
                  alt="Trio Pack"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="bg-[#f5f6f5] p-[10px] pb-[20px] flex flex-col justify-between gap-[10px] flex-1 bg-secondary">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[5px]">
                    <p className="font-semibold text-[18px] leading-[1.15] text-[#586158] tracking-normal text-foreground">Trio Pack</p>
                    <p className="font-medium text-[14px] tracking-[-0.28px] text-[#586158] leading-[1.15] text-foreground">
                      Aloe Vera Cleanser and Collagen Serum
                    </p>
                  </div>
                  <p
                    className="font-medium text-[13px] tracking-[-0.26px] text-[#586158] leading-[1.15]"
                    style={{ fontFamily: "var(--font-geist-mono)", fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="line-through opacity-60">$24.00</span> <span className="font-semibold text-accent">$19.00</span>
                  </p>
                </div>

                <button className="bg-[#586158] rounded-full size-[32px] flex items-center justify-center hover:opacity-90 transition-opacity bg-accent">
                  <PlusIcon className="size-[20px] text-[#f5f6f5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
