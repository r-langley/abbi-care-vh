"use client"

import React from "react"
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define regions with their flags and available languages
const REGIONS = {
  US: {
    name: "United States",
    flag: "🇺🇸",
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" },
    ],
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    languages: [
      { code: "en", name: "English" },
      { code: "fr", name: "Français" },
    ],
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    languages: [{ code: "en", name: "English" }],
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    languages: [{ code: "fr", name: "Français" }],
  },
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    languages: [{ code: "de", name: "Deutsch" }],
  },
  ES: {
    name: "Spain",
    flag: "🇪🇸",
    languages: [{ code: "es", name: "Español" }],
  },
  IT: {
    name: "Italy",
    flag: "🇮🇹",
    languages: [{ code: "it", name: "Italiano" }],
  },
}

type RegionCode = keyof typeof REGIONS

export function RegionLanguageSelector() {
  const [selectedRegion, setSelectedRegion] = React.useState<RegionCode>("US")
  const [selectedLanguage, setSelectedLanguage] = React.useState("en")
  const [isRegionModalOpen, setIsRegionModalOpen] = React.useState(false)
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = React.useState(false)

  const region = REGIONS[selectedRegion]
  const availableLanguages = region.languages

  const handleRegionChange = (regionCode: RegionCode) => {
    setSelectedRegion(regionCode)
    // Set default language for the region
    setSelectedLanguage(REGIONS[regionCode].languages[0].code)
    setIsRegionModalOpen(false)
  }

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    setIsLanguagePopoverOpen(false)
  }

  return (
    <>
      {/* Region/Language Selector Button */}
      <div className="flex items-center gap-1">
        {/* Region Button - Opens full modal */}
        <button
          onClick={() => setIsRegionModalOpen(true)}
          className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors flex items-center gap-1"
        >
          <span className="text-xl leading-none">{region.flag}</span>
        </button>

        {/* Language Popover */}
        <Popover open={isLanguagePopoverOpen} onOpenChange={setIsLanguagePopoverOpen}>
          <PopoverTrigger asChild>
            <button className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors flex items-center gap-1">
              <span className="text-xs font-mono uppercase font-medium">{selectedLanguage}</span>
              <ChevronDownIcon className="w-3 h-3" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 p-2">
            <div className="space-y-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    selectedLanguage === lang.code
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted"
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Region Selection Modal */}
      <Dialog open={isRegionModalOpen} onOpenChange={setIsRegionModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Select Your Region</DialogTitle>
            <DialogDescription>Choose your location to see products and pricing in your region</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {(Object.entries(REGIONS) as [RegionCode, (typeof REGIONS)[RegionCode]][]).map(([code, regionData]) => (
              <button
                key={code}
                onClick={() => handleRegionChange(code)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 p-6 rounded-lg border-2 transition-all hover:border-accent-purple hover:bg-muted",
                  selectedRegion === code ? "border-accent-purple bg-muted" : "border-border"
                )}
              >
                <span className="text-5xl">{regionData.flag}</span>
                <span className="text-sm font-medium text-center">{regionData.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsRegionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsRegionModalOpen(false)}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
