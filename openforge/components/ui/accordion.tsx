"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface AccordionContextType {
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: "single" | "multiple"
  collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextType>({})

function Accordion({
  type = "single",
  collapsible = false,
  value,
  onValueChange,
  children,
  className,
}: {
  type?: "single" | "multiple"
  collapsible?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
}) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    type === "multiple" ? [] : ""
  )

  const currentValue = value !== undefined ? value : internalValue
  const handleValueChange = onValueChange || setInternalValue

  return (
    <AccordionContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        type,
        collapsible,
      }}
    >
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("border-b border-border", className)}>
      {children}
    </div>
  )
}

function AccordionTrigger({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
}) {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(ItemContext)

  if (!itemValue) {
    throw new Error("AccordionTrigger must be used within an AccordionItem")
  }

  const isOpen =
    context.type === "multiple"
      ? Array.isArray(context.value) && context.value.includes(itemValue)
      : context.value === itemValue

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e)

    if (context.type === "multiple") {
      const newValue = Array.isArray(context.value) ? [...context.value] : []
      const idx = newValue.indexOf(itemValue)
      if (idx >= 0) {
        newValue.splice(idx, 1)
      } else {
        newValue.push(itemValue)
      }
      context.onValueChange?.(newValue)
    } else {
      if (isOpen && context.collapsible) {
        context.onValueChange?.("")
      } else {
        context.onValueChange?.(itemValue)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

const ItemContext = React.createContext<string | undefined>(undefined)

function AccordionContent({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const context = React.useContext(AccordionContext)

  const isOpen =
    context.type === "multiple"
      ? Array.isArray(context.value) && context.value.includes(value)
      : context.value === value

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-96" : "max-h-0"
      )}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  )
}

// Wrapper to properly handle AccordionItem context
const AccordionItemWrapper = React.forwardRef<
  HTMLDivElement,
  {
    value: string
    children: React.ReactNode
    className?: string
  }
>(({ value, children, className }, ref) => (
  <ItemContext.Provider value={value}>
    <div ref={ref} className={cn("border-b border-border", className)}>
      {children}
    </div>
  </ItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"

export {
  Accordion,
  AccordionItemWrapper as AccordionItem,
  AccordionTrigger,
  AccordionContent,
}
