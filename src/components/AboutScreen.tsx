import { assetUrl } from "../assetUrl"
import { useCursorTip } from "./useCursorTip"
import { PhotoBoothSlot } from "./PhotoBoothSlot"
import { ResumeButton } from "./ResumeButton"
import { SiteNav, type Page } from "./SiteNav"
import { SocialLinks } from "./SocialLinks"
import { WatercolorPaperBackground } from "./WatercolorPaperBackground"

type AboutScreenProps = {
  onNavigate: (page: Page) => void
}

const EXPERIENCE = [
  {
    id: "bny",
    logo: assetUrl("bny.png"),
    logoZoom: 1.2,
    logoOffsetY: "2px",
    org: "Bank of New York",
    role: "Software Engineering Intern",
    dates: "Jun. 2026 – Aug. 2026",
  },
  {
    id: "nexus",
    logo: assetUrl("nexus_logo.png"),
    logoZoom: 1.15,
    org: "Cornell Nexus Project Team",
    role: "Software Developer",
    dates: "Nov. 2024 – present",
  },
  {
    id: "bowers",
    logo: assetUrl("bowers.png"),
    logoZoom: 1.2,
    org: "Cornell Bowers CIS",
    role: "Undergraduate Research Assistant",
    dates: "Sept. 2025 – present",
  },
]

const TECH_GROUPS = [
  {
    id: "languages",
    label: "Programming Languages",
    items: [
      "Python",
      "Java",
      "C",
      "OCaml",
      "SQL",
      "R",
      "JavaScript",
      "TypeScript",
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks / Libraries",
    items: [
      "ROS",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "PyTorch",
      "OpenCV",
      "React",
      "Spring Boot",
      "Angular",
    ],
  },
  {
    id: "tools",
    label: "Tools / Technology",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "GitLab",
      "Linux",
      "VS Code",
      "IntelliJ",
      "Onshape",
    ],
  },
]

const GALLERY = [
  {
    id: "g1",
    kind: "pic" as const,
    shape: "sq",
    src: assetUrl("dog.jpg"),
    alt: "Picture with my dog",
    caption: "buddy :)",
  },
  {
    id: "g2",
    kind: "sticky" as const,
    label: "walk buddy 2x a day !!",
    shape: "sq",
    noteColor: "yellow",
  },
  {
    id: "g4",
    kind: "pic" as const,
    shape: "sq",
    src: assetUrl("friends5.jpg"),
    alt: "Friends",
    caption: "hometown friends!!",
  },
  {
    id: "g7",
    kind: "pic" as const,
    shape: "sq",
    src: assetUrl("beach_painting.jpg"),
    alt: "Holding up my finished beach painting",
    caption: "painting my favorite beach",
  },
  {
    id: "g3",
    kind: "pic" as const,
    shape: "wide",
    src: assetUrl("hackmit_presentation.PNG"),
    alt: "Presenting to judges at HackMIT",
    caption: "presenting at HackMIT",
  },
  {
    id: "g5",
    kind: "pic" as const,
    shape: "wide",
    src: assetUrl("badminton_cifs.JPG"),
    alt: "Badminton match in high school",
    caption: "badminton tourney!",
  },
  {
    id: "g6",
    kind: "pic" as const,
    shape: "mid",
    src: assetUrl("swe_conference.JPG"),
    alt: "SWE conference group photo with friends",
    caption: "WE26 conference in boston",
  },
  { id: "g10", kind: "booth" as const, shape: "tall" },
  {
    id: "g8",
    kind: "sticky" as const,
    label: "to do: study abroad in hong kong, get back into reading, learn something new",
    shape: "sq",
    noteColor: "pink",
  },
  {
    id: "g13",
    kind: "pic" as const,
    shape: "tall",
    src: assetUrl("fam.jpg"),
    alt: "Family selfie outdoors",
    caption: "mom and dad!",
  },
  {
    id: "g12",
    kind: "sticky" as const,
    label: "1) gouache \n 2) watercolor \n 3) acrylic",
    shape: "sq",
    noteColor: "mint",
  },
  {
    id: "g9",
    kind: "pic" as const,
    shape: "wide",
    src: assetUrl("friends11.JPG"),
    alt: "Friends at the SeaWorld entrance",
    caption: "seaworld with friends",
  },
  {
    id: "g11",
    kind: "pic" as const,
    shape: "mid",
    src: assetUrl("nexus.JPG"),
    alt: "Cornell Nexus team group photo",
    caption: "nexus group photo!",
  },
  {
    id: "g14",
    kind: "pic" as const,
    shape: "wide",
    src: assetUrl("nexus_working.JPEG"),
    alt: "Working on a Nexus project in the ELL",
    caption: "nexus work session",
  },
]

type GalleryPhoto = Extract<(typeof GALLERY)[number], { kind: "pic" }>

function GalleryPhotoCard({ item }: { item: GalleryPhoto }) {
  const cursorTip = useCursorTip<HTMLDivElement>(item.caption)

  return (
    <div
      className={["gallery-item", `gallery-item--${item.shape}`].join(" ")}
      onPointerEnter={cursorTip.showTip}
      onPointerMove={cursorTip.moveTip}
      onPointerLeave={cursorTip.hideTip}
    >
      <div className="gallery-item__mock gallery-item__mock--photo">
        <img src={item.src} alt={item.alt} />
      </div>
      {cursorTip.element}
    </div>
  )
}

export function AboutScreen({ onNavigate }: AboutScreenProps) {
  return (
    <div className="about-page">
      <WatercolorPaperBackground variant="tall" />

      <SiteNav page="about" onNavigate={onNavigate} variant="blue" />

      <section className="about-intro">
        <div className="about-intro__photo">
          <div className="photo-mock">
            <img src={assetUrl("me.PNG")} alt="Dora Zhang" />
          </div>
        </div>
        <div className="about-intro__copy">
          <p className="section-eyebrow">About me!</p>
          <p>Hi, I&apos;m Dora :)</p>
          <p>
            I&apos;m a student at Cornell University majoring in computer
            science.
          </p>
          <p>
          I like moving between different ways of thinking. 
          As a software developer, I think in systems and logic. 
          As someone drawn to product, I think in tradeoffs: what to build, for whom, and why it matters. 
          Engineering grounds me in the realities of how things work, 
          while art teaches me to consider emotion and expression.
          </p>
          <p>
            Growing up as an introvert, I forced myself to step outside my comfort
            zone over time. Unfamiliar rooms taught me to listen closely,
            read what may go unsaid, and choose words with intention. Today,
            that awareness shapes how I communicate and connect with the
            people I work alongside.
          </p>
        </div>
      </section>

      <section className="about-experience" aria-label="Experience">
        <header className="section-header section-header--inline">
          <p className="section-eyebrow">Experience</p>
        </header>

        <ul className="experience-list">
          {EXPERIENCE.map((item) => (
            <li key={item.id} className="experience-row">
              <div className="experience-row__icon" aria-hidden="true">
                <img
                  src={item.logo}
                  alt=""
                  style={
                    item.logoZoom
                      ? {
                          transform: `scale(${item.logoZoom})${
                            item.logoOffsetY
                              ? ` translateY(${item.logoOffsetY})`
                              : ""
                          }`,
                        }
                      : undefined
                  }
                />
              </div>
              <div className="experience-row__main">
                <strong className="experience-row__org">{item.org}</strong>
                <span className="experience-row__role">{item.role}</span>
                <span className="experience-row__dates">{item.dates}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-stack" aria-label="Tech stack">
        <header className="section-header section-header--inline">
          <p className="section-eyebrow">Tech stack</p>
        </header>
        <div className="tech-groups">
          {TECH_GROUPS.map((group) => (
            <div key={group.id} className="tech-group">
              <p className="tech-group__label">{group.label}</p>
              <div
                className={[
                  "tech-group__row",
                  group.id === "tools" ? "tech-group__row--with-sticker" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <ul className="tech-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {group.id === "tools" ? (
                  <img
                    className="tech-sticker tech-sticker--smiski"
                    src={assetUrl("smitski.png")}
                    alt=""
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-outside" aria-label="Outside of work">
        <div className="about-outside__body">
          <p className="about-outside__copy">
            Outside of work, I fill my time with badminton, painting, and scenic
            drives with no particular destination. I&apos;m also an avid
            collector— of smiskis, pokemon cards, and lego sets.
          </p>
          <ul className="about-outside__stickers" aria-hidden="true">
            <li className="about-outside__sticker about-outside__sticker--pokemon">
              <img src={assetUrl("pokemon-card.png")} alt="" />
            </li>
            <li className="about-outside__sticker about-outside__sticker--lego">
              <img src={assetUrl("lego.png")} alt="" />
            </li>
          </ul>
        </div>
      </section>

      <section className="about-gallery" aria-label="Gallery">
        <header className="section-header section-header--inline">
          <p className="section-eyebrow">Photo album</p>
        </header>
        <div className="about-gallery__grid">
          {GALLERY.map((item) =>
            item.kind === "sticky" ? (
              <div
                key={item.id}
                className={[
                  "gallery-item",
                  "gallery-item--sticky",
                  `gallery-item--${item.shape}`,
                  `postit--${item.noteColor}`,
                ].join(" ")}
              >
                <div className="postit">
                  <span className="postit__tack" aria-hidden="true" />
                  <span className="postit__label">{item.label}</span>
                </div>
              </div>
            ) : item.kind === "booth" ? (
              <div
                key={item.id}
                className={["gallery-item", `gallery-item--${item.shape}`].join(
                  " ",
                )}
              >
                <PhotoBoothSlot />
              </div>
            ) : (
              <GalleryPhotoCard key={item.id} item={item} />
            ),
          )}
        </div>
      </section>

      <SocialLinks />
      <ResumeButton />
    </div>
  )
}
