'use client'

import React, { useEffect, useRef } from 'react'

export default function FittedText({ content } : {content : string}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)
  const resizeText = () => {
    const container = containerRef.current
    const text = textRef.current

    if (!container || !text) {
      return
    }

    const containerWidth = container.offsetWidth
    let min = 1
    let max = 2500

    while (min <= max) {
      const mid = Math.floor((min + max) / 2)
      text.style.fontSize = `${mid}px`

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1
      } else {
        max = mid - 1
      }
    }

    text.style.fontSize = `${max}px`
  }

  useEffect(() => {
    resizeText()

    window.addEventListener('resize', resizeText)

    return () => {
      window.removeEventListener('resize', resizeText)
    }
  }, [])

  return (
    <div
      className="grid h-screen w-full  place-items-center overflow-hidden bg-transparent"
      ref={containerRef}
    >
      <span
        className="absolute px-6 bottom-25 left-0 mx-auto whitespace-nowrap text-center font-bold uppercase text-neutral-200"
        ref={textRef}
      >
        {content}
      </span>
    </div>
  )
}
