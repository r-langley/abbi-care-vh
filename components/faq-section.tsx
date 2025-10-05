"use client"

import { PlusIcon } from "@heroicons/react/24/solid"

const faqs = [
  "How to use ABBI products?",
  "What is the difference between INLAB and ABBI FreshActive care?",
  "What is the shelf life of ABBI products?",
  "Are ABBI skincare products suitable for all skin types?",
  "What is ABBI Fresh Active cosmetic?",
  "What is the reliability rate of the ABBI online skin analysis?",
  "How many drops should I use for my ABBI treatments?",
  "Can I mix all ABBI FreshActiv actives together?",
  "How many active ingredients can I mix?",
]

export function FaqSection() {
  return (
    <div className="bg-white py-10 px-5 pb-10">
      <h2 className="font-semibold text-[24px] tracking-[-1px] text-[#292824] mb-5">
        FAQ
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((question, index) => (
          <div key={index}>
            <button className="flex items-center justify-between w-full text-left">
              <p className="font-medium text-[16px] leading-[1.35] text-[#292824] flex-1">
                {question}
              </p>
              <PlusIcon className="size-6 text-[#292824] shrink-0 ml-4" />
            </button>
            {index < faqs.length - 1 && (
              <div className="h-px bg-[#e5e5e5] mt-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
