import { useEffect, useRef, useState } from "react"

export type Page = "home" | "about"

type SiteNavProps = {
  page: Page
  onNavigate: (page: Page) => void
  variant?: "field" | "blue" | "green"
}

export function SiteNav({ page, onNavigate, variant = "field" }: SiteNavProps) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastY.current

      setScrolled(y > 12)

      if (y < 48) {
        setHidden(false)
      } else if (delta > 6) {
        setHidden(true)
      } else if (delta < -6) {
        setHidden(false)
      }

      lastY.current = y
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={[
        "site-nav",
        `site-nav--${variant}`,
        scrolled ? "is-scrolled" : "",
        hidden ? "is-hidden" : "is-shown",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Primary"
    >
      <button
        type="button"
        className="site-nav__brand"
        onClick={() => onNavigate("home")}
      >
        Dora Zhang
      </button>

      <ul className="site-nav__links">
        <li>
          <button
            type="button"
            className={[
              "site-nav__link",
              page === "home" ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => {
              onNavigate("home")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            className="site-nav__link"
            onClick={() => {
              onNavigate("home")
              window.setTimeout(() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }, 50)
            }}
          >
            Projects
          </button>
        </li>
        <li>
          <button
            type="button"
            className={[
              "site-nav__link",
              page === "about" ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onNavigate("about")}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  )
}
