"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface PopoverContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined)

function Popover({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)

  const isOpen = open !== undefined ? open : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<"button">) {
  const context = React.useContext(PopoverContext)
  if (!context) {
    throw new Error("PopoverTrigger must be used within a Popover")
  }

  return (
    <button
      onClick={() => context.setIsOpen(!context.isOpen)}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

function PopoverContent({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ComponentProps<"div">) {
  const context = React.useContext(PopoverContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!context?.isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        context.setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [context])

  if (!context?.isOpen) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-72 rounded-md border border-border bg-white p-4 text-sm shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
