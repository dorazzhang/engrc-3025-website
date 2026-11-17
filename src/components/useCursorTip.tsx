import { useLayoutEffect, useRef, useState, type PointerEvent } from "react"

export function useCursorTip<T extends HTMLElement>(text: string) {
  const tipRef = useRef<HTMLSpanElement>(null)
  const position = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  function moveTip(e: PointerEvent<T>) {
    position.current = { x: e.clientX, y: e.clientY }
    const tip = tipRef.current
    if (tip) {
      tip.style.left = `${e.clientX}px`
      tip.style.top = `${e.clientY}px`
    }
  }

  function showTip(e: PointerEvent<T>) {
    position.current = { x: e.clientX, y: e.clientY }
    setVisible(true)
  }

  useLayoutEffect(() => {
    if (!visible || !tipRef.current) return
    tipRef.current.style.left = `${position.current.x}px`
    tipRef.current.style.top = `${position.current.y}px`
  }, [visible])

  return {
    visible,
    showTip,
    moveTip,
    hideTip: () => setVisible(false),
    element: visible ? (
      <span className="cursor-tip" ref={tipRef} aria-hidden="true">
        {text}
      </span>
    ) : null,
  }
}
