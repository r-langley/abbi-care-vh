"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { traits } from "@/lib/products"
import { cn } from "@/lib/utils"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

interface PersonalizeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (data: { traits: string[]; age: number }) => void
}

export function PersonalizeModal({ open, onOpenChange, onComplete }: PersonalizeModalProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [age, setAge] = useState<number | null>(null)

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
      setAge(null)
    }
  }

  const incrementAge = () => {
    setAge((prev) => (prev ? Math.min(prev + 1, 100) : 18))
  }

  const decrementAge = () => {
    setAge((prev) => (prev ? Math.max(prev - 1, 18) : 18))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-medium text-foreground">Personalize Your Cream</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-base text-muted-foreground leading-relaxed">
            To craft the best Custom Base for you, we recommend telling us your skin's top 3 priorities and your age.
          </p>

          {/* Trait Selection */}
          <div className="flex flex-wrap gap-3">
            {traits.map((trait) => {
              const isSelected = selectedTraits.includes(trait.id)
              const isDisabled = !isSelected && selectedTraits.length >= 3

              return (
                <button
                  key={trait.id}
                  onClick={() => !isDisabled && toggleTrait(trait.id)}
                  disabled={isDisabled}
                  className={cn(
                    "px-6 py-3 rounded-full text-base font-medium transition-all",
                    isSelected
                      ? "bg-[#e5e2f3] text-foreground"
                      : isDisabled
                        ? "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                        : "bg-[#f4f3fd] text-foreground hover:bg-[#e5e2f3]",
                  )}
                >
                  {trait.name}
                </button>
              )
            })}
          </div>

          {/* Age Input */}
          <div className="relative">
            <input
              type="number"
              value={age || ""}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (!isNaN(value) && value >= 18 && value <= 100) {
                  setAge(value)
                }
              }}
              placeholder="Enter Age"
              className="w-full px-6 py-4 rounded-[10px] border-2 border-[#e5e2f3] text-base text-primary placeholder:text-primary/50 focus:outline-none focus:border-primary transition-colors"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0">
              <button
                onClick={incrementAge}
                className="text-foreground hover:text-primary transition-colors"
                type="button"
              >
                <ChevronUpIcon className="h-5 w-5" />
              </button>
              <button
                onClick={decrementAge}
                className="text-foreground hover:text-primary transition-colors"
                type="button"
              >
                <ChevronDownIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={selectedTraits.length !== 3 || !age}
            className="w-full py-6 text-base font-medium bg-[#e5e2f3] text-primary hover:bg-[#d5d0e8] disabled:opacity-50 disabled:cursor-not-allowed"
            variant="secondary"
          >
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
