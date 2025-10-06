"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { traits } from "@/lib/products"
import { cn } from "@/lib/utils"
import { XMarkIcon } from "@heroicons/react/24/solid"

interface PersonalizeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (data: { traits: string[]; age: number }) => void
}

export function PersonalizeModal({ open, onOpenChange, onComplete }: PersonalizeModalProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [age, setAge] = useState<number>(40)

  const toggleTrait = (traitId: string) => {
    setSelectedTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((t) => t !== traitId)
      }
      if (prev.length < 3) {
        return [...prev, traitId]
      }
      return prev
    })
  }

  const handleContinue = () => {
    if (selectedTraits.length === 3 && age) {
      onComplete({ traits: selectedTraits, age })
      onOpenChange(false)
      // Reset state
      setSelectedTraits([])
      setAge(40)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-0 mx-4 sm:mx-6 md:mx-auto my-4"
        showCloseButton={false}
      >
        <div className="sticky top-0 backdrop-blur-sm bg-white/95 px-5 py-2.5 flex items-center justify-between border-b border-border z-10">
          <div className="flex-1" />
          <p className="font-medium text-[24px] tracking-[-0.48px] text-foreground leading-[1.15] flex-1 text-center">
            Personalize Your Cream
          </p>
          <div className="flex-1 flex justify-end">
            <div className="bg-muted rounded-full size-8 flex items-center justify-center">
              <DialogClose asChild>
                <button>
                  <XMarkIcon className="size-5 text-muted-foreground" />
                </button>
              </DialogClose>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <p className="leading-relaxed text-sm text-foreground">
            To craft the best Custom Base for you, we recommend telling us your skin's top 3 priorities and your age.
          </p>

          <div className="flex flex-wrap gap-[5px]">
            {traits.map((trait) => {
              const isSelected = selectedTraits.includes(trait.id)
              const isDisabled = !isSelected && selectedTraits.length >= 3

              return (
                <button
                  key={trait.id}
                  onClick={() => !isDisabled && toggleTrait(trait.id)}
                  disabled={isDisabled}
                  className={cn(
                    "flex items-center gap-[5px] px-[10px] py-[5px] rounded-[100px] shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : isDisabled
                        ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                        : "bg-muted text-muted-foreground hover:bg-primary/10",
                  )}
                >
                  <span className="text-[14px] whitespace-nowrap font-medium text-foreground">{trait.name}</span>
                </button>
              )
            })}
          </div>

          <select
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-6 py-4 rounded-[10px] border-2 border-muted text-base text-primary bg-background focus:outline-none focus:border-primary transition-colors"
          >
            {Array.from({ length: 63 }, (_, i) => i + 18).map((ageOption) => (
              <option key={ageOption} value={ageOption}>
                {ageOption}
              </option>
            ))}
          </select>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={selectedTraits.length !== 3}
            className="w-full py-6 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
