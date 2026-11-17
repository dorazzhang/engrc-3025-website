type WatercolorPaperBackgroundProps = {
  variant: "home" | "tall"
}

export function WatercolorPaperBackground({
  variant,
}: WatercolorPaperBackgroundProps) {
  const uid = `wc-${variant}`
  const greenStart = variant === "home" ? 340 : 560

  return (
    <div className="watercolor-paper" aria-hidden="true">
      <svg
        className="watercolor-paper__svg"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`${uid}-paper`} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            <feDiffuseLighting
              in="noise"
              lightingColor="#fffcf7"
              surfaceScale="1.8"
            >
              <feDistantLight azimuth="40" elevation="60" />
            </feDiffuseLighting>
          </filter>

          <filter
            id={`${uid}-wash`}
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="3"
              seed="11"
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale="36"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="8" />
          </filter>
        </defs>

        <rect width="1000" height="1000" fill="#fffcf7" />
        <rect
          width="1000"
          height="1000"
          filter={`url(#${uid}-paper)`}
          opacity="0.18"
        />

        <g filter={`url(#${uid}-wash)`}>
          <path
            d={`M-80 -40
                 C 200 20, 400 -30, 600 40
                 S 900 -20, 1080 50
                 L 1080 ${greenStart + 40}
                 C 800 ${greenStart - 30}, 500 ${greenStart + 50}, 200 ${greenStart - 10}
                 S -80 ${greenStart + 20}, -80 ${greenStart}
                 Z`}
            fill="#d7e8f5"
            opacity="0.32"
          />
          <path
            d={`M-80 40
                 C 180 100, 380 20, 580 110
                 S 880 30, 1080 90
                 L 1080 ${greenStart - 20}
                 C 750 ${greenStart - 80}, 450 ${greenStart + 10}, 180 ${greenStart - 50}
                 S -80 ${greenStart - 30}, -80 ${greenStart - 40}
                 Z`}
            fill="#c5daf0"
            opacity="0.28"
          />
          <path
            d={`M-60 120
                 C 220 180, 450 90, 680 170
                 S 950 100, 1080 160
                 L 1080 ${Math.max(greenStart - 80, 200)}
                 C 780 ${greenStart - 140}, 420 ${greenStart - 60}, 100 ${greenStart - 100}
                 S -60 ${greenStart - 90}, -60 ${greenStart - 90}
                 Z`}
            fill="#e4eef8"
            opacity="0.34"
          />
          <path
            d="M-40 200 C 250 260, 500 160, 750 250 S 1000 180, 1080 230 L 1080 380 C 700 320, 350 400, -40 350 Z"
            fill="#d0e3f2"
            opacity="0.22"
          />
        </g>

        <g filter={`url(#${uid}-wash)`}>
          <path
            d={`M-80 ${greenStart - 30}
               C 200 ${greenStart - 90}, 450 ${greenStart + 40}, 700 ${greenStart - 50}
               S 1000 ${greenStart + 20}, 1080 ${greenStart - 20}
               L 1080 1080 L -80 1080 Z`}
            fill="#e2ecca"
            opacity="0.34"
          />
          <path
            d={`M-80 ${greenStart + 40}
               C 220 ${greenStart - 20}, 480 ${greenStart + 100}, 760 ${greenStart + 10}
               S 1020 ${greenStart + 80}, 1080 ${greenStart + 50}
               L 1080 1080 L -80 1080 Z`}
            fill="#d5e5b5"
            opacity="0.28"
          />
          <path
            d={`M-80 ${greenStart + 120}
               C 250 ${greenStart + 60}, 520 ${greenStart + 180}, 800 ${greenStart + 90}
               S 1050 ${greenStart + 160}, 1080 ${greenStart + 140}
               L 1080 1080 L -80 1080 Z`}
            fill="#ebf2d8"
            opacity="0.3"
          />
          <path
            d={`M-80 ${greenStart + 220}
               C 280 ${greenStart + 160}, 560 ${greenStart + 280}, 820 ${greenStart + 200}
               S 1040 ${greenStart + 260}, 1080 ${greenStart + 240}
               L 1080 1080 L -80 1080 Z`}
            fill="#cddfb0"
            opacity="0.24"
          />
        </g>

        <rect
          width="1000"
          height="1000"
          filter={`url(#${uid}-paper)`}
          opacity="0.08"
          style={{ mixBlendMode: "multiply" }}
        />
      </svg>
    </div>
  )
}
