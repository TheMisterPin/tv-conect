/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/button-has-type */

'use client'

import { useEffect, useState } from 'react'
import { socket } from '../socket'

function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [source, setSource] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    function onResponse(data : string) {
      if (data === 'play') {
        setIsPlaying(true)
      } else if (data === 'pause') {
        setIsPlaying(false)
      }
    }

    function onChange(data : string) {
      setIsLoading(true)
      if (data === 'video1') {
        setSource('video1.mp4')
      } else if (data === 'video2') {
        setSource('video2.mp4')
      }
      setIsLoading(false)
    }

    socket.on('messageResponse', onResponse)
    socket.on('selectionResponse', onChange)

    return () => {
      socket.off('messageResponse', onResponse)
      socket.off('selectionResponse', onChange)
    }
  }, [])

  useEffect(() => {
    const video = document.getElementById('videoPlayer') as HTMLVideoElement

    video.src = source
    video.load()

    if (isPlaying) {
      const promise = video.play()
      if (promise !== undefined) {
        promise.catch((err) => {
          // Autoplay was prevented
          console.error('Autoplay prevented', err)
          setIsPlaying(false) // Update isPlaying state to false as fallback
        })
      }
    }
  }, [source, isPlaying])

  return (
    <div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying)
        }}
      >
        {isPlaying ? 'Pause Video' : 'Play Video'}
      </button>
      {isLoading ? <div>is Loading </div>
        : (
          <video
            id="videoPlayer"
            src={source}
            width="640"
            height="360"
            style={{ display: 'block' }}

          />
        )}

    </div>
  )
}

export default PlayerPage
