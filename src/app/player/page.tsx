/* eslint-disable no-nested-ternary */
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
    function onResponse(data: string) {
      if (data === 'play') {
        setIsPlaying(true)
      } else if (data === 'pause') {
        setIsPlaying(false)
      }
    }

    function onChange(data: string) {
      setIsLoading(true)
      if (data === 'video1') {
        setSource('https://multiembed.mov/?video_id=tt8385148') // IMDB example
      } else if (data === 'video2') {
        setSource('https://multiembed.mov/?video_id=522931&tmdb=1') // TMDB example
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

  return (
    <div>
      <button
        onClick={() => {
          setIsPlaying(!isPlaying)
        }}
      >
        {isPlaying ? 'Pause Video' : 'Play Video'}
      </button>

      {source ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <iframe
            title={source}
            id="videoPlayer"
            src={source}
            style={{ display: 'block', width: '100%', height: '400px' }}
            allowFullScreen
          />
        )
      ) : (
        <div>No video selected</div>
      )}
    </div>
  )
}

export default PlayerPage
