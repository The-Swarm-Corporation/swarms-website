"use client"

import * as React from "react"

import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const noopSubscribe = () => () => {}

// false while rendering on the server and during hydration, true afterwards
// (and immediately on client-side navigations).
function useHydrated() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
}

type EmailInputProps = InputProps & {
  /** Use the styled ui/Input base classes instead of a bare <input>. */
  styled?: boolean
}

/**
 * Email field that is left out of the server HTML and mounted right after
 * hydration. Password managers (LastPass in particular, which ignores
 * data-lpignore on email fields) inject icon nodes next to email inputs as
 * soon as the static HTML loads, before React hydrates, which causes a
 * hydration mismatch. A same-size placeholder keeps the layout stable until
 * the real input mounts.
 */
export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ styled = false, className, ...props }, ref) => {
    const hydrated = useHydrated()

    if (!hydrated) {
      return (
        <div
          aria-hidden="true"
          className={cn(
            styled &&
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            className,
          )}
        />
      )
    }

    const shared = {
      ref,
      type: "email",
      autoComplete: "email",
      "data-lpignore": "true",
      "data-1p-ignore": "",
      "data-bwignore": "true",
      "data-form-type": "other",
      className,
      ...props,
    }

    return styled ? <Input {...shared} /> : <input {...shared} />
  },
)
EmailInput.displayName = "EmailInput"
