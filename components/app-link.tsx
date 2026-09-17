import { forwardRef } from "react"
import Link from "next/link"

type AppLinkProps = React.ComponentPropsWithoutRef<"a"> & { href: string }

// Routes on this site go through next/link (client-side navigation, prefetch);
// anything else stays a plain anchor that opens in a new tab. Data-driven lists
// mix the two, so this picks the right one per href.
export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, children, ...props }, ref) => {
    // A dot in the last segment means a static file (/sitemap.xml), which the
    // client router cannot handle, so those stay plain anchors too.
    const isRoute =
      href.startsWith("#") ||
      (href.startsWith("/") && !href.split("?")[0].split("/").pop()?.includes("."))

    if (isRoute) {
      return (
        <Link href={href} ref={ref} {...props}>
          {children}
        </Link>
      )
    }

    if (href.startsWith("/")) {
      return (
        <a href={href} ref={ref} {...props}>
          {children}
        </a>
      )
    }

    return (
      <a href={href} ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
)

AppLink.displayName = "AppLink"
