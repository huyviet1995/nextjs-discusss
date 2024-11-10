'use client'

import { Button } from "@nextui-org/react"

interface FormButtonProps {
  children: React.ReactNode;
  pending?: boolean;
}

export default function FormButton({ children, pending }: FormButtonProps) {
  return (
    <Button type="submit" disabled={pending} isLoading={pending}>
      {children}
    </Button>
  )
}