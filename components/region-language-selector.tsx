"use client"

import React from "react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Define regions with their flags and available languages
const REGIONS = {
  US: {
    name: "United States",
    flag: "🇺🇸",
    img: "/images/us-flag.png",
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
  const [isLanguagePopoverOpen, setIsLanguagePopoverOpen] = React.useState(false)

  const region = REGIONS[selectedRegion]
  const regionImg = "img" in region ? region.img : undefined
  const availableLanguages = region.languages

  const handleRegionChange = (regionCode: RegionCode) => {
    setSelectedRegion(regionCode)
    setSelectedLanguage(REGIONS[regionCode].languages[0].code)
  }

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    setIsLanguagePopoverOpen(false)
  }

  return (
    <>
      {/* Region/Language Selector Button */}
      <div className="flex items-center gap-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-[#f5f6f5] rounded-[8px] transition-colors flex items-center gap-1 px-2.5 py-2.5">
              <Avatar className="size-5">
                <AvatarImage
                  src={regionImg || `/placeholder.svg?height=20&width=20&query=${region.name}+flag`}
                  alt={`${region.name} Flag`}
                  className="object-cover"
                />
                <AvatarFallback className="text-xs">{region.flag}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
            {(Object.entries(REGIONS) as [RegionCode, (typeof REGIONS)[RegionCode]][]).map(([code, regionData]) => (
              <DropdownMenuItem
                key={code}
                onClick={() => handleRegionChange(code)}
                className={cn(
                  "flex items-center gap-3 cursor-pointer",
                  selectedRegion === code && "bg-accent-purple/10 text-accent-purple font-medium"
                )}
              >
                <Avatar className="size-6">
                  <AvatarImage
                    src={regionData.img || `/placeholder.svg?height=24&width=24&query=${regionData.name}+flag`}
                    alt={`${regionData.name} Flag`}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-sm">{regionData.flag}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{regionData.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
                      ? "bg-accent-purple/10 text-accent-purple font-medium"
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
    </>
  )
}
