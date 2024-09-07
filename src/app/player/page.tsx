'use client'

import { useEffect, useState } from 'react'
import { socket } from '../socket'

function PlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [source, setSource] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    function onResponse(data) {
      if (data === 'play') {
        setIsPlaying(true)
      } else if (data === 'pause') {
        setIsPlaying(false)
      }
    }

    function onChange(data) {
      setIsLoading(true)
      console.log('data', data)
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

  // Update the video source and handle autoplay
  useEffect(() => {
    const video = document.getElementById('videoPlayer')
    if (!video) return

    video.src = source // Update the source
    video.load() // Load the new video

    // Attempt to play the video if isPlaying is true
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
          const video = document.getElementById('videoPlayer')
          if (video.muted) {
            video.muted = false // Unmute the video on user interaction
          }
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
