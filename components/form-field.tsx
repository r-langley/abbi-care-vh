"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FormFieldProps {
  label: string
  id: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  maxLength?: number
}

export function FormField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  maxLength,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-medium text-muted-foreground" htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  )
}
