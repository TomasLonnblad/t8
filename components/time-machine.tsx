"use client"

import React from "react"
import { motion } from "framer-motion"
import { useShortcuts, clamp } from "@/hooks/use-shortcut"

const IMAGES = [
  "https://tomaslonnblad.github.io/a (1).jpg",
  "https://tomaslonnblad.github.io/a (2).jpg",
  "https://tomaslonnblad.github.io/a (3).jpg",
  "https://tomaslonnblad.github.io/a (4).jpg",
  "https://tomaslonnblad.github.io/a (5).jpg",
  "https://tomaslonnblad.github.io/a (6).jpg",
  "https://tomaslonnblad.github.io/a (7).jpg",
  "https://tomaslonnblad.github.io/a (8).jpg",
  "https://tomaslonnblad.github.io/a (9).jpg",
  "https://tomaslonnblad.github.io/a (10).jpg",
  "https://tomaslonnblad.github.io/a (11).jpg",
  "https://tomaslonnblad.github.io/a (12).jpg",
  "https://tomaslonnblad.github.io/a (13).jpg",
  "https://tomaslonnblad.github.io/a (14).jpg",
  "https://tomaslonnblad.github.io/a (15).jpg",
  "https://tomaslonnblad.github.io/a (16).jpg",
  "https://tomaslonnblad.github.io/a (17).jpg",
  "https://tomaslonnblad.github.io/a (18).jpg",
  "https://tomaslonnblad.github.io/a (19).jpg",
  "https://tomaslonnblad.github.io/a (20).jpg",
  "https://tomaslonnblad.github.io/a (21).jpg",
  "https://tomaslonnblad.github.io/a (22).jpg",
  "https://tomaslonnblad.github.io/a (23).jpg",
  "https://tomaslonnblad.github.io/a (24).jpg",
  "https://tomaslonnblad.github.io/a (25).jpg",
  "https://tomaslonnblad.github.io/a (26).jpg",
  "https://tomaslonnblad.github.io/a (27).jpg",
  "https://tomaslonnblad.github.io/a (28).jpg",
  "https://tomaslonnblad.github.io/a (29).jpg",
  "https://tomaslonnblad.github.io/a (30).jpg",
  "https://tomaslonnblad.github.io/a (31).jpg",
  "https://tomaslonnblad.github.io/a (32).jpg",
  "https://tomaslonnblad.github.io/a (33).jpg",
  "https://tomaslonnblad.github.io/a (34).jpg",
  "https://tomaslonnblad.github.io/a (35).jpg",
  "https://tomaslonnblad.github.io/a (36).jpg",
  "https://tomaslonnblad.github.io/a (37).jpg",
  "https://tomaslonnblad.github.io/a (38).jpg",
  "https://tomaslonnblad.github.io/a (39).jpg",
  "https://tomaslonnblad.github.io/a (40).jpg",
  "https://tomaslonnblad.github.io/a (41).jpg",
  "https://tomaslonnblad.github.io/a (42).jpg",
  "https://tomaslonnblad.github.io/a (43).jpg",
  "https://tomaslonnblad.github.io/a (44).jpg",
  "https://tomaslonnblad.github.io/a (45).jpg",
  "https://tomaslonnblad.github.io/a (46).jpg",
  "https://tomaslonnblad.github.io/a (47).jpg",
  "https://tomaslonnblad.github.io/a (48).jpg",
  "https://tomaslonnblad.github.io/a (49).jpg",
  "https://tomaslonnblad.github.io/a (50).jpg",
  "https://tomaslonnblad.github.io/a (51).jpg",
  "https://tomaslonnblad.github.io/a (52).jpg",
  "https://tomaslonnblad.github.io/a (53).jpg",
  "https://tomaslonnblad.github.io/a (54).jpg",
  "https://tomaslonnblad.github.io/a (55).jpg",
  "https://tomaslonnblad.github.io/a (56).jpg",
  "https://tomaslonnblad.github.io/a (57).jpg",
  "https://tomaslonnblad.github.io/a (58).jpg",
  "https://tomaslonnblad.github.io/a (59).jpg",
  "https://tomaslonnblad.github.io/a (60).jpg",
  "https://tomaslonnblad.github.io/a (61).jpg",
  "https://tomaslonnblad.github.io/a (62).jpg",
  "https://tomaslonnblad.github.io/a (63).jpg",
  "https://tomaslonnblad.github.io/a (64).jpg",
  "https://tomaslonnblad.github.io/a (65).jpg",
  "https://tomaslonnblad.github.io/a (66).jpg",
  "https://tomaslonnblad.github.io/a (67).jpg",
  "https://tomaslonnblad.github.io/a (68).jpg",
  "https://tomaslonnblad.github.io/a (69).jpg",
  "https://tomaslonnblad.github.io/a (70).jpg",
  "https://tomaslonnblad.github.io/a (71).jpg",
  "https://tomaslonnblad.github.io/a (72).jpg",
  "https://tomaslonnblad.github.io/a (73).jpg",
  "https://tomaslonnblad.github.io/a (74).jpg",
  "https://tomaslonnblad.github.io/a (75).jpg",
  "https://tomaslonnblad.github.io/a (76).jpg",
  "https://tomaslonnblad.github.io/a (77).jpg",
  "https://tomaslonnblad.github.io/a (78).jpg",
  "https://tomaslonnblad.github.io/a (79).jpg",
  "https://tomaslonnblad.github.io/a (80).jpg",
  "https://tomaslonnblad.github.io/a (81).jpg",
  "https://tomaslonnblad.github.io/a (82).jpg",
  "https://tomaslonnblad.github.io/a (83).jpg",
  "https://tomaslonnblad.github.io/a (84).jpg",
  "https://tomaslonnblad.github.io/a (85).jpg",
  "https://tomaslonnblad.github.io/a (86).jpg",
  "https://tomaslonnblad.github.io/a (87).jpg",
  "https://tomaslonnblad.github.io/a (88).jpg",
  "https://tomaslonnblad.github.io/a (89).jpg",
  "https://tomaslonnblad.github.io/a (90).jpg",
  "https://tomaslonnblad.github.io/a (91).jpg",
  "https://tomaslonnblad.github.io/a (92).jpg",
  "https://tomaslonnblad.github.io/a (45).jpg",
  "https://tomaslonnblad.github.io/a (46).jpg",
  "https://tomaslonnblad.github.io/a (47).jpg",
  "https://tomaslonnblad.github.io/a (48).jpg",
  
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
