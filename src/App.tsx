import { useEffect, useState } from "react"
import { AboutScreen } from "./components/AboutScreen"
import { HomeScreen } from "./components/HomeScreen"
import type { Page } from "./components/SiteNav"
import "./App.css"

export default function App() {
  const [page, setPage] = useState<Page>("home")

  useEffect(() => {
    if (page === "about") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
    }
  }, [page])

  function handleNavigate(next: Page) {
    setPage(next)
  }

  return (
    <div className="app app--scroll">
      {page === "home" ? (
        <HomeScreen onNavigate={handleNavigate} />
      ) : (
        <AboutScreen onNavigate={handleNavigate} />
      )}
    </div>
  )
}
