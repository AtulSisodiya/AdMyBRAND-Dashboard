// src/components/theme-provider.tsx
"use client"

import * as React from "react"
// The 'type ThemeProviderProps' is now imported directly from "next-themes"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
