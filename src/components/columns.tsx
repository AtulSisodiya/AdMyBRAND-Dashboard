// src/components/columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
export type User = {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  lastLogin: string
  status: 'Active' | 'Inactive'
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]