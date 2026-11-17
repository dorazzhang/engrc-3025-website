import { useEffect, useRef, useState, type FormEvent } from "react"

const RESUME_PASSWORD = "explorer"
const RESUME_URL =
  "https://drive.google.com/file/d/1lSb3NPAGGEVi3O2rR56zFyoqvTDthcGE/view?usp=sharing"

function IconPaper() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8 12h8v2H8v-2zm0 4h8v2H8v-2z"
      />
    </svg>
  )
}

export function ResumeButton() {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        setPassword("")
        setError(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  function close() {
    setOpen(false)
    setPassword("")
    setError(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password === RESUME_PASSWORD) {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer")
      close()
      return
    }
    setError(true)
  }

  return (
    <>
      <button
        type="button"
        className="resume-btn"
        onClick={() => setOpen(true)}
        aria-label="View resume"
      >
        <IconPaper />
      </button>

      {open ? (
        <div
          className="resume-gate"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-gate-title"
          onClick={close}
        >
          <form
            className="resume-gate__panel"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <p id="resume-gate-title" className="resume-gate__title">
              Resume
            </p>
            <label className="resume-gate__label" htmlFor="resume-password">
              Password
            </label>
            <input
              ref={inputRef}
              id="resume-password"
              className="resume-gate__input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              autoComplete="off"
            />
            {error ? (
              <p className="resume-gate__error" role="alert">
                Incorrect password
              </p>
            ) : null}
            <div className="resume-gate__actions">
              <button type="button" className="resume-gate__cancel" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="resume-gate__submit">
                Open
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}
