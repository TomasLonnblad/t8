"use client"

import React from "react"
import { motion } from "framer-motion"
import { useShortcuts, clamp } from "@/hooks/use-shortcut"

const IMAGES = [
  "https://tomaslonnblad.github.io/2.jpg",
  "https://tomaslonnblad.github.io/3.jpg",
  "https://tomaslonnblad.github.io/4.jpg",
  "https://tomaslonnblad.github.io/5.jpg",
  "https://tomaslonnblad.github.io/6.jpg",
  "https://tomaslonnblad.github.io/7.jpg",
  "https://tomaslonnblad.github.io/8.jpg",
  "https://tomaslonnblad.github.io/9.jpg",
  "https://tomaslonnblad.github.io/10.jpg",
  "https://tomaslonnblad.github.io/11.jpg",
  "https://tomaslonnblad.github.io/12.jpg",
  "https://tomaslonnblad.github.io/13.jpg",
  "https://tomaslonnblad.github.io/14.jpg",
  "https://tomaslonnblad.github.io/15.jpg",
  "https://tomaslonnblad.github.io/16.jpg",
  "https://tomaslonnblad.github.io/17.jpg",
  "https://tomaslonnblad.github.io/18.jpg",
  "https://tomaslonnblad.github.io/19.jpg",
  "https://tomaslonnblad.github.io/20.jpg",
  "https://tomaslonnblad.github.io/21.jpg",
  "https://tomaslonnblad.github.io/22.jpg",
  "https://tomaslonnblad.github.io/23.jpg",
  "https://tomaslonnblad.github.io/24.jpg",
  "https://tomaslonnblad.github.io/25.jpg",
  "https://tomaslonnblad.github.io/26.jpg",
  "https://tomaslonnblad.github.io/27.jpg",
  "https://tomaslonnblad.github.io/28.jpg",
  "https://tomaslonnblad.github.io/29.jpg",
  "https://tomaslonnblad.github.io/30.jpg",
  "https://tomaslonnblad.github.io/31.jpg",
  "https://tomaslonnblad.github.io/32.jpg",
  "https://tomaslonnblad.github.io/33.jpg",
  "https://tomaslonnblad.github.io/34.jpg",
  "https://tomaslonnblad.github.io/35.jpg",
  "https://tomaslonnblad.github.io/36.jpg",
  "https://tomaslonnblad.github.io/37.jpg",
  "https://tomaslonnblad.github.io/38.jpg",
  "https://tomaslonnblad.github.io/39.jpg",
  "https://tomaslonnblad.github.io/40.jpg",
  "https://tomaslonnblad.github.io/41.jpg",
  "https://tomaslonnblad.github.io/42.jpg",
  "https://tomaslonnblad.github.io/43.jpg",
  "https://tomaslonnblad.github.io/44.jpg",
  "https://tomaslonnblad.github.io/45.jpg",
  "https://tomaslonnblad.github.io/46.jpg",
  "https://tomaslonnblad.github.io/47.jpg",
  "https://tomaslonnblad.github.io/48.jpg",
  "https://tomaslonnblad.github.io/49.jpg",
  "https://tomaslonnblad.github.io/50.jpg",
  "https://tomaslonnblad.github.io/60.jpg",
  "https://tomaslonnblad.github.io/61.jpg",
  "https://tomaslonnblad.github.io/62.jpg",
  "https://tomaslonnblad.github.io/63.jpg",
  "https://tomaslonnblad.github.io/64.jpg",
  "https://tomaslonnblad.github.io/65.jpg",
  "https://tomaslonnblad.github.io/66.jpg",
  "https://tomaslonnblad.github.io/67.jpg",
  "https://tomaslonnblad.github.io/68.jpg",
  "https://tomaslonnblad.github.io/69.jpg",
  "https://tomaslonnblad.github.io/70.jpg",
  "https://tomaslonnblad.github.io/71.jpg",
  "https://tomaslonnblad.github.io/72.jpg",
  "https://tomaslonnblad.github.io/73.jpg",
  "https://tomaslonnblad.github.io/74.jpg",
  "https://tomaslonnblad.github.io/75.jpg",
  "https://tomaslonnblad.github.io/76.jpg",
  "https://tomaslonnblad.github.io/77.jpg",
  "https://tomaslonnblad.github.io/78.jpg",
  "https://tomaslonnblad.github.io/79.jpg",
  "https://tomaslonnblad.github.io/80.jpg",
  "https://tomaslonnblad.github.io/81.jpg",
  "https://tomaslonnblad.github.io/82.jpg",
  "https://tomaslonnblad.github.io/82.jpg",
  "https://tomaslonnblad.github.io/84.jpg",
  "https://tomaslonnblad.github.io/85.jpg",
  "https://tomaslonnblad.github.io/86.jpg",
  "https://tomaslonnblad.github.io/87.jpg",
  "https://tomaslonnblad.github.io/88.jpg",
  "https://tomaslonnblad.github.io/89.jpg",
  "https://tomaslonnblad.github.io/90.jpg",
  "https://tomaslonnblad.github.io/91.jpg",
]

const FRAME_OFFSET = -30
const FRAMES_VISIBLE_LENGTH = 3
const SCROLL_THRESHOLD = 40
const BUFFER_SIZE = 8 // Render 8 cards before and after visible range (increased for fast scrolling)

export default function TimeMachine({
  shouldImplementPreloading = false,
}: {
  shouldImplementPreloading?: boolean
}) {
  // Use continuous index that can go infinite in both directions
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollAccumulator = React.useRef(0)
  const lastUpdateTime = React.useRef(Date.now())
  const touchStartY = React.useRef(0)

  // Calculate which cards should be rendered (visible + buffer)
  const getVisibleCards = React.useCallback(() => {
    const start = currentIndex - BUFFER_SIZE
    const end = currentIndex + FRAMES_VISIBLE_LENGTH + BUFFER_SIZE
    const cards = []

    for (let i = start; i <= end; i++) {
      cards.push({
        index: i,
        imageIndex: ((i % IMAGES.length) + IMAGES.length) % IMAGES.length, // Positive modulo
      })
    }

    return cards
  }, [currentIndex])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const MIN_UPDATE_INTERVAL = 75 // Minimum 75ms between index changes (max ~13 changes per second)

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollAccumulator.current += e.deltaY

      const now = Date.now()
      const timeSinceLastUpdate = now - lastUpdateTime.current

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        // Only update if enough time has passed since last update
        if (timeSinceLastUpdate >= MIN_UPDATE_INTERVAL) {
          const delta = scrollAccumulator.current > 0 ? 1 : -1
          setCurrentIndex((prev) => prev + delta)
          scrollAccumulator.current = 0
          lastUpdateTime.current = now
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY.current - touchY
      touchStartY.current = touchY

      scrollAccumulator.current += deltaY

      const now = Date.now()
      const timeSinceLastUpdate = now - lastUpdateTime.current

      if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
        if (timeSinceLastUpdate >= MIN_UPDATE_INTERVAL) {
          const delta = scrollAccumulator.current > 0 ? 1 : -1
          setCurrentIndex((prev) => prev + delta)
          scrollAccumulator.current = 0
          lastUpdateTime.current = now
        }
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    })
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  useShortcuts({
    ArrowRight: () => {
      setCurrentIndex((prev) => prev + 1)
    },
    ArrowLeft: () => {
      setCurrentIndex((prev) => prev - 1)
    },
  })

  const visibleCards = getVisibleCards()

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {visibleCards.map((card) => {
          const offsetIndex = card.index - currentIndex
          const blur = currentIndex > card.index ? 2 : 0
          const opacity = currentIndex > card.index ? 0 : 1
          const scale = clamp(1 - offsetIndex * 0.28, [0.20, 3])
          const y = clamp(offsetIndex * FRAME_OFFSET, [FRAME_OFFSET * FRAMES_VISIBLE_LENGTH, Number.POSITIVE_INFINITY])

          const src = IMAGES[card.imageIndex]
          const image = <img alt="" src={src || "/placeholder.svg"} className="object-cover w-full h-full" />

          return (
            <motion.div
              key={card.index}
              className="absolute w-[100%] max-w-[800px] aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-2xl"
              initial={false}
              animate={{
                y,
                scale,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  mass: 0.5,
                },
              }}
              style={{
                willChange: "opacity, filter, transform",
                filter: `blur(${blur}px)`,
                opacity,
                transitionProperty: "opacity, filter",
                transitionDuration: "200ms",
                transitionTimingFunction: "ease-in-out",
                zIndex: 1000 - card.index,
              }}
            >
              {shouldImplementPreloading ? <>{offsetIndex < FRAMES_VISIBLE_LENGTH ? image : null}</> : image}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
