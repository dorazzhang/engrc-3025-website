import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

type BoothPhase = "idle" | "live" | "preview" | "accepted" | "error"

function formatBoothDate(date: Date) {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = String(date.getFullYear()).slice(-2)
  return `${month}/${day}/${year}`
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

export function PhotoBoothSlot() {
  const [phase, setPhase] = useState<BoothPhase>("idle")
  const [photo, setPhoto] = useState<string | null>(null)
  const [draft, setDraft] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [takenAt, setTakenAt] = useState<Date | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  function closeCamera() {
    stopStream(streamRef.current)
    streamRef.current = null
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setCameraReady(false)
  }

  useEffect(() => {
    return () => closeCamera()
  }, [])

  useEffect(() => {
    if (phase !== "live") return

    let cancelled = false
    setCameraReady(false)

    async function start() {
      setError(null)
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera not available in this browser")
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })
        if (cancelled) {
          stopStream(stream)
          return
        }
        streamRef.current = stream
        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          const markReady = () => {
            if (!cancelled) setCameraReady(true)
          }
          video.addEventListener("loadeddata", markReady, { once: true })
          await video.play()
          markReady()
        }
      } catch {
        if (cancelled) return
        closeCamera()
        setError("Camera access needed — check permissions and try again")
        setPhase("error")
      }
    }

    void start()

    return () => {
      cancelled = true
      closeCamera()
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "live" && phase !== "preview") return

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCamera()
        setDraft(null)
        setPhase(photo ? "accepted" : "idle")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase, photo])

  function openBooth() {
    setDraft(null)
    setError(null)
    setCameraReady(false)
    setPhase("live")
  }

  function capture() {
    const video = videoRef.current
    if (!video || video.videoWidth === 0) return

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Un-mirror so saved photo matches a normal camera
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(video, 0, 0)

    setDraft(canvas.toDataURL("image/jpeg", 0.92))
    closeCamera()
    setPhase("preview")
  }

  function accept() {
    if (!draft) return
    setPhoto(draft)
    setDraft(null)
    setTakenAt(new Date())
    setPhase("accepted")
  }

  function retake() {
    setDraft(null)
    setCameraReady(false)
    setPhase("live")
  }

  function reset() {
    closeCamera()
    setPhoto(null)
    setDraft(null)
    setTakenAt(null)
    setError(null)
    setPhase("idle")
  }

  function cancelBooth() {
    closeCamera()
    setDraft(null)
    setPhase(photo ? "accepted" : "idle")
  }

  const showOverlay = phase === "live" || phase === "preview"

  const overlay =
    showOverlay && typeof document !== "undefined"
      ? createPortal(
          <div
            className="photo-booth__overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Photo booth"
            onClick={cancelBooth}
          >
            <div
              className="photo-booth__panel"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="photo-booth__title">Photo booth</p>

              {phase === "live" ? (
                <div className="photo-booth__stage">
                  <video
                    ref={videoRef}
                    className={[
                      "photo-booth__video",
                      cameraReady ? "is-ready" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    playsInline
                    muted
                    autoPlay
                  />
                  {!cameraReady ? (
                    <p className="photo-booth__awaiting">
                      awaiting camera access
                    </p>
                  ) : null}
                </div>
              ) : null}

              {phase === "preview" && draft ? (
                <div className="photo-booth__stage">
                  <img
                    className="photo-booth__preview"
                    src={draft}
                    alt="Preview"
                  />
                </div>
              ) : null}

              <div className="photo-booth__actions">
                {phase === "live" ? (
                  <>
                    <button
                      type="button"
                      className="photo-booth__btn photo-booth__btn--ghost"
                      onClick={cancelBooth}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="photo-booth__btn photo-booth__btn--primary"
                      onClick={capture}
                      disabled={!cameraReady}
                    >
                      Capture
                    </button>
                  </>
                ) : null}
                {phase === "preview" ? (
                  <>
                    <button
                      type="button"
                      className="photo-booth__btn photo-booth__btn--ghost"
                      onClick={retake}
                    >
                      Retake
                    </button>
                    <button
                      type="button"
                      className="photo-booth__btn photo-booth__btn--primary"
                      onClick={accept}
                    >
                      Accept
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <div
        className={[
          "photo-booth",
          phase === "live" || phase === "preview" ? "" : "photo-booth--polaroid",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {phase === "accepted" && photo ? (
          <>
            <div className="photo-booth__taken">
              <img src={photo} alt="Your photo booth portrait" />
              <div className="photo-booth__taken-actions">
                <button type="button" onClick={openBooth}>
                  Retake
                </button>
                <button type="button" onClick={reset}>
                  Reset
                </button>
              </div>
            </div>
            {takenAt ? (
              <p className="photo-booth__caption">
                {formatBoothDate(takenAt)} - fire flick 🔥
              </p>
            ) : null}
          </>
        ) : phase === "error" ? (
          <button
            type="button"
            className="photo-booth__idle"
            onClick={openBooth}
          >
            <span className="photo-booth__polaroid-face">
              <span className="photo-booth__error">{error}</span>
              <span className="photo-booth__hint">Tap to try again</span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="photo-booth__idle"
            onClick={openBooth}
          >
            <span className="photo-booth__polaroid-face">
              <span className="photo-booth__prompt">
                click to contribute to the photo album!
              </span>
            </span>
          </button>
        )}
      </div>
      {overlay}
    </>
  )
}
