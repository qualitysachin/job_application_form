import { useEffect } from "react"
import type { UseFormReturn, FieldValues } from "react-hook-form"

export function usePersistedForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  key: string
) {
  const { watch, reset } = form

  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) reset(JSON.parse(saved))
  }, [key, reset])

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch, key])
}