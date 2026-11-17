import { useEffect, useRef, useState, type PointerEvent } from "react"
import { assetUrl } from "../assetUrl"
import { ResumeButton } from "./ResumeButton"
import { SocialLinks } from "./SocialLinks"
import { SiteNav, type Page } from "./SiteNav"
import { WatercolorPaperBackground } from "./WatercolorPaperBackground"

type HomeScreenProps = {
  onNavigate: (page: Page) => void
}

const PROJECTS = [
  {
    id: "tuneshift",
    blurb: "Real-time ambient music that adapts to what is on your screen",
    video: "tuneshift-demo.mp4",
    href: "https://plume.hackmit.org/project/sobfq-hsqge-hdyfi-fimqb",
    tip: "view on plume",
    label: "HACKMIT 2025",
  },
  {
    id: "cold-diffusion",
    blurb: "PyTorch re-implementation of the paper Cold Diffusion: Inverting Arbitrary Image Transforms Without Noise",
    image: "cold-diffusion-poster.png",
    href: "https://github.com/dorazzhang/cold-diffusion",
    tip: "view github",
  },
  {
    id: "fontify",
    blurb: "Custom font generator mimicking handwritten text",
    video: "fontify-demo.mp4",
    href: "https://fontify-eight.vercel.app/",
    tip: "view app",
    wide: true,
  },
  {
    id: "akinator",
    blurb: "Akinator implementation in ocaml",
    video: "akinator-demo.mp4",
    videoAspect: "1466 / 932",
  },
  {
    id: "whack-a-mol",
    blurb: "Classic whack-a-mole arcade game with custom graphics",
    video: "mol-demo.mp4",
    videoAspect: "1140 / 1042",
  },
  {
    id: "urban-emissions",
    blurb:
      "Hybrid random forest and kriging model for urban CO₂ nowcasting",
    image: "urban-emissions-poster.png",
  }
] as const

const MAIN_PROJECTS = PROJECTS.filter(
  (p) =>
    p.id === "tuneshift" ||
    p.id === "cold-diffusion",
)
const FONTIFY = PROJECTS.find((p) => p.id === "fontify")!
const URBAN_EMISSIONS = PROJECTS.find((p) => p.id === "urban-emissions")!
const MINI_PROJECTS = PROJECTS.filter(
  (p) => p.id === "akinator" || p.id === "whack-a-mol",
)

type LinkedProject = Extract<(typeof PROJECTS)[number], { href: string }>

function VideoProjectCard({
  project,
}: {
  project: Extract<(typeof PROJECTS)[number], { video: string; blurb: string }>
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  function startHover() {
    const video = videoRef.current
    if (video) void video.play().catch(() => {})
  }

  function endHover() {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <article
      className="project-card project-card--mini"
      onPointerEnter={startHover}
      onPointerLeave={endHover}
    >
      <div
        className="project-card__mock"
        style={
          "videoAspect" in project && project.videoAspect
            ? { aspectRatio: project.videoAspect }
            : undefined
        }
      >
        <video
          ref={videoRef}
          className="project-card__video"
          src={assetUrl(project.video)}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="project-card__meta">
        <p>{project.blurb}</p>
      </div>
    </article>
  )
}

function StaticImageProjectCard({
  project,
}: {
  project: Extract<(typeof PROJECTS)[number], { image: string; blurb: string }>
}) {
  return (
    <article className="project-card">
      <div className="project-card__mock">
        <img
          className="project-card__image"
          src={assetUrl(project.image)}
          alt=""
          draggable={false}
        />
      </div>
      <div className="project-card__meta">
        <p>{project.blurb}</p>
      </div>
    </article>
  )
}

function LinkedProjectCard({ project }: { project: LinkedProject }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const tipRef = useRef<HTMLSpanElement>(null)
  const [tipVisible, setTipVisible] = useState(false)

  function moveTip(e: PointerEvent<HTMLAnchorElement>) {
    const tip = tipRef.current
    if (tip) {
      tip.style.left = `${e.clientX}px`
      tip.style.top = `${e.clientY}px`
    }
  }

  function startHover(e: PointerEvent<HTMLAnchorElement>) {
    setTipVisible(true)
    // Position after paint so tipRef is mounted
    window.requestAnimationFrame(() => moveTip(e))
    const video = videoRef.current
    if (video) void video.play().catch(() => {})
  }

  function hideTip() {
    setTipVisible(false)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <a
      className={[
        "project-card",
        tipVisible ? "is-hovered" : "",
        "wide" in project && project.wide ? "project-card--wide" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.blurb} (${project.tip})`}
      onPointerEnter={startHover}
      onPointerMove={moveTip}
      onPointerLeave={hideTip}
    >
      <div className="project-card__mock">
        {"video" in project && project.video ? (
          <video
            ref={videoRef}
            className="project-card__video"
            src={assetUrl(project.video)}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : "image" in project && project.image ? (
          <img
            className="project-card__image"
            src={assetUrl(project.image)}
            alt=""
            draggable={false}
          />
        ) : null}
      </div>
      <div className="project-card__meta">
        <p>{project.blurb}</p>
        {"label" in project && project.label ? (
          <span className="project-card__label">{project.label}</span>
        ) : null}
      </div>
      {tipVisible ? (
        <span className="project-card__tip" ref={tipRef} aria-hidden="true">
          {project.tip}
        </span>
      ) : null}
    </a>
  )
}

const EEVEE_LINES = [
  "hi there!",
  "i can't wait to evolve",
  "im hungry",
] as const

const BUBBLE_SHOW_MS = 1000
const BUBBLE_FADE_MS = 280
const EEVEE_PAUSE_MS = 1000

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const [bubbleMounted, setBubbleMounted] = useState(false)
  const [bubbleVisible, setBubbleVisible] = useState(false)
  const [eeveePaused, setEeveePaused] = useState(false)
  const lineRef = useRef(0)
  const hideTimer = useRef<number | null>(null)
  const fadeTimer = useRef<number | null>(null)
  const pauseTimer = useRef<number | null>(null)

  function clearBubbleTimers() {
    if (hideTimer.current !== null) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
    if (fadeTimer.current !== null) {
      window.clearTimeout(fadeTimer.current)
      fadeTimer.current = null
    }
  }

  function clearPauseTimer() {
    if (pauseTimer.current !== null) {
      window.clearTimeout(pauseTimer.current)
      pauseTimer.current = null
    }
  }

  useEffect(
    () => () => {
      clearBubbleTimers()
      clearPauseTimer()
    },
    [],
  )

  function pauseEevee() {
    clearPauseTimer()
    setEeveePaused(true)
    pauseTimer.current = window.setTimeout(() => {
      setEeveePaused(false)
      pauseTimer.current = null
    }, EEVEE_PAUSE_MS)
  }

  function presentBubble(index: number) {
    clearBubbleTimers()
    pauseEevee()
    setBubbleIndex(index)
    setBubbleMounted(true)
    setBubbleVisible(false)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setBubbleVisible(true)
      })
    })

    hideTimer.current = window.setTimeout(() => {
      setBubbleVisible(false)
      fadeTimer.current = window.setTimeout(() => {
        setBubbleMounted(false)
        fadeTimer.current = null
      }, BUBBLE_FADE_MS)
      hideTimer.current = null
    }, BUBBLE_SHOW_MS)
  }

  function handleEeveeClick() {
    const nextIndex = lineRef.current % EEVEE_LINES.length
    lineRef.current += 1
    pauseEevee()

    if (bubbleMounted && bubbleVisible) {
      clearBubbleTimers()
      setBubbleVisible(false)
      fadeTimer.current = window.setTimeout(() => {
        presentBubble(nextIndex)
      }, BUBBLE_FADE_MS)
      return
    }

    presentBubble(nextIndex)
  }

  return (
    <div className="portfolio-home">
      {/* One continuous wash for hero + projects */}
      <WatercolorPaperBackground variant="home" />

      <SiteNav page="home" onNavigate={onNavigate} variant="field" />

      <section className="hero">
        <div className="hero__content">
          <div className="hero__collage">
            <div className="hero__copy">
              <h1>I lead with curiosity for solutions that matter</h1>
              <p>currently · computer science @ cornell engineering</p>
              <p>previously · software engineer @ bny</p>
            </div>
          </div>
        </div>

        <div
          className={[
            "hero__eevee-wrap",
            eeveePaused ? "is-paused" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {bubbleMounted ? (
            <div
              className={[
                "chat-bubble",
                bubbleVisible ? "is-visible" : "is-hidden",
              ].join(" ")}
              role="status"
            >
              <p>{EEVEE_LINES[bubbleIndex]}</p>
            </div>
          ) : null}
          <div className="hero__eevee-mover">
            <button
              type="button"
              className="hero__eevee"
              onClick={handleEeveeClick}
              aria-label="Talk to Eevee"
            >
              <img
                src={
                  eeveePaused
                    ? assetUrl("eevee-static.png")
                    : assetUrl("eevee-walking.webp")
                }
                alt=""
              />
            </button>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="projects__inner">
          <header className="section-header">
            <p className="section-eyebrow">Projects</p>
          </header>

          <div className="projects__grid">
            {MAIN_PROJECTS.map((project) => {
              if ("href" in project && project.href) {
                return <LinkedProjectCard key={project.id} project={project} />
              }
              return null
            })}
          </div>

          <div className="projects__finale">
            <LinkedProjectCard project={FONTIFY} />
            <div className="projects__minis">
              {MINI_PROJECTS.map((project) => (
                <VideoProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
          <div className="projects__urban">
            <StaticImageProjectCard project={URBAN_EMISSIONS} />
          </div>
        </div>
      </section>

      <p className="anim-credit">animations by me :)</p>

      <ResumeButton />

      <SocialLinks />
    </div>
  )
}
