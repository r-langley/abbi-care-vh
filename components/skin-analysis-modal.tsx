"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid"
import { traits } from "@/lib/products"
import { useRouter } from "next/navigation"

interface SkinAnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SkinAnalysisModal({ open, onOpenChange }: SkinAnalysisModalProps) {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const router = useRouter()

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
    // Store selected traits in localStorage for personalization
    if (selectedTraits.length === 3) {
      localStorage.setItem("userTraits", JSON.stringify(selectedTraits))
      onOpenChange(false)
      router.push("/personalized-creams?type=in-lab")
    }
  }

  const handleScan = () => {
    onOpenChange(false)
    router.push("/skin-analysis")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Personalized In-Lab Cream</DialogTitle>
          <DialogDescription className="text-base">
            In-Lab creams are custom-formulated in France based on your skin's unique needs. To create your perfect
            formula, we need to understand your top 3 skin priorities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Scan Option */}
          <div className="border border-border rounded-lg p-6 bg-muted/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DevicePhoneMobileIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">AI Skin Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get 97% dermatologist-level accuracy. Our AI will analyze your skin and automatically identify your
                  top 3 priorities.
                </p>
                <Button onClick={handleScan} className="font-mono">
                  <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                  Start Skin Scan
                </Button>
              </div>
            </div>
          </div>

          {/* Manual Selection */}
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Select Your Top 3 Skin Traits</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the 3 skin concerns that matter most to you. Your formula will be optimized for these
                  priorities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {traits.map((trait) => {
                const isSelected = selectedTraits.includes(trait.id)
                const isDisabled = !isSelected && selectedTraits.length >= 3

                return (
                  <button
                    key={trait.id}
                    onClick={() => !isDisabled && toggleTrait(trait.id)}
                    disabled={isDisabled}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : isDisabled
                          ? "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                          : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{trait.name}</div>
                    {isSelected && (
                      <Badge variant="secondary" className="mt-2 font-mono text-xs">
                        Selected
                      </Badge>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-mono">{selectedTraits.length}/3 traits selected</p>
              <Button onClick={handleContinue} disabled={selectedTraits.length !== 3} className="font-mono">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
